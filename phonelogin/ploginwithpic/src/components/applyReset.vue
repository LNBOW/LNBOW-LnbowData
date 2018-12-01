<template>
<div class="applyReset" id="app">
        <!-- 头部 -->
        <header class="margin">
          <div class="off">
            <a href="javascript:history.back()"><img style="width:10px;height:18px;float:left;margin-left:15px;;margin-top:5px" src="../assets/img/general_back_icon.png" alt=""></a>
            找回密码
          </div>
        </header>
        <!-- 中部 -->
        <main class="margin">
            <div>
                <!-- 下拉框 -->
                  <select style="width:37px;height:28px:color:#1478f0;position:absolutr;top:9px;left:51px;opacity:0;" @change="selectData">
                    <option :style = display v-for="item in Countrys" v-bind:key="item.id" v-on:click="none(item.id)" >
                      <i>{{item.Acode}}</i>
                      <i>{{item.name}}</i>
                    </option>
                  </select>
                <div class="code">
                    <input type="tel" class="tel txt" v-model="phone" placeholder="手机号" v-focus v-on:blur="inputBlur" v-on:focus="inputFocus"/>
                    <div class="jt" @click="selet" >
                      <span class="Acode" style="color:#1478F0;">{{Acode}}</span>
                    </div>
                </div>
            </div>
            <el-row class="btns">
              <el-button class="btn" v-on:click="phoneapply" :disabled = 'isLoginDisable' type="primary">申请找回</el-button>
            </el-row>
        </main>
        <div class = 'tips' v-show="tipsFlag">{{tips}}</div>
    </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials=true;
const countrys = [
              {id:0,name:'中国',Acode:'+86'},
              {id:1,name:'中国香港',Acode:'+852'},
              {id:2,name:'中国澳门',Acode:'+853'},
              {id:3,name:'中国台湾',Acode:'+883'},
              {id:4,name:'美国',Acode:'+1'},
              {id:5,name:'加拿大',Acode:'+1'},
              {id:6,name:'马来西亚',Acode:'+60'},
              {id:7,name:'澳洲',Acode:'+61'},
              {id:8,name:'日本',Acode:'+81'},
              {id:9,name:'韩国',Acode:'+82'},
              {id:10,name:'新加坡',Acode:'+65'},
              {id:11,name:'印度',Acode:'+91'},
              {id:12,name:'泰国',Acode:'+66'},
              {id:13,name:'德国',Acode:'+49'},
              {id:14,name:'英国',Acode:'+44'},
              {id:15,name:'法国',Acode:'+33'},
              {id:16,name:'俄罗斯',Acode:'+7'},
              {id:17,name:'巴西',Acode:'+55'},
              {id:18,name:'印尼',Acode:'+62'},
              {id:19,name:'柬埔寨',Acode:'+855'},
              {id:20,name:'缅甸',Acode:'+95'},
              {id:21,name:'文莱',Acode:'+673'},
              {id:22,name:'菲律宾',Acode:'+63'},
              {id:23,name:'越南',Acode:'+84'},
              {id:24,name:'老挝',Acode:'+856'},
              {id:25,name:'西班牙',Acode:'+34'},
              {id:26,name:'新西兰',Acode:'+64'},
              {id:27,name:'意大利',Acode:'+39'},
              ]
export default {
  name: 'applyReset',
  props:{
    callback:String
  },
  data () {
    return {
      phone:null, //手机号
      phonereg:/^[1][3,4,5,7,8][0-9]{9}$/,
      isPhoneDisable:false,
      isLoginDisable:false,
      tips:'',
      tipsFlag:false,
      flag:false,
      Register:'申请找回',
      password:null,
      display:'display:block',
      Countrys:countrys,
      Acode:'+86',
      speed:-21,
      background:'background-position:3px '+ 5 +'px',
      position:''
    }
  },
  computed:{
   
  },
  methods:{
    //区号和国旗切换
     selectData:function(event){
      this.Acode = this.CCountrys[ele.target.selectedIndex].Acode;
      this.background='background-position:3px '+ (5 - event.target.selectedIndex * 26) +'px';  
    },
    //失焦
    inputBlur:function(event){
      if(!event.target.value){
        this.tipsFlag = true;
        this.tips = '请输入手机号'
      }
    },
    //获取焦点
    inputFocus:function(event){
      this.tipsFlag = false;
    },
    selet:function(event){   
      this.flag = !this.flag
      this.a = !this.a
    },
    none:function(event){
      this.Acode = this.CCountrys[event].Acode;
      // this.background='background-position:3px '+ (5 - a* 26) +'px';  
      this.flag = false;
      this.a = true
    },
    // 获取手机验证码
     phoneapply:function(event){
       let _this = this
        if (!_this.phonereg.test(_this.phone)) {
          _this.tipsFlag = true;
          _this.tips = '您输入的手机号有误'
        }else{
            _this.isPhoneDisable = true
            window.sessionStorage.setItem('mobile',_this.Acode + '|' + _this.phone);                 
            _this.$router.push({path:'resetPassword'})
          }
    },
    
  },
  directives: {
    //加载输入手机号获取焦点
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  },
  mounted() {
  }
}
</script>

<style>
.applyReset p{font-size: 14px;color: #a9a9a9;margin: 0;margin-top: 12px;text-align: left}
.applyReset header{
  width: 375px;
  text-align: center;
  margin-bottom: 101px
}
.applyReset header .off{
  margin:9px auto;
  font:700 18px/28px '';
  color: #000;
  }
.applyReset header img{width: 200px;height: 37px;}
.applyReset main{margin-top: 48px;margin-bottom:24px;position: relative}
.applyReset main .bp{width: 21px;height: 22px;overflow: hidden;position: absolute;top: -5px;left: 67px;}
.applyReset main .bp div{float: left;width: 21px;height: 22px;background: url(../assets/img/countrys.png) no-repeat;}
.applyReset main .code{
  position: relative;
  height:60px;
  }
.applyReset main .Acode{
  float: left;
  position: absolute;
  top: 0px;
  left: -5px;
  margin-top: 2px 
}
.applyReset main .jt{
  height: 33px;
  width: 50px;
  /* border-bottom: 2px solid #eee; */
  border-right:8px solid #fff; 
  position: relative;
  top: -33px;
  text-align: left;
  left: 50px;
  font-size: 20px
}
.applyReset main select{
  height: 24px;
  position: absolute;
  top: -8px;
  left: 90px;
  outline: none;
  border: none;
  -webkit-appearance:none;
  text-indent: 5px;
  z-index: 1 ;
  width: auto;
  padding: 0 2%;
  margin: 0;
}
.applyReset main .txt{
  outline: none;
  border-top:0;
  border-left:0;
  border-right: 0;
  height: 32px;
  width: 275px;
  font-size: 20px;
  padding: 2px;
  border-bottom: 1pt solid #EAEAEA;
  color: #2c3e50;
}
.applyReset main .txt::-webkit-input-placeholder{
  color:#999999;
}
.applyReset main .tel{
  text-indent: 60px;
  padding-top: 5px;
}
.applyReset main .btn{
  border:0;
  background: #1478F0;
  width: 275px;
  height: 40px;
  text-align:center;
  font: 18px/40px '';
  color: #fff;
  border-radius: 5px;
  margin-top:24px;
  cursor: pointer;
  line-height: 19px
}
.applyReset .tips{
  padding:10px 3px;  
  margin:0 auto;
  min-height:15px;
  background:rgba(0,0,0,.5);
  width:156px;
  color:#fff;
  border-radius:4px;
  font-size:14px;
  position:absolute;
  top:370px;
  left:0;
  right:0;
  word-wrap:break-word;
}
</style>

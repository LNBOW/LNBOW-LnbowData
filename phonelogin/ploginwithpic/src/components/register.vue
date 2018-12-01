<template>
<div class="register" id="app">
 <!-- 头部 -->
        <header class="margin">
          <div class="off">
            <a href="javascript:history.back()"><img style="width:10px;height:18px;float:left;margin-left:15px;;margin-top:5px" src="../assets/img/general_back_icon.png" alt=""></a>
            注册
          </div>
        </header>
        <!-- 中部 -->
        <main class="margin">
          <div>
              <!-- 下拉框 -->
                <select style="width:37px;height:28px:color:#1478f0;position:absolute;top:9px;left:51px;opacity:0;" @change="selectData">
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
            <div class = 'pst'>
              <div>
              <input type="text" class="txt" v-model="validate" placeholder="图片验证码" v-on:blur="inputBlur" v-on:focus="inputFocus"/>                    
              </div>
              <div  class="img">
                  <img class="update" :src="img" v-on:click="changeImg" >
              </div>
          </div>
          <div class="pst">
              <input type="text" class="txt" v-model="phoneValidate" placeholder="输入验证码">
              <button class="obtain" :style="obtainColor" v-on:click="getPhoneValidate" :disabled = 'isPhoneDisable'>{{validateMsg}}</button>
          </div>
          <div class="pst">
            <el-input type="password" class="txt" placeholder="输入密码" v-model="password" clearable></el-input>
          </div>
          <el-row class="btns">
            <el-button class="btn" v-on:click="phoneReg" :disabled = 'isLoginDisable' type="primary">{{Register}}</el-button>
          </el-row>
        </main>
        <div class = 'tips' v-show="tipsFlag">{{tips}}</div>
    </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials=true;
import md5 from 'js-md5'
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
  name: 'register',
  props:{
    callback:String
  },
  data () {
    return {
      obtainColor:'color:#1478F0;cursor:pointer',
      phone:null, //手机号
      validate:null,  //图片验证码
      phoneValidate:null, //手机验证码
      randomNumber:Math.floor(Math.random() * 1000000), //6位随机数
      timeOut:60, //倒计时
      validateMsg:"获取验证码",
      phonereg:/^[1][3,4,5,7,8][0-9]{9}$/,
      passwordreg:/^\S{6,}$/,
      isPhoneDisable:false,
      isLoginDisable:false,
      tips:'',
      tipsFlag:false,
      flag:false,
      img:'',
      Register:'注册',
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
     selectData:function(ele){
      this.Acode = this.Countrys[ele.target.selectedIndex].Acode;
      this.background='background-position:3px '+ (5 - ele.target.selectedIndex * 26) +'px';    
    },
    selet:function(ele){   
      this.flag = !this.flag
      this.a = !this.a
    },
    none:function(ele){
      this.Acode = this.Countrys[ele].Acode;
      // this.background='background-position:3px '+ (5 - a* 26) +'px';  
      this.flag = false;
      this.a = true
    },
    //失焦
    inputBlur:function(event){
      if(event.target.placeholder == "手机号"){
        if(!event.target.value){
          this.tipsFlag = true;
          this.tips = '请输入手机号'
        }
      }else if(event.target.placeholder == "图片验证码"){
        if(!event.target.value){
          this.tipsFlag = true;
          this.tips = '请输入图片验证码'
        }
      }
    },
    //获取焦点
    inputFocus:function(event){
      this.tipsFlag = false;
    },
    //设置cookie
    setCookie:function (cname, cvalue, exdays,cpath,cdomain) { 
      let d = new Date(); 
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); 
      let expires = "expires=" + d.toUTCString(); 
      document.cookie = cname + "=" + cvalue + "; " + expires + ";path=" + cpath + ";domain=" +cdomain;
    },
    //获取cookie
      getCookie:function(name){
          name = name + "="
          var start = document.cookie.indexOf(name),
              value = null;
          if(start>-1){
              var end = document.cookie.indexOf(";",start);
              if(end == -1){
                  end = document.cookie.length;
              }
              value = document.cookie.substring(start+name.length,end);
          }
          return value;
      },
    changeImg:function(){
      this.randomNumber = Math.floor(Math.random() * 1000000);
      this.img = "https://nujump.tigerobo.com/VCI/VC.ashx?uid="+ this.randomNumber;
      this.validate = null
    },
    // 获取手机验证码
     getPhoneValidate:function(event){
       let _this = this
        if (!_this.phonereg.test(_this.phone)) {
          _this.tipsFlag = true;
          _this.tips ='您输入的手机号有误'
        } else {
          if(_this.validate == null || _this.validate == ''){
            _this.tipsFlag = true;            
            _this.tips = '请输入验证码'
          }else{
            _this.isPhoneDisable = true
            axios({
              url:'/SendConfirmationCode',//接口
              method:'post',//发送方式
              data:{
                mobile:_this.Acode + '|' + _this.phone,//手机号
                code:_this.validate,//图片验证码
                identityCode:_this.randomNumber//随机数
              }
            }).then(function (response){  //成功回调
              _this.tipsFlag = false;                        
              if(response.data.code == 0){
                _this.obtainColor = 'color:#aaa;cursor:auto'
                let timerInterval = setInterval(()=>{//发送短信验证码倒计时点击失效
                  _this.timeOut--
                  _this.validateMsg =  parseInt(_this.timeOut) + 's之后重发'
                  if(_this.timeOut <= 0){
                    _this.validateMsg =  '重新获取' 
                    _this.timeOut = 60
                    clearInterval(timerInterval)
                    _this.isPhoneDisable = false
                    _this.obtainColor = 'color:#1478F0;cursor:auto'
                  }
                },1000)
              }else{
                _this.tipsFlag = true;                            
                _this.tips = response.data.message
                _this.isPhoneDisable = false
                _this.changeImg()
              }
            })
          }
        }
    },
    //注册验证
    phoneReg:function(event){
      if (!this.phonereg.test(this.phone)) {
          this.tipsFlag = true;                                    
          this.tips = '请输入正确手机号'
        } else{
            if(this.phoneValidate == null || this.phoneValidate == ''){
                this.tipsFlag = true; 
                this.tips = '请输入短信验证码'
              }else if(!this.passwordreg.test(this.password)){
                this.tipsFlag = true;
                this.tips ='请输入6位以上非空格密码'
              }else{
                this.isLoginDisable = true;
                axios({
                  url:'/RegisterByMobile',//接口
                  method:'post',//发送方式 
                  data:{  
                    mobile:this.Acode + '|' + this.phone,//手机号
                    password:md5(this.password),//md5加密密码
                    confirmCode:this.phoneValidate//手机验证码
                  }
                }).then(function (response){  //成功回调
                  console.log(response)
                  this.tipsFlag = false; 
                  if(response.data.code == 0){
                    this.$router.push({path:'passwordLogin'})
                  }else if(response.data.code == 27){
                    this.tipsFlag = true;                     
                    this.tips = response.data.message
                    var timer = setTimeout(()=>{
                      clearTimeout(timer)
                      this.$router.push({path:'passwordLogin'})
                    },2000)
                  }else{
                    this.phoneValidate = null
                    this.isLoginDisable = false
                    this.tipsFlag = true;                     
                    this.tips = response.data.message
                  }
                }.bind(this))
              }
        }
    }
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
      this.changeImg()
  }
}
</script>

<style>
.register p{font-size: 14px;color: #a9a9a9;margin: 0;margin-top: 12px;text-align: left}
.register header{
  width: 375px;
  text-align: center;
  margin-bottom: 101px
}
.register a:visited{
  color:#1478F0;
}
.register header .off{
  margin:9px auto;
  font:700 18px/28px '';
  color: #000;
  }
.register header img{width: 200px;height: 37px;}
.register main{margin-top: 48px;margin-bottom:24px;position: relative}
.register main .code{position: relative;height:58px;}
.register main .Acode{
  float: left;
  position: absolute;
  top: 0px;
  left: -5px;
  margin-top: 2px 
}
.register main .jt{
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
.register main select{
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
.register main .txt{
  outline: none;
  border:0;
  border-radius : 0;
  height: 32px;
  width: 275px;
  font-size: 20px;
  padding: 2px;
  border-bottom: 1pt solid #EAEAEA;
  color: #2c3e50;
}
.register main .txt::-webkit-input-placeholder{
  color:#999999;
}
.register main .el-input .el-input__inner{
  border:none;
  padding:0;
  color: #2c3e50;
  border-bottom: 1pt solid #EAEAEA;
  height:35px;
}
.register main .el-input__inner::-webkit-input-placeholder{
  color:#999999;
}
.register main .tel{
  text-indent: 60px;
  padding-top: 5px
}
.register main .txt-l{
  width: 268px;
  float: left;
  }
.register main .img{
  width: 101px;
  height: 34px;
  float: right;
  cursor: pointer;
  position: absolute;
  right: 44px;
  top: 0;
  }

.register main .btn{
  border:0;
  background: #1478F0;
  width: 275px;
  height: 40px;
  text-align:center;
  font: 18px/40px '';
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  line-height: 19px
}
.register main .pst{
  position:relative;
  height:58px;
}
.register .tips{
  padding:10px 3px;  
  margin:0 auto;
  min-height:15px;
  background:rgba(0,0,0,.5);
  width:156px;
  color:#fff;
  border-radius:4px;
  font-size:14px;
  position:absolute;
  top:470px;
  left:0;
  right:0;
  word-wrap:break-word;
}
.register main .pst .obtain{
  border: none;
  font-size: 20px;
  position: absolute;
  right: 44px;
  top: 0;
  color: #1478F0;
  background-color: #fff;
  outline: none;
  cursor: pointer;
  height: 28px;
  border-left: 1pt solid #EAEAEA}
</style>

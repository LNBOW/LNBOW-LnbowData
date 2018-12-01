<template>
<div class="passwordLogin" id="app">
        <!-- 头部 -->
        <header class="margin">
          <div class="off">
            <a href="javascript:history.back()"><img style="width:10px;height:18px;float:left;margin-left:15px;;margin-top:5px" src="../assets/img/general_back_icon.png" alt=""></a>
            登录
          </div>
        </header>
        <!-- 中部 -->
        <main class="margin">
            <div>
                <!-- 步长-26px -->
                <div class="bp" >
                </div>
                <!-- 中英文下拉框 -->
                  <select style="width:37px;height:28px:color:#1478f0;position:absolutr;top:9px;left:51px;opacity:0;" @change="selectData">
                    <option :style = display v-for="item in Countrys" v-bind:key="item.id" v-on:click="none(item.id)" >
                      <i>{{item.Acode}}</i>
                      <i>{{item.name}}</i>
                    </option>
                  </select>
                <div class="code">
                    <input type="tel" class="tel txt" v-model="phone" placeholder="手机号"/>
                    <div class="jt" @click="selet" >
                      <span class="Acode" style="color:#1478F0;">{{Acode}}</span>
                    </div>
                </div>
            </div>
            <div class="pst">
                <input type="text" class="txt" v-model="password" placeholder="密码">
                <button class="obtain" :style="obtainColor" v-on:click="forgetPassword">{{validateMsg}}</button>
            </div>
            <el-row class="btns">
              <el-button class="btn" v-on:click="passwordLogin" :disabled = 'isLoginDisable' type="primary">{{Sign}}</el-button>
            </el-row>
        </main>
        <!-- 尾部 -->
        <footer>
            <p class="psw"><router-link to='register'>注册新账号</router-link></p>
        </footer>
    </div>
</template>

<script>
import axios from 'axios'
import { setTimeout } from 'timers';
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
  name: 'login',
  props:{
    callback:String
  },
  data () {
    return {
      setLgCs:true,
      a:true,
      obtainColor:'color:#1478F0;cursor:pointer',
      setLgENs:false,
      phone:null, //手机号
      password:null,  //密码
      timeOut:60, //倒计时
      validateMsg:'忘记密码?',
      myreg:/^[1][3,4,5,7,8][0-9]{9}$/,
      isPhoneDisable:false,
      isLoginDisable:false,
      tips:'',
      flag:false,
      active:'active',
      activenone:'',
      Phone:'手机号',
      Sign:'登录',
      Language:true,
      display:'display:block',
      Languages:[
        {id:0,name:'中文'},
        {id:1,name:'English'},
      ],
      Countrys:[],
      CCountrys:countrys,
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
      this.Acode = this.CCountrys[ele.target.selectedIndex].Acode;
      this.background='background-position:3px '+ (5 - ele.target.selectedIndex * 26) +'px';  
    },
    selet:function(ele){   
      this.flag = !this.flag
      this.a = !this.a
    },
    none:function(ele){
      this.Acode = this.CCountrys[ele].Acode;
      // this.background='background-position:3px '+ (5 - a* 26) +'px';  
      this.flag = false;
      this.a = true
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
    // 忘记密码
     forgetPassword:function(){
       this.$router.push({path:'applyReset'})
    },
    //登陆验证
    passwordLogin:function(event){
      if (!this.myreg.test(this.phone)) {
          this.tips = this.Language?'请输入正确手机号':'The cell phone number you entered is incorrect.'
        } else{
            if(this.validate == null || this.validate == ''){
                this.tips = this.Language?'请输入验证码': 'Please input verification code.'
              }else if(this.phoneValidate == null || this.phoneValidate == ''){
                this.tips = this.Language?'请输入短信验证码': 'Please enter SMS verification code.'
              }else{
                this.isLoginDisable = true;
                axios({
                  url:'/api/passport/Login',//接口
                  method:'post',//发送方式 
                  data:{  
                    mobile:this.Acode + '|' + this.phone,//手机号
                    confirmCode:this.phoneValidate//手机验证码
                  }
                }).then(function (response){  //成功回调
                  if(response.data.code == 0){
                    //设置cookie
                  this.setCookie('mobile',response.data.data.mobile,15,"/","tigerobo.com")  
                  this.setCookie('token',response.data.data.token,15,"/","tigerobo.com")
                  this.setCookie('userId',response.data.data.userId,15,"/","tigerobo.com")

                  //设置localstorage
                  window.localStorage.setItem('mobile',response.data.data.mobile);
                  window.localStorage.setItem('token',response.data.data.token);
                  window.localStorage.setItem('userId',response.data.data.userId);
                  window.location.href = this.callback? this.callback : 'http://www.tigerobo.com';//跳转callbackurl
                  }else if(response.data.code != 0){
                    this.phoneValidate = null
                    this.isLoginDisable = false
                    if(this.Language){
                      this.tips = response.data.message
                    }else{
                      switch(response.data.code){
                        case 12:this.tips = "The error of the SMS verification code you entered";break;
                        case 14:this.tips = "Please do not send SMS verification code repeatedly.";break;
                        case 15:this.tips = "Message Server Error,please retry it later.";break;
                        case 17:this.tips = "You mobile number is not right, please have a check.";break;
                        case 19:this.tips = "Your verification code has been more than 3 times wrong, please retry it in 15 minutes.";break;
                      }
                    }
                  }
                }.bind(this))
              }
        }
    }
  },
  mounted() {
      let _this = this
      // this.changeImg()
      this.Countrys = this.CCountrys
      let jt = document.querySelector('.jt')
      jt.onclick =  function(e){
        e.stopPropagation()
      }
      window.onclick = function(){
        _this.flag = false
        _this.a = true
      }
  }
}
</script>

<style>
.passwordLogin header{width: 375px;}
.passwordLogin p{font-size: 14px;color: #a9a9a9;margin: 0;margin-top: 12px;text-align: left}
.passwordLogin header{
  text-align: center;
  margin-bottom: 150px
}
.passwordLogin header .off{margin:12px 0}
.passwordLogin header img{width: 200px;height: 37px;}
.passwordLogin header .off{
  margin:9px auto;
  font:700 18px/28px '';
  color: #000;
  }
.passwordLogin main{margin-top: 48px;margin-bottom:24px;position: relative}
.passwordLogin main .bp{width: 21px;height: 22px;overflow: hidden;position: absolute;top: -5px;left: 67px;}
.passwordLogin main .bp div{float: left;width: 21px;height: 22px;background: url(../assets/img/countrys.png) no-repeat;}
.passwordLogin main .code{position: relative;}
.passwordLogin main .Acode{
  float: left;
  position: absolute;
  top: 0px;
  left: 0px;
  margin-top: 2px 
}
.passwordLogin main .jt{
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
.passwordLogin main select{
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
.passwordLogin main option{
  text-align: center;
}
.passwordLogin main .txt{
  outline: none;
  border-top:0;
  border-left:0;
  border-right: 0;
  height: 32px;
  width: 275px;
  font-size: 20px;
  padding: 2px;
  border-bottom: 1pt solid #EAEAEA;
  lor: #2c3e50;}
.passwordLogin main .tel{text-indent: 60px;padding-top: 5px}
.passwordLogin main .btn{
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
.passwordLogin main .pst{
  position: relative;
  margin-top: -12px
}
.passwordLogin main .tips{
  padding: 0;
  margin: 0;
  color: red;
  height: 18px;
}
.passwordLogin main .pst .obtain{
  border: none;
  font-size: 15px;
  position: absolute;
  right: 44px;
  top: 0;
  color: #1478F0;
  background-color: #fff;
  outline: none;
  cursor: pointer;
  height: 28px;
}
.passwordLogin footer{
  margin: -20px 50px 0 50px;
  text-align: center;
  margin-top: -12px;
}
.passwordLogin footer p{
  color: #1478F0;
  text-align: center;
}
</style>

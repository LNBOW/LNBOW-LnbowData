<template>
<div class="validateLogin" id="app">
        <!-- 头部 -->
        <header class="margin">
          <div class="off">
            <img style="width:10px;height:18px;float:left;margin-left:15px;;margin-top:5px" src="../assets/img/general_back_icon.png" alt="">
            找回密码
          </div>
        </header>
        <!-- 中部 -->
        <main class="margin">
            <div class="pst">
                <input type="text" class="txt" v-model="phoneValidate" placeholder="输入验证码">
                <button class="obtain" :style="obtainColor" v-on:click="getPhoneValidate" :disabled = 'isPhoneDisable'>{{validateMsg}}</button>
            </div>
            <div>
                <el-input class="txt" placeholder="输入密码" v-model="password" clearable></el-input>
            </div>
            <el-row class="btns">
              <el-button class="btn" v-on:click="phonelogin" :disabled = 'isLoginDisable' type="primary">确认</el-button>
            </el-row>
        </main>
    </div>
</template>

<script>
import axios from 'axios'
import { setTimeout } from 'timers';
axios.defaults.withCredentials=true;
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
      phoneValidate:null, //手机验证码
      timeOut:60, //倒计时
      validateMsg:"获取验证码",
      myreg:/^[1][3,4,5,7,8][0-9]{9}$/,
      isPhoneDisable:false,
      isLoginDisable:false,
      tips:'',
      flag:false,
      active:'active',
      activenone:'',
      Language:true,
      password:null,
      display:'display:block',
      Languages:[
        {id:0,name:'中文'},
        {id:1,name:'English'},
      ],
      position:''
    }
  },
  computed:{
   
  },
  methods:{
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
    // 获取手机验证码
     getPhoneValidate:function(event){
       let _this = this
        if (!_this.myreg.test(_this.phone)) {
          _this.tips = _this.Language?'您输入的手机号有误': 'The cell phone number you entered is incorrect.'
        }else{
            _this.isPhoneDisable = true
            _this.obtainColor = 'color:#4398FF;cursor:auto'
            axios({
              url:'/api/SendConfirmationCode',//接口
              method:'post',//发送方式
              data:{
                mobile:_this.Acode + '|' + _this.phone,//手机号
              }
            }).then(function (response){  //成功回调
              if(response.data.code == 0){
                let timerInterval = setInterval(()=>{//发送短信验证码倒计时点击失效
                  _this.timeOut--
                  _this.validateMsg = _this.Language?  parseInt(_this.timeOut) + 's之后重发': "Reissued after " + parseInt(_this.timeOut) + ' s'
                  if(_this.timeOut <= 0){
                    _this.validateMsg = _this.Language? '获取验证码' : "Get verification code"
                    _this.timeOut = 60
                    clearInterval(timerInterval)
                    _this.isPhoneDisable = false
                    _this.obtainColor = 'color:#1478F0;cursor:auto'
                  }
                },1000)
              }else{
                _this.tips = _this.Language?response.data.message:"The image verification code you entered is wrong."
                _this.isPhoneDisable = false
                // _this.changeImg()
              }
            })
          }
    },
    //登陆验证
    phonelogin:function(event){
      if (!this.myreg.test(this.phone)) {
          this.tips = this.Language?'请输入正确手机号':'The cell phone number you entered is incorrect.'
        } else{
            if(this.phoneValidate == null || this.phoneValidate == ''){
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

  }
}
</script>

<style>
.validateLogin p{font-size: 14px;color: #a9a9a9;margin: 0;margin-top: 12px;text-align: left}
.validateLogin header{
  width: 375px;
  text-align: center;
  margin-bottom: 150px
}
.validateLogin header .off{
  margin:9px auto;
  font:700 18px/28px '';
  color: #000;
  }
.validateLogin header img{width: 200px;height: 37px;}
.validateLogin main{margin-top: 48px;margin-bottom:24px;position: relative}
.validateLogin main .code{
  position: relative;
  height:60px;
  }
.validateLogin main .Acode{
  float: left;
  position: absolute;
  top: 0px;
  left: -5px;
  margin-top: 2px 
}
.validateLogin main .txt{
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
.validateLogin main .txt::-webkit-input-placeholder{
  color:#999999;
}
.validateLogin main .el-input .el-input__inner{
  border:none;
  padding:0;
  color: #2c3e50;
  height:35px;
}
.validateLogin main .el-input__inner::-webkit-input-placeholder{
  color:#999999;
}
.validateLogin main .btn{
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
.validateLogin main .pst{
  position: relative;
  margin-bottom:20px;
}
.validateLogin main .tips{
  padding: 0;
  margin: 0;
  color: red;
  height: 18px;
}
.validateLogin main .pst .obtain{
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
  border-left: 1pt solid #EAEAEA
  }
</style>

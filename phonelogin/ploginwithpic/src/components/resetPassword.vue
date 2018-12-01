<template>
<div class="resetPassword" id="app">
        <!-- 头部 -->
        <header class="margin">
          <div class="off">
            <a href="javascript:history.back()"><img style="width:10px;height:18px;float:left;margin-left:15px;;margin-top:5px" src="../assets/img/general_back_icon.png" alt=""></a>
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
                <el-input type = "password" class="txt" placeholder="输入密码" v-model="password" clearable></el-input>
            </div>
            <el-row class="btns">
              <el-button class="btn" v-on:click="phonelogin" :disabled = 'isLoginDisable' type="primary">确认</el-button>
            </el-row>
        </main>
        <div class = 'tips' v-show="tipsFlag">{{tips}}</div>
    </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials=true;
import md5 from 'js-md5'
export default {
  name: 'resetPassword',
  props:{
    callback:String
  },
  data () {
    return {
      obtainColor:'color:#1478F0;cursor:pointer',
      phone:null, //手机号
      phoneValidate:null, //手机验证码
      timeOut:60, //倒计时
      validateMsg:"获取验证码",
      phonereg:/^[1][3,4,5,7,8][0-9]{9}$/,
      passwordreg:/^\S{6,}$/,
      isPhoneDisable:false,
      isLoginDisable:false,
      tips:'',
      tipsFlag:false,
      flag:false,
      password:null,
      display:'display:block',
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
      this.isPhoneDisable = true
      this.obtainColor = 'color:#4398FF;cursor:auto'
      axios({
        url:'/SendConfirmationCode',//接口
        method:'post',//发送方式
        data:{
          mobile:_this.phone,//手机号
        }
      }).then(function (response){  //成功回调
        if(response.data.code == 0){
          _this.obtainColor = 'color:#aaa;cursor:auto'
          let timerInterval = setInterval(()=>{//发送短信验证码倒计时点击失效
            _this.timeOut--
            _this.validateMsg = parseInt(_this.timeOut) + 's之后重发'
            if(_this.timeOut <= 0){
              _this.validateMsg =  '获取验证码'
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
          // _this.changeImg()
        }
      })
    },
    //登陆验证
    phonelogin:function(event){
      if(this.phoneValidate == null || this.phoneValidate == ''){
          this.tipsFlag = true;
          this.tips = '请输入短信验证码'
        }else if (!this.passwordreg.test(this.password)) {
          this.tipsFlag = true;                                    
          this.tips = '请输入6位以上非空格密码'
        } else{
          this.isLoginDisable = true;
          axios({
            url:'/ResetPassword',//接口
            method:'post',//发送方式 
            data:{  
              account:this.phone,//手机号
              confirmCode:this.phoneValidate,//手机验证码
              password:md5(this.password),//md5加密密码
            }
          }).then(function (response){  //成功回调
            if(response.data.code == 0){
              this.$router.push({path:'passwordLogin'})
            }else if(response.data.code != 0){
              this.phoneValidate = null
              this.isLoginDisable = false
              this.tipsFlag = true;
              this.tips = response.data.message
            }
          }.bind(this))
        }
    }
  },
  mounted() {
    this.phone = window.sessionStorage.getItem('mobile');
  }
}
</script>

<style>
.resetPassword p{font-size: 14px;color: #a9a9a9;margin: 0;margin-top: 12px;text-align: left}
.resetPassword header{
  width: 375px;
  text-align: center;
  margin-bottom: 101px
}
.resetPassword header .off{
  margin:9px auto;
  font:700 18px/28px '';
  color: #000;
  }
.resetPassword header img{width: 200px;height: 37px;}
.resetPassword main{margin-top: 48px;margin-bottom:24px;position: relative}
.resetPassword main .code{
  position: relative;
  height:60px;
  }
.resetPassword main .Acode{
  float: left;
  position: absolute;
  top: 0px;
  left: -5px;
  margin-top: 2px 
}
.resetPassword main .txt{
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
.resetPassword main .txt::-webkit-input-placeholder{
  color:#999999;
}
.resetPassword main .el-input .el-input__inner{
  border:none;
  padding:0;
  color: #2c3e50;
  height:35px;
}
.resetPassword main .el-input__inner::-webkit-input-placeholder{
  color:#999999;
}
.resetPassword main .btn{
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
.resetPassword main .pst{
  position: relative;
  margin-bottom:20px;
}
.resetPassword main .tips{
  padding: 0;
  margin: 0;
  color: red;
  height: 18px;
}
.resetPassword main .pst .obtain{
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
.resetPassword .tips{
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

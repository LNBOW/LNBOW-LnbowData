<template>
<div class="setpassword" id="app">
        <!-- 头部 -->
        <header class="margin">
          <div class="off">
            <a href="javascript:history.back()"><img style="width:10px;height:18px;float:left;margin-left:15px;;margin-top:5px" src="../assets/img/general_back_icon.png" alt=""></a>
            设置密码
          </div>
        </header>
        <!-- 中部 -->
        <main class="margin">
            <div>
                <el-input type="password" class="txt" placeholder="输入密码" v-model="password" clearable></el-input>
            </div>
            <el-row class="btns">
              <el-button class="btn" v-on:click="setPassword" :disabled = 'isLoginDisable' type="primary">确认</el-button>
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
  name: 'setpassword',
  props:{
    callback:String
  },
  data () {
    return {
      obtainColor:'color:#1478F0;cursor:pointer',
      phone:null, //手机号
      validate:null,  //图片验证码
      phoneValidate:null, //手机验证码
      phonereg:/^[1][3,4,5,7,8][0-9]{9}$/,
      passwordreg:/^\S{6,}$/,
      isPhoneDisable:false,
      isLoginDisable:false,
      tips:'',
      flag:false,
      tipsFlag:false,
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
      //设置密码
    setPassword:function(){
      if (!this.passwordreg.test(this.password)) {
          this.tipsFlag = true;                                    
          this.tips = '请输入6位以上非空格密码'
        } else{
            this.isLoginDisable = true;
            axios({
              url:'/SetMobilePassword',//接口
              method:'post',//发送方式 
              data:{  
                mobile:this.phone,//手机号
                password:md5(this.password),//md5加密密码
              }
            }).then(function (response){  //成功回调
              this.tipsFlag = false; 
              if(response.data.code == 0){
                //设置cookie
              this.setCookie('token',response.data.data.token,15,"/","tigerobo.com")

              //设置localstorage
              window.localStorage.setItem('token',response.data.data.token);
              window.location.href = this.callback? this.callback : 'http://www.tigerobo.com';//跳转callbackurl
              }else{
                this.phoneValidate = null
                this.isLoginDisable = false
                this.tipsFlag = true;                     
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
.setpassword p{font-size: 14px;color: #a9a9a9;margin: 0;margin-top: 12px;text-align: left}
.setpassword header{
  width: 375px;
  text-align: center;
  margin-bottom: 101px
}
.setpassword header .off{
  margin:9px auto;
  font:700 18px/28px '';
  color: #000;
  }
.setpassword header img{width: 200px;height: 37px;}
.setpassword main{margin-top: 48px;margin-bottom:24px;position: relative}

.setpassword main .txt{
  outline: none;
  border-top:0;
  border-left:0;
  border-right: 0;
  height: 32px;
  width: 275px;
  font-size: 20px;
  padding: 2px;
  color: #2c3e50;
}
.setpassword main .txt::-webkit-input-placeholder{
  color:#999999;
}
.setpassword main .el-input .el-input__inner{
  border:none;
  padding:0;
  color: #2c3e50;
  border-bottom: 1pt solid #EAEAEA;
  height:35px;
}
.setpassword main .el-input__inner::-webkit-input-placeholder{
  color:#999999;
}

.setpassword main .btn{
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
.setpassword main .pst{
  position: relative;
  margin-bottom:20px;
}
.setpassword main .pst .obtain{
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
.setpassword footer{
  display: flex;
  justify-content: space-between;
  margin-top: -20px;
  margin: -20px 50px 0 50px
}
.setpassword .tips{
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

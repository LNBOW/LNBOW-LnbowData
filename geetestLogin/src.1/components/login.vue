<template>
    <div id="app">
      <p>手机号</p>
      <div class="code">
        <input type="tel" class="tel txt" v-model="phone"/>
      </div>      
      <div id="captcha">
          <p id="wait" class="show" v-if="show">正在加载验证码......</p>
      </div>
      <div class="pst">
          <p>短信</p>
          <input type="text" class="txt" v-model="phoneValidate">
          <button class="obtain" v-on:click="getPhoneValidate" :disabled = 'isPhoneDisable'>获取短信验证码</button>
      </div>
      <button class="btn" v-on:click="phonelogin" :disabled = 'isLoginDisable'>
                登录
      </button>
    </div>
</template>

<script>
import axios from 'axios'
import gtInit from '../assets/gt.js'
export default {
  name: 'app',
  data () {
    return {
      phone:null,
      phoneValidate:null,
      isPhoneDisable:false,
      isLoginDisable:false,
      show:true,
      geetest_challenge: '',
      geetest_validate: '',
      geetest_seccode: ''
    }
  },
  created () {
    this.initGtCaptcha()
  },
  methods: {
    initGtCaptcha:function() {
      var _this = this
      axios({
        url:'/api/passport/GetCaptcha',
        methods:"get",
        params:{

        }
      }).then((res)=>{
          const data = JSON.parse(res.data);
          window.initGeetest({
              // 以下 4 个配置参数为必须，不能缺少
              gt: data.gt,
              challenge: data.challenge,
              offline: !data.success, // 表示用户后台检测极验服务器是否宕机
              new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机

              product: "embeb", // 产品形式，包括：float，popup
              width: "260px"
          }, function (captchaObj) {
              console.log(captchaObj)
            captchaObj.appendTo('#captcha');
            captchaObj.onReady(function () {
                _this.show = false
            });
            captchaObj.onSuccess(function(){
              var result = captchaObj.getValidate();
              console.log(result)
              if (!result) {
                  return alert('请完成验证');
              }
              _this.geetest_challenge= result.geetest_challenge;
              _this.geetest_validate= result.geetest_validate;
              _this.geetest_seccode= result.geetest_seccode
            })
            captchaObj.onError(function(){
              alert("错误，请稍后再试")
            })
          });
        })
    },
    getPhoneValidate:function(event){
       let _this = this
      axios({
        url:"/api/passport/SendConfirmationCodeWithGeetest",
        methods:"POST",
        data:{
          mobile:_this.phone,
          challenge:_this.geetest_challenge,
          validate:_this.geetest_validate,
          seccode:_this.geetest_seccode
        }
      }).then(function(response){
        console.log(response)
      })
    },
    phonelogin:function(event){
      let _this = this
      axios({
        url:'/api/passport/Login',//接口
        method:'post',//发送方式 
        data:{  
          mobile:_this.phone,//手机号
          confirmCode:_this.phoneValidate//手机验证码
        }
      }).then(function(response){
        console.log(response)
      })
    }
  }
}
</script>
<style>
#captcha {
            width: 300px;
            display: inline-block;
        }
#wait {
            height: 42px;	
            width: 298px;	
            text-align: center;
            border-radius: 2px;	
            background-color: #F3F3F3;
        }
</style>



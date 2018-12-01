<template>
<div class="geetestLogin" id="app">
        <!-- 头部 -->
        <header class="margin">
            <div class="off"></div>
            <a href="#"><img src="../assets/img/logo.png" alt=""></a>
        </header>
        <!-- 中部 -->
        <main class="margin">
            <div>
                <p>{{Phone}}</p>
                <!-- 步长-26px -->
                <div class="bp">
                <div :style = background></div>
                </div>
                <!-- 英文国家名 -->
                <select class="select" @change="selectData" v-if="flag">   
                    <option v-for="item in ECountrys" v-bind:key="item.id">{{item.name}}</option>   
                </select>
                <!-- 中文国家名 -->
                <select class="select" v-if="flags" @change="selectData">   
                    <option v-for="item in CCountrys" v-bind:key="item.id">{{item.name}}</option>   
                </select>
                <div class="code">
                    <input type="tel" class="tel txt" v-model="phone"/>
                    <span>{{Acode}}</span>
                </div>
            </div>
            <div id="captcha" class="pst">
              <p>{{geetest}}</p>
                <p id="wait" class="show" v-show="show">正在加载验证码......</p>
            </div>
            <div class="pst">
                <p>{{SMS}}</p>
                <input type="text" class="txt" v-model="phoneValidate">
                <button class="obtain" v-on:click="getPhoneValidate" :disabled = 'isPhoneDisable'>{{validateMsg}}</button>
            </div>
            <p class="tips">{{tips}}</p>
            <button class="btn" v-on:click="phonelogin" :disabled = 'isLoginDisable'>
                {{Sign}}
            </button>
        </main>
        <!-- 尾部 -->
        <footer class="margin">
            <p>{{Ifup}}</p>
            <!-- 切换语言 -->
            <div>
              Language：
              <select @change="setLg">
                <option v-for="items in Languages" v-bind:key="items.id">{{items.name}}</option>
              </select>
            </div>
        </footer>
    </div>
</template>

<script>
import axios from 'axios'
import gtInit from '../assets/gt.js'
axios.defaults.withCredentials=true;
export default {
  name: 'geetestLogin',
  props:{
    callback:String
  },
  data () {
    return {
      phone:null, //手机号
      phoneValidate:null, //手机验证码
      timeOut:60, //倒计时
      validateMsg:"获取验证码",
      myreg:/^[1][3,4,5,7,8][0-9]{9}$/,
      isPhoneDisable:false,
      isLoginDisable:false,
      tips:'',
      flag:false,
      flags:true,
      Phone:'手机号',
      SMS:'短信验证码',
      Sign:'登录',
      imgLogin:'图片验证登录',
      geeLogin:'极验验证登录',
      Ifup:'若未注册账号则直接注册登录',
      Language:true,
      show:true,
      geetest_challenge: '',
      geetest_validate: '',
      geetest_seccode: '',
      geetest:'完成验证',
      Languages:[
        {id:0,name:'中文'},
        {id:1,name:'English'},
      ],
      ECountrys:[
              {id:0,name:'China',Acode:'+86'},
              {id:1,name:'Hongkong',Acode:'+852'},
              {id:2,name:'Macao',Acode:'+853'},
              {id:3,name:'Taiwan',Acode:'+883'},
              {id:4,name:'U.S.A',Acode:'+1'},
              {id:5,name:'Canada',Acode:'+1'},
              {id:6,name:'Malaysia',Acode:'+60'},
              {id:7,name:'Australia',Acode:'+61'},
              {id:8,name:'Japan',Acode:'+81'},
              {id:9,name:'Korea',Acode:'+82'},
              {id:10,name:'Singapore',Acode:'+65'},
              {id:11,name:'India',Acode:'+91'},
              {id:12,name:'Thailand',Acode:'+66'},
              {id:13,name:'Germany',Acode:'+49'},
              {id:14,name:'Britain',Acode:'+44'},
              {id:15,name:'France',Acode:'+33'},
              {id:16,name:'Russia',Acode:'+7'},
              {id:17,name:'Brazil',Acode:'+55'},
              {id:18,name:'Indonesia',Acode:'+62'},
              {id:19,name:'Cambodia',Acode:'+855'},
              {id:20,name:'Myanmar',Acode:'+95'},
              {id:21,name:'Brunei',Acode:'+673'},
              {id:22,name:'Philippines',Acode:'+63'},
              {id:23,name:'Vietnam',Acode:'+84'},
              {id:24,name:'Laos',Acode:'+856'},
              {id:25,name:'Spain',Acode:'+34'},
              {id:26,name:'New Zealand',Acode:'+64'},
              {id:27,name:'Italy',Acode:'+39'},
              ],
      CCountrys:[
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
              ],
      Acode:'+86',
      speed:-21,
      background:'background-position:3px '+ 5 +'px',
    }
  },
  computed:{
   
  },
  created () {
    this.initGtCaptcha()
  },
  mounted() {
    // this.callback = this.$route.query.callbackurl;
    // if(this.getCookie("token")){//判断token是否存在
    //   window.location.href = this.callback? 'https://' +  this.callback : 'http://www.tigerobo.com';//跳转callbackurl
    // }
  },
  methods:{
    //区号和国旗切换
     selectData:function(ele){
      this.Acode = this.CCountrys[ele.target.selectedIndex].Acode;
      this.background='background-position:3px '+ (5 - ele.target.selectedIndex * 26) +'px';    
    },
    // 中文英文切换
    setLg:function(ele){
      this.tips = null
      if(this.Languages[ele.target.selectedIndex].id==0){
        this.Phone = '手机号'
        this.SMS = '短信验证码'
        this.Sign = '登录'
        this.Ifup = '若未注册账号则直接注册登录'
        this.geetest = "完成验证"
        this.Language = true
        this.imgLogin='图片验证登录'
        this.geeLogin='极验验证登录'
        this.changeCode()
        this.flag = false
        this.flags = true
        document.querySelector(".geetest_radar_tip_content").innerHTML = "点击按钮完成验证"
        document.querySelector(".geetest_success_radar_tip_content").innerHTML = "验证成功"
      }else if(this.Languages[ele.target.selectedIndex].id==1){
        this.Phone = 'Phone'
        this.SMS = 'SMS verification code'
        this.Sign = 'Sign up'
        this.Ifup = 'Automatic registration for unregisterd account log-in'
        this.geetest = "complete validation"
        this.Language = false
        this.imgLogin='Login with picture'
        this.geeLogin='Login with geetest'
        this.changeCode()
        this.flag = true
        this.flags = false
        document.querySelector(".geetest_radar_tip_content").innerHTML = "click the button to complete validation"
        document.querySelector(".geetest_success_radar_tip_content").innerHTML = "validation is successful"
      }
    },
    //获取极验验证并检测是否验证
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
              width: "372px"
          }, function (captchaObj) {
            captchaObj.appendTo('#captcha');
            captchaObj.onReady(function () {
              _this.show = false
            });
            captchaObj.onSuccess(function(){
            document.querySelector(".geetest_success_radar_tip_content").innerHTML = _this.Language?'验证成功':'validation is successful'        
              var result = captchaObj.getValidate();
              if (!result) {
                _this.tips = _this.Language?'请完成验证':'Please complete validation.'
              }
              _this.geetest_challenge= result.geetest_challenge;
              _this.geetest_validate= result.geetest_validate;
              _this.geetest_seccode= result.geetest_seccode
            })
            captchaObj.onError(function(){
                _this.tips = _this.Language?'错误，请稍后再试':'Wrong, please try again later.'
            })
          });
        })
    },
    //验证码中英文切换
    changeCode(){
         this.validateMsg = this.Language?'获取验证码':'Get verification code'
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
    // 获取手机验证码
     getPhoneValidate:function(event){
       let _this = this
        if (!_this.myreg.test(_this.phone)) {
          _this.tips = _this.Language?'您输入的手机号有误': 'The cell phone number you entered is incorrect.'
        } else {
            _this.isPhoneDisable = true
           axios({
              url:"/api/SendConfirmationCodeWithGeetest",
              method:"post",
              data:{
                mobile:_this.phone,
                challenge:_this.geetest_challenge,
                validate:_this.geetest_validate,
                seccode:_this.geetest_seccode
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
                  }
                },1000)
              }else{
                _this.tips = _this.Language?response.data.message:"The image verification code you entered is wrong."
                _this.isPhoneDisable = false
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
                    mobile:this.phone,//手机号
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
      // if(this.getCookie("token")){//判断token是否存在
      //   window.location.href = this.callback? 'https://' +  this.callback : 'http://www.tigerobo.com';//跳转callbackurl
      // }
  }
 
}
</script>

<style>

</style>

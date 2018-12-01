<template>
<div class="login" id="app">
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
            <div>
                <div>
                    <p>{{Vftcode}}</p>
                    <input type="text" class="txt txt-l" v-model="validate">
                </div>
                <div  class="img">
                    <img class="update" :src="img" v-on:click="changeImg" >
                </div>
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
axios.defaults.withCredentials=true;
export default {
  name: 'app',
  data () {
    return {
      img:'', //随机码码获取图片
      phone:null, //手机号
      validate:null,  //图片验证码
      phoneValidate:null, //手机验证码
      randomNumber:Math.floor(Math.random() * 1000000), //6位随机数
      timeOut:60, //倒计时
      validateMsg:"获取验证码",
      callback:'',//跳转的页面url
      myreg:/^[1][3,4,5,7,8][0-9]{9}$/,
      isPhoneDisable:false,
      isLoginDisable:false,
      tips:'',
      flag:false,
      flags:true,
      Phone:'手机号',
      Vftcode:'验证码',
      SMS:'短信验证码',
      Sign:'登录',
      Ifup:'若未注册账号则直接注册登录',
      Language:true,
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
        this.Phone = '手机号',
        this.Vftcode = '验证码',
        this.SMS = '短信验证码',
        this.Sign = '登录',
        this.Ifup = '若未注册账号则直接注册登录'
        this.Language = true,
        this.changeCode()
        this.flag = false
        this.flags = true
      }else if(this.Languages[ele.target.selectedIndex].id==1){
        this.Phone = 'Phone',
        this.Vftcode = 'Verification Code',
        this.SMS = 'SMS verification code',
        this.Sign = 'Sign up',
        this.Ifup = 'Automatic registration for unregisterd account log-in'
        this.Language = false,
        this.changeCode()
        this.flag = true
        this.flags = false
      }
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
    changeImg:function(){
      this.randomNumber = Math.floor(Math.random() * 1000000);
      this.img = "https://nujump.tigerobo.com/VCI/VC.ashx?uid="+ this.randomNumber;
      this.validate = null
    },
    // 获取手机验证码
     getPhoneValidate:function(event){
       let _this = this
        if (!_this.myreg.test(_this.phone)) {
          _this.tips = _this.Language?'您输入的手机号有误': 'The cell phone number you entered is incorrect.'
        } else {
          if(_this.validate == null || _this.validate == ''){
            _this.tips = _this.Language?'请输入验证码': 'Please input verification code.'
          }else{
            _this.isPhoneDisable = true
            axios({
              url:'/api/SendConfirmationCode',//接口
              method:'post',//发送方式
              data:{
                mobile:_this.Acode + '|' + _this.phone,//手机号
                code:_this.validate,//图片验证码
                identityCode:_this.randomNumber//随机数
              }
            }).then(function (response){  //成功回调
              if(response.data.code == 0){
                let timerInterval = setInterval(()=>{//发送短信验证码倒计时点击失效
                  _this.timeOut--
                  _this.validateMsg = parseInt(_this.timeOut) + 's之后重发' 
                  if(_this.timeOut <= 0){
                    _this.validateMsg = '获取验证码'
                    _this.timeOut = 60
                    clearInterval(timerInterval)
                    _this.isPhoneDisable = false
                  }
                },1000)
              }else{
                _this.tips = _this.Language?response.data.message:"The image verification code you entered is wrong."
                _this.isPhoneDisable = false
                _this.changeImg()
              }
            })
          }
        }
    },
    //登陆验证
    phonelogin:function(event){
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
                  window.location.href = this.callback? 'https://' +  this.callback : 'http://www.tigerobo.com';//跳转callbackurl

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
      this.changeImg()
      this.callback = this.$route.query.callbackurl;
      this.setCookie('userId',"response.data.data.userId",15,"/","tigerobo.com")
      // if(this.getCookie("token")){//判断token是否存在
      //   window.location.href = this.callback? 'https://' +  this.callback : 'http://www.tigerobo.com';//跳转callbackurl
      // }
  }
}
</script>

<style>
body{width: 375px;margin: 0 auto;}
/* *{box-sizing:border-box;} */
.login{margin: 0 2px 0 3px}
li,a{list-style-type:none;text-decoration: none}
.margin{width: 375px;}
p{font-size: 14px;color: #a9a9a9;margin: 0;margin-top: 12px;text-align: left}
header{text-align: center}
header .off{margin:12px 0}
header img{width: 200px;height: 37px;}
main{margin-top: 48px;margin-bottom:24px;position: relative}
main .bp{width: 21px;height: 22px;overflow: hidden;position: absolute;top: -8px;left: 67px;border: 1px solid #aaaaaa;}
main .bp div{float: left;width: 21px;height: 22px;background: url(../assets/img/countrys.png) no-repeat;}
main .code{position: relative;}
main span{float: left;position: absolute;top: 8px;left: 0;}
main select{height: 24px;position: absolute;top: -8px;left: 90px;outline: none; }
main div{height: 62px;}
main .txt{outline: none;border-top:0;border-left:0;border-right: 0;height: 24px;width: 372px;font-size: 16px;padding: 2px;color: #2c3e50;}
main .tel{text-indent: 65px;padding-top: 5px}
main .txt-l{width: 268px;float: left;}
main .img{width: 101px;height: 34px;float: right;margin-top: -53px;cursor: pointer}
main .btn{border:0;background: #1478F0;width: 372px;height: 52px;text-align:center;font: 18px/52px '';color: #fff;border-radius: 5px;margin-top:24px;cursor: pointer;line-height: 52px}
main .pst{position: relative;}
main .tips{padding: 0;margin: 0;color: red;height: 18px;}
main .pst .obtain{border: none;font-size: 14px;position: absolute;right: 0;bottom: 21px;color: #1478F0;background-color: #fff;outline: none;cursor: pointer;}
footer{text-align:center;position: relative;}
footer p{font-size: 13px;text-align: center}
footer div{position: absolute;top: 100px;right: 0;}
footer select{height: 26px;font:  14px/26px ''}
</style>

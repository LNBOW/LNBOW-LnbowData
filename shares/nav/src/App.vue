<template>
  <div id="app">
    <div class = "header">
      <div class = "menu" v-on:click = 'shownav()'>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <span>{{title}}</span>
      <div class = "aside" v-show = "flag">
        <div class="left">
          <img class = "head" src="./assets/img/head.png"/>
          <ul>
            <li><router-link to = "/hangqing"><img src="./assets/img/hb_tangu_icon.png">财神行情</router-link></li>
            <li><router-link to = "/star"><img src="./assets/img/hb_hangqing_icon.png">我的自选</router-link></li>
            <li><router-link to = "/tangu"><img src="./assets/img/hb_star_icon.png">财神探股</router-link></li>
          </ul>
        </div>
        <p></p>
      </div>
    </div>
    <router-view v-bind:title="title"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
   data () {
    return {
      title: '财神探股',
      flag : false,
    }
  },
  methods:{
    shownav:function(){
      this.flag = true;
      let _this = this
        let menu = document.querySelector('.menu')
        let Oside = document.querySelector(".aside")
        let Obody = document.querySelector("html")
        let Oheader = document.querySelector(".header")
        menu.onclick =  function(e){
          e.stopPropagation()
        }
        Oside.children[0].children[1].onclick = function(e){
          _this.title = e.target.innerText;
        }
        window.onclick = function(){
          _this.flag = false;
        }
        Oside.style.height = (Obody.scrollHeight - Oheader.offsetHeight) + "px"
        Oside.children[1].style.height = (Obody.scrollHeight - Oheader.offsetHeight) + "px"
    }
  },
  mounted(){
      if(this.$route.name == "Hangqing"){
        this.title = "财神行情"
      }else if(this.$route.name == "Tangu"){
        this.title = "财神探股"
      }else if(this.$route.name == "Star"){
        this.title = "我的自选"
      }
    }
    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,body{
  margin : 0;
  padding : 0;
  background: #fff;
}
.header{
  height : 42px;
  line-height : 42px;
  text-align : center;
  position : relative;
}
.header>span{
  font-weight : bold;
  font-family : "PingFangSC";
  font-size : 19px;
}
.header .menu{
  position : absolute;
  height : 20px;
  width : 20px;
  top : 11px;
  left : 15px;
}
.header .menu p{
  height : 2px;
  width : 20px;
  background : #000;
  margin : 0;
  margin-bottom : 7px;
}
.header .menu p:nth-of-type(2){
  width : 15px;
}
.header .aside{
  position : absolute;
  width : 100%;
  background: rgba(f,f,f,0);
  top : 41px;
  z-index : 2;
}
.header .aside .left{
  margin : 0;
  width : 40%;
  position : absolute;
  background: #fff;
  height: 100%;
  top : 0;
  left : 0;
}
.header .aside>p{
  margin : 0;
  height : 100%;
  width : 60%;
  position : absolute;
  top : 0;
  right : 0;
  background : rgba(0,0,0,.3)
}
.header .aside .head{
  display : inline-block;
  margin : 62px auto 4px;
}
.header .aside ul{
  margin : 0;
  padding : 0;
  margin-top : -12px;
}
.header .aside ul li {
  list-style-type : none;
  border-bottom : 1px solid #EAEAEA;
  overflow : hidden;
}
.header .aside ul li a{
  float : left;
  padding : 25px 20px;
  line-height : 21px;
  font-size : 15px;
  color : #333;
  text-decoration : none;
}
.header .aside ul li a img{
  float : left;
  margin : 0 5px 0 0;
}
</style>

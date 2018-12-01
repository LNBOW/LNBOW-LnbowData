<template>
  <div id="app">
    <router-view v-bind:callback="callback"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      callback:''
    }
  },
  mounted() {
    let callbackUrl = decodeURIComponent(this.$route.query.callbackurl);
    if(callbackUrl === 'undefined'){
      this.callback = 'http://www.tigerobo.com'
    }else{
      if(callbackUrl.indexOf('https://') == 0 || callbackUrl.indexOf('http://') == 0){
        this.callback = callbackUrl
      }else{
        this.callback = 'http://' + callbackUrl
      }
    }
    // this.callback = callbackUrl.indexOf('https://')?callbackUrl : callbackUrl.indexOf('http://')?callbackUrl:'http://'+ callbackUrl
    // if(this.getCookie("token")){//判断token是否存在
    //   window.location.href = this.callback? 'https://' +  this.callback : 'http://www.tigerobo.com';//跳转callbackurl
    // }
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
  margin-top: 60px;
}
</style>

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
  /* margin-top: 60px; */
}
body{width: 375px;margin: 0 auto;}
/* *{box-sizing:border-box;} */
li,a{list-style-type:none;text-decoration: none}

</style>

<template>
  <div id="app">

    <router-view></router-view>
    <footbar></footbar>
  </div>
</template>

<script>

import footbar from './components/footbar'

export default {
  name: 'App',
  components: {
    footbar
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
</style>

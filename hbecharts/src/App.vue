<template>
  <div id="app">
    <router-view/>
    <footer class="footer">
      <ul>
        <li v-bind:key='item.id' v-for="item in footer" v-on:click="addbackimg">
          <router-link v-bind:id='item.id' :to = item.path :style="'background:url(static/img/tab_'+ item.img +'.png) center top no-repeat'">{{item.name}}</router-link>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      currentTwo:0,
      footer:[
        {name:'自选',id:1,img:1,path:'/star'},
        {name:'行情',id:2,img:2,path:'/hangqing'},
        {name:'选股',id:3,img:3,path:"/xuangu"},
        {name:'咨询',id:4,img:4,path:"/zixun"},
        {name:'我的',id:5,img:5,path:"/wode"},
      ],
    }
  },
  methods:{
    addbackimg:function(e){
      let aArr = document.querySelectorAll(".footer a")
      for(let i = 0;i < this.footer.length;i++){
        aArr[i].className = ""
        if(this.footer[i].id == parseInt(e.target.id)){
          this.footer[i].img = this.footer[i].id + ".1"
        }else{
          this.footer[i].img = this.footer[i].id
        }
      }
    }
  },
  mounted() {
      let aArr = document.querySelectorAll(".footer a")
      let aFlag = false
      console.log(aArr)
      for(let i = 0; i < aArr.length;i++){
        if(aArr[i].classList.length != 0){
          this.footer[i].img = this.footer[i].id + ".1"
          aFlag = true
        }
      }
      if(aFlag == false){
        this.footer[0].img = this.footer[0].id + ".1"
        aArr[0].className = "router-link-exact-active router-link-active"
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
body{width: 100%;margin: 0;padding: 0}
li,a{list-style-type:none;text-decoration: none;color: #666}
*{box-sizing:border-box;margin: 0;padding: 0}
footer{
 position:fixed;
 bottom: 0;
 height: 49px;
background:#fff;
}
footer ul{
  height: 49px;
  width: 375px;
  padding:0 25px;
  display: flex;
  justify-content: space-between;
  margin-top: 4px
}
footer ul li{
  height: 49px;
  width: 30px;
}
footer ul li a{
  float: left;
  font-style: normal;
  font-size: 10px;
  overflow: hidden;
  height: 49px;
  width: 30px;
  padding-top: 30px;
}
footer ul li .router-link-active{
  color: #1478F0
}
footer ul li a img{
  margin-bottom: -10px
}

</style>

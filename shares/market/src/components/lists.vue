<template>
    <div id="app">
        <header class="csHeader">
          <h3>财神行情</h3>
        </header>
        <main>
          <button type="text" class="txt">请输入股票代码/拼音/简称</button>
          <!-- 聚焦（导航栏）和按钮都消失 -->
          <nav class="nav">
            <ul>
              <li v-bind:key='item.id' v-for="(item,index) in cslist" v-on:click="addClassFun(index)" v-bind:class="{ active:index==csTeb}">{{item.name}}</li>
            </ul>
          </nav>
        </main>
        <div>
          <section class="cs-chart">
            <ul>
              <li v-bind:key='item.code' v-for="(item) in sharsData.ex">
                <h4>{{item.name}}</h4>
                <span>{{item.close}}</span>
                <div class="cs-amplitude">
                  <p>{{item.change}}</p>
                  <p>{{item.changePercent}}</p>
                </div>
              </li>
            </ul>
          </section>
          <footer class="cs-footer">
            <child-li :sharsvalue="sharsData.up" title="涨幅榜"></child-li>
            <child-li :sharsvalue="sharsData.down" title="跌幅榜"></child-li>
          </footer>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import childLi from '@/components/list'
axios.defaults.withCredentials=true;
export default {
  name: 'lists',
  components:{
    childLi,
    childLi,
  },
  data () {
    return {
      cslist:[
        {id:1,name:'港股'},
        {id:2,name:'美股'},
        {id:3,name:'沪深'},
      ],
      csTeb:0,
      sharsData:{
        ex:[],//指数
        up:[],//涨幅
        down:[], //跌幅
      }
      }
    },
 mounted(){
this.getData({
          type:"hsi|HK,hscei|hk,hscci|HK",
          st:"z",
          sic:"-1,1,10",
          value:"ex"
        })
        this.getData({
          type:"C._HKS",
          st:"c",
          sic:"-1,1,10",
          value:"up"
        })
        this.getData({
          type:"C._HKS",
          st:"c",
          sic:"1,1,10",
          value:"down"
        })
  },
  filters: {
    billion: function (value) {
      if (!value) return ''
      return value = Math.abs(parseFloat(value))>99999?(parseFloat(value) / 100000000).toFixed(2) + "亿" :  value
    },
  },
    methods: {
    addClassFun:function(index) {
      this.csTeb =index;
      if(index == 0){
        this.getData({
          type:"hsi|HK,hscei|hk,hscci|HK",
          st:"z",
          sic:"-1,1,10",
          value:"ex"
        })
        this.getData({
          type:"C._HKS",
          st:"c",
          sic:"-1,1,10",
          value:"up"
        })
        this.getData({
          type:"C._HKS",
          st:"c",
          sic:"1,1,10",
          value:"down"
        })
      }else if(index == 1){
        this.getData({
          type:"djia|UI,ndx|UI,spx|UI",
          st:"z",
          sic:"-1,1,10",
          value:"ex"
        })
        this.getData({
          type:"C._UNS",
          st:"c",
          sic:"-1,1,10",
          value:"up"
        })
        this.getData({
          type:"C._UNS",
          st:"c",
          sic:"1,1,10",
          value:"down"
        })
      }else if(index == 2){
        this.getData({
          type:"000001|SH,399001|SZ,399006|SZ",
          st:"z",
          sic:"-1,1,10",
          value:"ex"
        })
        this.getData({
          type:"C._A",
          st:"c",
          sic:"-1,1,10",
          value:"up"
        })
        this.getData({
          type:"C._A",
          st:"c",
          sic:"1,1,10",
          value:"down"
        })
      }
        console.log(this.sharsData)
    },
    getData:function(options){
      axios({
        url:"/HB_Jumper/nu.ashx",
        methods:"get",
        params:{
          cmd:options.type,
          sty:"ACOSFDTA",
          st:options.st,
          sic:options.sic,
          flt:"transhb",
          js:"[(x)]",
          cb:""
        }
      }).then((data)=>{
        if(data.status == 200){
          switch(options.value){
            case "ex":this.sharsData.ex = data.data[0];break;
            case "up":this.sharsData.up = data.data[0];break;
            case "down":this.sharsData.down = data.data[0];break;
          }
        }
      })
    },
    listshow:function(num){
        switch(num){
          case 1:this.flag1 = !this.flag1;break;
          case 2:this.flag2 = !this.flag2;break;
          case 3:this.flag3 = !this.flag3;break;
          case 4:this.flag4 = !this.flag4;break;
        }
    }
  }
}
</script>
<style>
body{width: 100%;margin: 0 auto;padding: 0}
*{box-sizing:border-box;margin: 0;padding: 0}
li,a{list-style-type:none;text-decoration: none;color: #666}
.margin{width: 375px;margin: 0 auto;}
main{
  margin-top: 7px
}
.txt{
  width: 345px;
  height: 35px;
  color: #999;
  font-size: 13px;
  line-height: 37px;
  outline: none;
  border: 0;
  text-indent: 35px;
  background: url(../assets/img/rearch_icon.png) no-repeat;
  background-position: 9px 9px;
  background-color: #F1F2F5;
}
.nav{
  height: 39px;
}
.nav ul{
  width: 375px;
  height: 39px;
  border-bottom: 1px solid #EAEAEA;
}
.nav ul li{
  float: left;
  font-size: 15px;
  text-align: center;
  margin-left: 51px;
  margin-right: 40px;
  line-height: 39px;
}
.nav ul .active{
  position:relative;
}
.nav ul .active:before {
  content:""; 
  position:absolute;
  left:8px;
  bottom: 0; 
  width:50%; 
  height:2px; 
  background-color:#1478F0
}
/* 颜色参数 */
.cs-chart p{
  font-size: 10px;
  width: 50px;
  height: 18px;
  line-height: 18px;
  color: #C13333
}
.cs-charta{
  height: 100px;
}
.cs-chart h4{
  line-height: 20px;
  color: #333333;
  margin-top: 10px
}
.cs-chart span{
  font-size: 17px;
  line-height: 20px;
  color: #C13333
}
.cs-chart .cs-amplitude{
  display: flex;
  justify-content: space-between;
  padding: 0 10px
}
.cs-chart ul{
  margin-top: 10px;
  padding: 0 15px;
  height: 90px;
}
.cs-chart ul li{
  background: #FFF4F4;
  float: left;
  width: 112px;
  height: 75px;
  text-align: center;
  color: #002D74;
  margin-right: 3px
}
.cs-chart ul li:last-child{
  margin-right: 0
}
.cs-active{
  background: #E2FAED
}
.cs-active .cs-amplitude p{
  color: #147A45
}
.listHeader:nth-child(1){
  border-top:none;
  height: 40px;
}
.listHeader:last-child{
  border-bottom: 7px solid #F1F2F5
}
.listHeader{
  /* width: 78px; */
  height: 54px;
  background: #fff;
  position: relative;
  border-top: 7px solid #F1F2F5
}
.listHeader h4{
  position: absolute;
  top:0;
  cursor: pointer;
  left:15px;
  z-index: 3;
  font-size: 17px;
  color: #000;
  text-align: left;
  line-height: 40px
}
.listHeader img{
  width: 8px;
  height: 5px;
  margin-left: 0px;
  margin-top: 0px
}
.cs-jt{
    display: inline-block;
    border-top: 2px solid;
    border-right: 2px solid;
    width: 8px;
    height: 8px;
    border-color: #000;
    transform: rotate(-45deg);
    margin-left: -222px;
    margin-top: 18px;
}
.cs-jts{
  display: inline-block;
  border-top: 2px solid;
  border-right: 2px solid;
  width: 8px;
  height: 8px;
  border-color: #000;
  transform: rotate(135deg);
  margin-left: -222px;
  margin-top: 15px;
}
.backg{
  width:40px;
  height: 11px;
  background:-webkit-linear-gradient(left,#F9FCFF,#D0E4FC);
  position: absolute;
  top:20px;
  left: -10px;
}
.flex{
  padding: 0 15px;
  height: 55px;
  text-align: right;
  border-bottom: 1px solid #EAEAEA;
  display: flex;
  justify-content: space-between
}
.flex b{
  font-size: 17px;
  color: #333333;
  margin-left: 3px
}
.flex p{
  font-size: 13pxx;
  color: #999999
}
.flex span{
  float: right;
  height: 23px;
  width: 20%;
  color: #C13333;
  font-size: 18px;
  margin: 16px 0;
  font-weight: 700;
}
.flex i{
  float: right;
  height: 23px;
  width: 20%;
  color: #C13333;
  font-size: 18px;
  margin: 16px 0;
  font-weight: 700;
  font-style: normal
}
.flex a{
  display: block;
  background: #EC9595;
  color:#FFFFFF;
  font-size: 12px;
  height: 13px;
  margin-top: 2px
}
.flex-cl{
  display: flex;
  flex-direction: column;
  margin: 6px 0;
  text-align: left;
  width: 60%;
}
.flex-cl>p{
  width: 80%;
  white-space: nowrap;
  overflow: hidden;  
  text-overflow: ellipsis;  
}
.flex-js a{
  float: left;
  margin-right: 5px;
}
.flex-js p{
  float: left;
}
</style>

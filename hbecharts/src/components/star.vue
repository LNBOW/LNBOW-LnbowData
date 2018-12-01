<template>
    <div id="k-chart-container" class="chart-container"></div>
</template>

<script>

import chartManager from '../assets/src/manager';
import URI from 'urijs';
const options = URI(window.location).search(true);

const manager = new chartManager('k', {
    container: '#k-chart-container',
    stockid: options.id || '600000|SH',
    authorityType: options.at || 'fa',
    renderer: options.renderer || 'canvas'
});
manager.load();

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
    
}
export default {
  name: 'star',
  props:{
    callback:String
  },
  data () {
    return {
      msg:'时间范围',
      displayS:'',
      displayN:'',
      displayF:'',
      current:0,
      currentTree:0,
      nav:[
            {name:'全部',id:1},
            {name:'港股',id:2},
            {name:'美股',id:3},
            {name:'沪深',id:4},
      ],
      list:[
        {name:'平安好医生(01833.HK)',id:1,num:"000001",span:'已添加'},
        {name:'平安好医生(01833.HK)',id:2,num:"000001",span:'已添加'},
        {name:'平安好医生(01833.HK)',id:3,num:"000001",span:'已添加'},
        {name:'平安好医生(01833.HK)',id:4,num:"000001",span:'已添加'},
        {name:'平安好医生(01833.HK)',id:5,num:"000001",span:'已添加'},
      ]
    }
  },
  computed: {
  },
  methods:{
    test(){
    },
    addClass:function(index){					
        this.current=index;
    },
    addClassTwo:function(index,id){					
        this.currentTwo=index;
    },
    addClassTree:function(index){
        this.currentTree=index;
    }
  }
}
</script>

<style scoped>
.margin{width: 375px;margin: 0 auto;}
header{
  background: #1478F0;
  height: 117px;
  padding-top: 43px
}
.txt{
  width: 345px;
  height: 35px;
  color:#FFFFFF;
  font-size: 13px;
  opacity: .8;
  line-height: 37px;
  outline: none;
  border: 0;
  text-indent: 35px;
  background: url(../assets/img/rearch_white_icon.png) no-repeat;
  background-position: 9px 9px;
  background-color:#4398FF;
}
.txt::placeholder{
  color: #fff;
  opacity: .5;
}
nav{
  height: 39px;
}
nav ul{
  width: 375px;
  height: 39px;
  border-bottom: 1px solid #EAEAEA;
}
nav ul li{
  float: left;
  font-size: 15px;
  height: 40px;
  text-align: center;
  margin-left: 54px;
  line-height: 39px;
  color: #fff;
  opacity: .5;
}
nav ul li:nth-child(1){
  margin-left: 35px;
}
nav .active{
  position:relative;
  color: #fff;
  opacity: 1;
}
nav .active:before {
  content:""; 
  position:absolute;
  left:5px;
  bottom: 3px; 
  width:75%; 
  height:3px; 
  background-color:#fff
}
.nothing{
  margin-top: 152px
}
.nothing p{
  color: #999;
  font-size: 15px
}
.btn{
  width: 90px;
  height: 41px;
  background: #1478F0;
  font-size: 15px;
  text-align: center;
  line-height: 41px;
  outline: none;
  color: #fff;
  border: none;
  margin-top: 31px
}

.hotsearch p{
  font-size: 13px;
  margin: 15px;
  color: #333;
  text-align: left;
}
.hotsearch ul{
  margin: 0 15px
}
.hotsearch ul li{
  float: left;
  height: 32px;
  text-align: center;
  padding:6px;
  margin-right: 12px;
  margin-bottom: 12px;
  color: #1478F0;
  background: #F0F7FF;
  cursor: pointer;
}

.Q-i{
  height: 34px;
}
.Q-i p{
  display: inline-block;
  width: 120px;
  font-size: 13px;
  color: #999;
  line-height: 34px;
  position: relative;
}
.Q-i p:nth-child(1){
  text-align: left;
  text-indent: 20px
}
.Q-i p:nth-child(2) span:nth-child(1){
  display:block;
  width:0;
  height:0;
  border-width:5px 3px 0;
  border-style:solid;
  border-color:#999 transparent transparent;
  position:absolute;
  top:19px;
  right:25px;
}
.Q-i p:nth-child(2) span:nth-child(2){
  display:block;
  width:0;
  height:0;
  border-width:0 3px 5px;
  border-style:solid;
  border-color:transparent transparent #999;
  position:absolute;
  top:12px;
  right:25px;
}
.Q-i p:nth-child(3){
  text-align: right;
  padding-right:24px 
}
.Q-i p:nth-child(3) span:nth-child(1){
  display:block;
  width:0;
  height:0;
  border-width:5px 3px 0;
  border-style:solid;
  border-color:#999 transparent transparent;
  position:absolute;
  top:19px;
  right:10px;
}
.Q-i p:nth-child(3) span:nth-child(2){
  display:block;
  width:0;
  height:0;
  border-width:0 3px 5px;
  border-style:solid;
  border-color:transparent transparent #999;
  position:absolute;
  top:12px;
  right:10px;
}
.Q-list li{
  height: 61px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #EAEAEA
}
.Q-list li:nth-child(1){
  background: -webkit-linear-gradient(left, #fff , RGBA(193, 51, 51, 0.15))
}
.Q-list li:nth-child(3){
  background: -webkit-linear-gradient(left, #fff , RGBA(20, 122, 69, 0.15))
}
.QL-l p{
  display: inline-block;
}
.QL-l{
  margin: 13px 0 13px 15px
}
.QL-c{
  font:700 17px/61px '';
  color: #333;
}
.QL-r{
  margin: 10px 15px 11px 0
}
.QL-r p:nth-child(1){
  font-size: 18px;
  font-weight:700;
  color: #C13333
}
.QL-r p:nth-child(2){
  font-size: 16px;
  font-weight:700;
  color: #C13333
}
.add{
  font: 15px/61px '';
  color: #999999;
}
.add p{
  text-align: center;
  margin-left: 150px
}
.search h5{
 font-size: 13px;
 width: 85px;
}
.search li{
  height: 55px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #EAEAEA
}
.search li span{
  display: inline-block;
  width: 58px;
  height: 28px;
  background: #1478F0;
  color: #fff;
  margin-top: 3px;
  text-align: center;
  font: 13px/29px '';
  cursor: pointer;
}
.ql-l{
  margin: 7px 0 13px 15px
}
.ql-l img{
  display: block;
  float: left;
  margin-top:2px 
}
.ql-l p{
  float: left;
  margin-left:5px 
}
.ql-l h4{
  font-size: 17px
}
.QL-r .active{
  font: 13px/33px '';
  background: #fff;
  color:#000
}

</style>

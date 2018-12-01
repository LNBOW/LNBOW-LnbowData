<template>
      <div class="web">
        <!-- 头部 -->
        <header>
          <div class="title">
            <h2>{{hangqing.stockName}}</h2>
            <p>({{hangqing.stockCode}})</p>
          </div>
          <div class="T-data">
            <div class="T-data-name">
              <span>{{hangqing.exchange | moneyUnit}}</span>
              <b :style="changeColor">{{hangqing.trade}}</b>
            </div>
            <div class="T-data-range">
              <p :style="changeColor">{{(hangqing.trade - hangqing.settlement).toFixed(2)}}</p>
              <p :style="changeColor">{{hangqing.changePercent}}%</p>
            </div>
          </div>
          <div class="B-time">
            <h5>{{hangqing.tradingPhaseCode | tradeTime}}&nbsp;&nbsp;</h5>
            <p>{{date | getDate}}</p>
            <span>（北京时间）</span>
          </div>
        </header>  
        <!-- 导航 -->
        <nav>
          <el-tabs  type="border-card">
            <el-tab-pane>
              <span slot="label"><i></i>分时</span>
              <img style="height:293px;width:375px;margin:-3px" src="../assets/img/cavans.png" alt="">            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><i></i>五日</span>
              <img style="height:293px;width:375px;margin:-3px" src="../assets/img/cavans.png" alt="">
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><i></i>日K</span>
              <img style="height:293px;width:375px;margin:-3px" src="../assets/img/cavans.png" alt="">
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><i></i>周K</span>
              <img style="height:293px;width:375px;margin:-3px" src="../assets/img/cavans.png" alt="">
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><i></i>月K</span>
              <img style="height:293px;width:375px;margin:-3px" src="../assets/img/cavans.png" alt="">
            </el-tab-pane>
          </el-tabs>
        </nav>
        <div style="height:293px;"></div>
         <!-- 分类 -->
        <!-- Tab切换 -->
        <main>
          <el-tabs  type="border-card">
            <el-tab-pane>
              <span slot="label"><i></i>行情数据</span>
              <div class="tab-Q">
                <ul>
                  <li>
                    <div>
                      <div class="tab-flex">
                        <span>今开</span>
                        <p :style="openColor">{{hangqing.open}}</p>
                      </div>
                      <div class="tab-flex">
                        <span>昨收</span>
                        <p>{{hangqing.settlement}}</p>
                      </div>
                    </div>
                    <div>
                      <div class="tab-flex">
                        <span>最高</span>
                        <p :style="highColor">{{hangqing.high}}</p>
                      </div>
                      <div class="tab-flex">
                        <span>最低</span>
                        <p :style="lowColor">{{hangqing.low}}</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div class="tab-flex">
                        <span>成交量</span>
                        <p>{{hangqing.volume | addHandShars}}</p>
                      </div>
                      <div class="tab-flex">
                        <span>成交额</span>
                        <p>{{hangqing.amount | billion}}</p>
                      </div>
                    </div>
                    <div>
                      <div class="tab-flex">
                        <span>52周最高</span>
                        <p>{{hangqing.max52}}</p>
                      </div>
                      <div class="tab-flex">
                        <span>52周最低</span>
                        <p>{{hangqing.min52}}</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div class="tab-flex">
                        <span>振幅</span>
                        <p>{{zhenfu | addPrecent}}</p>
                      </div>
                      <div class="tab-flex">
                        <span>市盈率(动)</span>
                        <p>{{hangqing.pe_ttm}}</p>
                      </div>
                    </div>
                    <div>
                      <div class="tab-flex">
                        <span>换手率</span>
                        <p>{{hangqing.turnOverRatio | addPrecent}}</p>
                      </div>
                      <div class="tab-flex">
                        <span>市净率</span>
                        <p>{{hangqing.pb}}</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div class="tab-flex">
                        <span>总市值</span>
                        <p>{{hangqing.mktcap | billion}}</p>
                      </div>
                      <div class="tab-flex">
                        <span>总股本</span>
                        <p>{{hangqing.totalCapital | addHandShars}}</p>
                      </div>
                    </div>
                    <div>
                      <div class="tab-flex">
                        <span>流通市值</span>
                        <p>{{hangqing.nmc | billion}}</p>
                      </div>
                      <div class="tab-flex">
                        <span>流通股本</span>
                        <p>{{hangqing.flowCapital | addHandShars}}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><i></i>相关资讯</span>
              <div  class="Consult">
                <ul>
                  <li v-for="items in news" v-bind:key="items.bundleKey">
                    <a :href="items.sourceUrl"><span>{{items.title}}</span></a>
                    <p>{{items.sourceName}} {{items.publishDate | reportDate}}</p>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane>
            <span slot="label"><i></i>财务数据</span>
            <div>
              <div class="chart">
                <ul class="chart-q">
                  <li>
                    <h4>利润表</h4>
                  </li>
                  <li>
                    <ul>
                      <li>营业收入</li>
                      <li>营业利润</li>
                      <li>利润总额</li>
                      <li>净利润</li>
                      <li>每股收益</li>
                    </ul>
                    <ul>
                      <li>{{financeData[80] | billion}}</li>
                      <li>{{financeData[92] | billion}}</li>
                      <li>{{financeData[96] | billion}}</li>
                      <li>{{financeData[98] | billion}}</li>
                      <li>{{financeData[100] | billion}}</li>
                    </ul>
                  </li>
                </ul>
                <ul class="chart-q">
                  <li>
                    <h4>资产负债表</h4>
                  </li>
                  <li>
                    <ul>
                      <li>流动资产总计</li>
                      <li>非流动资产总计</li>
                      <li>资产总计</li>
                      <li>流动负债总计</li>
                      <li>非流动负债总计</li>
                      <li>负债总计</li>
                      <li>所有者权益总计</li>
                    </ul>
                    <ul>
                      <li>{{financeData[17] | billion}}</li>
                      <li>{{financeData[37] | billion}}</li>
                      <li>{{financeData[38] | billion}}</li>
                      <li>{{financeData[55] | billion}}</li>
                      <li>{{financeData[65] | billion}}</li>
                      <li>{{financeData[66] | billion}}</li>
                      <li>{{financeData[77] | billion}}</li>
                    </ul>
                  </li>
                </ul>
                <ul class="chart-q">
                  <li>
                    <h4>现金流量表</h4>
                  </li>
                  <li>
                    <ul>
                      <li>经营活动现金净流量</li>
                      <li>投资活动现金净流量</li>
                      <li>筹资活动现金净流量</li>
                      <li>期末现金及现金等价物余额</li>
                      <li>现金及现金等价物增加(减少)额</li>
                    </ul>
                    <ul>
                      <li>{{financeData[115] | billion}}</li>
                      <li>{{financeData[127] | billion}}</li>
                      <li>{{financeData[139] | billion}}</li>
                      <li>{{financeData[1271] | billion}}</li>
                      <li>{{financeData[275] | billion}}</li>
                    </ul>
                  </li>
                </ul>
                <p><span class="reportDate">报告期:{{portDate | portDate}}</span><span class="portUnit">单位:{{hangqing.exchange | moneyUnit | czUnit}}</span></p>
              </div>
            </div>              
            </el-tab-pane>
          </el-tabs>
        </main>   
      </div>
</template>

<script>
//引入axios
import axios from 'axios'
axios.defaults.withCredentials=true;
export default {
  name: 'hangqing',
  props:{
    callback:String
  },
  data () {
    return {
      msg:'腾讯控股',
      flag:true,
      flags:false,
      financeData:{}, //财务数据
      code:"",  // 报告期
      mkt:"", //单位
      date:new Date(),
      news:[],    //相关资讯
      hangqing:{},
      zhenfu:null,
      changeColor:"", //涨幅颜色
      openColor:"",//今开颜色
      highColor:"",//最高颜色
      lowColor:"",//最低颜色
      portDate:null,//报告期
    }
  },
  computed: {
  },
  methods:{
    addClass:function(index){					
        this.current=index;
    },
    list:function(){
      this.flag = false
      this.flags = true
    },
    lists:function(){
      this.flags = false
      this.flag = true
    },
    open5() {
      this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
        dangerouslyUseHTMLString: true
      });
    },
    getFinanceData:function(id){  //获取财务数据
            axios({
            url:'/hb_dc/Js.ashx',//接口获取数据
            method:'get',
            params:{
                pn:"HB_Plugin_ThreeMarketFinanceDataUnion",
                sty:"QUARTER",
                cmd:id,
                tp:"2018q3",
                flt:"TMFDU_1",
                sic:"",
                js:"",
                cb:"",
                tkn:"3e715abf133fa24da68e663c5ab98857"
            }
            }).then((data)=>{
              console.log(data)              
                if(data.status == 200){
                let ID = ""
                ID = id.toUpperCase()
                this.portDate = Object.keys(data.data[ID])[0]
                  this.financeData = data.data[ID][this.portDate]
                  this.code = data.data[ID].code
                  this.mkt = data.data[ID].mkt
            }
        })
      },
    getAboutNews:function(id,type){   //获取相关资讯
            axios({
            url:'/cyberhunter/feeds/stock',//接口获取数据
            method:'POST',
            data:{
              "stockCode":id,
              "bizType":type
            }
            }).then((data)=>{
              console.log(data)
                if(data.status == 200){
                  this.news = data.data
            }
        })
      },
      getHangqingData:function(id,type){    //获取行情数据
            axios({
            url:'/HB_Jumper/nu4o.ashx',//接口获取数据
            method:'get',
            params:{
              js:"(x)",
              type:type,
              id:id
            }
            }).then((data)=>{
                if(data.status == 200){
                  console.log(data)
                  this.hangqing = data.data.quote
                  this.zhenfu = (this.hangqing.high - this.hangqing.low)/this.hangqing.settlement * 100
                  this.changeColor = this.hangqing.changePercent > 0? "color:#C13333":"color:#147A45";
                  this.openColor = this.hangqing.open > this.hangqing.settlement? "color:#C13333":"color:#147A45";
                  this.highColor = this.hangqing.high > this.hangqing.settlement? "color:#C13333":"color:#147A45";
                  this.lowColor = this.hangqing.low > this.hangqing.settlement? "color:#C13333":"color:#147A45";
            }
        })
      }
  },
 mounted(){
      this.getFinanceData("00700|HK")
      this.getAboutNews("00700","news")
      this.getHangqingData("00700|HK","ZCSFO")
  },
  filters: {
    billion: function (value) {
      if (!value) return ''
      return value = Math.abs(parseFloat(value))>99999?(parseFloat(value) / 100000000).toFixed(2) + "亿" :  value
    },
    getDate:function(value){
      if (!value) return ''
      return value = value.getFullYear() + "-" + (value.getMonth() + 1) + "-" + value.getDate() + " " + value.getHours() + ":" + (value.getMinutes()<10?"0" + value.getMinutes():value.getMinutes())
    },
    tradeTime:function(value){
      if (value == 0) {
        return '交易中'
        }else if(value == 1){
          return "已收盘"
        }else{
          return "已停盘"
        }
    },
    reportDate:function(value){
      if (!value) return ''
      return value = value.split(" ")[0]
    },
    addPrecent:function(value){
      if (!value) return ''
      return value = parseFloat(value).toFixed(2)+"%"
    },
    addHandShars:function(value){
      if (!value) return ''
      return value = (parseFloat(value) / 10000).toFixed(2) + "万股"
    },
    moneyUnit:function(value){
      if (!value){
        return 'CNY￥'
        }else if(value == "HK"){
          return "HK$"
        }else if(["NASDAQ","NYSE","AMEX"].indexOf(value) > -1){
          return "US$"
        }else{
          return 'CNY￥'
        }
    },
    czUnit:function(value){
        if(value == "CNY￥"){
          return "人民币"
        }else if(value == "HK$"){
          return "港元"
        }else{
          return '美元'
        }
    },
    portDate:function(value){
      let val = null;
      val = parseInt(value)
      return (val / 100).toFixed(0) + "q" + (val % 10)
    }

  }
}
</script>

<style>
*{box-sizing:border-box;margin: 0;padding: 0}
li,a{list-style-type:none;text-decoration: none;}
.margin{margin: 0 auto;}
header{
  display: flex;
  flex-direction: column;
}
header .title{
  margin-bottom: 12px;
}
header .title h2{
  font-size: 15px;
  line-height: 21px;
  height: 21px;
}
header .title p{
  font-size: 12px;
  height: 17px;
  line-height: 17px;
}
.T-data{
  padding: 0 55px 0 15px;
}
.T-data-name{
  width: 100%;
  text-align: left
}
.T-data span{
  color: #147A45;
  font-size: 15px;
  margin-right: 5px;
}
.T-data b{
  color: #147A45;
  font-size: 40px;
}
.T-data-range p{
  font: 18px/29px '';
  color: #147A45;
  float: left;
  margin-right: 20px;
}
.B-time{
  color: #5FA8FF;
  padding: 0 15px;
  font-size: 11px;
  float: left;
  display: flex;
  justify-content:baseline;
  line-height: 20px
}
nav{
  height: 39px;
}
nav ul{
  height: 39px;
  border-bottom: 1px solid #EAEAEA;
  display: flex;
  justify-content: space-between;
}
nav ul li{
  font-size: 15px;
  cursor: pointer;
  height: 40px;
  line-height: 39px;
  text-align: center;
  margin-left: 44px;
  color: #999999
}
nav ul li:nth-child(1){
  margin-left: 30px;
}
nav ul li:last-child{
  margin-right: 29px;
}
nav .active{
  position:relative;
  opacity: 1;
  color: #000;
}
nav .active:before {
  content:""; 
  position:absolute;
  left:5px;
  bottom: 3px; 
  width:75%; 
  height:3px; 
  background-color:#1478F0
}
main .active{
  position:relative;
  opacity: 1;
  color: #000;
}
main .el-tabs .el-tabs__content{
  padding: 0;
}
main .active:before {
  content:""; 
  position:absolute;
  left:7px;
  bottom: 3px; 
  width:55%; 
  height:3px; 
  background-color:#1478F0
}
.el-tabs__nav{
  width: 369px;
  display: flex;
  justify-content:space-around;
}
.el-tabs__item{
  padding: 0 24px!important
}
.el-tabs--border-card{
  border: none!important;
  box-shadow: 0 0px 0px !important;
}
.el-tabs--border-card>.el-tabs__header{
  background-color:#fff!important;
  border-bottom:none!important
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item{
  border: none!important;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  color: #333!important
}

nav .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active:before {
  content:""; 
  position:absolute;
  left:30px;
  width:20%; 
  height:3px; 
  background-color:#1478F0
}
main .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active:before {
  content:""; 
  position:absolute;
  left:41px;
  width:20%; 
  height:3px; 
  background-color:#1478F0
}
nav .el-tabs--border-card .el-tabs__content{
  padding: 0;
}
.tab-Q{
  padding:  0 15px
}
.tab-Q h4{
  font-size: 15px;
  text-align: left;
  margin-top: 15px
}
.tab-Q li{
height: 80px;
border-bottom: 1px solid #E9E9E9;
display: flex;
justify-content: space-between
}
.tab-flex{
  width:155px;
  height: 40px;
  line-height: 40px;
  padding-top: 3px;
  display: flex;
  justify-content: space-between
}
tab-flex:nth-of-type(2n){
  margin-bottom:-5px
}
.tab-flex span{
  color: #666666;
  font-size: 13px;
  display:block;
}
.tab-flex p{
  color: #333;
  font-size: 14px;
}
.Consult ul{
  padding:0 15px
}
.Consult li{
text-align: left;
padding:15px 0;
border-bottom: 1px solid #E9E9E9;
}
.Consult li span{
  color: #000000;
  display: inline-block;
  font-size: 17px;
  line-height: 23px;
  margin-bottom: 10px;
}
.Consult li p{
  color: #9B9B9B;
  height: 16px;
  line-height: 16px;
  font-size: 11px;
}
.Consult-t ul{
  padding:0 15px
}
.Consult-t li{
  height: 80px;
  text-align: left;
  padding:15px 0;
  border-bottom: 1px solid #E9E9E9;
}
.tab-Q li:last-child{
border: none
}
.Consult li:last-child{
border: none
}
.Consult-t li span{
  color: #000000;
  display: inline-block;
  font-size: 17px;
  line-height: 20px;
  height: 40px;
}
.Consult-t li p{
  color: #9B9B9B;
  height: 40px;
  margin-bottom: -10px;
  font-size: 13px;
}
.chart{
  overflow: hidden;
}
.chart>p{
  margin: 11px;
  font-size: 12px;
  overflow: hidden;
  color: #999;
}
.chart>p .reportDate{
  float: left;
}
.chart>p .portUnit{
  float: right;
}
.chart-h{
  height: 41px;
  display: flex;
  justify-content: space-between
}
.chart-h h4{
  color: #000;
  font-size: 15px;
  line-height: 15px;
}
.chart-h span{
  font-size: 13px;
  color: #666;
  line-height: 18px;
  margin-left: -43px;
  
}
.chart-h p{
  font-size: 13px;
  line-height: 18px;
  color: #666
}
.chart-q h4{
  color: #333;
  font-size: 13px;
  text-align: left;
  border-left: 2px solid #1478F0;
  text-indent: 5px;
}
.chart-q>li:nth-of-type(2){
  display: flex;
  justify-content: space-between;
  line-height: 26px;
  padding:0 15px 0 12px; 
}
.chart-q>li:nth-of-type(1){
  margin:6px 2px;
}
.chart-q li:nth-of-type(2) ul:nth-of-type(1){
  color:#666;
  font-size:13px;
  text-align: left;
}
.chart-q li:nth-of-type(2) ul:nth-of-type(2){
  color:#333;
  font-size:15px;
  text-align: right;
}
.chart-detail{
  padding:0 15px;
  position: relative;
  margin-top: 18px
}
.chart-details{
  display: flex;
  justify-content: space-between;
}
.chart-detail ul li{
  text-align: left;
  font-size: 15px;
  line-height: 32px;
  color: #333;
}
.chart-detail ul .minfont{
  font-size: 10px;
  color: #999;
}
.rb-line{
  border-right:none
}
.el-tabs__nav-scroll{

}
.el-tabs__nav-wrap{
border-bottom:1px solid #EAEAEA!important
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active:before {
content:""; 
position:absolute;
left:43px;
bottom: 0px; 
width:20%; 
height:3px; 
background-color:#1478F0
}
.web {
  justify-content: center;
  position: absolute;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0 3px;
}

/* for Chrome */
.web::-webkit-scrollbar {
  display: none;
}

</style>

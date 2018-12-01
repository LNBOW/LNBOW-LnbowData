<template>
      <div class="web">
        <!-- 头部 -->
        <header>
          <div class="T-data">
            <div class="T-data-name">
              <b>318.000</b>
            </div>
            <div class="T-data-range">
              <p>+442.38</p>
              <p>+1.62%</p>
            </div>
            <div class="ipt">
              <p style="width:58px;height:28px;background:#1478F0;color:#fff;line-height:28px">+ 自选</p>
            </div>
          </div>
          <div class="B-time">
            <h5>{{date | tradeTime}}&nbsp;&nbsp;</h5>
            <p>{{date | getDate}}</p>
            <span>（北京时间）</span>
          </div>
        </header>  
        <!-- 导航 -->
        <nav>
          <el-tabs  type="border-card">
            <el-tab-pane>
              <span slot="label"><i></i><router-link to="/fenshi">分时</router-link></span>
              <router-view></router-view>
            </el-tab-pane>
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
                      <div class="tab-flex"  style="margin-bottom:-5px">
                        <span style="display:block">今开</span>
                        <p>320.000</p>
                      </div>
                      <div class="tab-flex">
                        <span style="display:block">昨收</span>
                        <p>315.290</p>
                      </div>
                    </div>
                    <div>
                      <div class="tab-flex"  style="margin-bottom:-5px">
                        <span style="display:block">最高</span>
                        <p>320.000</p>
                      </div>
                      <div class="tab-flex">
                        <span style="display:block">最低</span>
                        <p>315.290</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div class="tab-flex"  style="margin-bottom:-5px">
                        <span style="display:block">今开</span>
                        <p>320.000</p>
                      </div>
                      <div class="tab-flex">
                        <span style="display:block">昨收</span>
                        <p>315.290</p>
                      </div>
                    </div>
                    <div>
                      <div class="tab-flex"  style="margin-bottom:-5px">
                        <span style="display:block">最高</span>
                        <p>320.000</p>
                      </div>
                      <div class="tab-flex">
                        <span style="display:block">最低</span>
                        <p>315.290</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div class="tab-flex"  style="margin-bottom:-5px">
                        <span style="display:block">今开</span>
                        <p>320.000</p>
                      </div>
                      <div class="tab-flex">
                        <span style="display:block">昨收</span>
                        <p>315.290</p>
                      </div>
                    </div>
                    <div>
                      <div class="tab-flex"  style="margin-bottom:-5px">
                        <span style="display:block">最高</span>
                        <p>320.000</p>
                      </div>
                      <div class="tab-flex">
                        <span style="display:block">最低</span>
                        <p>315.290</p>
                      </div>
                    </div>
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
                  <p><span class="portDate">报告期:2018q1</span><span class="portUnit">单位:{{mkt}}</span></p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><i></i>相关资讯</span>
              <div  class="Consult">
                <ul>
                  <li>
                    <span>连续回购股票难掩颓势 腾讯最低价跌破300港元 </span>
                    <p>彭博新闻 07:00</p>
                  </li>
                  <li>
                    <span>连续回购股票难掩颓势 腾讯最低价跌破300港元 </span>
                    <p>彭博新闻 07:00</p>
                  </li>
                  <li>
                    <span>连续回购股票难掩颓势 腾讯最低价跌破300港元 </span>
                    <p>彭博新闻 07:00</p>
                  </li>
                </ul>
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
      financeData:{},
      code:"",
      mkt:"",
      date:new Date()
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
    getFinanceData:function(id){
            axios({
            url:'/hb_dc/Js.ashx',//接口获取数据
            method:'get',
            params:{
                pn:"HB_Plugin_ThreeMarketFinanceDataUnion",
                sty:"QUARTER",
                cmd:id,
                tp:"2018q1",
                flt:"TMFDU_1",
                sic:"",
                js:"",
                cb:"",
                tkn:"3e715abf133fa24da68e663c5ab98857"
            }
            }).then((data)=>{
                if(data.status == 200){
                let ID = ""
                ID = id.toUpperCase()
                  this.financeData = data.data[ID]["201801"]
                  this.code = data.data[ID].code
                  this.mkt = data.data[ID].mkt
                  console.log(this.financeData)
            }
        })
      }
  },
 mounted(){
      this.getFinanceData("300059|SZ");
  },
  filters: {
    billion: function (value) {
      if (!value) return ''
      return value = Math.abs(parseFloat(value))>99999?(parseFloat(value) / 100000000).toFixed(2) + "亿" :  value
    },
    getDate:function(value){
      if (!value) return ''
      return value = value.getFullYear() + "-" + value.getMonth() + "-" + value.getDate() + " " + value.getHours() + ":" + (value.getMinutes()<10?"0" + value.getMinutes():value.getMinutes())
    },
    tradeTime:function(value){
      if (!value) return '未交易时间'
      return value = value.getHours>9 && value.getHours()<15?"交易中":"未交易时间"
    }
  }
}
</script>

<style>
*{box-sizing:border-box;margin: 0;padding: 0}
li,a{list-style-type:none;text-decoration: none;color: #666}
.margin{margin: 0 auto;}
header{
  display: flex;
  flex-direction: column;
}
.T-data{
  padding: 0 15px;
  display: flex;
  justify-content: space-between
}
.T-data-name{
  width: 160px;
  text-align: left
}
.T-data span{
  color: #147A45;
  font-size: 15px
}
.T-data b{
  color: #147A45;
  font-size: 34px;
}
.T-data-range{
  margin-left: -116px
}
.T-data-range p{
  font: 13px/17px '';
  color: #147A45;
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
  z-index: 0!important;
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
  left:31px;
  bottom: 3px; 
  width:20%; 
  height:3px; 
  background-color:#1478F0
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active:before {
  content:""; 
  position:absolute;
  left:43px;
  bottom: 3px; 
  width:20%; 
  height:3px; 
  background-color:#1478F0
}
nav .el-tabs--border-card>.el-tabs__content{
  padding: 0!important
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
  border-top: 1px solid #E9E9E9;
  display: flex;
  justify-content: space-between
}
.tab-flex{
  width:150px;
  height: 40px;
  line-height: 40px;
  padding-top: 3px;
  display: flex;
  justify-content: space-between
}
.tab-flex span{
  color: #666666;
  font-size: 13px
}
.tab-flex p{
  color: #333;
  font-size: 15px;
  font-weight: 700
}
.Consult ul{
  padding:0 15px
}
.Consult li{
  height: 102px;
  text-align: left;
  padding:15px 0;
  border-top: 1px solid #E9E9E9;
}
.Consult li span{
  color: #000000;
  display: inline-block;
  font-size: 17px;
  line-height: 20px;
  height: 40px;
}
.Consult li p{
  color: #9B9B9B;
  height: 40px;
  line-height: 40px;
  margin-bottom: -10px;
  font-size: 13px;
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
  padding:10px 15px 0 15px
}
.chart>p{
  margin-top: 11px;
  font-size: 12px;
}
.chart>p .portDate{
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
  line-height: 21px
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
  margin-left: -3px
}
.chart-q>li:nth-of-type(2){
  display: flex;
  justify-content: space-between;
  line-height: 26px;
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
.test{
  width: 94px;
  height: 40px;
  background: #fff;
  position: relative;
}
.test h4{
  position: absolute;
  top:0;
  left:0;
  z-index: 3;
  font-size: 15px;
  color: #000;
  text-align: left;
}
.backg{
  width:40px;
  height: 11px;
  background:-webkit-linear-gradient(left,#F9FCFF,#D0E4FC);
  position: absolute;
  top: 10px;
  left: -10px;
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
  display: flex;
  justify-content: space-around;
}
.web {
  justify-content: center;
  position: absolute;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0 3px;
  margin-top: 41px;
}

/* for Chrome */
.web::-webkit-scrollbar {
  display: none;
}

</style>

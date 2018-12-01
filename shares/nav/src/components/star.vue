<template>
    <div id="app">
        <!-- <h3 class="h3">{{msg}}</h3> -->
        <!-- 没头 -->
        <div class="star">
          <input type="text" @focus="test" class="txt" placeholder="请输入股票代码/拼音/简称">
          <!-- 聚焦（导航栏）和按钮都消失 -->
          <nav>
            <ul>
              <li class="active">全部</li>
              <li>港股</li>
              <li>美股</li>
              <li>沪深</li>
            </ul>
          </nav>
        </div>
        <!-- 热门数据（可循环渲染） -->
        <section style="display:none">
          <p>热门搜索</p>
          <ul>
            <li>小米公司</li>
            <li>小米</li>
            <li>小司</li>
            <li>小米公司</li>
            <li>小米公司</li>
            <li>小米公司</li>
            <li>小米公司</li>
            <li>小米公司</li>
          </ul>
        </section>
        <!-- 尾部 -->
        <!-- 点击按钮消失 同时和导航栏 （按钮）-->
        <footer>
          <p>暂无自选股</p>
          <button class="btn" disabled="disabled">即刻添加</button>
        </footer>
    </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials=true;
export default {
  name: 'star',
  props:{
    callback:String
  },
  data () {
    return {
      msg:'时间范围',
    }
  },
  methods:{
    test(){

    }
  }
}
</script>

<style scoped>
body{width: 100%;margin: 0 auto;padding: 0}
*{box-sizing:border-box;margin: 0;padding: 0}
li,a{list-style-type:none;text-decoration: none;color: #666}
.margin{width: 375px;margin: 0 auto;}
.star{
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
  text-align: center;
  margin-left: 51px;
  line-height: 39px;
}
.active{
  position:relative;
}
.active:before {
  content:""; 
  position:absolute;
  left:8px;
  bottom: 0; 
  width:50%; 
  height:2px; 
  background-color:#1478F0
}
footer{
  margin-top: 152px
}
footer p{
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

section p{
  font-size: 13px;
  margin: 15px;
  color: #333;
  text-align: left;
}
section ul{
  margin: 0 15px
}
section ul li{
  float: left;
  border: 1px solid #EAEAEA;
  height: 30px;
  text-align: center;
  padding:5px 5px 6px 4px;
  border-radius: 15px;
  margin-right: 12px;
  margin-bottom: 12px;
  color: #002D74
}

</style>

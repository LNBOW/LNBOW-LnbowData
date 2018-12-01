<template>
  <div class="chart">
    <h1>{{ msg }}</h1>
    
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div>
        <span>{{name}}</span>
        <span>[{{id}}]</span>
        <span>{{time}}</span>
        <span>分钟收盘价{{close}}</span>
        <span>涨幅{{changePercent}}</span>
        <span>成交量{{volume}}</span>
    </div>
    <div id="main" style="width: 600px;height:400px;margin:0px"></div>
  </div>
</template>
<script>
// 引入 echarts 主模块。
import * as echarts from 'echarts';
//引入axios
import axios from 'axios'
//引入
import dateFormatter from '../assets/formatDate.js'
import numbericFormat from '../assets/numbericFormat.js'
export default {
  name: 'chart',
  data () {
    return {
      msg: 'Welcome to Your Echarts App',
      close:0,
      name:'',
      time:'',
      volume:0,
      changePercent:0,
      id:''
    }
   
  },
  methods:{
      drawTimeLine:function(data){
          let _this = this
          const tchart = echarts.init(document.getElementById('main'));
          const palette = {
                raise: '#c23531',
                decline: '#749f83',
                plain: '#000'
            }

        const options = {
            //animation: false,
            dataset: {
                source: [],
                dimensions: ['am' ,'avgPrice' ,'change' ,'changePercent' ,'close' ,'rf' ,'time' ,'volume']
            },
            grid: [{
                show:true,
                top: 10,
                //height: '70%',
                bottom: '35%',
                borderColor:'blcak',
                z:3
            }, {
                show:true,
                //height: '20%',
                top: '75%',
                borderColor:'blcak',
                bottom: 5,
                z:3
            }],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    snap:true,
                    animation: false,
                    label: {
                        show:false,
                        backgroundColor: '#ccc',
                        borderColor: '#aaa',
                        borderWidth: 1,
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        textStyle: {
                            color: '#222'
                        }
                    },
                    lineStyle:{
                        type:'dashed'
                    }
                },
                formatter: function (params) {
                    // 就是这里，可以获取到我想要的那个数据
                    _this.close = params[2].value.close;
                    _this.time = params[2].value.time;
                    _this.changePercent = params[2].value.changePercent;
                    _this.volume = params[2].value.volume;
                    // return params[2].value.close;
                }
            },
            axisPointer: {
                show: true,
                link: [{
                    xAxisIndex: 'all'
                }],
            },
            xAxis: [{
                type: 'category',
                gridIndex: 0,
                axisLabel: {
                    showMinLabel: true,
                    showMaxLabel: true,
                },
                axisTick: {
                    show: false,
                    alignWithLabel:true,
                },
                splitLine: {
                    show: true,
                    alignWithLabel: true,
                    lineStyle:{
                        type:'dashed'
                    }
                }
            }, {
                type: 'category',
                axisLabel: {
                    show:false
                },
                axisTick: {
                    show: false
                },
                gridIndex: 1,
                axisPointer: {
                    label: {
                        formatter: params => params.seriesData[0] ? params.seriesData[0].data.volume : 0
                    }
                }
            }],
            yAxis: [{
                id: 'price-axis',
                gridIndex: 0,
                type: 'value',
                position: 'left',
                boundaryGap: ['10%', '5%'],
                interval:'',
                axisLabel: {
                    show: true,
                    formatter:function(params){
                        return parseFloat(params.toFixed(2))
                    },
                    textStyle: {
                        color: function (params) {
                            if(params > (ftd.yc + 0.01)){
                                    return 'red'
                                }else if(params > (ftd.yc - 0.01)){
                                    return 'black'
                                }else{
                                    return 'green'
                                }
                        }
                    }
                },
                splitLine:{
                    lineStyle:{
                        type:'dashed'
                    }
                }
            }, {
                id: 'volume-asix',
                gridIndex: 1,
                type: 'value',
                scale: true,
                position: 'left',
                axisLabel: {
                    show:true,
                    formatter:function(params){
                    return numbericFormat(params)
                    }
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    type: 'dashed',
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },{
                id: 'precent-axis',
                type: 'value',
                position: 'right',
                interval:'',
                splitLine:{
                    show:false
                },
                axisLabel: {
                    show: true,
                    lineStyle:{
                        type:'dashed'
                    },
                    formatter:function(params){
                        if(params > 0.001){
                                return "+"+params.toFixed(2)+"%"
                            }else if(params > -0.001){
                                return params.toFixed(2)+"%"
                            }else{
                                return params.toFixed(2)+"%"
                            }
                    },
                    textStyle: {
                        color: function (params) {
                            if(params > 0.001){
                                    return 'red'
                                }else if(params > -0.001){
                                    return 'black'
                                }else{
                                    return 'green'
                                }
                        }
                    }
                },
            }],
            graphic: [
            {
                type: 'image',
                id: 'logo',
                right: 20,
                top: 20,
                z: -10,
                bounding: 'raw',
                origin: [75, 75],
                style: {
                    image: 'http://echarts.baidu.com/images/favicon.png',
                    width: 150,
                    height: 150,
                    opacity: 0.4
                }
            }],
            series: [
                {
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
                smooth: false,
                showSymbol: false,
                silent: true,
                symbol: 'circle',
                sampling: 'max',
                itemStyle: {
                    color: '#326fb2'
                },
                areaStyle: {
                    color: 'rgba(101,202,254, 0.2)'
                },
                encode: {
                    x: 'time',
                    y: 'close'
                }
            }, {
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
                smooth: true,
                showSymbol: false,
                silent: true,
                symbol: 'none',
                itemStyle: {
                    color: '#daa520'
                },
                encode: {
                    x: 'time',
                    y: 'avgPrice'
                }
            },
            {
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                silent: true,
                encode: {
                    x: 'time',
                    y: 'volume'
                },
                itemStyle: {
                    color: params => params.data.volumeDir >= 0 ? palette.raise : palette.decline
                }
            }]
        };
        // console.log('raw', data);
        const ftd = this.chartDataFormatter(data);
        // console.log("ftd",ftd)
        options.dataset = ftd.dataset;
        const render = this.axisLabelRenderer('hs', ftd.timeLine.length);
        options.xAxis[0].axisLabel = render;
        options.xAxis[0].data = ftd.timeLine;
        options.xAxis[1].data = ftd.timeLine;
        options.yAxis[0].max = ftd.max;
        options.yAxis[0].min = ftd.min;
        options.yAxis[0].interval = parseFloat(((options.yAxis[0].max - options.yAxis[0].min) / 6))
        options.yAxis[2].max = (((ftd.max - ftd.yc) / ftd.yc) * 100)
        options.yAxis[2].min = (((ftd.min - ftd.yc) / ftd.yc) * 100)
        options.yAxis[2].interval = parseFloat(((options.yAxis[2].max - options.yAxis[2].min) / 6))        
        // options.yAxis[0].axisLabel.color = (val) => {
        //     return val - ftd.info.yc > 0 ? palette.raise : val - ftd.info.yc < 0 ? palette.decline : palette.plain;
        // }
        console.log(options)
        tchart.setOption(options);
      },
    axisLabelRenderer:function(type, count) {
        // const hs = ['10:30', '11:30', '14:00'];
        if (type === 'hs') {
            return {
                interval: (idx, val) => {
                    // const cur = dateFormatter(val, 'HH:mm');
                    // return idx === 0 || idx === (count - 1) || hs.indexOf(cur) >= 0;
                    return idx === 0 || idx === 240 || idx === 60 || idx === 120 || idx === 180;
                },
                formatter: (val, idx) => {
                    let ret = dateFormatter(val, 'HH:mm');
                    // if (ret === '09:31') ret = '09:30';
                    // else 
                    if (ret === '11:30') ret = '11:30/13:00';
                    return ret;
                }
            }
        }
    },
      chartDataFormatter:function(raw){
        const struct = {
            dataset: {
                dimensions: ['am' ,'avgPrice' ,'change' ,'changePercent' ,'close' ,'rf' ,'time' ,'volume'],
                source: []
            },
            volumeBar: [],
            timeLine: [],
            max: 0,
            min: 0,
            interval: 0,
            count: parseInt(raw.num)
        }
        // struct.info.decimal = /0(.(0+))?/.exec(raw.info.pricedigit).pop().length;

        if (raw.datas instanceof Array) {
            const pc = raw.PC / 1;
            const beginDate = struct.dataset.source[0] ?
            new Date(struct.dataset.source[0].time).toDate().getTime() :
            new Date(raw.datas[0].D).toDate().getTime();
            // const timerange = raw.info.ticks.split('|');
            // console.log(timerange,beginDate)
            // timerange.splice(0, 3);
            // console.log(timerange[0])
            // console.log(Number(timerange[0]))
            // console.log(new Date(beginDate + (Number(timerange[0]) + 60 * 1) * 1000))
            // console.log(dateFormatter(new Date(beginDate + Number(timerange[0])), 'yyyy-MM-dd HH:mm'))
            // let t, range = [];
            // while (t = timerange.shift() / 1) {
            //     if (range.length < 1) {
            //         range.push(t);
            //     } else {
            //         range.push(t);
            //         const n = (range[1] - range[0]) / 60;
            //         for (let i = 1; i <= n; i++) {
            //             const p = new Date((range[0] + 60 * i) * 1000 + beginDate);
            //             struct.timeLine.push(dateFormatter(p, 'yyyy-MM-dd HH:mm'));
            //         }
            //         range = [];
            //     }
            // }
            const n = (41400 - 34200) / 60;
            for (let i = 0; i <= n; i++) {
                const p = new Date((34200 + 60 * i) * 1000 + beginDate);
                struct.timeLine.push(dateFormatter(p, 'yyyy-MM-dd HH:mm') + ':00');
            }
            const n1 = (54000 - 46800) / 60;
            for (let i = 1; i <= n1; i++) {
                const p = new Date((46800 + 60 * i) * 1000 + beginDate);
                struct.timeLine.push(dateFormatter(p, 'yyyy-MM-dd HH:mm') + ':00');
            }
            let lastClose = pc,
                max = 0;
                let min = pc;
                let DValue = 0
            // console.log(Number(raw.datas[0].T) + beginDate)
            // console.log(Number(raw.datas[0].T) + beginDate)
            // console.log(new Date(Number(raw.datas[0].T) + beginDate))
            // console.log((new Date(Number(raw.datas[0].T) + beginDate)).getFullYear)
            // console.log(dateFormatter(new Date(Number(raw.datas[0].D)), 'yyyy-MM-dd HH:mm'))
            // console.log(dateFormatter(beginDate,'yyyy-MM-dd HH:mm'))
            
            for (let i = 0; i < raw.datas.length; i++) {
                const items = raw.datas[i];
                const meta = {
                    time: items.D,
                    close: items.C,
                    change: items.C - pc,
                    volume: items.VL,
                    avgPrice: items.V,
                    rf:items.RF,
                    am:items.AM
                };
                meta.changePercent = (meta.change / pc * 100).toFixed(2);
                meta.volumeDir = meta.close - lastClose;
                struct.dataset.source.push(meta);
                lastClose = meta.close / 1;
                const p = Math.max(Math.abs(meta.close), Math.abs(meta.avgPrice));
                const q = Math.min(Math.abs(meta.close), Math.abs(meta.avgPrice));
                max = p > max ? p : max;
                min = q < min ? q : min;
            }
            struct.max = (max * 1).toFixed(2);
            struct.min = (2 * pc - struct.max).toFixed(2) < min ? (2 * pc - struct.max).toFixed(2) : min ;
            DValue = (struct.max - pc) > (pc - struct.min)?(struct.max - pc):(pc - struct.min);
            // console.log(DValue)
            struct.yc = raw.datas[0].C
            struct.max = parseFloat(pc) + DValue;
            struct.min = parseFloat(pc) - DValue;
        }
        // console.log(struct)
        return struct;
      },
      getTimeSharingData:function(){
            // const arr = []
            // const n = (41400 - 34200) / 60;
            // for (let i = 0; i <= n; i++) {
            //     const p = new Date((34200 + 60 * i) * 1000 + 1541692800000);
            //     arr.push(dateFormatter(p, 'yyyy-MM-dd HH:mm'));
            // }
            // const n1 = (54000 - 46800) / 60;
            // for (let i = 0; i <= n1; i++) {
            //     const p = new Date((46800 + 60 * i) * 1000 + 1541692800000);
            //     arr.push(dateFormatter(p, 'yyyy-MM-dd HH:mm'));
            // }
            // console.log(arr)
            axios({
            url:'/api/stockhq/minquote.do',//接口获取数据
            method:'get',
            params:{
                p:{"id":"SH.600000"}
            }
            }).then((data)=>{
                if(data.data.msg == "OK"){
                    console.log(data)
                    var date = new Date().getTime()
                    this.close = data.data.info.PC;
                    this.time = data.data.info.datas[0].D;
                    this.name = data.data.info.name;
                    this.volume = data.data.info.datas[0].VL;
                    this.id = data.data.info.id
                    this.drawTimeLine(data.data.info);
            }
        })
      }
  },
  mounted(){
  
    var md5_a=hex_md5('123456');  
    console.log('md5加密123456',md5_a);
    // var UglifyJS = require("uglify-js");
    // var code = "var a = 1;";
    // var toplevel = UglifyJS.parse(code); //toplevel就是语法树
    // var transformer = new UglifyJS.TreeTransformer(function (node) {
    // if (node instanceof UglifyJS.AST_Number) { //查找需要修改的叶子节点
    //         node.value = '0x' + Number(node.value).toString(16);
    //         return node; //返回一个新的叶子节点 替换原来的叶子节点
    //     };
    // });
    // toplevel.transform(transformer);  //遍历AST树
    // var ncode = toplevel.print_to_string(); //从AST还原成字符串
    // console.log(ncode); // var a = 0x1;
    Date.prototype.toDate = function () {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate());
    }
    this.getTimeSharingData();
    // setInterval(()=>{
    //     this.getTimeSharingData('300059|SZ',false);
    // },1000 * 60 * 60)
    
}
}
</script>

<style scoped>

</style>

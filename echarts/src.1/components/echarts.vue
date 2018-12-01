<template>
  <div class="chart">
    <h1>{{ msg }}</h1>
    
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div>
        <span>{{name}}</span>
        <span>{{time}}</span>
        <span>{{close}}</span>
        <span>{{changePercent}}</span>
        <span>{{volume}}</span>
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
                dimensions: ['time', 'close', 'changePercent', 'volumn', 'avg', 'test']
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
                bottom: 10,
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
                axisLabel: {},
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
                            if(params > (ftd.info.yc + 0.01)){
                                    return 'red'
                                }else if(params > (ftd.info.yc - 0.01)){
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
                axisLabel: {},
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
                                return "+"+params.toFixed(2)
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
        options.dataset = ftd.dataset;
        const render = this.axisLabelRenderer('hs', ftd.timeLine.length);
        options.xAxis[0].axisLabel = render;
        options.xAxis[0].data = ftd.timeLine;
        options.xAxis[1].data = ftd.timeLine;
        options.yAxis[0].max = ftd.max;
        options.yAxis[0].min = ftd.min;
        options.yAxis[0].interval = parseFloat(((options.yAxis[0].max - options.yAxis[0].min) / 6))
        options.yAxis[2].max = (((ftd.max - ftd.info.yc) / ftd.info.yc) * 100)
        options.yAxis[2].min = (((ftd.min - ftd.info.yc) / ftd.info.yc) * 100)
        options.yAxis[2].interval = parseFloat(((options.yAxis[2].max - options.yAxis[2].min) / 6))        
        // options.yAxis[0].axisLabel.color = (val) => {
        //     return val - ftd.info.yc > 0 ? palette.raise : val - ftd.info.yc < 0 ? palette.decline : palette.plain;
        // }
        tchart.setOption(options);
      },
    axisLabelRenderer:function(type, count) {
        const hs = ['10:30', '11:30', '14:00'];
        if (type === 'hs') {
            return {
                interval: (idx, val) => {
                    const cur = dateFormatter(val, 'HH:mm');
                    return idx === 0 || idx === (count - 1) || hs.indexOf(cur) >= 0;
                },
                formatter: (val, idx) => {
                    let ret = dateFormatter(val, 'HH:mm');
                    if (ret === '09:31') ret = '09:30';
                    else if (ret === '11:30') ret = '11:30/13:00';
                    return ret;
                }
            }
        }
    },
      chartDataFormatter:function(raw){
        const struct = {
            info: raw.info,
            dataset: {
                dimensions: ['time', 'close', 'change', 'changePercent', 'volume', 'avgPrice'],
                source: []
            },
            volumeBar: [],
            timeLine: [],
            max: 0,
            min: 0,
            interval: 0,
            count: parseInt(raw.info.total)
        }
        struct.info.decimal = /0(.(0+))?/.exec(raw.info.pricedigit).pop().length;

        if (raw.data instanceof Array) {
            const pc = raw.info.yc / 1;
            const beginDate = struct.dataset.source[0] ?
            new Date(struct.dataset.source[0].time).toDate().getTime() :
            new Date(raw.info.time).toDate().getTime();
            const timerange = raw.info.ticks.split('|');
            timerange.splice(0, 3);
            let t, range = [];
            while (t = timerange.shift() / 1) {
                if (range.length < 1) {
                    range.push(t);
                } else {
                    range.push(t);
                    const n = (range[1] - range[0]) / 60;
                    for (let i = 1; i <= n; i++) {
                        const p = new Date((range[0] + 60 * i) * 1000 + beginDate);
                        struct.timeLine.push(dateFormatter(p, 'yyyy-MM-dd HH:mm'));
                    }
                    range = [];
                }
            }
            let lastClose = pc,
                max = 0;
                let min = pc;
                let DValue = 0
            for (let i = 0; i < raw.data.length; i++) {
                const items = raw.data[i].split(",");
                const meta = {
                    time: items[0],
                    close: items[1],
                    change: items[1] - pc,
                    volume: items[2],
                    avgPrice: items[3]
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
            struct.max = parseFloat(pc) + DValue;
            struct.min = parseFloat(pc) - DValue;
        }
        return struct;
      },
      getTimeSharingData:function(id,iscr){
            axios({
            url:'/HB_Jumper/pd.ashx?js=((x))&rtype=5&style=top',//接口获取数据
            method:'get',
            params:{
                id:id,
                iscr:iscr,
                type:"r"
            }
            }).then((data)=>{
                if(data.status == 200){
                    this.close = eval(data.data).info.o;
                    this.time = eval(data.data).info.time;
                    this.changePercent = eval(data.data).info.pricedigit;
                    this.name = eval(data.data).name;
                    this.drawTimeLine(eval(data.data));
            }
        })
      }
  },
  mounted(){
  


    Date.prototype.toDate = function () {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate());
    }
    this.getTimeSharingData('300059|SZ',false);
    // setInterval(()=>{
    //     this.getTimeSharingData('300059|SZ',false);
    // },1000 * 60 * 60)
    
}
}
</script>

<style scoped>

</style>

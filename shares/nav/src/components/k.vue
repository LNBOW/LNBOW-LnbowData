<template>
  <div id="main" style="width: 375px;height:293px;margin:0px auto"></div>
</template>
<script>
// 引入 echarts 主模块。
import * as echarts from 'echarts';
//引入axios
import axios from 'axios'
axios.defaults.withCredentials=true;
//引入
import dateFormatter from '../assets/formatDate.js'
import numbericFormat from  '../assets/numbericFormat.js'
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
    }
  },
  computed: {
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
        dataZoom: [ {
                type: 'inside',
                zoomOnMouseWheel: false,
                //moveOnMouseMove: !supportsTouch,
                minValueSpan: 30,
                xAxisIndex: [0, 1]
            }],
        grid: [{
            show:true,
            top: 35,
            // height: '80%',
            bottom: '35%',
            borderColor:'red',
            z:3,
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
            padding:'20 ',
            position:[10,10],
            axisPointer: {
                type: 'cross',
                snap:true,
                animation: false,
                label: {
                    show:true,
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
                // console.log(params)
                _this.close = params[0].value.close;
                _this.time = params[0].value.time;
                _this.changePercent = params[0].value.changePercent;
                _this.volume = params[0].value.volume;
                
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
            boundaryGap: false,
            triggerEvent:true,
            axisLabel: {
                show:true,
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
            },
            axisPointer:{
                show:true,
                label: {
                    formatter:function(params){
                        // console.log(params.value.split(" ")[1].split(":"))
                        let arr = []
                        arr = params.value.split(" ")[1].split(":")
                        return arr[0] + ":" + arr[1]
                    }
                }
            },
            data:[{
                value:'09:00',
                textStyle:{
                    color:'20px',
                    align:'right'
                }
            }]
        }, {
            type: 'category',
            axisLabel: {
                show:false,
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
            boundaryGap: ['10%', '10%'],
            interval:'',
            axisTick:{
                //刻度显示
                show:false,
            },
            axisLabel: {
                show: true,
                verticalAlign:'top',
                formatter:function(params){
                    return parseFloat(params.toFixed(2))
                },
                //Y轴刻度朝里朝外
                inside:true,
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
                },
                showMinLabel:false
            },
            splitLine:{
                lineStyle:{
                    type:'dashed'
                }
            },
            axisPointer:{
                show:true,
                label:{
                    precision:2,
                    color:'#f00'
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
            splitLine:{
                show:false
            },
            //Y轴刻度朝里朝外
            axisTick:{
                inside:true,
                show:false,
            },
            axisLabel: {
                show: true,
                verticalAlign:'top',
                //Y轴刻度朝里朝外
                inside:true,
                //轴线对齐
                // verticalAlign:'top',
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
            axisPointer:{
                show:false,
            }
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
            smooth: true,
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
            smooth: true,
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
    console.log("ftd",ftd)
    options.dataset = ftd.dataset;
    const render = this.axisLabelRenderer('hs', ftd.timeLine.length);
    console.log("render",render)
    options.xAxis[0].axisLabel = render;
    options.xAxis[0].data = ftd.timeLine;
    options.xAxis[1].data = ftd.timeLine;
    options.yAxis[0].max = ftd.max;
    options.yAxis[0].min = ftd.min;
    options.yAxis[0].interval = parseFloat(((options.yAxis[0].max - options.yAxis[0].min) / 6))
    options.yAxis[2].max = (((ftd.max - ftd.yc) / ftd.yc) * 100)
    options.yAxis[2].min = (((ftd.min - ftd.yc) / ftd.yc) * 100)
    options.yAxis[2].interval = parseFloat(((options.yAxis[2].max - options.yAxis[2].min) / 6)) 
    // console.log(ftd.max)
    // options.yAxis[0].axisLabel.color = (val) => {
    //     return val - ftd.info.yc > 0 ? palette.raise : val - ftd.info.yc < 0 ? palette.decline : palette.plain;
    // }
    // console.log(options)
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
    // console.log('raw',raw.num)
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
        // console.log(pc)
        const beginDate = struct.dataset.source[0] ?
        new Date(struct.dataset.source[0].time).toDate().getTime() :
        new Date(raw.datas[0].D).toDate().getTime();
        // console.log(beginDate)
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
        // console.log(raw.datas)
        // console.log(Number(raw.datas[0].T) + beginDate)
        // console.log(Number(raw.datas[0].T) + beginDate)
        // console.log(new Date(Number(raw.datas[0].T) + beginDate))
        // console.log((new Date(Number(raw.datas[0].T) + beginDate)).getFullYear)
        // console.log(dateFormatter((Number(raw.datas[0].T) + beginDate), 'yyyy-MM-dd HH:mm'))
        // 数据
        for (let i = 0; i < raw.datas.length-3; i++) {
            // struct.timeLine.push(dateFormatter(Number(raw.datas[i].T), 'yyyy-MM-dd HH:mm'));
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
        axios({
        url:'/api/stockhq/minquote.do',//接口获取数据
        method:'get',
        params:{
            p:{"id":"SH.600000"}
        }
        }).then((data)=>{
        if(data.data.msg == "OK"){
            var date = new Date().getTime()
            // console.log('new',new Date(date))
            console.log(data)
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

<style>
</style>

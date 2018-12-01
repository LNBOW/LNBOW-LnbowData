
import merge from  'lodash/merge';
import axios from 'axios' ;
import loog from  './images/icon.png';
import numbericFormat from './utils/numbericFormat' ;
import dateFormatter from  './utils/formatDate';
import simpleTempalte from './utils/simpleTemplate' ;
import tips from './ktips.vue' ;

const supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

export default candlestickLoader;

/**
 * K线图加载器
 * @param {ECharts} chartlib 图像类库
 * @param {object} args 分时图参数
 */
function candlestickLoader(chartlib, args) {
    const self = this;
    const _opt = this.args = initOptions(args);
    this.dom = getDom(_opt.container);
    const chart = chartlib.init(this.dom, _opt.theme, {
        renderer: _opt.renderer,
        devicePixelRatio: _opt.devicePixelRatio,
        height: _opt.height,
        width: _opt.width
    });
    const palette = _opt.palette;
    // 初始配置
    chart.setOption(_opt.chartopt);
    let reload = false;
    this.dataloader = async function () {
        try {
            const entity = await requestData(_opt.server);
            const dates = entity.data.map(i => i.date),
                boxdata = entity.data.map(i => [i.open, i.close, i.lowest, i.highest, i]),
                volumes = entity.data.map(i => {
                    return {
                        value: i.volume,
                        itemStyle: {
                            color: i.change >= 0 ? 'transparent' : palette.decline,
                            borderColor: i.change >= 0 ? palette.raise : 'transparent'
                        }
                    }
                });
            const chartcfg = {
                title: {
                    show: !supportsTouch,
                    text: `${entity.info.name}[${entity.info.code}]`
                },
                legend: {
                    left: supportsTouch ? 0 : entity.info.name.length * 13 + entity.info.code.length * 13 / 2 + 85
                },
                dataset: {
                    source: entity.data
                },
                dataZoom: [],
                xAxis: [{
                    data: dates
                }, {
                    data: dates
                }],
                yAxis: [{}, {}],
                series: [{
                    data: boxdata
                }, {
                    data: volumes
                }, {
                    data: calculateMA.apply(self, [5, entity.data])
                }, {
                    data: calculateMA.apply(self, [10, entity.data])
                }, {
                    data: calculateMA.apply(self, [20, entity.data])
                }, {
                    data: calculateMA.apply(self, [60, entity.data])
                }]
            };
            // const lastdate = dates[dates.length - 1];
            // dates[dates.length - 1] = {
            //     value: lastdate,
            //     textStyle: {
            //         padding: [0, 40, 0, 0]
            //     }
            // }
            if (!reload) {
                chartcfg.dataZoom = [{
                    startValue: dates.length < 60 ? 0 : dates.length - 60,
                    endValue: dates.length < 60 ? 60 : dates.length - 1
                }, {
                    zoomLock: dates.length < 60
                }]
            }
            //console.log(chartcfg);
            if (!reload) chart.hideLoading();
            chart.setOption(chartcfg);

        } catch (error) {
            if (!reload) chart.hideLoading();
            reporterror(error, 'dataLoader')
        } finally {
            reload = true;
        }
    }
    //console.log(chart.getOption());
    return chart;

    /**
     * 服务端请求数据
     * @param {object} request 请求
     * @param {string} request.url 接口地址
     * @param {object} request.params 参数
     * @param {string} request.params.type chart数据类型
     * @param {string} request.params.id 股票ID
     * @param {string} request.params.rtype 响应数据格式
     * @param {string} request.params.js 响应数据格式化参数
     * @param {string} request.params.authorityType 除复权标识
     * @param {string} request.method 请求方式
     * @returns {KChartEntity}
     */
    async function requestData(request) {
        const response = await axios(request);
        if (response.status == 200) {
            if (response.data.data instanceof Array)
                response.data.data = response.data.data.map(item => item.split(','));
            if (typeof _opt.dataResolver === 'function')
                return _opt.dataResolver.apply(self, [response.data]);
            else {
                return resolveData.apply(self, [response.data]);
            }
        } else {
            throw new Error(response.statusText);
        }
    }

    function reporterror(err, type) {
        console.error(err, type);
        if (typeof args.onerror === 'function') {
            args.onerror.call(self, {
                type: type,
                exception: err
            });
        }
    }


}

/**
 * @param {object} raw 原始对象
 * @param {string} raw.name 股票对象
 * @param {string} raw.code 股票代码
 * @param {object} raw.info 基础信息
 * @param {string[][]} raw.data 日K数据
 */
function resolveData(raw) {
    if (!raw || !raw.data)
        throw new Error('Invaild response data');
    const entity = new KChartEntity();
    entity.info = {
        decimal: /0(.(0+))?/.exec(raw.info.pricedigit).pop().length,
        name: raw.name,
        code: raw.code,
        time: new Date(raw.info.time),
        close: raw.info.c / 1,
        previousClose: raw.info.yc / 1,
        open: raw.info.p / 1,
        volume: raw.info.v / 1,
        amount: raw.info.a / 1,
        total: raw.info.total / 1
    };
    if (raw.data instanceof Array) {
        let pc = 0;
        for (let i = 0; i < raw.data.length; i++) {
            const items = raw.data[i];
            let meta = {
                date: items[0],
                open: items[1],
                close: items[2],
                highest: items[3],
                lowest: items[4],
                volume: items[5],
                amount: items[6],
                amplitude: items[7],
                turnoverRate: items[8]
            };
            if (pc) {
                meta.change = meta.close - pc;
                meta.changePercent = (meta.change / meta.close * 100).toFixed(2) + '%';
            } else {
                meta.change = meta.changePercent = '-'
            }
            pc = meta.close;
            entity.data.push(meta);
        }
    }
    return entity;
}

/**
 * 初始化配置
 * @param {object} args 
 */
function initOptions(args) {
    args = args || {};
    const palette = merge({
        raise: '#ff0000',
        decline: '#007d00',
        plain: '#000',
        MA5: '#376cff',
        MA10: '#de9d0b',
        MA20: '#ff38ff',
        MA60: '#008000',
    }, args.palette);
    const _default = {
        container: '#chart-container',
        server: {
            url: 'https://nujump.tigerobo.com/HB_Jumper/pd.ashx',
            params: {
                js: '(x)',
                rtype: 5,
                type: 'k',
                authorityType: 'fa'
            },
            method: 'GET'
        },
        chartopt: {
            animation: false,
            title: {
                show: true,
                left: '50',
                padding: 5,
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 13,
                    rich: {}
                }
            },
            tooltip: {
                trigger: 'axis',
                confine: true,
                showContent: !supportsTouch,
                axisPointer: {
                    type: 'cross',
                    axis: 'x'
                },
                //alwaysShowContent: true,
                formatter: params => {
                    let meta = null;
                    for (let i = 0; i < params.length; i++) {
                        const line = params[i];
                        if (line.seriesName === 'price') {
                            meta = line.data[5];
                            break;
                        }
                    }
                    if (meta) {
                        const data = merge({}, meta);
                        data.change = (data.change / 1).toFixed(2);
                        data.volume = numbericFormat(data.volume);
                        data.amount = numbericFormat(data.amount);
                        data.turnoverRate = data.turnoverRate + '%';
                        return simpleTempalte(tips, data);
                    }
                },
                position: function (pos, params, el, elRect, size) {
                    var obj = {
                        top: 25
                    };
                    if (+(pos[0] < size.viewSize[0] / 2) === 0) {
                        obj['left'] = 50;
                    } else {
                        obj['right'] = 0;
                    }
                    //obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 50;
                    return obj;
                },
            },
            dataset: {
                source: []
            },
            graphic: [{
                type: 'image',
                id: 'logo',
                top: supportsTouch ? 10 : 35,
                right: '1%',
                z: -10,
                silent: true,
                style: {
                    image: loog,
                    width: supportsTouch ? 100 : 150,
                    height: supportsTouch ? 25 : 37.5
                }
            }],
            axisPointer: {
                show: true,
                snap: true,
                link: [{
                    xAxisIndex: 'all'
                }]
            },
            legend: {
                show: !supportsTouch,
                type: 'plain',
                selectedMode: false,
                itemWidth: 20,
                itemHeight: 13,
                data: ['MA5', 'MA10', 'MA20', 'MA60'],
                left: '10%'
            },
            dataZoom: [{
                    type: 'inside',
                    zoomOnMouseWheel: false,
                    //moveOnMouseMove: !supportsTouch,
                    minValueSpan: 30,
                    xAxisIndex: [0, 1]
                },
                {
                    show: !supportsTouch,
                    type: 'slider',
                    minValueSpan: 30,
                    start: 0,
                    end: 100,
                    xAxisIndex: [0, 1],
                    bottom: 0,
                    top: '92%'
                }
            ],
            grid: [{
                show: true,
                //borderColor: '#000',
                top: supportsTouch ? 0 : 25,
                left: supportsTouch ? 0 : '50',
                right: 0,
                bottom: '38%'
            }, {
                show: true,
                //borderColor: '#000',
                top: '75%',
                left: supportsTouch ? 0 : 50,
                right: 0,
                bottom: supportsTouch ? 0 : '10%'
            }],
            xAxis: [{
                type: 'category',
                scale: true,
                axisLine: {
                    show: false,
                    onZero: false
                },
                axisTick: {
                    show: false,
                    alignWithLabel: true
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    //showMaxLabel: true,
                    formatter: (val, idx) => dateFormatter(val, 'yy-MM-dd')
                },
                data: [],
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
            }, {
                type: 'category',
                scale: true,
                gridIndex: 1,
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisPointer: {
                    label: {
                        formatter: params => params.seriesData[0] ? numbericFormat(params.seriesData[0].value) : 0
                    }
                }
            }],
            yAxis: [{
                id: 'price-k',
                type: 'value',
                scale: true,
                // splitArea: {
                //     show: true
                // },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    inside: supportsTouch,
                    padding: supportsTouch ? [15, 0, 0, 0] : 0,
                    formatter: (val, idx) => !supportsTouch ? (val / 1).toFixed(2) : idx === 0 ? '' : (val / 1).toFixed(2)
                },
                boundaryGap: ['1%', '1%']
            }, {
                id: 'volume-k',
                gridIndex: 1,
                type: 'value',
                scale: true,
                position: 'left',
                splitNumber: 3,
                axisLabel: {
                    show: !supportsTouch,
                    inside: supportsTouch,
                    formatter: val => numbericFormat(val, 0)
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisPointer: {
                    label: {
                        formatter: params => numbericFormat(params.value)
                    }
                },
                boundaryGap: [0, '1%']
            }],
            series: [{
                name: 'price',
                type: 'candlestick',
                itemStyle: {
                    cursor: 'default',
                    color: 'transparent',
                    color0: palette.decline,
                    borderColor: palette.raise,
                    borderColor0: palette.decline
                },
                emphasis: false,
                barMaxWidth: '20',
                hoverAnimation: false,
                data: []
            }, {
                name: 'volumn',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                cursor: 'default',
                data: []
            }, {
                name: 'MA5',
                type: 'line',
                silent: true,
                smooth: true,
                symbol: 'none',
                lineStyle: {
                    width: 1
                }
            }, {
                id: 'MA10',
                name: 'MA10',
                type: 'line',
                silent: true,
                smooth: true,
                symbol: 'none',
                lineStyle: {
                    width: 1
                }
            }, {
                name: 'MA20',
                type: 'line',
                silent: true,
                smooth: true,
                symbol: 'none',
                lineStyle: {
                    width: 1
                }
            }, {
                name: 'MA60',
                type: 'line',
                silent: true,
                smooth: true,
                symbol: 'none',
                lineStyle: {
                    width: 1
                }
            }],
            color: ['', palette.MA5, palette.MA10, palette.MA20, palette.MA60]
        },
        palette: palette,
        dataResolver: null,
        onerror: function () {
            console.error(arguments);
        },
        update: 60 * 1000
    }
    // 股票ID
    if (args.stockid) {
        _default.server.params.id = args.stockid
    }
    // 除复权标识
    if (typeof args.authorityType !== 'undefined') {
        _default.server.params.at = args.authorityType;
    }
    if (typeof args.chartType !== 'undefined') {
        _default.server.params.type = args.chartType;
    }
    return merge(_default, args);
}

/**
 * 计算均价
 * @param {number} dayCount 天数
 * @param {Point[]} points 收盘价列表
 */
function calculateMA(dayCount, points) {
    var result = [];
    for (var i = 0, len = points.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += points[i - j].close / 1;
        }
        result.push(sum / dayCount);
    }
    return result;
}

/**
 * 获取DOM
 * @param {string|HTMLElement} query 查询
 */
function getDom(query) {
    if (query instanceof HTMLElement) {
        return query;
    } else if (typeof query === 'string') {
        return document.querySelector(query);
    } else return null;
}

/**
 * 分时图结构
 */
function KChartEntity() {
    /**
     * 基本信息
     * @type {{decimal: number, name: string,  code: string, previousClose:number, open: number, close: number, volume: number, amount: number, time: Date, total: number}}
     */
    this.info = {};
    /**
     * 点数据
     * @typedef {{date:string, open:string, close:string, lowest:string, highest: string, volume: string, amount: string, amplitude: string, turnoverRate: string, change: number}} Point
     * @type {Array.<Point>}
     */
    this.data = [];
}
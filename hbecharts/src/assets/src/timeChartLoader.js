import merge from 'lodash/merge';
import axios from 'axios'
import logo from './images/icon.png'
import dateFormatter from './utils/formatDate'
import numbericFormat from './utils/numbericFormat'

const unixBeginTicks = new Date(1970, 1, 1).getTime();
const supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;


/**
 * 分时图加载器
 * @param {ECharts} chartlib 图像类库
 * @param {object} args 分时图参数
 */
function timeChartLoader(chartlib, args) {
    const self = this;
    const _opt = this.args = initOptions(args);
    /**
     * @type {HTMLElement}
     */
    this.dom = getDom(_opt.container);
    const chart = chartlib.init(this.dom, _opt.theme, {
        renderer: _opt.renderer,
        devicePixelRatio: _opt.devicePixelRatio,
        height: _opt.height,
        width: _opt.width
    });

    // 初始配置
    chart.setOption(_opt.chartopt);
    let reload = false;
    /**
     * (异步)数据加载器，动态配置
     */
    this.dataloader = async function () {
        try {
            /**
             * @type {TimeChartEntity}
             */
            const entity = await requestData(_opt.server);
            const maxVal = entity.max * 1.05;
            const chartcfg = {
                title: {},
                grid: [{}, {}],
                dataset: {
                    dimensions: ['time', 'close', 'change', 'changePercent', 'volume', 'avgPrice', 'avg'],
                    source: entity.data
                },
                tooltip: {
                    formatter: null
                },
                xAxis: [{
                    data: []
                }, {
                    data: []
                }],
                yAxis: [{
                    max: maxVal,
                    min: maxVal * -1,
                    axisLabel: {
                        formatter: function (val, idx) {
                            const label = (val / 1 + entity.info.previousClose).toFixed(2);
                            return supportsTouch ? idx === 0 ? '' : label : label;
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: params => (params.value + entity.info.previousClose).toFixed(2)
                        }
                    }
                }, {}, {
                    max: maxVal,
                    min: maxVal * -1,
                    axisLabel: {
                        formatter: function (val, idx) {
                            const label = (val / entity.info.previousClose * 100).toFixed(2) + '%';
                            return supportsTouch ? idx === 0 ? '' : label : label;
                        }
                    }
                }],
                series: []
            };
            const beginDate = chartcfg.dataset.source[0] ?
                Date.parse(new Date(chartcfg.dataset.source[0].time).toDateString()) :
                Date.parse(entity.info.time.toDateString());

            if (!supportsTouch) {
                chartcfg.title.text = formatTitle({
                    code: entity.info.code,
                    name: entity.info.name,
                    time: entity.info.time,
                    close: entity.info.close,
                    pc: entity.info.previousClose,
                    volume: entity.info.volume
                });
                chartcfg.tooltip.formatter = params => {
                    const title = formatTitle({
                        code: entity.info.code,
                        name: entity.info.name,
                        time: params[0].data.time,
                        close: params[0].data.close,
                        pc: entity.info.previousClose,
                        volume: params[0].data.volume
                    });
                    chart.setOption({
                        title: {
                            text: title
                        }
                    });
                }
            }

            const timerange = merge([], entity.info.timerange);
            let t, range = [],
                timepoint = [];
            while (t = timerange.shift() / 1) {
                if (range.length < 1) {
                    range.push(t);
                } else {
                    range.push(t);
                    const n = (range[1] - range[0]) / 60;
                    for (let i = 1; i <= n; i++) {
                        const p = new Date((range[0] + 60 * i) * 1000 + beginDate);
                        const item = {
                            value: dateFormatter(p, 'yyyy-MM-dd HH:mm')
                        };
                        timepoint.push(item);
                    }
                    range = [];
                }
            }
            chartcfg.xAxis[0].data = chartcfg.xAxis[1].data = timepoint;
            if (supportsTouch) {
                chartcfg.xAxis[0].data[0].textStyle = {
                    padding: [0, 0, 0, 30]
                };
                const last = chartcfg.xAxis[0].data.length - 1;
                chartcfg.xAxis[0].data[last].textStyle = {
                    padding: [0, 30, 0, 0]
                };
            } else {
                chartcfg.grid[0].left = chartcfg.grid[1].left = 6 * (maxVal.toFixed(entity.info.decimal).length) + 15;
                chartcfg.grid[0].right = chartcfg.grid[1].right = 6 * ((maxVal / entity.info.previousClose * 100).toFixed(2).length + 2) + 15;
            }
            let stocktype = 'default'
            if (['1', '2', '4', '5', '6', '7', '8', '9', '10', '13', '80'].indexOf(entity.info.jys) >= 0) {
                stocktype = 'hs';
            }
            chartcfg.xAxis[0].axisLabel = timeLabelRenderer({
                type: stocktype,
                timerange: entity.info.timerange
            });
            chartcfg.xAxis[1].axisLabel = timeLabelRenderer({
                type: stocktype,
                timerange: entity.info.timerange
            });
            chart.setOption(chartcfg);
            if (!reload) chart.hideLoading();
        } catch (error) {
            if (!reload) chart.hideLoading();
            reporterror(error, 'loaddata');
        } finally {
            reload = true;
        }
    }
    let delay;
    if (supportsTouch) {
        this.dom.addEventListener('touchend', function (e) {
            clearTimeout(delay);
            delay = setTimeout(() => {
                chart._zr.handler.dispatch('mousemove', {
                    zrX: -1,
                    zrY: -1
                });
            }, 2500);
        });
    }
    return chart;

    /**
     * 格式化标题
     * @param {object} data 数据
     * @param {string} data.name 名称
     * @param {string} data.code 代码
     * @param {Date} data.time 时间
     * @param {number} data.close 收盘价
     * @param {number} data.pc 昨收
     * @param {number} data.volume 成交量
     */
    function formatTitle(data) {
        const change = (data.close - data.pc).toFixed(2),
            cp = (change / data.pc * 100).toFixed(2),
            color = change > 0 ? 'r' : change < 0 ? 'd' : 'p';
        return `${data.name}[${data.code}]` +
            ` ${dateFormatter(data.time, 'HH:mm:ss')}` +
            ` 价格：{${color}|${data.close}}` +
            ` 涨幅：{${color}|${cp}%}` +
            ` 成交量：${data.volume}`;
    }

    /**
     * @returns {TimeChartEntity}
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

export default timeChartLoader;

/**
 * resolve data
 * @param {*} raw 原始json
 * @return {TimeChartEntity} 格式化后的分时数据
 */
function resolveData(raw) {
    console.log('raw', raw);
    const entity = new TimeChartEntity();
    entity.info = {
        //decimal: number,
        name: raw.name,
        code: raw.code,
        previousClose: raw.info.yc / 1,
        close: raw.info.c / 1,
        volume: raw.info.v,
        time: new Date(raw.info.time),
        jys: raw.info.jys
    };
    entity.info.decimal = /0(.(0+))?/.exec(raw.info.pricedigit).pop().length;
    const timerange = raw.info.ticks.split('|').map(i => parseInt(i));
    timerange.splice(0, 3);
    entity.info.timerange = timerange;
    if (raw.data instanceof Array) {
        const pc = entity.info.previousClose;
        let lastClose = pc,
            max = 0;
        for (let i = 0; i < raw.data.length; i++) {
            const items = raw.data[i];
            const meta = {
                time: items[0],
                close: items[1],
                change: items[1] - pc,
                volume: items[2],
                avgPrice: items[3],
                avg: items[3] - pc
            };
            meta.changePercent = (meta.change / pc * 100).toFixed(2);
            meta.volumeDir = meta.close - lastClose;
            entity.data.push(meta);
            lastClose = meta.close / 1;
            if (!parseFloat(meta.avgPrice)) {
                meta.avgPrice = '-';
            }
            const p = isNaN(meta.avgPrice) ? Math.abs(meta.change) : Math.max(Math.abs(meta.change), Math.abs(meta.avgPrice - pc));
            max = Math.max(p, max);
        }
        entity.max = max;
    }
    console.log('formatted', entity);
    return entity;
}

/**
 * 轴标签显示器
 * @param {object} args 参数
 * @param {Array.<number>} args.timerange 事件范围
 * @param {string} args.type 类型
 * @param {boolean} args.show 是否显示
 * @param {number} args.limit 限制标签数
 */
function timeLabelRenderer(args) {
    const _opt = merge({
        type: 'hs',
        timerange: [],
        show: true,
        limit: 5
    }, args);
    const marked = [],
        tagmap = {};
    marked.push(dateFormatter(new Date(_opt.timerange[0] * 1000 + unixBeginTicks), 'HH:mm'));
    marked.push(dateFormatter(new Date(_opt.timerange[_opt.timerange.length - 1] * 1000 + unixBeginTicks), 'HH:mm'));
    for (let i = 1; i < _opt.timerange.length - 1; i++) {
        const tick = _opt.timerange[i] * 1000 + unixBeginTicks;
        const time = dateFormatter(new Date(tick), 'HH:mm');
        if (i % 2 !== 0 && marked.length >= _opt.limit) break;
        if (i % 2 === 0) {
            tagmap[marked[i - 1]] = `${marked[i - 1]}/${time}`;
        } else {
            marked.splice(marked.length - 1, 0, time);
        }
    }
    const ranges = [];
    let r, tmp = [];
    while (r = _opt.timerange.shift()) {
        tmp.push(r);
        if (tmp.length >= 2) {
            ranges.push(tmp);
            tmp = [];
        }
    }
    findmiddle(ranges);
    return {
        show: _opt.show,
        interval: (idx, val) => {
            const cur = dateFormatter(val, 'HH:mm');
            return marked.indexOf(cur) >= 0 || idx === 0;
        },
        formatter: (val, idx) => {
            const time = dateFormatter(val, 'HH:mm'),
                mapped = tagmap[time];
            return typeof mapped === 'undefined' ? time : mapped;
        }
    }

    /**
     * 查找中线
     * @param {number[][]} ranges 范围
     */
    function findmiddle(ranges) {
        if (marked.length >= _opt.limit) return;
        const nextranges = [];
        for (let i = 0; i < ranges.length; i++) {
            const range = ranges[i];
            if (range instanceof Array) {
                const sub = range[1] - range[0];
                const tick = (sub % 2 === 0 ? sub / 2 : (sub - 1) / 2) + range[0],
                    time = new Date(tick * 1000 + unixBeginTicks),
                    ft = dateFormatter(time, 'HH:mm');
                marked.splice(marked.length - 1, 0, ft);
                tagmap[ft] = '';
                for (let i = 0; i < range.length; i++) {
                    const r = range[i];
                    if (r < tick) {
                        nextranges.push([r, tick]);
                    } else {
                        nextranges.push([tick, r]);
                    }
                }

            }
        }
        findmiddle(nextranges);
    }
}

/**
 * 初始化配置
 * @param {object} args 
 */
function initOptions(args) {
    args = args || {};
    const palette = merge({
        raise: '#c23531',
        decline: '#749f83',
        plain: '#000'
    }, args.palette);
    const _default = {
        container: '#chart-container',
        server: {
            url: 'https://nujump.tigerobo.com/HB_Jumper/pd.ashx',
            params: {
                js: '(x)',
                rtype: 5,
                style: 'top',
                type: 'r'
            },
            method: 'GET'
        },
        chartopt: {
            animation: false,
            title: {
                show: !supportsTouch,
                left: 50,
                padding: 5,
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 13,
                    rich: {
                        r: {
                            color: palette.raise,
                            fontWeight: 'normal',
                            fontSize: 13
                        },
                        d: {
                            color: palette.decline,
                            fontWeight: 'normal',
                            fontSize: 13
                        },
                        p: {
                            color: palette.plain,
                            fontWeight: 'normal',
                            fontSize: 13
                        }
                    }
                }
            },
            graphic: [{
                type: 'image',
                id: 'logo',
                top: supportsTouch ? 10 : 35,
                right: supportsTouch ? 10 : 80,
                z: -10,
                silent: true,
                style: {
                    image: logo,
                    width: supportsTouch ? 100 : 150,
                    height: supportsTouch ? 25 : 37.5
                }
            }],
            dataset: {
                source: [],
                dimensions: ['time', 'close', 'change', 'changePercent', 'volume', 'avgPrice']
            },
            grid: [{
                show: true,
                top: supportsTouch ? 0 : 20,
                left: supportsTouch ? 0 : 50,
                right: supportsTouch ? 0 : 50,
                bottom: '32%'
            }, {
                show: true,
                left: supportsTouch ? 0 : 50,
                right: supportsTouch ? 0 : 50,
                top: '75%',
                bottom: supportsTouch ? 0 : 10
            }],
            tooltip: {
                show: !supportsTouch,
                trigger: 'axis',
                axisPointer: {
                    id: 'close-line',
                    type: 'cross',
                    axis: 'x'
                }
            },
            axisPointer: {
                show: true,
                snap: true,
                link: [{
                    xAxisIndex: 'all'
                }],
                label: {
                    backgroundColor: '#333'
                }
            },
            xAxis: [{
                type: 'category',
                gridIndex: 0,
                boundaryGap: false,
                axisLabel: {
                    showMinLabel: true,
                    showMaxLabel: true,
                    color: '#000',
                    formatter: (val, idx) => dateFormatter(val, 'HH:mm')
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    alignWithLabel: true
                }
            }, {
                type: 'category',
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    alignWithLabel: true
                },
                gridIndex: 1,
                axisPointer: {
                    label: {
                        formatter: params => params.seriesData[0] ? params.seriesData[0].data.volume : 0
                    }
                }
            }],
            yAxis: [{
                id: 'price-time',
                gridIndex: 0,
                type: 'value',
                scale: true,
                position: 'left',
                boundaryGap: false,
                splitNumber: 7,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    color: val => val > 0 ? palette.raise : val < 0 ? palette.decline : palette.plain,
                    padding: supportsTouch ? [10, 0, 0, 0] : 0,
                    inside: supportsTouch
                },
                axisPointer: {},
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            }, {
                id: 'volume-time',
                gridIndex: 1,
                type: 'value',
                scale: true,
                position: 'left',
                splitNumber: supportsTouch ? 2 : 3,
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    formatter: (val, idx) => supportsTouch ? idx === 0 ? '' : numbericFormat(val, 0) : numbericFormat(val, 0),
                    padding: supportsTouch ? [10, 0, 0, 0] : 0,
                    inside: supportsTouch
                },
                axisTick: {
                    show: false
                },
                axisPointer: {
                    label: {
                        formatter: params => numbericFormat(params.value)
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            }, {
                id: 'percent-time',
                gridIndex: 0,
                type: 'value',
                scale: true,
                position: 'right',
                splitNumber: 7,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    color: val => val > 0 ? palette.raise : val < 0 ? palette.decline : palette.plain,
                    padding: supportsTouch ? [10, 0, 0, 0] : 0,
                    inside: supportsTouch
                },
                axisPointer: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }],
            series: [{
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
                smooth: false,
                showSymbol: false,
                symbol: 'circle',
                sampling: 'max',
                itemStyle: {
                    color: '#326fb2'
                },
                areaStyle: {
                    color: '#66CAFE',
                    opacity: 0.2,
                    origin: 'start'
                },
                encode: {
                    x: 'time',
                    y: 'change'
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
                    y: 'avg'
                }
            }, {
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
            }, {
                type: 'line',
                silent: true,
                symbol: 'none',
                xAxisIndex: 0,
                yAxisIndex: 2,
                lineStyle: {
                    opacity: 0
                },
                encode: {
                    x: 'time',
                    y: 'change'
                }
            }]
        },
        palette: palette,
        dataResolver: null,
        onerror: function () {
            console.error(arguments);
        },
        update: 40 * 1000
    };
    // 股票ID
    if (args.stockid) {
        _default.server.params.id = args.stockid
    }
    // 是否盘前
    if (typeof args.iscr !== 'undefined') {
        _default.server.params.iscr = args.iscr;
    }
    return merge(_default, args);
}



/**
 * 获取DOM
 * @param {string|HTMLElement} query 查询
 * @returns {HTMLElement}
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
function TimeChartEntity() {
    /**
     * 基本信息
     * @type {{jys: string,decimal: number, name: string,  code: string, previousClose: number, close: number, volume: number, time: Date, timerange: number[]}}
     */
    this.info = {};
    /**
     * 点数据
     * @typedef {{time: string, close: (number|string), changePercent:  (number|string), volume:  (number|string)}} Point
     * @type {Array.<Point>}
     */
    this.data = [];
    this.max = 0;
}
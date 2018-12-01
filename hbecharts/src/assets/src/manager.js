
import echarts from 'echarts';
import merge from 'lodash/merge';
import timeLoader from './timeChartLoader';
import kLoader from './candlestickLoader';
export default manager;

function manager(type, args) {
    const self = this;
    this.args = merge({
        container: '#chart-container',
        server: {},
        chartopt: {},
        onerror: function () {
            console.error(arguments);
        },
        update: -1,
        theme: null,
        renderer: 'canvas',
        width: 'auto',
        height: 'auto',
        devicePixelRatio: window.devicePixelRatio
    }, args);

    this.chartType = type;
    this.inited = false;
    this.datacache = false;
    this.dataloader = null;
    this.dom = null;

    let timer, chart;
    /**
     * 加载
     */
    this.load = function () {
        chart = this.create();
        this.reload();
        this.inited = true;
        return chart;
    }

    /**
     * 创建emcharts对象
     */
    this.create = function () {
        return _init.apply(this, [type, echarts]);
    }

    /**
     * 重载
     */
    this.reload = function () {
        this.stop(false);
        _load.apply(this);

        if (this.args.update > 0) {
            timer = setInterval(function () {
                _load.apply(self);
            }, this.args.update);
        }
        return this;
    }

    /**
     * 停止自刷
     * @param {boolean} destory 是否销毁
     */
    this.stop = function (destory) {
        destory = typeof destory !== 'undefined' ? destory : true;
        clearInterval(timer);
        if (destory) {
            this.destory();
        }
        return this;
    }

    /**
     * 销毁图表实例
     */
    this.destory = function () {
        if (typeof chart.dispose === 'function')
            chart.dispose();
        chart = null;
        this.inited = false;
        return this;
    }

    function _load() {
        if (!this.inited && typeof chart.showLoading === 'function') {
            chart.showLoading();
        }
        if (typeof this.dataloader === 'function') {
            this.dataloader.apply(this, [chart]);
        } else if (typeof chart.setOption === 'function') {
            chart.setOption(this.args.chartopt);
        }
    }

    function _init(type, echarts) {
        if (['compatible', 'compatible-r', 'compatible-k'].indexOf(type) < 0 && !echarts)
            throw 'Cannot find library echarts';
        const container = this.dom = querySelector(this.args.container);
        if (!this.dom)
            throw `Cannot find such container: '${this.args.container}'`;
        switch (type) {
            case 'time':
                return timeLoader.apply(this, [echarts, args]);
            case 'k':
                return kLoader.apply(this, [echarts, args]);
            case 'compatible-k':
            case 'compatible-r':
            case 'compatible':
                //return pictureLoader.apply(this, [args, type.split('-')[1]]);
            default:
                return echarts.init(container, this.args.theme, {
                    renderer: this.args.renderer,
                    devicePixelRatio: this.args.devicePixelRatio,
                    height: this.args.height,
                    width: this.args.width
                });
        }
    }

    function querySelector(query) {
        if (query instanceof HTMLElement) {
            return query;
        } else if (typeof query === 'string') {
            return document.querySelector(query);
        }
        return null;
    }
}
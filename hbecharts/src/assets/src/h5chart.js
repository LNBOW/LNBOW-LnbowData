import chartManager from '../src/manager';
import URI from 'urijs';
import merge from 'lodash/merge';

const query = URI.parseQuery(location.search);
const chartType = query.type || 'time';
if (query.from === 'wx') {
    scriptLoader({
        url: 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js',
        success: function () {
            wx.miniProgram.getEnv(function (res) {
                console.log(res.miniprogram);
                loadchart();
            });
        }
    })
} else {
    loadchart();
}


function loadchart() {
    const args = {
        container: '#chart-container',
        renderer: 'canvas'
    };
    switch (chartType) {
        case 'k':
            merge(args, {
                stockid: '600000|SH',
                authorityType: 'fa',
                renderer: 'canvas'
            }, query);
            break;
        case 'time':
            merge(args, {
                stockid: '600000|SH',
                iscr: false,
                renderer: 'canvas'
            }, query);
            break;
        default:
            break;
    }

    const manager = new chartManager(chartType, args);
    manager.load();
}

function scriptLoader(args) {
    const _opt = merge({
        async: true,
        defer: true,
        success: function () {},
        error: function () {
            console.error(`load data error, url: ${_opt.url}`);
        }
    }, args);
    try {
        var script = document.createElement('script');
        script.setAttribute('src', _opt.url);
        if (typeof _opt.error === 'function')
            script.onerror = _opt.error;
        script.async = true;
        script.defer = true;
        script.onload = script.onreadystatechange = function (evt) {
            if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                script.onload = script.onreadystatechange = null;
                script.remove();
                if (typeof _opt.success === 'function') _opt.success.apply(null, []);
            }
        }
        document.getElementsByTagName("head")[0].appendChild(script);
    } catch (e) {
        console.error(e);
    }
}
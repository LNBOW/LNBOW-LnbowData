const chartManager = require('../src/manager');

const manager = new chartManager('time', {
    container: '#time-chart-container',
    stockid: '300059|SZ',
    iscr: false
});
manager.load();
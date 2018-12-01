const chartManager = require('../src/manager');
const URI = require('urijs');
const options = URI(window.location).search(true);

const manager = new chartManager('k', {
    container: '#k-chart-container',
    stockid: options.id || '600000|SH',
    authorityType: options.at || 'fa',
    renderer: options.renderer || 'canvas'
});
manager.load();

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
    
}
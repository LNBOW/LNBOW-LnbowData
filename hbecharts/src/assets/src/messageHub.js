/**
 * 消息处理器
 * @param {string} type message类型
 */
export default function messageHub(type) {
    var orgin = location.protocol + '//' + location.host;
    var client = window.parent;
    this.connected = false;
    $(window).on('message', function (e) {
        var event = e.origin ? e : e.originalEvent;
        /** @type {Window} */
        var source = event.source;
        if (event.origin !== window.location.host) return;
        if (event.data === 'connecting') {
            source.postMessage('connected', orgin);
            client = source;
            this.connected = true;
        }
    });
    /**
     * 发送消息
     * @param {string} msg 消息
     */
    this.send = function (msg) {
        client.postMessage(msg, orgin);
    }
    this.onreceivemsg = function (e) {
        console.log(e);
    }
}
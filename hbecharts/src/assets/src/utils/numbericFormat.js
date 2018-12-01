/**
 * 科学计数格式化数据(加单位)
 * @param {string|number} data 数据
 * @returns {string} 格式化结果
 */
module.exports = function numbericFormat(data, fixed) {
    if(typeof fixed !== 'number') fixed = 2;
    var item = parseFloat(data);
    if (!isNaN(item)) {
        var symbol = item < 0 ? -1 : item > 0 ? 1 : 0;
        if (item < 0) item = item * -1;
        if ((item > 0 && item < 1e4) || (item < 0 && item > -1e4)) {
            return (item * symbol).toFixed(fixed).toString();
        } else if ((item > 0 && item < 1e6) || (item < 0 && item > -1e6)) {
            item = item / 10000;
            return item.toFixed(2) * symbol + "万";
        } else if ((item > 0 && item < 1e7) || (item < 0 && item > -1e7)) {
            item = item / 10000;
            return item.toFixed(1) * symbol + "万";
        } else if ((item > 0 && item < 1e8) || (item < 0 && item > -1e8)) {
            item = item / 10000;
            return item.toFixed(0) * symbol + "万";
        } else if ((item > 0 && item < 1e10) || (item < 0 && item > -1e10)) {
            item = item / 1e8;
            return item.toFixed(2) * symbol + "亿";
        } else if ((item > 0 && item < 1e11) || (item < 0 && item > -1e11)) {
            item = item / 1e8;
            return item.toFixed(1) * symbol + "亿";
        } else if ((item > 0 && item < 1e12) || (item < 0 && item > -1e12)) {
            item = item / 1e8;
            return item.toFixed(0) * symbol + "亿";
        } else if ((item > 0 && item < 1e14) || (item < 0 && item > -1e14)) {
            item = item / 1e12;
            return item.toFixed(1) + "万亿";
        } else if ((item > 0 && item < 1e16) || (item < 0 && item > -1e16)) {
            item = item / 1e12;
            return item.toFixed(0) * symbol + "万亿";
        } else {
            return item;
        }
    }
    return '-';
}
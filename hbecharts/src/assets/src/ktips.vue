<style>
    table.echarts-tooltip thead td {text-align: center;}
    table.echarts-tooltip tbody td:first-child {text-align: left;}
    table.echarts-tooltip tbody td:nth-child(2) {text-align: right;}
</style>
<table class="echarts-tooltip">
    <thead><tr><td colspan="2">{{date}}</td></tr></thead>
    <tbody>
        <tr><td>开盘</td><td>{{open}}</td></tr>
        <tr><td>收盘</td><td>{{close}}</td></tr>
        <tr><td>最高</td><td>{{highest}}</td></tr>
        <tr><td>最低</td><td>{{lowest}}</td></tr>
        <tr><td>涨跌幅</td><td>{{change}}</td></tr>
        <tr><td>涨跌额</td><td>{{changePercent}}</td></tr>
        <tr><td>成交量</td><td>{{volume}}</td></tr>
        <tr><td>成交额</td><td>{{amount}}</td></tr>
        <tr><td>振幅</td><td>{{amplitude}}</td></tr>
        <!-- <tr><td>换手率</td><td>{{turnoverRate}}</td></tr> -->
    </tbody>
</table>
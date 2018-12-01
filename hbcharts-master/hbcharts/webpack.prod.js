const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const packageInfo = require('./package.json');

module.exports = [{
    mode: 'production',
    entry: {
        h5chart: './src/h5chart.js'
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.(png|jpg|gif)$/i,
            use: [{
                loader: 'url-loader'
            }]
        }, {
            test: /\.vue$/,
            use: 'html-loader?minimize'
        }]
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/h5chart.html',
            hash: true
        })
    ]
}]
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = [{
    mode: 'development',
    entry: {
        h5chart: './src/h5chart.js'
    },
    output: {
        filename: '[name].js',
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
    ],
    devServer: {
        https: true,
        contentBase: __dirname,
        compress: true,
        host: '0.0.0.0',
        port: 8080,
        public: 'localhost:8080',
        pfx: fs.readFileSync('./docs/tigerobo.com.pfx'),
        pfxPassphrase: 'user@123',
        openPage: 'dist',
        watchContentBase: true,
        watchOptions: {
            poll: 1000
        }
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
}, {
    mode: 'development',
    entry: {
        'hb-chartmanager': './index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist', 'lib'),
        library: 'chartManager',
        libraryTarget: 'umd'
    },
    externals: {
        echarts: 'echarts'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/transform-runtime']
                }
            }
        }, {
            test: /\.(png|jpg|gif)$/i,
            use: [{
                loader: 'url-loader'
            }]
        }, {
            test: /\.vue$/,
            use: 'raw-loader'
        }]
    },
    devtool: 'source-map',
}]
//const webpack = require('webpack');
const path = require('path');
module.exports = [{
    mode: 'production',
    entry: {
        'merge': './src/utils/merge.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist', 'lib'),
        library: 'merge',
        libraryTarget: 'umd'
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
        }]
    }
}, {
    mode: 'none',
    entry: {
        'hb-chartmanager': './index.js',
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'chartManager',
        libraryTarget: 'umd'
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
            test: /\.vue$/,
            use: 'raw-loader'
        }, {
            test: /\.(png|jpg|gif)$/i,
            use: [{
                loader: 'url-loader'
            }]
        }]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.BannerPlugin({
            banner: `${packageInfo.name}@${packageInfo.version}, hash: [hash]`
        }),
        new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                ie8: true,
                ecma: 5,
                compress: {
                    drop_console: true
                }
            }
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}]
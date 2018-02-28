var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var conf = {
    serverHost: 'http://happymmall.com'
};
//环境变量的配置 dev / online

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';


//获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
};

//webpack config
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js'],
        'result': ['./src/page/result/index.js']
    },
    output: {
        path: './dist',
        publicPath: '/dist/',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.(jpg|png|gif|svg|woff|eot|ttf)\??.*$/, loader: "url-loader?limit=100&name=resource/[name].[ext]"},
            {test: /\.string/, loader: 'html-loader'}
        ]
    },
    resolve: {
        alias: {
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image',
            node_modules: __dirname + '/node_modules',
        }
    },
    plugins: [
        //独立通用模块儿到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        //把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //html 模板处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
    ],
    devServer: {
        proxy: {
            '/product': {
                target: conf.serverHost,
                // pathRewrite:{'^/api':''},
                changeOrigin: true
            }
        }
    }
};

if (WEBPACK_ENV === 'dev') {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config;
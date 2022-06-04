const webpack = require("webpack")
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');

module.exports = merge(baseConfig, {
    mode: 'production',

    // 生产环境
    // 'nosources-sources-map': 看到源码目录结构，但具体内容会被隐藏，仍可在Console中查看源码错误栈或日志的准确行数
    // 'hidden-sources-map': 不会在 bundle 文件中添加对 map 文件的引用，
    // 可以利用第三方服务 Sentry错误跟踪平台，将 map 上传
    devtool: 'nosources-sources-map', 

    plugins: [
        // 使用 DefinePlugin 添加环境变量：
        new webpack.DefinePlugin({
            /**
             * * 启用 mode: 'production' 后, 自动添加，无需再重复设置。
             * * DefinePlugin 在替换环境变量时对于字符串类型的值进行的是完全替换，
             * * 不添加 JSON.stringify 在替换后会变成变量名，而非字符串。
             */
            'process.env.NODE_ENV': JSON.stringify('production'), // 等价于 mode: 'production'
            IS_PRODUCTION: true,
            CONSTANTS: JSON.stringify({
                TYPES: ['foo', 'bar']
            })
        })
    ]
})
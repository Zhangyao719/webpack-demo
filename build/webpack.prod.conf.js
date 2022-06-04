const webpack = require("webpack")
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');

module.exports = merge(baseConfig, {
    mode: 'production',

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
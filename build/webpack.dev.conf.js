const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');

module.exports = merge(baseConfig, {
    mode: 'development',

    // source-map 的形式：'cheap-module-eval-source-map'、'cheap-source-map'、'eval-source-map'等
    // 'cheap-module-eval-source-map' 属于打包速度和源码信息还原度折中的形式
    devtool: 'cheap-module-eval-source-map',
})
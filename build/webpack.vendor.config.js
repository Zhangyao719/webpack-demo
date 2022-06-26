const path = require('path');
const webpack = require('webpack');

const dllAssetPath = path.join(__dirname, 'dll')

// 导出的 dll library 的名字，它需要与 output.library的值对应
const dllLibraryName = '[name][hash:6]'

module.exports = {
    mode: 'production',
    entry: {
        vendor: [
            'moment',
            // 'axios',
            // 'vue',
            // 'vuex',
            // 'vue-router',
            // 'vue-i18n',
            // 'vuex-router-sync',
            // 'vue-class-component',
            // 'vue-property-decorator',
            // 'vuex-class',
            // '@ant-design/icons/lib/dist.js',
            // 'echarts',
        ],
    },
    output: {
        filename: '[name]-[hash:6].dll.js',
        path: dllAssetPath,
        library: dllLibraryName,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../'),
            typings: path.resolve(__dirname, '../../typings/'),
        },
    },
    plugins: [
        new webpack.DllPlugin({
            // 定义打包的公共vendor文件对外暴露的函数名（导出的 dll library 的名字），需要与 output.library的值对应
            name: dllLibraryName,

            // manifest.json文件的输出位置（资源清单绝对路径），业务代码打包时将会使用这个清单进行模块索引
            path: path.join(__dirname, '/dll/[name]-manifest.json'),

            // manifest缓存文件的请求上下文（默认为webpack执行环境上下文）
            context: process.cwd(),
        }),
    ],
};

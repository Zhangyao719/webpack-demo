const webpack = require("webpack")
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin'); // js 压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css 压缩
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(baseConfig, {
    mode: 'production',

    output: {
        // 更改资源的URL，不使用旧的缓存资源
        filename: '[name]@[hash].js',
    },

    // 生产环境
    // 'nosources-sources-map': 看到源码目录结构，但具体内容会被隐藏，仍可在Console中查看源码错误栈或日志的准确行数
    // 'hidden-sources-map': 不会在 bundle 文件中添加对 map 文件的引用，
    // 可以利用第三方服务 Sentry错误跟踪平台，将 map 上传
    devtool: 'nosources-sources-map', 

    plugins: [
        // 更改资源的URL，不使用旧的缓存资源
        new MiniCssExtractPlugin({
            filename: '[name].[hash:6].css',
            chunkFilename: '[name].[id].[hash:6].css',
        }),

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
        }),

        // bundle 体积监控
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
            generateStatsFile: true, // 是否生成stats.json文件
        })
    ],

    optimization: {
        // minimize: true, // 压缩js代码，开启 mode: 'production'后, 不需要人为设置。
        // 覆盖默认的 minimizer
        minimizer: [
            // js 压缩
            new TerserPlugin({
                test: /\.js(\?.*)?$/i, // terser 作用范围
                exclude: /\excludes/, // 默认：undefined，排除某些文件
                parallel: true, // 默认：false，强烈建议开启，允许使用多个进程进行压缩（可通过传入数字来指定）
                sourceMap: true, // 默认：false，是否生成 source map (须同时存在devtool配置)
            }),

            // css 压缩
            // new OptimizeCSSAssetsPlugin({}),
            new OptimizeCSSAssetsPlugin({
                // 生效范围，只压缩匹配到的资源
                // assetNameRegExp: /\.optimize\.css$/g, 
                // 压缩处理器 默认为cssnano
                // cssProcessor: require('cssnano'),
                // 压缩处理器配置
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
                // 是否展示log
                canPrint: true
            })
        ],
    }
})
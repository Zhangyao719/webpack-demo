const path = require('path')
const webpack = require("webpack") // 启用热重载的第一步 - 导入webpack模块
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 启用分离样式第一步
const { styleLoaders } = require('./build/style-loaders');

module.exports = {
  /**
   * * 入口文件 支持字符串、数组、对象、函数
   * * 单入口 chunk name 默认为 main
   * * vendor: ['react', 'react-dom'] 支持第三方公共模块提取
   */
  entry: './src/index.js',

  /**
   * * 资源配置出口
   * * filename: 输出资源文件名 支持模板语法[hash] [chunkhash][id][query]
   * * path: 必须绝对路径
   * * publicPath: js引入资源的路径
   */
  output: {
    // filename: '[name]@[hash].js',
    // filename: 'bundle.js',
    filename: '[name].js',
    path: path.join(__dirname, '/dist'),
    publicPath: './public/',
  },


  mode: 'development',

  // 配置 webpack-dev-server:
  devServer: {
      publicPath: '/dist/',
      open: true, // 自动打开浏览器
      port: 8888, // 设置启动时的运行端口
      hot: true, // 启用热重载的第二步
    // compress: true,


    // webpack5中访问静态资源的配置 必须放在static对象中:
    // static: {
    //   *目录:
    //   directory: path.join(__dirname, 'dist'),
    //   *可通过`http://localhost:8080${publicPath}/bundle.js` 访问到该静态资源
    //   publicPath: '/dist',
    // },
  },

  /**
   * * 与loader相关的配置都在module对象中
   * * rules代表了模块的处理规则
   * * test: 可接受正则表达式, 匹配成功的模块会使用这条规则
   * * use: 可接受数组 包含该规则所使用的loader
   * * exclude: 排除某些模块 不执行此规则 (优先级高于include)
   * * include: 包含某些模块
   * * resource: 被加载模块 (test、exclude、include本质上属于对resource的配置)
   * * issuer: 加载者
   * * enforce: 强制指定loader的作用顺序 pre: 所有正常loader之前执行, post: 在所有loader之后执行
   */
  module: {
    rules: [
      // * css-loader / style-loader (mini-css-extract-plugin 替代)
      // 写法一:
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      //   exclude: /node_modules/, // 必加项
      // }
      // 写法二:
      // {
      //   use: ['style-loader', 'css-loader'],
      //   resource: {
      //     test: /\.css$/,
      //     exclude: /node_modules/,
      //   },
      //   issuer: {
      //     test: /\.js$/,
      //     exclude: /node_modules/,
      //   }
      // },

      // * eslint-loader
      // eslint 使用enforce: 'pre'强制提前执行
      // {
      //   test: /\.js$/,
      //   use: 'eslint-loader',
      //   enforce: 'pre',
      // }

      // * babel-loader
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, // 启用缓存机制
            presets: [
              // 禁止将esModule转为CommonJS(否则会导致tree-shaking特效失效)
              ['@babel/preset-env', { modules: false }]
            ]
          }
        }
      },

      // * ts-loader (通过typescript和ts-loader 可以实现代码类型的检查)
      // {
      //   test: /\.ts$/,
      //   use: 'ts-loader',
      // },

      // * html-loader 将HTML文件转化为字符串并进行格式化, 让js加载
      {
        test: /\.html$/,
        use: 'html-loader',
      },

      /**
       *  * file-loader (url-loader替代)
       * * 可以在js中加载png|jpg|jpeg|gif图片资源
       */
      // {
      //   test: /\.(png|jpg|jpeg|gif)$/,
      //   use: {
      //     loader: 'file-loader',
      //     // 支持配置文件名、publicPath(会覆盖原有的output.publicPath)
      //     options: {
      //       name: '[name].[ext]',
      //       publicPath: './public'
      //     }
      //   },
      // },

      /**
       * * url-loader
       * * 可以设置阈值, 超过阈值 生成publicPath, 小于阈值 返回文件base64形式编码
       */
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            publicPath: './public',
            limit: 1024,
          }
        },
      },

      // * 安装自定义loader
      {
        test: /\.js$/,
        use: {
          loader: 'force-strict-loader',
          options: {
            sourceMap: true,
          }
        },
      },

      // * 启用分离样式第二步 (已整合进 build/style-loader)
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {
      //         publicPath: '../'
      //       },
      //     },
      //     'css-loader',
      //   ]
      // },

      // * sass-loader (已整合进 build/style-loader)
      // source map只能单独添加
      // {
      //   test: /\.scss$/,
      //   // use: ['style-loader', 'css-loader', 'sass-loader'],
      //   use: [
      //     'style-loader',
      //     { loader: 'css-loader', options: { sourceMap: true } },
      //     { loader: 'sass-loader', options: { sourceMap: true } },
      //   ]
      // },

      // * postcss-loader (已整合进 build/style-loader)
      // {
      //   test: /\.css/,
      //   use: ['style-loader', 'css-loader', 'postcss-loader'],
      // }

      // ...utils.styleLoaders({
      //   sourceMap: true,
      //   usePostCSS: true,
      //   extract: true,
      // })
      ...styleLoaders({
        sourceMap: true,
        usePostCSS: true,
        extract: true,
      })
    ]
  },

  plugins:[
    // 启用热重载的第三步 - 创建一个热重载的模块对象
    new webpack.HotModuleReplacementPlugin(),

    // 启用分离样式第三步
    // filename: 同步加载的css资源名，chunkFilename：异步加载的css资源名
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ]
}
const path = require('path')

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
   * * publicPath: 指定资源的请求位置
   */
  output: {
    filename: '[name]@[hash].js',
    path: path.join(__dirname, '/dist'),
  },


  mode: 'development',

  // 配置 webpack-dev-server:
  devServer: {
      publicPath: '/dist/',
      open: true, // 自动打开浏览器
      port: 8888, // 设置启动时的运行端口
      // hot: true,
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
   */
  module: {
    rules: [
      // 写法一:
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      //   exclude: /node_modules/, // 必加项
      // }
      // 写法二:
      {
        use: ['style-loader', 'css-loader'],
        resource: {
          test: /\.css$/,
          exclude: /node_modules/,
        },
        issuer: {
          test: /\.js$/,
          exclude: /node_modules/,
        }
      }
    ]
  }
}
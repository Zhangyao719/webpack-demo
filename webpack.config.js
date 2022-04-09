const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist')
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
  }
}
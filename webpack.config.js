const path = require('path')
// import path from 'path'

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
    // compress: true,
    // open: true,
    // hot: true,


    // webpack5中访问静态资源的配置 必须放在static对象中:
    // static: {
    //   // 目录:
    //   directory: path.join(__dirname, 'dist'),
    //   // 可通过`http://localhost:8080${publicPath}/bundle.js` 访问到该静态资源
    //   publicPath: '/dist',
    // },
  }
}
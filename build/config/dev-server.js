exports.devServer = {
  publicPath: '/dist/',
  port: 8888, // 设置启动时的运行端口
  hot: true // 启用热重载的第二步
  //   open: true, // 自动打开浏览器
  // compress: true,

  // webpack5中访问静态资源的配置 必须放在static对象中:
  // static: {
  //   *目录:
  //   directory: path.join(__dirname, 'dist'),
  //   *可通过`http://localhost:8080${publicPath}/bundle.js` 访问到该静态资源
  //   publicPath: '/dist',
  // },
}

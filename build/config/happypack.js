// HappyPack 多线程 打包优化
// 以 babel-loader 和 HTML-loader 为例，进行多个 loader 的优化：

const HappyPack = require('happypack')

exports.rules = [
  // * babel-loader
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: 'happypack/loader?id=jsBabel', // 对应 plugins 中的 id
  },

  // * html-loader 将HTML文件转化为字符串并进行格式化, 让js加载
  {
    test: /\.html$/,
    use: 'happypack/loader?id=html', // 对应 plugins 中的 id
  }
]

// * 将 对应 loader 连同配置一并插入 plugins:
exports.plugins = [
  // babel-loader
  new HappyPack({
    id: 'jsBabel',
    loaders: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true, // 启用缓存机制
          presets: [
            // 禁止将esModule转为CommonJS(否则会导致tree-shaking特效失效)
            ['@babel/preset-env', { modules: false }]
          ]
        }
      }
    ]
  }),

  // html-loader
  new HappyPack({
    id: 'html',
    loaders: [
      {
        loader: 'html-loader',
        options: {}
      }
    ]
  })
]

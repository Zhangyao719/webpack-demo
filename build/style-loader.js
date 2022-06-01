const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [
  {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
        // options: { publicPath: '../'},
      },
      //   'style-loader', https://github.com/webpack-contrib/mini-css-extract-plugin/issues/288
      // source map只能单独添加
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
          // modules: true,
          // localIdentName: '[name]_[local]_[hash:base64:5]',
        }
      },
      'postcss-loader'
    ]
  },
  {
    test: /\.scss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
        // options: { publicPath: '../'},
      },
      // source map只能单独添加
      { loader: 'css-loader', options: { sourceMap: true } },
      { loader: 'sass-loader', options: { sourceMap: true } },
      'postcss-loader'
    ]
  }
]

/**
 * * CSS Modules
 * * 1. moduels: true
 * * 2. localIdentName 指明编译后的类名格式。（比如：style.css文件中： .title 类名编译成了 .style_title_1CFy6）
 * * 3. CSS Modules时 CSS文件导出的是一个对象，需要将对象属性添加进HTML标签：
 * import styles from './style.css'
 * document.write(`<h1 class="${styles.title}">My Webpack</h1>`);
 */

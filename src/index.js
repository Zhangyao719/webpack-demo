// css(style)-loader
import add from './modules/add-content.js'
import './style/base.css'

// html-loader
import headerHtml from './html/header.html'

// url-loader
import gif from './assets/images/read.gif'
import png from './assets/images/star.png'

// sass-loader
import './style/h1.scss'

// SplitChunks
import './modules/foo.js';

// mini-css-extract-plugins
import(/* webpackChunkName: 'page1' */ './modules/page1.js').then(() => {
    console.log('mini-css-extract-plugins');
})

add()

document.write(headerHtml)

console.log('🚀 → gif', gif)
console.log('🚀 → png', png)
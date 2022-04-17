// css(style)-loader
import add from './add-content.js'
import './style/base.css'

// html-loader
import headerHtml from './html/header.html'

// url-loader
import gif from './assets/images/read.gif'
import png from './assets/images/star.png'

// mini-css-extract-plugins
import './page1';

// sass-loader
import './style/h1.scss'

add()

document.write(headerHtml)

console.log('🚀 → gif', gif)
console.log('🚀 → png', png)
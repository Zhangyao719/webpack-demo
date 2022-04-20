const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer({
      grid: true,
      overrideBrowserslist: [
        '> 1%',
        'last 3 versions',
        'ie 8',
      ]
    })
  ]
}

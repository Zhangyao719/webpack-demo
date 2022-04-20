const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');

module.exports = {
  plugins: [
    autoprefixer({
      grid: true,
      overrideBrowserslist: [
        '> 1%',
        'last 3 versions',
        'ie 8',
      ]
    }),
    stylelint({
      config: {
        rules: {
          'block-no-empty': true,
          'function-comma-space-after': 'always',
          'declaration-colon-space-after': 'always',
          'declaration-colon-space-before': 'never',
        },
      },
    })
  ]
}

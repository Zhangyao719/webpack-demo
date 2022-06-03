const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 启用分离样式第一步


exports.cssLoaders = function (options = {}) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  };
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  };

  // * 通用loaders
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];
    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      });
    }
    // 是否需要使用 MiniCssExtractPlugin 分离样式文件
    if (options.extract) {
      return [
        MiniCssExtractPlugin.loader,
        ...loaders,
      ];
    }
    return loaders;
  }

  // * sass-loader 配置
  function generateSassResourceLoader(loaderOptions) {
    const sassLoaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];
    sassLoaders.push(...[
      {
        loader: 'sass-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      },
    ]);
    return sassLoaders;
  }

  return {
    css: generateLoaders(),
    sass: generateSassResourceLoader({ indentedSyntax: true }),
    scss: generateSassResourceLoader(),
  };
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  const output = [];
  const loaders = exports.cssLoaders(options);
  for (const extension in loaders) {
      const loader = loaders[extension];
      output.push({
        test: new RegExp(`\\.${extension}$`),
        use: [
          'style-loader',
          ...loader,
        ],
      });
  }
  return output;
};

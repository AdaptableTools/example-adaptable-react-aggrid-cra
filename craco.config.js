const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      });

      // this avoids some build warnings
      const cssMinimizer = webpackConfig.optimization.minimizer.find(
        (plugin) => plugin.constructor.name === 'CssMinimizerPlugin'
      );
      if (cssMinimizer) {
        cssMinimizer.options.minimizerOptions = {
          preset: [
            'default',
            {
              calc: false,
            },
          ],
        };
      }

      return webpackConfig;
    },
  },
};

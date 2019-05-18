const merge = require('webpack-merge');
const common = require('./webpack.common');

// Webpack plugins for production
// Compress assets after build
const CompressionPlugin = require('compression-webpack-plugin');
// Compression algorithm
const zopfli = require('@gfx/zopfli');
// Workbox plugin to generate our SW
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
// Async scripts
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

// Set NODE_ENV and BABEL_ENV to build scripts
process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    // Generate SW
    new WorkboxWebpackPlugin.GenerateSW(),
    // Async attribute to script tags
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
    // Compress assets
    new CompressionPlugin({
      compressionOptions: {
        numiterations: 15
      },
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback);
      }
    }),
  ],
});

const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

// Initialize NODE_ENV and BABEL_ENV
process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

// Common setup
const common = require('./webpack.common');

// Constants
const SERVER_ROOT_DIR = path.resolve('./build');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin({}),
  ],
  devServer: {
    contentBase: SERVER_ROOT_DIR,
    historyApiFallback: true,
    hot: true,
    compress: false,
  },
});

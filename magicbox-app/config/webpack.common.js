const path = require('path');

// Load .env
require('dotenv').config();

// Webpack plugins
// Webpack itself to get the DefinePlugin
const webpack = require('webpack');
// Clean build directory before each build
const CleanWebpackPlugin = require('clean-webpack-plugin');
// Copy content to build directory
const CopyWebpackPlugin = require('copy-webpack-plugin');
// Auto generate html index file
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Interpolate environment variables in index.html
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

// Constants
const SRC_DIR = path.resolve('./src');
const BUILD_DIR = path.resolve('./build');
const APP_ENTRY_POINT = path.resolve('./src/index.jsx');
const HTML_TEMPLATE = path.resolve('./public/index.html');

// Webpack common config definition
module.exports = {
  // Entry points and respective bundles
  entry: {
    app: APP_ENTRY_POINT,
  },
  // webpack plugins
  plugins: [
    // Define variables to be used during build process
    new webpack.DefinePlugin({
      'process.env': {
        MAPBOX_TOKEN: JSON.stringify(process.env.REACT_APP_MAPBOX_TOKEN),
        PUBLIC_URL: JSON.stringify(''),
      },
    }),
    // Clean build directory
    new CleanWebpackPlugin([BUILD_DIR], { root: path.resolve(__dirname, '../' ) }),
    // Copy content from public to build
    new CopyWebpackPlugin([{ from: 'public', to: './' }]),
    // Output an HTML importing all bundles
    new HtmlWebpackPlugin({
      inject: true,
      template: HTML_TEMPLATE,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // Interpolate references to %VARIABLE% for respective
    // value in index.html
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: '',
    }),
  ],
  // output bundle name
  output: {
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js',
    path: BUILD_DIR,
    publicPath: '/',
  },
  // loaders
  module: {
    rules: [
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: require.resolve('react-dev-utils/eslintFormatter'),
              eslintPath: require.resolve('eslint'),

            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: SRC_DIR,
      },
      // JS and JSX loader
      // Process application JS with Babel.
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            "react-app",
          ],
          customize: require.resolve('babel-preset-react-app/webpack-overrides'),
          plugins: [
            [
              require.resolve('babel-plugin-named-asset-import'),
              {
                loaderMap: {
                  svg: {
                    ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
                  },
                },
              },
            ],
          ],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          cacheCompression: true,
          compact: true,
        },
      },
      // CSS loaders
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      // image loader
      {
        test: /\.(png|jpg|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
      // Another loader here
    ],
  },
  resolve: {
    // extensions that are allowed to be imported with only the file name
    extensions: [ '.web.mjs', '.mjs', '.web.js', '.js', '.json', '.web.jsx', '.jsx' ],
  },
  // Empty mock for unused node modules
  node: {
    fs: 'empty'
  },
};

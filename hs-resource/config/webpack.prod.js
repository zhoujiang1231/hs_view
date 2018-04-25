const webpackMerge = require('webpack-merge');
const {UglifyJsPlugin} = require('webpack').optimize;
const commonConfig = require('../webpack.config');
const path = require('path');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: path.join(process.cwd(), "../vlink-data"),
    publicPath: '/',
    filename: '[name]-[hash:8].bundle.js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        exclude: /node_modules\/(?!(@angular\/material)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
            compact: true
          }
        }
      }
    ]
  },

  plugins: [
    new UglifyJsPlugin({comments: false})
  ]
});

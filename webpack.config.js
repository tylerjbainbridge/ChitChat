const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './index.js' //entry point in resources/assets/js/
  ],

  output: {
    filename: 'bundle.js', //output public/js/
    path: resolve(__dirname, 'public/js'),
  },

  context: resolve(__dirname, 'resources/assets/js'), // where the js code lives.
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
          test: /\.scss$/,
          loaders: [
              'style-loader',
              'css-loader',
              'sass-loader'
          ]
      }
    ],
  },

};

const webpack = require('webpack');
const path = require('path');
// const fs = require('fs');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /opencascade\.wasm\.wasm$/,
        type: 'javascript/auto',
        loader: "file-loader",
        options: {
          publicPath: '../../wasm/',
          outputPath: 'wasm/',
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  node: {
    fs: 'empty'
  }
};

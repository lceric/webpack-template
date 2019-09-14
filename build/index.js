// webpack 配置文件
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  devServer: {
    port: '9999',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        include: path.resolve('node_modules', 'lodash'),
        sideEffects: false
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    })
  ]
}
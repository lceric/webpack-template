// webpack 配置文件
const { Configuration } = 'webpack'
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
 * @type {Configuration}
 */
const config = {
  entry: {
    app: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  devServer: {
    port: '9999',
    host: '0.0.0.0',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: 'file-loader'
      },
      {
        include: path.resolve('node_modules', 'lodash'),
        sideEffects: false
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    })
  ]
}

module.exports = config
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin')

process.env.NODE_ENV = 'development';

module.exports = {
  devtool: 'cheap-module-source-map',
  devServer: {
    open: true,
    port: 3000,
    stats: 'minimal',
    overlay: true
  },
  entry: './src/index',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ],
  target: 'web'
}

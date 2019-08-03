const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin')

process.env.NODE_ENV = 'development';

module.exports = {
  devtool: 'cheap-module-source-map',
  devServer: {
    stats: 'minimal', // minimum info in command line
    overlay: true, // overlay browser errors
    historyApiFailCheck: true,
    disableHostCheck: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    https: false
  },
  entry: './src/index',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
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

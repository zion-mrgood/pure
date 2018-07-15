// html 插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const global = require('./global.conf.js');
const path = require('path');
module.exports = {
  output: {
    // 输出的绝对路径
    path: path.resolve(__dirname, global.assets),
    // 基础路径
    publicPath: '/',      
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: global.htmlName,
      template: global.htmlTemplate,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
  ]
}
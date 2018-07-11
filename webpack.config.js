
console.log(232)


// var path = require('path')
// var utils = require('./utils')
// var config = require('../config')
// var vueLoaderConfig = require('./vue-loader.conf')

// function resolve (dir) {
  // return path.join(__dirname, '..', dir)
// }
// module.exports = {
  // entry: {
    // app: config.dev.entry
  // },
  // output: {
    // path: config.build.assetsRoot,
    // filename: '[name].js',
    // publicPath: process.env.NODE_ENV === 'production'
      // ? config.build.assetsPublicPath
      // : config.dev.assetsPublicPath
  // },
  // resolve: {
    // extensions: ['.js', '.vue', '.json'],
    // alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      // "mockjs$": "mockjs/dist/mock-min.js",
      // "axios$": "axios/dist/axios.min.js",
      // "jquery$": "jquery/dist/jquery.min.js",
      // "zepto$": "zepto/dist/zepto.min.js",
      // "velocity$": "velocity-animate/velocity.min.js",
      // "velocity-ui$": "velocity-animate/velocity.ui.min.js",
      // "babel-polyfill$": "babel-polyfill/dist/polyfill.min.js",
      // '@': resolve('src')
    // }
  // },
  // module: {
    // rules: [
      // // {
      // //   test: /\.(js|vue)$/,
      // //   loader: 'eslint-loader',
      // //   enforce: 'pre',
      // //   include: [resolve('src'), resolve('test')],
      // //   options: {
      // //     formatter: require('eslint-friendly-formatter')
      // //   }
      // // },
      // {
        // test: /\.vue$/,
        // loader: 'vue-loader',
        // options: vueLoaderConfig
      // },
      // {
        // test: /\.js$/,
        // loader: 'babel-loader',
        // include: [resolve('src'), resolve('test')]
      // },
      // {
        // "test": /\.json$/,
        // "loader": "json-loader"
      // },
      // {
        // "test": /\.ejs$/,
        // "loader": "ejs-compiled-loader"
      // },
      // {
        // test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        // loader: 'url-loader',
        // options: {
          // limit: 10000,
          // name: utils.assetsPath('img/[name].[hash:7].[ext]')
        // }
      // },
      // {
        // test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        // loader: 'url-loader',
        // options: {
          // limit: 10000,
          // name: utils.assetsPath('media/[name].[hash:7].[ext]')
        // }
      // },
      // {
        // test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        // loader: 'url-loader',
        // options: {
          // limit: 10000,
          // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        // }
      // },
      // // {
      // //   test: path.join(require.resolve('zepto'), '../zepto.min.js'),
      // //   loader: 'exports-loader?window.$!script-loader'
      // // },
      // {
        // test: path.join(require.resolve('jquery'), '../jquery.min.js'),
        // loader: 'exports-loader?window.$!script-loader'
      // }
    // ]
  // }
// }

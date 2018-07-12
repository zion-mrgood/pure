// 路径工具
const path = require('path');
// html 插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack
const webpack = require('webpack');
// 清理插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 合并
const merge = require('webpack-merge');

console.log('webpack.config.js')

// 配置
const config = {
  
}

/**
  备用知识库和插件
  webpack-merge
  CommonsChunkPlugin
  manifest
  sideEffects tree-shaking 删除没有副作用的没有引用的代码
  bundle-loader 用于分离代码和延迟加载
  promise-loader 用promises 类似bundle-loader
  
  if (process.env.NODE_ENV !== 'production') {
    doSomething...
  }
  
  bundle分析
  webpack-chart: webpack 数据交互饼图。
  webpack-visualizer: 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。
  webpack-bundle-analyzer: 一款分析 bundle 内容的插件及 CLI 工具，以便捷的、交互式、可缩放的树状图形式展现给用户。
  
  懒加载 
  
  ProvidePugin
  
  
  import 'babel-polyfill'
  用whatwg-fetch，现代浏览器不加载babel-polyfill
  polyfills.js
  import 'babel-polyfill'
  import 'whatwg-fetch'
  
  var modernBrowser = (
    'fetch' in window &&
    'assign' in Object
  );
  
  if ( !modernBrowser ) {
    var scriptElement = document.createElement('script');
  
    scriptElement.async = false;
    scriptElement.src = '/polyfills.bundle.js';
    document.head.appendChild(scriptElement);
  }
  
  主版本号： 当API发生改变，并与之前的版本不兼容的时候
  次版本号： 当增加了功能，但是向后兼容的时候
  补丁版本号： 当做了向后兼容的缺陷修复的时候
  
  dev模式不要使用下面工具
UglifyJsPlugin
ExtractTextPlugin
[hash]/[chunkhash]
AggressiveSplittingPlugin
AggressiveMergingPlugin
ModuleConcatenationPlugin
  
*/
  // chunkFilename配置 异步加载
  // return import(/* webpackChunkName */ 'lodash').then().catch()
  // or
  // async function func(){
    // const _ = await import(/* webpackChunkName: "loadash" */ 'lodash');
    // return el
  // }
  // func().then().catch();

// ################# 以上是注释  

// module.exports = merge(target, {
  // devtool: 'inline-source-map'
// })


module.exports = {
  /** mode 模式 or --mode=production / process.env.NODE_ENV
    development
    [
      NamedChunksPlugin,
      NamedModulesPlugin
    ]
    
    production
    [
      FlagDependencyUsagePlugin,
      FlagIncludedChunksPlugin,
      ModuleConcatenationPlugin,
      NoEmitOnErrorsPlugin,
      OccurrenceOrderPlugin,
      SideEffectsFlagPlugin
      UglifyJsPlugin
    ]
  */
  mode: 'production',
  // 入口 entry
  entry: {
    polyfills: 'polyfills.js',
    main: 'asd',
    vendor: [
      'lodash'
    ]
  },
  // 生产环境
  devtool: 'source-map',
  // 开发环境
  devtool: 'none',
  // 开发服务器 dev-server
  devServer: {
    contentBase: './dist',
    hot: true
  },
  // 出口 output
  output: {
    // 输出文件名
    filename: '[name][chunkhash].js',
    // 输出的绝对路径
    path: path.resolve('__dirname', 'dist'),
    path: path.join('__dirname', 'dist'),
    // 基础路径
    publicPath: 'cdn',
    // 非入口chunk
    chunkFilename: '[name].bundle.js'
    
  },
  // loader 编译
  module: {
    rules: [
      // css-loader
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // image-loader
      {
        test: /\.(png|svg|jpg|gif|jpeg|JPG)$/,
        use: [
          'file-loader'
        ]
      },
      // font-loader
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      // csv|tsv-loader
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      // xml-loader
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  },
  // plugins 插件
  plugins: [
    // 压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false
      }
    }),
    // 引用html模板
    new HtmlWebpackPlugin({
      title: 'test',
      template: 'dfsl.html'
    }),
    // chunk切块
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor']
      name: 'manifest'
    }),
    // 清理
    new CleanWebpackPlugin([
      'dist'
    ]),
    // HMR需要
    new webpack.NameModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
    // 定义环境变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // 分离Css
    new ExtractTextPlugin({
      filename: 'build.min.css',
      allChunks: true
    }),
    // 保持未改动文件hash不变
    new webpack.HasheModuleIdsPlugin(),
    // 需要时引入，用时无需import
    new webpack.ProvidePlugin({
      // _: 'lodash'
      // 可以直接用join lodash里的join，如_.join() 换成 join()
      join: ['lodash', 'join']
    })
  ]
  
  
}
module.exports = config;
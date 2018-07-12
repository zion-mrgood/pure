// 路径工具
const path = require('path');
// html 插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack
const webpack = require('webpack');
// 清理插件
const CleanWebpackPlugin = require('clean-webpack-plugin');

console.log('webpack.config.js')

// 配置
const config = {
  
}

/**
  备用知识库和插件
  webpack-merge
  CommonsChunkPlugin
  manifest
*/


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
    main: 'asd',
    vendor: ''
  },
  // source-map
  devtool: 'inline-source-map',
  // 开发服务器 dev-server
  devServer: {
    contentBase: './dist',
    hot: true
  },
  // 出口 output
  output: {
    // 输出文件名
    filename: 'my-first-webpack.bundle.js',
    filename: '[name][hash].js',
    filename: '[name][chunkhash].js',
    // 输出的绝对路径
    path: path.resolve('__dirname', 'dist'),
    path: path.join('__dirname', 'dist'),
    // 基础路径
    publicPath: 'cdn'
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
    new webpack.optimize.UglifyJsPlugin(),
    // 引用html模板
    new HtmlWebpackPlugin({
      title: 'test',
      template: 'dfsl.html'
    }),
    // chunk切块
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor']
    }),
    // 清理
    new CleanWebpackPlugin([
      'dist'
    ]),
    // HMR需要
    new webpack.NameModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
  
  
}
module.exports = config;
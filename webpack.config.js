// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

// 开搞了 ######################################################################  
// 路径工具
const path = require('path')
// 粉笔插件
const chalk = require('chalk')
// webpack
const webpack = require('webpack');
// 清理插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 合并
const merge = require('webpack-merge');
// 分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// cli 配置
const minimist = require('minimist');
const getParamFromCLI = () => minimist(process.argv.slice(2));
const cliParams = getParamFromCLI();

// 配置
const env = cliParams.mode;

const global = require('./conf/global.conf.js');
const webpackCommon = require('./conf/webpack.common.conf.js');

const output = {
  production: {
    // 输出文件名
    filename: '[name].[chunkhash].js',
  },
  development: {
    // 输出文件名
    filename: '[name].js',
  }
}

const resolve = {
}
  
const rules = [
  {
    test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'media/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'fonts/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader'
    ]
  }
]

const plugins = {
  production: [
    // new webpack.optimize.UglifyJsPlugin({
      // compress: {
        // warnings: false,
        // drop_console: false
      // },
      // sourceMap: true
    // }),
    // new ExtractTextPlugin({
      // filename: 'css/[name].[contenthash].css'
    // }),
    // new OptimizeCSSPlugin({
      // cssProcessorOptions: {
        // safe: true
      // }
    // }),
    // // 保持未改动文件hash不变
    // new webpack.HashedModuleIdsPlugin(),
    // 清理
    new CleanWebpackPlugin([
      global.assets
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
  ],
  development: [
    // HMR需要
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}
  
const webpackConfig = merge(webpackCommon, {
  mode: env,
  entry: global.entry,
  devtool: env === 'production' ? 'none' : 'source-map',
  output: output[env],
  resolve: resolve,
  module: {
    rules: rules
  },
  plugins: plugins[env]
})

// development
if (env==='development') {
  // let bodyParser = require('body-parser');
  let opn = require('opn');
  let express = require('express');
  // let proxyMiddleware = require('http-proxy-middleware');

  let port = 8080;

  let autoOpenBrowser = true;

  // let proxyTable = config.dev.proxyTable;

  let app = express();
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: true }));



  let compiler = webpack(webpackConfig);

  let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
  });

  let hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000
  });

  // // proxy api requests
  // Object.keys(proxyTable).forEach(function (context) {
    // let options = proxyTable[context]
    // if (typeof options === 'string') {
      // options = { target: options }
    // }
    // app.use(proxyMiddleware(options.filter || context, options))
  // })

  app.use(devMiddleware)

  app.use(hotMiddleware)

  // let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
  // app.use(staticPath, express.static('./static'))

  let uri = 'http://localhost:' + port;

  devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
    opn(uri)
  })

  let server = app.listen(port);
}

if (env==='production') {
  
  // 分析页面 很有用的哦
  cliParams.anlyzer && webpackConfig.plugins.push(new BundleAnalyzerPlugin());
  // 开始咯
  webpack(webpackConfig, (err,stats) => {
    if (err) throw err;
    if (stats.hasErrors()) {
      console.log(chalk.bgRed(' BUILD ERROR '))
      console.log(chalk.red(stats.compilation.errors))
      process.exit(1)
    }
    // 打印内容
    console.log(stats.toString({
      colors: true,
      modules: true,
      children: false,
      chunks: true,
      chunkModules: false
    }))
    console.log(chalk.bgGreen(' BUILD SUCCESS '))
  })
}
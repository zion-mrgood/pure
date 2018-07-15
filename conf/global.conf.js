const path = require('path');
module.exports = {
  // 打包后的地址
  assets: path.resolve(__dirname,'../dist'),
  // 项目入口
  entry: {
    app: path.resolve(__dirname,'../src/index.js')
  },
  htmlName: 'index.html',
  htmlTemplate: path.resolve(__dirname,'../src/template.html')
}
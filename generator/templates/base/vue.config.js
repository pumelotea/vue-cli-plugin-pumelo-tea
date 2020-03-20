const SquirrelZooBuildPlugin = require('squirrelzoo-build-plugin')
SquirrelZooBuildPlugin.apply('vue-cli-plugin-pumelo-tea')
let plugins=[]

process.env.VUE_APP_TITLE = require("./package.json").name

module.exports = {
  lintOnSave: false,
  productionSourceMap: process.env.NODE_ENV === 'development',
  css: {
    extract: process.env.NODE_ENV !== 'development',
    // 是否构建样式地图，false 将提高构建速度
    sourceMap: false,
  },
  devServer: {
    disableHostCheck: true,
  },
  parallel: require('os').cpus().length > 1,
  configureWebpack: {  //webpack的相关配置在这里
    plugins: plugins
  }
}

const path = require('path')

module.exports = {
  postHook: function(webpackConf, options) {
    const alias = Object.assign(webpackConf.resolve.alias || {}, {
      '@components': path.join(process.cwd(), 'src/components')
    })
    webpackConf.resolve.alias = alias
  }
}

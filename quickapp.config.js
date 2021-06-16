const webpack = require('webpack')
const version = require('./package.json').version
const versionName = require('./src/manifest.json').versionName
const versionCode = require('./src/manifest.json').versionCode

module.exports = {
  cli: {
    devtool: 'none'
  },
  webpack: {
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(version),
        VERSION_NAME: JSON.stringify(versionName),
        VERSION_CODE: JSON.stringify(versionCode)
      })
    ]
  }
}

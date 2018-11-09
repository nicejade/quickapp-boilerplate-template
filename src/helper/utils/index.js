/** @format */

const files = require.context('.', true, /\.js/)
const utils = {}

files.keys().forEach(key => {
  if (key === './index.js') {
    return
  }
  Object.assign(utils, files(key).default)
})

export default utils

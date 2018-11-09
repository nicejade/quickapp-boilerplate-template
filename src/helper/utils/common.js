/** @format */

export default {
  setCurrentDate() {
    // set current Date
  },

  composeApiPath(apiName) {
    const requestBaseUrl = 'https://nicelinks.site/api/'
    return `${requestBaseUrl}${apiName}`
  },

  queryString(url, query) {
    let str = []
    for (let key in query) {
      str.push(key + '=' + query[key])
    }
    let paramStr = str.join('&')
    return paramStr ? `${url}?${paramStr}` : url
  },

  getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  },

  // 获取字符串实际长度(包含汉字,汉字统一按照 2 字节算;)
  getByteLength(str = '') {
    if (typeof str !== 'string') return str.length
    return str.replace(/[^\\x00-\xff]/g, 'aa').length
  },

  interceptString(string = '', length = 140) {
    if (this.getByteLength(string) > 140) {
      return string.substring(0, length) + '...'
    } else {
      return string
    }
  },

  setInterval(callback, interval) {
    const now = Date.now
    let startTime = now()
    let endTime = startTime
    const loop = () => {
      this.intervalTimer = global.requestAnimationFrame(loop)
      endTime = now()
      if (endTime - startTime >= interval) {
        startTime = endTime = now()
        callback()
      }
    }
    this.intervalTimer = global.requestAnimationFrame(loop)
    return this.intervalTimer
  },

  clearInterval(intervalTimerId) {
    global.cancelAnimationFrame(intervalTimerId)
    intervalTimerId = null
  }
}

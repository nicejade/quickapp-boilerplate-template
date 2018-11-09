/** @format */

export default {
  /* @desc: 统一组装 HTTP 请求的 Url 地址 */
  composeApiPath(apiName) {
    const requestBaseUrl = 'https://nicelinks.site/api/'
    return `${requestBaseUrl}${apiName}`
  },

  getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
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

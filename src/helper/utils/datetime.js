/**
 * /*
 *   DESC：对Date的扩展，将 Date 转化为指定格式的String。
 *     月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *     年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 例子：
 *     (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2018-07-02 08:09:04.423
 *     (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2018-7-2 8:9:4.18
 *
 * @format
 */

Date.prototype.Format = function(fmt = 'yyyy-MM-dd hh:mm:ss') {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}

export default {
  setCurrentTime(datetime = '') {
    global.currentTime = datetime
  },

  getCurrentTime() {
    return global.currentTime || ''
  },

  dateOffset(thatTime, nowTime) {
    if (!arguments.length) return ''

    let now = thatTime ? thatTime : new Date().getTime()
    let offsetValue = now - new Date(nowTime).getTime()
    let minute = 1000 * 60
    let hour = minute * 60
    let day = hour * 24
    let week = day * 7
    let month = day * 30
    let year = month * 12

    let unitArr = ['年前', '月前', '周前', '天前', '小时前', '分钟前', '刚刚']
    let offsetArr = [year, month, week, day, hour, minute].map((item, index) => {
      return {
        value: offsetValue / item,
        unit: unitArr[index]
      }
    })

    for (let key in offsetArr) {
      if (offsetArr[key].value >= 1) {
        return parseInt(offsetArr[key].value) + ' ' + offsetArr[key].unit
      }
    }
    return unitArr[6]
  }
}

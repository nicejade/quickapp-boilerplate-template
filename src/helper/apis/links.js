/**
 * @desc 在实际开发中，您可以将 baseUrl 替换为您的请求地址前缀；
 *
 * 已将 $apis 挂载在 global，您可以通过如下方式，进行调用：
 * $apis.example.getSomeApi().then().catch().finally()
 *
 * 备注：如果您不需要发起请求，删除 apis 目录，以及 app.ux 中引用即可；
 */

import $ajax from '../ajax'
import $utils from '../utils'

export default {
  getAllLinksCount(data) {
    return $ajax.get($utils.composeApiPath('getAllLinksCount'), data)
  },
  getNiceLinks(data) {
    return $ajax.get($utils.composeApiPath('getNiceLinks'), data)
  }
}

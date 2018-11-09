/** @format */

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

/** @format */

const prompt = require('@system.prompt')
const router = require('@system.router')
const share = require('@service.share')

/**
 * @desc 创建桌面图标
 * 注意：使用加载器测试`创建桌面快捷方式`功能时，请先在`系统设置`中打开`应用加载器`的`桌面快捷方式`权限
 */
function createShortcut() {
  const shortcut = require('@system.shortcut')
  shortcut.hasInstalled({
    success: function(ret) {
      if (ret) {
        prompt.showToast({
          message: '已创建桌面图标'
        })
      } else {
        shortcut.install({
          success: function() {
            prompt.showToast({
              message: '成功创建桌面图标'
            })
          },
          fail: function(errmsg, errcode) {
            prompt.showToast({
              message: `${errcode}: ${errmsg}`
            })
          }
        })
      }
    }
  })
}

/**
 * @desc 调起第三方分享
 */
function call3thPartyShare() {
  share.share({
    shareType: 0,
    title: '快应用分享',
    summary:
      '快应用是移动互联网新型应用生态，与手机系统深度整合，为用户提供更加场景化的体验。具备传统APP完整的应用体验，但无需安装、即点即用。',
    imagePath: '/assets/images/logo.png',
    targetUrl: 'https://nicelinks.site',
    platforms: ['SYSTEM'],
    success: function(data) {
      prompt.showToast({
        message: `已成功完成分享`
      })
      console.log(`handling success, data = ${JSON.stringify(data)}`)
    },
    fail: function(data, code) {
      prompt.showToast({
        message: `handling fail, code = ${code}, message: ${JSON.stringify(data)}`
      })
      console.log(`handling fail, code = ${code}`)
    }
  })
}

function route2aboutPage() {
  router.push({
    uri: '/pages/About'
  })
}

export default {
  createShortcut,
  showMenu() {
    const itemFuncMapping = [createShortcut, call3thPartyShare, route2aboutPage, null]
    prompt.showContextMenu({
      itemList: ['保存桌面', '分享', '关于', '取消'],
      success: ret => {
        if (itemFuncMapping[ret.index]) {
          itemFuncMapping[ret.index]()
        } else {
          // do nothing (取消)
        }
      }
    })
  },

  showToast(message = '', duration = 0) {
    if (!message) return
    prompt.showToast({
      message: message,
      duration
    })
  },

  route2theUrl(url, params) {
    router.push({
      uri: url,
      params: params
    })
  },

  route2nicelinks() {
    router.push({
      uri: 'https://nicelinks.site/explore/all?utm_source=quickapp'
    })
  }
}

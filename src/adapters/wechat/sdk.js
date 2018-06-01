import fetch from 'unfetch'
import load from 'load-script'
import EventEmitter from 'eventemitter3'
import pify from 'pify'
import pTimeout from 'p-timeout'
import pDebounce from 'p-debounce'

const JSSDK_URL = '//res.wx.qq.com/open/js/jweixin-1.2.0.js'
const JSSDK_CONFIG_API = '/v1/wechat/jssdk/config'

const JS_API_LIST = []
const WX_READY_TIMEOUT = 5000

const DEBOUNCE = 2000

class Sdk extends EventEmitter {
  constructor (options = { apis: JS_API_LIST, debug: false }) {
    super()
    this.config = {
      url: window.location.href.split('#')[0],
      jsApiList: options.apis,
      debug: options.debug,
    }
    this.sdk = void 0

    this.ready = pDebounce(this._ready, DEBOUNCE, { leading: true })
  }

  load () {
    if (this.sdk) {
      return Promise.resolve()
    }
    return pify(load)(JSSDK_URL)
      .then(() => {
        this.sdk = window.wx
        this.sdk.error((res) => {
          let error = new Error()
          error.res = res
          this.emit('error', error)
        })
        return
      })
  }

  _ready () {
    return this.load().then(() => {
      if (this.config.signature) {
        return
      }
      return fetch(JSSDK_CONFIG_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.config),
      })
        .then((response) => response.json())
        .then((body) => {
          if (body.config && body.config.signature) {
            this.config = Object.assign({}, this.config, body.config)
            this.sdk.config(this.config)
            return
          }
          throw new Error('连接微信失败，请稍后重试')
        })
    }).then(() => {
      return pTimeout(new Promise((resolve, reject) => this.sdk.ready(resolve)), WX_READY_TIMEOUT)
        .catch((err) => {
          throw(new Error('请在微信客户端中重试'))
        })
    })
  }
}

export default Sdk

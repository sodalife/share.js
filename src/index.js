import EventEmitter from 'eventemitter3'
import { isWechat } from './utils/ua'
import wechat from './adapters/wechat'

class Share extends EventEmitter {
  constructor () {
    super()

    this._listener = {
      shared: (target) => this.emit('shared', target),
      cancel: () => this.emit('cancel'),
    }
  }

  set (target, data) {
    if (isWechat()) {
      return wechat(target, data, this._listener)
    }
    return Promise.reject('invalid platform')
  }
}

const share = new Share()

export default share

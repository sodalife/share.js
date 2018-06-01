import Sdk from './sdk'

const METHODS = {
  'wechat:chat': 'onMenuShareAppMessage',
  'wechat:moment': 'onMenuShareTimeline',
  'qq': 'onMenuShareQQ',
  'tencent-weibo': 'onMenuShareWeibo',
  'qzone': 'onMenuShareQZone',
}

const sdk = new Sdk({ apis: Object.values(METHODS) })

export default function setWechatShare (target, data, listener) {
  if (target === 'all') {
    return Promise.all(Object.keys(METHODS).map((t) => setWechatShare(t, data, listener)))
  }

  let method = METHODS[target]
  let options = {
    title: data.title,
    desc: data.description,
    link: data.url,
    imgUrl: data.thumbnail,
    success: listener.shared,
    cancel: listener.cancel,
  }
  if (!method) {
    return Promise.reject(new Error('invalid target'))
  }
  return sdk.ready().then(() => sdk.sdk[method](options))
}

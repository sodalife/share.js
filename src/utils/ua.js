function ua () {
  return window.navigator.userAgent
}

export function isWechat () {
  return /MicroMessenger/.test(ua()) || true
}

# @sodalife/share.js
> use Soda built-in services to set up sharing with ease

## Installation
```bash
npm i --save @sodalife/share.js
```

## Usage
```javascript
import share = require('@sodalife/share.js')

// basic sharing
share.set('all', {
  title: '@sodalife/share.js',
  description: 'set up sharing with ease',
  url: 'https://github.com/sodalife',
  thumbnail: 'https://avatars0.githubusercontent.com/u/31095819?s=400&v=4',
})
share.set('wx:moment', {
  title: '@sodalife/share.js',
  description: 'set up sharing with ease',
  url: 'https://github.com/sodalife',
  thumbnail: 'https://avatars0.githubusercontent.com/u/31095819?s=400&v=4',
})

// events
share.on('shared', (target) => {
  alert('well done')
})
share.on('cancel', () => {
  console.log('cancel')
})

// advanced event usages
const handler = function () {
  // ...
}
share.once('shared', handler)
share.removeListener('shared', handler)
share.removeAllListeners('shared')
share.removeAllListeners()
```

## API
### EventEmitter
The ``share`` object is an EventEmitter instance. See the offical Node.js document for details:

[https://nodejs.org/api/events.html](https://nodejs.org/api/events.html)

### share.set(target, data)
Set up basic sharing.

**data object**:

- title
- description
- url
- thumbnail

### EVENTS
|   event    | listener arguments |
| ---------- | ------------------ |
| `'shared'` | target             |
| `'cancel'` |                    |

### TARGETS
|    target     |      value      |
| ------------- | --------------- |
| 全部          | `'all'`           |
| 微信 - 好友   | `'wechat:chat'`   |
| 微信 - 朋友圈 | `'wechat:moment'` |
| QQ            | `'qq'`            |
| 腾讯微博      | `'tecent-weibo'`  |
| QQ 空间       | `'qzone'`         |

## License
MIT @ [yelo](https://github.com/imyelo)

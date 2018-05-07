let store = require('store2')
let href = window.location.href
let obs = {
  v: {
    isSign: false,
    href:href.split('#')[1] || '/',
    loginKey:''
  },
  save: () => {
    store.set('obs', obs.v)
  },
  logOut: () => {
    obs.v = clearV
    store.clear()
  }
}
let clearV = merge(obs.v)


if (store.has('obs') === true) {
  obs.v = store.get('obs')
}

function merge (parent, child) {
  var i, proxy
  proxy = JSON.stringify(parent) 
  proxy = JSON.parse(proxy)
  child = child || {}
  for (i in proxy) {
    if (proxy.hasOwnProperty(i)) {
      child[i] = proxy[i]
    }
  }
  proxy = null
  return child
}
module.exports = obs


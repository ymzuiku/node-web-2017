var host = require('./exp/localhost')()
var dev = process.env.dev === '1' ? true : false
var port = 5000
var config = {
  dev:dev,
  static:'/static/', //项目根路径, 不是app路径
  port:port,
  host: host,
  href:`http://${host}:${port}`
}

Object.defineProperty(global, '__conf', {
  get:function(){
    return config
  },
  set:function(v){
    config = {
      ...config,
      ...v
    }
  }
})


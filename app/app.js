require('./config')
require('./exp/loaderLog')
require('./exp/loaderDoc')
require('./exp/loaderThreads')
require('./exp/throttle')
const Cluster = require('./exp/loaderCluster')
const path = require('path')
const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const loaderViews = require('./exp/loaderViews')
const loaderControllers = require('./exp/loaderControllers')
const browerSync = require('./exp/browerSync')




// 尝试连接mongodb
require('./exp/mgo')
// 初始化服务
let app = express()
if (dev) {
  // 取消缓存，开启跨域
  app.use(helmet.noCache())
  app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  })
} else {
  // 带上头盔
  app.use(helmet())
}

// 读取controllers里的所有router
loaderControllers(app, 'controllers')


// gzip
app.use(compression())

// 监听静态服务器
let staticPath = path.join(__dirname, '/..') + __conf.static
app.use(express.static(staticPath))

// 使用nunjucks模版 
loaderViews(app, 'views')



//使用多线程执行start
Cluster((dev, pid='') => {
  // 监听端口
  app.listen(5000)
  if (!dev) {
    app.listen(4001)
  }
  console.log(`Woker ${pid} 正在运行:${__conf.href}, 开发模式:${dev}`)
})
var nunjucks = require('nunjucks')
const path = require('path')

module.exports = (app, floder)=>{
   // 使用nunjucks模版 
  // 加载路径中的html文件
  var loadViews = () => {
    // 设置模板文件的目录，为views
    let _path = path.join(__dirname,'/..', floder)
    nunjucks.configure(_path, {
      autoescape: true,
      express: app
    });
  }
  loadViews()
  // 使用模板文件的后缀名字为html
  app.set('view engine', 'html');

  // 如果在开发环境, 每次调用app，都会重新加载模版文件，方便开发调试
  if (global.dev) {
    app.use((req, res, next) => {
      loadViews()
      next()
    })
  }
}
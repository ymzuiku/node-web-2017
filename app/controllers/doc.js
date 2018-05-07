console.log('API文档: '+__conf.href+'/api/doc')
module.exports = (app=require('express')())=>{
  // 使用例子
  // __apidoc = {
  //   title:'访问接口文档',
  //   info:'添加接口说明例子',
  //   url:'/api/doc',
  //   back:'html文件'
  // }
  app.get('/api/doc', async (req, res)=>{
    res.render('doc.html', {title:'简明API文档', host:global.href, prefix:'', list:__apidoc})
  })  
}

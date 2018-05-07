let createUser = require('../services/createUser')

module.exports = (app = require('express')()) => {
  __apidoc = {
    title:'测试get',
    url:'/api/get',
    back:'String'
  }
  app.get('/api/t', (req, res) => {
    res.send('test api')
  })

  __apidoc = {
    title:'测试get',
    url:'/api/b',
    back:'{name:aa}'
  }
  app.get('/api/b', (req, res) => {
    let test = {
      name:'dog',
      age:20,
      other:{
        otherName:'cat',
        otherAge:100
      }
    }
    res.send(test)
  })

  __apidoc = {
    title:'测试post',
    url:'/api/post2',
    back:'{name:string, total:int}'
  }
  app.post('/api/post2', (req, res) => {
    log.l(req.body)
    res.send(req.body.name)
  })

  __apidoc = {
    title:'mongo测试添加一个 cat',
    url:'/api/mongo',
    back:JSON.stringify({name:'aaa'})
  }
  app.get('/api/mongo', async (req, res)=>{
    let user = await createUser({age:22, name:'dog'})
    res.send(JSON.stringify(user))
  })
}

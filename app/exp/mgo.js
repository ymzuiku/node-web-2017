var mgo = require('mongoose')

function mongoURL(auth = {host: '',port: '',db: '',user: '',pwd: '',}) {
  let {db='learn', port='27017', host='127.0.0.1',user='learn', pwd='111Asd'} = auth
  var url = `mongodb://${host}:${port}/${db}`
  if (pwd !== '') {
    url = `mongodb://${user}:${pwd}@${host}:${port}/${db}`
  }
  return url
}

let url = mongoURL({
  db:'learn',
  user:'learn',
  pwd:'111Asd',
})

mgo.connect(url, {useMongoClient:true})
mgo.Promise = global.Promise

mgo.connection.on('connected', ()=>{
  console.log('mongoose 连接成功')
})

mgo.connection.on('error', ()=>{
  console.log('mongoose 连接异常')
})

mgo.connection.on('disconnected', ()=>{
  console.log('mongoose 断开')
})

module.exports = {mgo, mongoURL}
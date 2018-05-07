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

mgo.connect(url)
let _cat = {
  name: String,
  age: Number,
}
let s_cat = new mgo.Schema(_cat)
let Cat = mgo.model('bigs', s_cat)
function add(v = _cat) {
  var kitty = new Cat({ name: 'bbb', age: 50 })
  kitty.save((err, product, mun) => {
    if (err) {
      console.error(err)
    } else {
      console.log(product)
      return (product)
    }
  })
}

function find(v = _cat) {
  Cat.find({}, (err, res) => {
    if (err) {
      console.error(err)
    }
    let { name, ...rest } = res
    let end = {
      ...rest,
      姓名: res.name
    }
    console.log(end)
  })
}

function update(v = _cat) {
  Cat.update({}, { '$set': { age: 100 } }, (err, res) => {
    let { age, ...rest } = res
    let end = {
      ...rest,
      姓名: res.name
    }
    console.log(end)
  })

}

function remove(v = _cat) {
  Cat.remove({ name: /^z/ }, (err, res) => {
    console.log(res)
  })
}

// add()
// update()
remove()
find()
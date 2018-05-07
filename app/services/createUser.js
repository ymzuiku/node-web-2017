var {mgo} = require('../exp/mgo')
var userModel = require('../models/uesrModel')

module.exports =  (v = {...userModel}) => {
  let Cat = mgo.model('bigs', userModel)
  var kitty = new Cat(v)
  kitty.save((err, product, mun) => {
    if (err) {
      console.error(err)
    } else {
      console.log(product)
      return (product)
    }
  })
}

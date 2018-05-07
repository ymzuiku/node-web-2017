

module.exports = (app = require('express')()) => {
  app.get('/', (req, res) => {
    res.redirect('/ccos')
  })
}


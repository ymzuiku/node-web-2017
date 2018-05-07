const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const loader = require('./loader')

module.exports = (app, floder) => {
  
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  // app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
  // app.use(bodyParser.text({ type: 'text/html' }))

  let controllerRouters = express.Router()
  let _path = path.join(__dirname, '/..', floder)
  let controllerFiles = loader(_path, '.js')
  controllerFiles.map((file) => {
    let _router = require(file)
    _router(controllerRouters)
  })
  app.use('/', controllerRouters)
}
let ServiceMakeLibrary = require('../services/ServiceMakeLibrary')
let ServiceSampleData = require('../services/ServiceSampleData')

module.exports = (app = require('express')()) => {
  __apidoc = {
    title: '',
    url: '/api/ml/findData/',
    back: JSON.stringify(ServiceMakeLibrary.model.makeLibraryData),
  }
  app.post('/api/ml/findData/', async (req, res) => {
    log.l(req.body)
    ServiceMakeLibrary.findData({ start: req.body.start, size: req.body.size, }, (data) => {
      if (data) {
        res.send({ code: '200', data: data })
      } else {
        res.send({ code: '202', data: [] })
      }
    })
  })

  __apidoc = {
    title: '',
    url: '/api/ml/findTask/',
    back: JSON.stringify(ServiceMakeLibrary.model.makeLibraryTaskData),
  }
  app.post('/api/ml/findTask/', async (req, res) => {
    log.l(req.body)
    ServiceMakeLibrary.findTask({}, (data) => {
      if (data) {
        res.send({ code: '200', data: data })
      } else {
        res.send({ code: '202', data: [] })
      }
    })
  })
}

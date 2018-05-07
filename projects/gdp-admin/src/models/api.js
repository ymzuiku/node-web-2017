var { Post, Get } = require('ym-react-cli')
var { so } = require('./store')
let url = ''
let isDev = window.location.href.indexOf(':3000') > 0 || window.location.href.indexOf(':5000') > 0
if (isDev) {
  url = 'http://127.0.0.1:7000'
}

var api = {
  // 手机验证码发送接口
  login: function(data = { name: '',password:'' }, event = () => {}) {
    Post(
      url + '/api/login/',
      {name:data.name || "", password:data.password || ""},
      res => {
        if (res.Status !== 200) {
          window.msgtip(res.msg)
        } else {
          event(res)
        }
      }
    )
  },
  getusers: (data={start:0, limit:0},event) => {
    Post(url + '/api/getusers/', {
      start: data.start,
      limit: data.limit,
    }, (res) => {
      if (res.Status !== 200) {
        window.msgtip(res.msg)
      } else {
        event(res)
      }
    })
  }
}

module.exports = api

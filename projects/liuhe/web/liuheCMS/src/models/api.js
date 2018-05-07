var { Post, Get } = require('ym-react-cli')
var { so } = require('./store')
var url = 'http://192.168.199.147:7000'
var api = {
  // 手机验证码发送接口
  login: function(data = { name: '',password:'' }, event = () => {}) {
    Post(
      url + '/api/login/',
      {name:data.name || "", password:data.password || ""},
      res => {
        console.log(res.status)
        if (res.status !== 200) {
          window.msgtip(res.msg)
        } else {
          event(res)
        }
      }
    )
  },
}

module.exports = api

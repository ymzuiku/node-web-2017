let {Get, Post} = require('./ajax')
let url = ''
let isDev = window.location.href.indexOf(':3000') > 0
if (isDev) {
  url = 'http://127.0.0.1:7000'
}

let senduserING = false
let api = {
  senduser: function (data={name: '',
  danwei: '',
  zhiwei: '',
  ketizhu: '',
  mail: '',
  phone: '',
  address: '',
  server: '',
  simple: '',
  question: '',
  }, event) {
    if (senduserING === true) {
      window.msgtip('正在提交信息')
      return
    }
    Post(url + '/api/senduser/', data, (res) => {
      senduserING = false
      if (res.Status !== 200) {
        window.msgerr(res.Msg)
      } else {
        event(res)
      }
    })
    senduserING = true
  }
}

export default api
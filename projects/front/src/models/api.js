import exp from './exp'
import action from './action'
import store from './store'
let { AjaxGet, AjaxPost, dev } = exp

let url = 'http://127.0.0.1'
if (dev) {
  url = 'http://127.0.0.1:5000'
}

// 是否使用Mock模拟数据:
// https://github.com/nuysoft/Mock
if(true){
  var Mock = require('mockjs')
} else {
  var Mock = {
    setup:()=>{},
    mock:()=>{},
    Random:()=>{},
    toJSONSchema:()=>{},
    valid:()=>{},
  }
}
Mock.setup({timeout:'10-600'})
let api = {
  testGet: function (callback) {
    let uri = url+'/api/testGet/'
    Mock.mock(uri,{
      'list|5-20':[{
        'id|+1':1,
        "token":/^[a-z][A-Z][0-9]\d{5,10}/,
        "id":"@id",
        "name":"@cname",
        "info":"@cparagraph",
        "title":"@csentence",
        "create":"@date",
        "image":"@image(200x200, @color)",
        "mail":"@email"
      }]
    })
    AjaxGet({
      url: uri, reback: (res) => {
        if(callback){
          callback(res)
        }
      }
    })
  },
  testPost: function (callback) {
    AjaxPost({
      url: url + "/api/testPost/",
      data: {
        name: "hello post",
        age: 10
      },
      reback: (res) => {
        callback(res)
      }
    })
  }
}
window.api = api
export { api, action, store, url }
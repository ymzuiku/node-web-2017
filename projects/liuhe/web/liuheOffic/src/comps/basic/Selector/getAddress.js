let pako = require('pako')
let $ = require('jquery')

let formatAddress = address => {
  address = JSON.parse(address)
  let arr = []
  let formatStr = (array, title, code, data) => {
    let nextData = []
    if (data && data.length > 0) {
      for (let i = 0, len = data.length; i < len; i++) {
        let ele = data[i]
        let _title = ele.p || ele.n || ele.s || ele.m
        let _data = ele.c || ele.a || ele.b
        formatStr(nextData, _title, ele.e, _data)
      }
    }
    array.push({ title: title, code: code, data: nextData })
  }
  for (let i = 0, len = address.length; i < len; i++) {
    let ele = address[i]
    formatStr(arr, ele.p, ele.e, ele.c)
  }
  return arr
}

let getAddress =  (event)=> {
  $.get('/cdn/city.gz', data => {
    let address = pako.ungzip(data, { to: 'string' })
    window.address = formatAddress(address)
    if (event) {
      event(window.address) 
    }
  })
}
module.exports = getAddress
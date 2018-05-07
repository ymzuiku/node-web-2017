import $ from 'jquery'
import action from './action'
import store from './store'

if (window.low === undefined || window.low === null) {
  let u = navigator.userAgent
  window.android =
    u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('HUAWEI') > -1 //android终端
  if (!window.requestAnimationFrame || window.android) {
    window.low = true
  } else {
    window.low = false
  }
}

var lastTime = 0
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function (callback, element) {
    var currTime = new Date().getTime()
    var timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall)
    }, timeToCall)
    lastTime = currTime + timeToCall
    return id
  }
}
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = function (id) {
    clearTimeout(id)
  }
}

if (window.isTocuh === undefined) {
  var ua = navigator.userAgent.toLowerCase()
  window.isTocuh =
    'ontouchstart' in window || ua.indexOf('touch') !== -1 || ua.indexOf('mobile') !== -1
}
if (!Array.prototype.map) {
  Array.prototype.map = function (callback, thisArg) {
    var T, A, k
    if (this === null) {
      throw new TypeError(' this is null or not defined')
    }
    var O = Object(this)
    var len = O.length >>> 0
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
      throw new TypeError(callback + ' is not a function')
    }
    if (thisArg) {
      T = thisArg
    }
    A = new Array(len)
    k = 0
    while (k < len) {
      var kValue, mappedValue
      if (k in O) {
        kValue = O[k]
        mappedValue = callback.call(T, kValue, k, O)
        A[k] = mappedValue
      }
      k++
    }
    return A
  }
}

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (elt) {
    var len = this.length >>> 0
    var from = Number(arguments[1]) || 0
    from = from < 0 ? Math.ceil(from) : Math.floor(from)
    if (from < 0) from += len
    for (; from < len; from++) {
      if (from in this && this[from] === elt) return from
    }
    return -1
  }
}

Date.prototype.fmt = function (fmt) {
  //author: meizz
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}

window.pc = function () {
  window.iw = document.body.clientWidth
  window.ih = document.body.clientHeight
  var result0 = window.matchMedia('(max-width: 750px)')
  var result1 = window.matchMedia('(max-width: 910px)')  
  var result2 = window.matchMedia('(max-width: 1020px)')
  if (result0.matches) {
    window.__pc = 0
  } else if (result1.matches) {
    window.__pc = 1
  } else if (result2.matches) {
    window.__pc = 2
  } else {
    window.__pc = 3
  }
  if(store && action) {
    store.dispatch(action.ui({pc:window.__pc}))
  }
  return window.__pc
}

window.addEventListener('resize', function () {
  window.pc()
})
window.pc()

let dev = window.location.href.indexOf(':300') > 0 ? 1 : 0

var exp = {
  dev: dev,
  pc:window.pc,
  keyboard: function ( id='', keycode='', callback= () => { } ) {
    keycode = Number(keycode)
    let ele = document.getElementById(id)
    if (ele) {
      ele.addEventListener('keypress', (event)=>{
        if (event.keyCode === keycode) {
          if (callback) {
            callback()
          }
        }
      })
    }
  },
  AjaxGet: function (v = { url: '', data, reback: () => { } }) {
    let { url, data, reback } = v
    $.ajax({
      type: 'GET',
      url: url,
      timeout: 3000,
      data: data || null,
      contentType: 'application/x-www-form-urlencoded',
      error: function (err) {
        console.log(err)
        reback(false)
      },
      success: function (req) {
        reback(req)
      },
      complete: function (req) { }
    })
  },
  AjaxPost: function (param = { url: '', data: {}, reback: () => { } }) {
    let { url, data, reback } = param
    $.ajax({
      type: 'POST',
      url: url,
      data: data,
      timeout: 3000,
      contentType: 'application/x-www-form-urlencoded',
      error: function (err) {
        console.log(err)
        reback(false)
      },
      success: function (req) {
        reback(req)
      },
      complete: function (req) { }
    })
  },

  px: function (v) {
    if (v) {
      return v * document.documentElement.clientWidth / 750
    }
    return document.documentElement.clientWidth / 750
  },
  merge: function (parent, child) {
    var i, proxy
    proxy = JSON.stringify(parent) //把parent对象转换成字符串
    proxy = JSON.parse(proxy) //把字符串转换成对象，这是parent的一个副本
    child = child || {}
    for (i in proxy) {
      if (proxy.hasOwnProperty(i)) {
        child[i] = proxy[i]
      }
    }
    proxy = null //因为proxy是中间对象，可以将它回收掉
    return child
  },
  is: function (obj, str) {
    return Object.prototype.toString.call(obj) === `[object ${str}]`
  },
  focusId: function (id) {
    var thef = document.getElementById(id)
    if (thef) {
      thef.focus()
    }
  },
  regNum: function (str) {
    if (!str || str === '') {
      return false
    }
    var reg = /^[0-9]*$/
    return str.match(reg)
  },
  regPhone: function (str) {
    if (!str || str === '') {
      return false
    }
    var reg = /1[3,4,5,6,7,8,9]\d{9}/
    if (str.match(reg) === null) {
      return false
    } else {
      return true
    }
  },
  regCode: function (str) {
    if (!str || str === '') {
      return false
    }
    var reg = /\d{4}/
    if (str.match(reg) === null) {
      return false
    } else {
      return true
    }
  },
  regFont: function (str) {
    if (!str || str === '') {
      return false
    }
    var regEn = /[`~!@#$%^&*()_+<>?:"{},.;'[\]]/im
    var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
    if (regEn.test(str) || regCn.test(str)) {
      return '不能包含特殊字符'
    } else {
      return true
    }
  },
  regIdcard: function (str) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    if (!str || str === '') {
      return false
    }
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (reg.test(str) === false) {
      return '身份证格式不正确'
    } else {
      return true
    }
  },
  regIdcardInfo: function (str) {
    //获取输入身份证号码
    if (!str || str === '') {
      return { sex: null, age: null }
    }
    //获取出生日期
    str.substring(6, 10) + '-' + str.substring(10, 12) + '-' + str.substring(12, 14)
    //获取性别
    var sex = ''
    if (parseInt(str.substr(16, 1)) % 2 == 1) {
      sex = 'x'
    } else {
      sex = 'y'
    }
    //获取年龄
    var myDate = new Date()
    var month = myDate.getMonth() + 1
    var day = myDate.getDate()
    var age = myDate.getFullYear() - str.substring(6, 10) - 1
    if (
      str.substring(10, 12) < month ||
      (str.substring(10, 12) == month && str.substring(12, 14) <= day)
    ) {
      age++
    }
    return { sex: sex, age: age }
  },
  cutString: function (str, len) {
    if (!str || str === '') {
      return false
    }
    var str_length = 0
    var str_cut = ''
    var str_len = str.length
    for (var i = 0; i < str_len; i++) {
      var a = str.charAt(i)
      str_length++
      if (escape(a).length > 4) {
        //中文字符的长度经编码之后大于4
        str_length++
      }
      str_cut = str_cut.concat(a)
      if (str_length >= len) {
        str_cut = str_cut.concat('...')
        return str_cut
      }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
      return str
    }
  },
  copy: function (str) {
    if (!window.clipboardData) {
      return false
    } else {
      window.clipboardData.setData('Text', str)
      return true
    }
  },
  vmpc: function (self) {
    let unso = function () { }
    if (self) {
      unso = store.subscribe(function () {
        self.setState({
          pc: store.getState().ui.pc
        })
      })
    }
    return unso
  },
  randomString: function (len) {
    len = len || 32
    let chars =
      'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let maxPos = chars.length
    let pwd = ''
    for (let i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
  },
  vm: function (self, key, e, num) {
    if (e && self && key) {
      num = num === undefined ? 999 : num
      var value = e.target.value
      if (value.length > num) {
        value = value.slice(0, num)
      }
      self.setState({
        [key]: value
      })
    }
  },
  to: function (old, to) {
    if (window.location.href.split('#').length > 0) {
      if (window.location.href.split('#')[1] === old) {
        window.location.href = to
      }
    }
  },
  scroll: function (can) {
    if (can) {
      document.documentElement.style.overflow = 'visible'
      document.documentElement.style.height = 'auto'
      document.body.style.overflow = 'visible'
      document.body.style.height = 'auto'
    } else {
      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.height = '100vh'
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100vh'
    }
  },
  now: function (num) {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate
    if (num === 0) {
      currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
    } else if (num === 1) {
      currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    } else if (num === 2) {
      currentdate = month + seperator1 + strDate
    } else if (num === 3) {
      currentdate = date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    } else if (num === 4) {
      currentdate = date.getHours() + seperator2 + date.getMinutes()
    } else if (num === 5) {
      currentdate = date.getMinutes() + seperator2 + date.getSeconds()
    } else {
      currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    }
    return currentdate;
  }
}
export default exp

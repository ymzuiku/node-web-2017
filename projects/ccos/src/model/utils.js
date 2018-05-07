var $ = window.$
let ac = require('./action')
let so = require('./store')

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
  // var ih = document.body.clientHeight
  // var iw = document.body.clientWidth
  // window.ih = ih
  // window.iw = iw
  var result1 = window.matchMedia('(max-width: 639px)')
  var result2 = window.matchMedia('(max-width: 920px)')
  if (result1.matches) {
    window.thePC = 0
    so.dispatch(ac.ui({ pc: window.thePC }))
  } else if (result2.matches) {
    window.thePC = 1
    so.dispatch(ac.ui({ pc: window.thePC }))
  } else {
    window.thePC = 2
    so.dispatch(ac.ui({ pc: window.thePC }))
  }
  return window.thePC
}

window.addEventListener('resize', function () {
  window.pc()
})
window.pc()

var utils = {
  Get: function (url, event, islog) {
    $.ajax({
      type: 'GET',
      url: url,
      timeout: 3000,
      contentType: 'application/x-www-form-urlencoded',
      error: function (err) {
        console.log(err)
        event(false)
      },
      success: function (req) {
        event(req)
      },
      complete: function (req) {
        if (islog) {
          console.log(req)
        }
      }
    })
  },
  Post: function (url, data, event, islog) {
    $.ajax({
      type: 'POST',
      url: url,
      data: data,
      timeout: 3000,
      contentType: 'application/x-www-form-urlencoded',
      error: function (err) {
        console.log(err)
        event(false)
      },
      success: function (req) {
        event(req)
      },
      complete: function (req) {
        if (islog) {
          console.log(req)
        }
      }
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
      unso = so.subscribe(function () {
        self.setState({
          pc: so.getState().ui.pc
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
    }else {
      currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    }
    return currentdate;
  }
}

window.q = utils
window.so = so
window.ac = ac

window.md = `.md {
  list-style: square;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  line-height: 1.5;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
}

.pl-c {
  color: #969896;
}

.pl-c1,
.pl-s .pl-v {
  color: #0086b3;
}

.pl-e,
.pl-en {
  color: #795da3;
}

.pl-smi,
.pl-s .pl-s1 {
  color: #333;
}

.pl-ent {
  color: #63a35c;
}

.pl-k {
  color: #a71d5d;
}

.pl-s,
.pl-pds,
.pl-s .pl-pse .pl-s1,
.pl-sr,
.pl-sr .pl-cce,
.pl-sr .pl-sre,
.pl-sr .pl-sra {
  color: #183691;
}

.pl-v {
  color: #ed6a43;
}

.pl-id {
  color: #b52a1d;
}

.pl-ii {
  color: #f8f8f8;
  background-color: #b52a1d;
}

.pl-sr .pl-cce {
  font-weight: bold;
  color: #63a35c;
}

.pl-ml {
  color: #693a17;
}

.pl-mh,
.pl-mh .pl-en,
.pl-ms {
  font-weight: bold;
  color: #1d3e81;
}

.pl-mq {
  color: #008080;
}

.pl-mi {
  font-style: italic;
  color: #333;
}

.pl-mb {
  font-weight: bold;
  color: #333;
}

.pl-md {
  color: #bd2c00;
  background-color: #ffecec;
}

.pl-mi1 {
  color: #55a532;
  background-color: #eaffea;
}

.pl-mdr {
  font-weight: bold;
  color: #795da3;
}

.pl-mo {
  color: #1d3e81;
}

.octicon {
  display: inline-block;
  vertical-align: text-top;
  fill: currentColor;
}

a {
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
}

a:active,
a:hover {
  outline-width: 0;
}

strong {
  font-weight: inherit;
}

strong {
  font-weight: bolder;
}

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

img {
  border-style: none;
}

svg:not(:root) {
  overflow: hidden;
}

code,
kbd,
pre {
  font-family: monospace, monospace;
  font-size: 1em;
}

hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}

input {
  font: inherit;
  margin: 0;
}

input {
  overflow: visible;
}

[type="checkbox"] {
  box-sizing: border-box;
  padding: 0;
}

* {
  box-sizing: border-box;
}

input {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

a {
  color: #4078c0;
  text-decoration: none;
}

a:hover,
a:active {
  text-decoration: underline;
}

strong {
  font-weight: 600;
}

hr {
  height: 0;
  margin: 15px 0;
  overflow: hidden;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #ddd;
}

hr::before {
  display: table;
  content: "";
}

hr::after {
  display: table;
  clear: both;
  content: "";
}

table {
  border-spacing: 0;
  border-collapse: collapse;
}

td,
th {
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0;
}

h1 {
  font-size: 32px;
  font-weight: 600;
}

h2 {
  font-size: 24px;
  font-weight: 600;
}

h3 {
  font-size: 20px;
  font-weight: 600;
}

h4 {
  font-size: 16px;
  font-weight: 600;
}

h5 {
  font-size: 14px;
  font-weight: 600;
}

h6 {
  font-size: 12px;
  font-weight: 600;
}

p {
  margin-top: 0;
  margin-bottom: 10px;
}

blockquote {
  margin: 0;
}

ul,
ol {
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
}

ol ol,
ul ol {
  list-style-type: lower-roman;
}

ul ul ol,
ul ol ol,
ol ul ol,
ol ol ol {
  list-style-type: lower-alpha;
}

dd {
  margin-left: 0;
}

code {
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
  font-size: 12px;
}

pre {
  margin-top: 0;
  margin-bottom: 0;
  font: 12px Consolas, "Liberation Mono", Menlo, Courier, monospace;
}

.octicon {
  vertical-align: text-bottom;
}

input {
  -webkit-font-feature-settings: "liga" 0;
  font-feature-settings: "liga" 0;
}

.markdown-body::before {
  display: table;
  content: "";
}

.markdown-body::after {
  display: table;
  clear: both;
  content: "";
}

.markdown-body>*:first-child {
  margin-top: 0 !important;
}

.markdown-body>*:last-child {
  margin-bottom: 0 !important;
}

a:not([href]) {
  color: inherit;
  text-decoration: none;
}

.anchor {
  float: left;
  padding-right: 4px;
  margin-left: -20px;
  line-height: 1;
}

.anchor:focus {
  outline: none;
}

p,
blockquote,
ul,
ol,
dl,
table,
pre {
  margin-top: 0;
  margin-bottom: 16px;
}

hr {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #e7e7e7;
  border: 0;
}

blockquote {
  padding: 0 1em;
  color: #777;
  border-left: 0.25em solid #ddd;
}

blockquote>:first-child {
  margin-top: 0;
}

blockquote>:last-child {
  margin-bottom: 0;
}

kbd {
  display: inline-block;
  padding: 3px 5px;
  font-size: 11px;
  line-height: 10px;
  color: #555;
  vertical-align: middle;
  background-color: #fcfcfc;
  border: solid 1px #ccc;
  border-bottom-color: #bbb;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #bbb;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

h1 .octicon-link,
h2 .octicon-link,
h3 .octicon-link,
h4 .octicon-link,
h5 .octicon-link,
h6 .octicon-link {
  color: #000;
  vertical-align: middle;
  visibility: hidden;
}

h1:hover .anchor,
h2:hover .anchor,
h3:hover .anchor,
h4:hover .anchor,
h5:hover .anchor,
h6:hover .anchor {
  text-decoration: none;
}

h1:hover .anchor .octicon-link,
h2:hover .anchor .octicon-link,
h3:hover .anchor .octicon-link,
h4:hover .anchor .octicon-link,
h5:hover .anchor .octicon-link,
h6:hover .anchor .octicon-link {
  visibility: visible;
}

h1 {
  padding-bottom: 0.3em;
  font-size: 2em;
  border-bottom: 1px solid #eee;
}

h2 {
  padding-bottom: 0.3em;
  font-size: 1.5em;
  border-bottom: 1px solid #eee;
}

h3 {
  font-size: 1.25em;
}

h4 {
  font-size: 1em;
}

h5 {
  font-size: 0.875em;
}

h6 {
  font-size: 0.85em;
  color: #777;
}

ul,
ol {
  padding-left: 2em;
}

ul ul,
ul ol,
ol ol,
ol ul {
  margin-top: 0;
  margin-bottom: 0;
}

li>p {
  margin-top: 16px;
}

li+li {
  margin-top: 0.25em;
}

dl {
  padding: 0;
}

dl dt {
  padding: 0;
  margin-top: 16px;
  font-size: 1em;
  font-style: italic;
  font-weight: bold;
}

dl dd {
  padding: 0 16px;
  margin-bottom: 16px;
}

table {
  display: block;
  width: 100%;
  overflow: auto;
}

table th {
  font-weight: bold;
}

table th,
table td {
  padding: 6px 13px;
  border: 1px solid #ddd;
}

table tr {
  background-color: #fff;
  border-top: 1px solid #ccc;
}

table tr:nth-child(2n) {
  background-color: #f8f8f8;
}

img {
  max-width: 100%;
  box-sizing: content-box;
  background-color: #fff;
}

code {
  padding: 0;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 3px;
}

code::before,
code::after {
  letter-spacing: -0.2em;
  content: "\00a0";
}

pre {
  word-wrap: normal;
}

pre>code {
  padding: 0;
  margin: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}

.highlight {
  margin-bottom: 16px;
}

.highlight pre {
  margin-bottom: 0;
  word-break: normal;
}

.highlight pre,
pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f7f7f7;
  border-radius: 3px;
}

pre code {
  display: inline;
  max-width: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}

pre code::before,
pre code::after {
  content: normal;
}

.pl-0 {
  padding-left: 0 !important;
}

.pl-1 {
  padding-left: 3px !important;
}

.pl-2 {
  padding-left: 6px !important;
}

.pl-3 {
  padding-left: 12px !important;
}

.pl-4 {
  padding-left: 24px !important;
}

.pl-5 {
  padding-left: 36px !important;
}

.pl-6 {
  padding-left: 48px !important;
}

.full-commit .btn-outline:not(:disabled):hover {
  color: #4078c0;
  border: 1px solid #4078c0;
}

kbd {
  display: inline-block;
  padding: 3px 5px;
  font: 11px Consolas, "Liberation Mono", Menlo, Courier, monospace;
  line-height: 10px;
  color: #555;
  vertical-align: middle;
  background-color: #fcfcfc;
  border: solid 1px #ccc;
  border-bottom-color: #bbb;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #bbb;
}

:checked+.radio-label {
  position: relative;
  z-index: 1;
  border-color: #4078c0;
}

.task-list-item {
  list-style-type: none;
}

.task-list-item+.task-list-item {
  margin-top: 3px;
}

.task-list-item input {
  margin: 0 0.2em 0.25em -1.6em;
  vertical-align: middle;
}

hr {
  border-bottom-color: #eee;
}


/** Theming **/

body {
  color: #333;
  background: white;
  padding: 0 25px;
}

.vscode-light,
.vscode-light pre code {
  color: #333;
}

.vscode-dark,
.vscode-dark pre code {
  color: #333;
}

.vscode-high-contrast,
.vscode-high-contrast pre code {
  color: #333;
}

.vscode-light code {
  color: #333;
}

.vscode-dark code {
  color: #333;
}

.vscode-light pre:not(.hljs),
.vscode-light code>div {
  background-color: #F6F8FA;
}

.vscode-dark pre:not(.hljs),
.vscode-dark code>div {
  background-color: #F6F8FA;
}

.vscode-high-contrast pre:not(.hljs),
.vscode-high-contrast code>div {
  background-color: #F6F8FA;
}

.vscode-high-contrast h1 {
  border-color: transparent;
}

.vscode-light table>thead>tr>th {
  border-color: #EAECEF;
}

.vscode-dark table>thead>tr>th {
  border-color: #EAECEF;
}

.vscode-light h1,
.vscode-light hr,
.vscode-light table>tbody>tr+tr>td {
  border-color: #EAECEF;
}

.vscode-dark h1,
.vscode-dark hr,
.vscode-dark table>tbody>tr+tr>td {
  border-color: #EAECEF;
}

.vscode-light blockquote,
.vscode-dark blockquote {
  padding: 0 1em;
  color: #777;
  border-left: 0.25em solid #ddd;
  background: transparent;
}

.vscode-high-contrast blockquote {
  padding: 0 1em;
  color: #777;
  border-left: 0.25em solid #ddd;
  background: transparent;
}`

module.exports = utils

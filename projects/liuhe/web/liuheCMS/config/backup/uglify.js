function randomString(len) {
  len = len || 32
  var $chars = 'abcdefghijklmnopqrstuvwxyz1234567890'
  var maxPos = $chars.length
  var pwd = ''
  for (i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

var fs = require('fs')
var UglifyJS = require('uglify-js')
const path = require('path')
var options = {
  compress: {
    dead_code: true,
    drop_debugger: true,
    join_vars: true,
    collapse_vars: true,
    drop_console: true,
    keep_fargs: true,
    keep_infinity: true,
    passes: 2
  }
}


// 压缩bundle.js
let fileName = `bundle.${randomString(8)}.js`
let bundleFile = path.join(__dirname, '../build/bundle.js')
let bundleNewFile = path.join(__dirname, '../build/' + fileName)
fs.writeFileSync(
  bundleNewFile,
  UglifyJS.minify(
    {
      'bundle.js': fs.readFileSync(bundleFile, 'utf8')
    },
    options
  ).code,
  'utf8'
)
fs.unlinkSync(bundleFile)

// 修改html引用
let htmlFile = path.join(__dirname, '../build/index.html')
let htmlStr = fs.readFileSync(htmlFile, 'utf8')
htmlStr = htmlStr.replace(/bundle.js/g, fileName)
fs.writeFileSync(htmlFile, htmlStr, 'utf8')

// 修改main为非div
let mainFile = path.join(__dirname, '../build/main.js')
let mainStr = fs.readFileSync(mainFile, 'utf8')
mainStr = mainStr.replace(/let isDevelopment = true/g, 'let isDevelopment = false')
fs.writeFileSync(mainFile, mainStr, 'utf8')




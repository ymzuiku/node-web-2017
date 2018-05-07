var pako = require('pako')
var fs = require('fs')
var path = require('path')


var inPath = '../public/cdn/citye.json'
var outPath = '../public/cdn/city.gz'

var file = fs.readFileSync(path.join(__dirname, inPath), 'utf-8')
var data = pako.gzip(file,{to:'string'})
fs.writeFileSync(path.join(__dirname, outPath), data, 'utf8')


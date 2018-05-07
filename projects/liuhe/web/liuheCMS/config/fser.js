const path = require('path')
var fs = require('fs')
function mkdirFloder(pathStr, isPath = false) {
  let _path = pathStr
  if (!isPath) {
    _path = path.join(__dirname, pathStr)
  }
  if (!fs.existsSync(_path)) fs.mkdirSync(_path, 0777, () => {})
}

function rmFolder(pathStr, isPath = false) {
  let _path = pathStr
  if (!isPath) {
    _path = path.join(__dirname, pathStr)
  }
  var files = []
  if (fs.existsSync(_path)) {
    files = fs.readdirSync(_path)
    files.forEach(function(file, index) {
      var curPath = _path + '/' + file
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        rmFolder(pathStr + '/' + file)
      } else {
        // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(_path)
  }
}

module.exports = {
  mkdirFloder,
  rmFolder
}

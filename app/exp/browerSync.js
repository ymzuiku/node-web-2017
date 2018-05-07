const browserSync = require('browser-sync');
const path = require('path')
let staticPath = path.join(__dirname, '../', '../', '../', 'static/')
const run = (file)=>{
  browserSync.init({
    cors:true,
    startPath:file,
    codeSync:false,
    files:["*.css, *.html, *.js, s**/*.css, **/*.html, **/*.js"],
    proxy:'127.0.0.1:5000'
  })
}
module.exports = run

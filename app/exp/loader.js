let fs = require('fs');
let join = require('path').join;
/**
 * 
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
    let result = [];
    function finder(path) {
        let files = fs.readdirSync(path);
        files.forEach((val, index) => {
            let fPath = join(path, val);
            let stats = fs.statSync(fPath);
            if (stats.isDirectory()) finder(fPath);
            if (stats.isFile()) result.push(fPath);
        });

    }
    finder(startPath);
    return result;
}
var loader = function (startPath, suffix='') {
    var end = []
    var files = findSync(startPath)
    if (files) {
        files.map((v) => {
            if (v.indexOf(suffix) > 0) {
                end.push(v)
            }
        })
    }
    return end
}
module.exports = loader
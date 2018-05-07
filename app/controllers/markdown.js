var marked = require('marked');
var fs = require('fs');
var path = require('path')

var md = path.join(__dirname, '../', '../', '/static/markdowns')

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});


module.exports = (app = require('express')()) => {
  // 麒麟项目
  app.get('/md/huwai/', async (req, res) => {
    fs.readFile(md + '/麒麟项目/麒麟项目-目录.md', function (err, data) {
      var html = marked(data.toString());
      res.render('markdown.html', {markdown:html, title:'麒麟项目-目录'})
    });
  })
  app.get('/md/huwai/prd', async (req, res) => {
    fs.readFile(md + '/麒麟项目/麒麟项目-项目规划文档.md', function (err, data) {
      var html = marked(data.toString());
      res.render('markdown.html', {markdown:html, title:'麒麟项目-项目规划文档'})
    });
  })
  app.get('/md/huwai/zp', async (req, res) => {
    fs.readFile(md + '/麒麟项目/麒麟项目-招聘信息.md', function (err, data) {
      var html = marked(data.toString());
      res.render('markdown.html', {markdown:html, title:'麒麟项目-招聘信息.md'})
    });
  })

  // 华大相关
  app.get('/md/bgi/autotask', async (req, res) => {
    fs.readFile(md + '/华大相关/自动创建工序.md', function (err, data) {
      var html = marked(data.toString());
      res.render('markdown.html', {markdown:html, title:'自动创建工序.md'})
    });
  })

//   ## 1.1. [前端能力](/md/jianli/kaifa)
// ## 1.2. [产品设计能力](/md/jianli/chanping)
// ## 1.2. [视觉&交互设计能力](/md/jianli/sheji)
  // 华大相关
  app.get('/md/jianli/mulu', async (req, res) => {
    fs.readFile(md + '/简历/简历-目录.md', function (err, data) {
      var html = marked(data.toString());
      res.render('markdown.html', {markdown:html, title:'简历-目录.md'})
    });
  })
  app.get('/md/jianli/web', async (req, res) => {
    fs.readFile(md + '/简历/简历-前端.md', function (err, data) {
      var html = marked(data.toString());
      res.render('markdown.html', {markdown:html, title:'简历-前端.md'})
    });
  })
  app.get('/md/jianli/design', async (req, res) => {
    fs.readFile(md + '/简历/简历-设计.md', function (err, data) {
      var html = marked(data.toString());
      res.render('markdown.html', {markdown:html, title:'简历-设计.md'})
    });
  })
  app.get('/md/jianli/produck', async (req, res) => {
    fs.readFile(md + '/简历/简历-产品.md', function (err, data) {
      var html = marked(data.toString());
      res.render('markdown.html', {markdown:html, title:'简历-产品.md'})
    });
  })
}

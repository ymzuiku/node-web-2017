var fs = require('fs')
var fser = require('./fser')
var UglifyJS = require('uglify-js')
const path = require('path')

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

// 修改main为非div
let loadSvgs = function(svgPath, compPath) {
  let compSvgPath = path.join(__dirname, compPath)
  // 删除并创建svg文件夹
  fser.rmFolder(compPath)
  fser.mkdirFloder(compPath)
  let rootPath = path.join(__dirname, svgPath)
  var files = fs.readdirSync(rootPath, 'utf-8')
  var fileNames = files.filter(f => {
    return f.endsWith('')
  })
  for (let i = 0, l = files.length; i < l; i++) {
    let ele = fileNames[i]
    let sp = ele.split('.')
    if (sp[1] === 'DS_Store') {
      continue
    }
    if (sp[1]) {
      let name = fileNames[i].split('.')[0] + '.js'
      name = name.substring(0, 1).toUpperCase() + name.substring(1)
      let _svgPath = path.join(__dirname, svgPath + '/' + ele)
      let _codePath = path.join(__dirname, compPath + '/' + name)
      toComp(_svgPath, _codePath)
    } else {
      let addstr = sp[0]
      let target = compPath + '/' + addstr
      let svgfrom = svgPath + '/' + addstr
      let targetPath = path.join(__dirname, target + '/')
      if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath, 0777, () => {})
      loadSvgs(svgfrom, target)
    }
  }
}
loadSvgs('../public/svg/', '../src/svg/')

function toComp(input, out) {
  let svgStr = fs.readFileSync(input, 'utf8')
  let re = /viewbox="(\\S|\\s|\t|\r|\n)*"/i
  try {
    var viewBoxStr = /viewBox="([^"]*)" /.exec(svgStr)[0]
    viewBoxStr = /"([^]*)"/.exec(viewBoxStr)[0] 
  }
  catch (err) {
    var viewBoxStr = /viewBox="([^"]*)" /.exec(svgStr)
    viewBoxStr = /"([^]*)"/.exec(viewBoxStr)
  }

  // 清除头部第一个style
  svgStr = svgStr.replace(/style="fill-rule(\S*)"/g, '')
  //清空黑色 用于填充
  svgStr = svgStr.replace(/style="fill:none(\S*)"/g, '')
  svgStr = svgStr.replace(/style="fill:black(\S*)"/g, '')
  svgStr = svgStr.replace(/style="fill:#000(\S*)"/g, '')
  svgStr = svgStr.replace(/style="fill:#000000(\S*)"/g, '')
  svgStr = svgStr.replace(/style="fill:rgb(0,0,0)(\S*)"/g, '')
  svgStr = svgStr.replace(/style="fill:rgba(0,0,0,1)(\S*)"/g, '')

  //修改其他颜色为react识别
  //读出style=“”的所有内容

  let changeStyle = function() {
    if (/style="([^"]*)"/.exec(svgStr)) {
      let styleStrings = /style="([^"]*)"/.exec(svgStr)[0]
      let backStr = styleStrings + ''
      styleStrings = styleStrings.replace(/"/, '{{')
      styleStrings = styleStrings.replace(/"/, '}}')
      svgStr = svgStr.replace(/style="([^"]*)"/, styleStrings)
      changeStyle()
    } else {
      return
    }
  }
  changeStyle()

  //读取冒号后的
  let rep = /style={{([^}]*)/g
  if (svgStr.match(rep)) {
    let strs = svgStr.match(rep)
    for (let i = 0, len = strs.length; i < len; i++) {
      let str = strs[i]
      let next = str + ''
      next = next.replace(`"`, `{{`)
      next = next.replace(`"`, `}}`)
      let maohaos = next.match(/:([^;])*/g)
      for (let i = 0, len = maohaos.length; i < len; i++) {
        let maohao = maohaos[i]
        let _next = maohao + ''
        _next = `:"` + maohao.substring(1) + `"`
        svgStr = svgStr.replace(maohao, _next)
      }
      svgStr = svgStr.replace(str, next)
    }
    let strs2 = svgStr.match(rep)
    for (let i = 0, len = strs2.length; i < len; i++) {
      let str = strs2[i]
      let next = str + ''
      next = next.replace(/;/g, ',')
      svgStr = svgStr.replace(str, next)
    }
  }

  //清空r,g,b 用于填充r,g,b
  svgStr = svgStr.replace(/fill:"white"/g, `fill:white || '#fff'`)
  svgStr = svgStr.replace(/fill:"#fff"/g, `fill:white || '#fff'`)
  svgStr = svgStr.replace(/fill:"#ffffff"/g, `fill:white || '#fff'`)
  svgStr = svgStr.replace(/fill:"rgb(255,255,255)"/g, `fill:white || '#fff'`)
  svgStr = svgStr.replace(/fill:"rgba(255,255,255,1)"/g, `fill:white || '#fff'`)

  svgStr = svgStr.replace(/fill:"red"/g, `fill:red || '#f00'`)
  svgStr = svgStr.replace(/fill:"#f00"/g, `fill:red || '#f00'`)
  svgStr = svgStr.replace(/fill:"#ff0000"/g, `fill:red || '#f00'`)
  svgStr = svgStr.replace(/fill:"rgb(255,0,0)"/g, `fill:red || '#f00'`)
  svgStr = svgStr.replace(/fill:"rgba(255,0,0,1)"/g, `fill:red || '#f00'`)

  svgStr = svgStr.replace(/fill:"green"/g, `fill:green || '#0f0'`)
  svgStr = svgStr.replace(/fill:"#0f0"/g, `fill:green || '#0f0'`)
  svgStr = svgStr.replace(/fill:"#00ff00"/g, `fill:green || '#0f0'`)
  svgStr = svgStr.replace(/fill:"rgb(0,255,0)"/g, `fill:green || '#0f0'`)
  svgStr = svgStr.replace(/fill:"rgba(0,255,0,1)"/g, `fill:green || '#0f0'`)

  svgStr = svgStr.replace(/fill:"blue"/g, `fill:blue || '#00f'`)
  svgStr = svgStr.replace(/fill:"#00f"/g, `fill:blue || '#00f'`)
  svgStr = svgStr.replace(/fill:"#0000ff"/g, `fill:blue || '#00f'`)
  svgStr = svgStr.replace(/fill:"rgb(0,0,255)"/g, `fill:blue || '#00f'`)
  svgStr = svgStr.replace(/fill:"rgba(0,0,255,1)"/g, `fill:blue || '#00f'`)


  svgStr = '<svg' + svgStr.split('<svg')[1]
  svgStr = svgStr.replace(/xmlns:(\S*)" /g, '')
  svgStr = svgStr.replace(/xmlns\:xlink" /g, 'xml:')
  svgStr = svgStr.replace(/xml:(\S*)" /g, '')
  svgStr = svgStr.replace(/44496/g, 'aaa')
  svgStr = svgStr.replace(/\<--/g, 'aa1')
  svgStr = svgStr.replace(/\<--(\S*)> /g, '')
  svgStr = svgStr.replace(/<desc>(\S*)<\/desc> /g, '')
  svgStr = svgStr.replace(/clip-path/g, 'clipPath')
  svgStr = svgStr.replace(/fill-opacity/g, 'fillOpacity')
  svgStr = svgStr.replace(/fill-rule/g, 'fillRule')
  svgStr = svgStr.replace(/font-family/g, 'fontFamily')
  svgStr = svgStr.replace(/font-size/g, 'fontSize')
  svgStr = svgStr.replace(/font-weight/g, 'fontWeight')

  svgStr = svgStr.replace(/width="(\S*)" /, '')
  svgStr = svgStr.replace(/height="(\S*)" /, '')
  svgStr = svgStr.replace(/viewBox="([^"]*)" /, '')
  let comp = `
  let React = require('react')
  if (window.isTocuh === undefined) {
    let ua = navigator.userAgent.toLowerCase()
    window.isTocuh =
      'ontouchstart' in window || ua.indexOf('touch') !== -1 || ua.indexOf('mobile') !== -1
  }
  let _row = 10
  let _defWidth = 60
  let _end = 10
  let _width = '10rem'
  let Comp = ({to,onClick,mouseIn, mouseOut,scale,style,white,red,green,blue, className,width,height,fill,inFill,stroke,strokeWidth,opacity,transform, defWidth, row, inStart,start, end,back, anim, time, ...props}) => <div />
  Comp = class _Comp extends React.PureComponent {
    constructor(props) {
      super(props)
      let start = this.props.anim || 0
      let end = this.props.end || 10
      let num = this.props.back? end : start
      this.state={num:this.props.start || num, mouseIn: false} 
      let mouseIn = () => {
        this.setState({
          mouseIn: true
        })
        if (this.props.mouseIn) this.props.mouseIn()
      }
      let mouseOut = () => {
        this.setState({
          mouseIn: false
        })
        if (this.props.mouseOut) this.props.mouseOut()
      }
      let onClick = () => {
        if (this.props.to) {
          window.location.href = '#'+this.props.to
        }
        if (this.props.onClick) this.props.onClick()
      }
      if (window.isTocuh) {
        this.touch = {
          onClick: onClick,
          onTouchStart: mouseIn,
          onTouchCancel: mouseOut,
          onTouchEnd: mouseOut,
        }
      } else {
        this.touch = {
          onClick: this.props.onClick,
          onMouseEnter: mouseIn,
          onMouseLeave: mouseOut,
        }
      }
      this.runAnim()
    }
    runAnim=()=>{
      let { start, end, time, anim,back } = this.props
      if (anim && !this.timer) {
        end = end || _end
        start = start || 0
        this.timer = setInterval(() => {
          if(back) {
            this.setState({
              num: this.state.num - 1 < start ? end : this.state.num - 1
            })  
          }
          else {
            this.setState({
              num: this.state.num + 1 > end ? start : this.state.num + 1
            })
          }
        }, time)
      }
      if (anim === false && this.timer) {
        this.stopAnim(true)
      }
    }
    stopAnim=(isBackStart = false)=>{   
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
        if(isBackStart===true){
          this.setState({num:this.props.start})
        } 
      }
    }
    componentWillUnmount() {
      this.stopAnim(false)
    }
    render() {
      this.runAnim()
      let {className,to,scale, width, height,transform, fill,inFill, stroke, strokeWidth, opacity, defWidth, row, anim, inStart,start, end,onClick,mouseIn, mouseOut, time,back,white,red,green,blue, ...rest } = this.props
      let num = start
      scale = scale || 1
      if(anim) {
        num = this.state.num
      }
      if (this.state.mouseIn && inStart !== undefined) {
        num = inStart 
      }
      if (this.state.mouseIn && inFill !== undefined) {
        fill = inFill
      }
      row = row || _row
      width = width || _width
      defWidth = defWidth || _defWidth
      let vb = ${viewBoxStr}
      if(num > -1) {
        let mix = defWidth * (1-scale)
        let endW = defWidth - mix
        let _x = num % row
        let _y = Math.floor(num/row)
        let x = _x * endW + _x * mix/2
        let y = _y * endW + _y * mix/2
        vb = x+' '+y+' '+endW+' '+endW
      }
      return (
        ${svgStr}
      )
    }
  }
  module.exports = Comp
 
  `

  let porps = `
  version="1.1"
  viewBox={vb}   
  width={width}
  className={className}
  transform={transform || ''}
  height={height || width}
  fill={fill || '#353535'}
  fillOpacity={opacity || 1}
  fillRule="nonzero"
  stroke={stroke || '#f00'}
  strokeWidth={strokeWidth || 0}
  {...this.touch}
`
  comp = comp.replace(/version="1.1"/, porps)
  fs.writeFileSync(out, comp, 'utf8')
}

// 段落首字母大写
function replaceStr(str) {
  // 正则法
  // str = str.toLowerCase();
  var reg = /\b(\w)|\s(\w)/g //  \b判断边界\s判断空格
  return str.replace(reg, function(m) {
    return m.toUpperCase()
  })
}

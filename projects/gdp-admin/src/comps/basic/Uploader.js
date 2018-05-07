let React = require('react')

let Comp = ({url,img,complete,disabled, style, buttonStyle,extensions, id})=>{}
Comp = class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      percentage:0,
    }
  }
  componentDidMount() {
    let { url, complete = () => { }, id,extensions } = this.props
    let self = this
    var uploader = window.WebUploader.create({
      // 文件接收服务端。
      server: url,
      // 选择文件的按钮。可选。
      // 内部根据当前运行是创建，可能是input元素，也可能是flash.
      pick: '#'+id,
      // 选完文件后，是否自动上传。
      auto: true,
      // 是否压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
      resize: true,
      // 只允许选择图片文件。
      accept: {
        title: 'Images',
        extensions: extensions||'gif,jpg,jpeg,bmp,png',
        mimeTypes: 'image/*'
      }
    })
    uploader.on('uploadProgress', function (file, percentage) {
      var v = Math.floor(percentage*100)
      self.setState({
        percentage:v,
      })
    });
    uploader.on('uploadSuccess', function (file, data) {
      self.setState({
        percentage:0,
      })
      complete(data,file)
    })
    uploader.on('uploadError', function (file, data) {
      self.setState({
        percentage:0,
      })
      alert(self.props.children+': 上传失败')
      complete(data,file)
    })
  }
  render() {
    let { style, buttonStyle, img='',id, disabled,children} = this.props
    let {percentage} = this.state
    return (
      <div  
        className="box v je"
        style={{
          borderRadius: '0.5rem',
          border: disabled?null:(percentage>0?'1px solid rgba(0,0,0,0.25)':'1px solid rgba(0,0,0,0.1)'),
          width: '14rem',
          height: '14rem',
          backgroundColor: '#f9f9f9',
          ...style,
        }}>
        <div className='box v' style={{
            position: 'absolute',
            left: 0, top: 0,
            width: '100%', height: '100%',
            backgroundColor: `rgba(120,120,120,${percentage>0?0.2:0})`,
            fontSize: '2rem',
            color: `rgba(255,255,255,${percentage>0?1:0})`,
            fontWeight: 500,
            backgroundImage: `url(${img})`,
            backgroundSize: `cover`,
            backgroundPosition: `50% 50%` 
          }} >{percentage}%</div>
        <div id={!disabled ? '' : id} style={{ transform: `scale(0, 0)` }} >0</div>
        <div
          className="box h"
          id={disabled?'':id}
          style={{
            width: '88%',
            height: '3rem',
            marginBottom: '0.6rem',
            borderRadius: '0.5rem',
            border: disabled?null:'1px solid rgba(0,0,0,0.16)',
            backgroundColor: '#fff',
            ...buttonStyle,
          }}>
          {children}
        </div>
      </div>
    )
  }
}
module.exports = Comp

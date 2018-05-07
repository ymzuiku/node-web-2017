let React = require('react')

let Comp = ({url,img,complete,disabled, style, buttonStyle,extensions, id})=>{}
Comp = class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      percentage: 0,
      vin:false,
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
        // title: 'Images',
        extensions: extensions||'gif,jpg,jpeg,bmp,png,pdf',
        // extensions: 'gif,jpg,jpeg,bmp,png,pdf,PDF',
        // mimeTypes: 'image/*'
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
        percentage:100,
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
  vin = () => {
    this.setState({
      vin:true,
    })
  }
  vout = () => {
    this.setState({
      vin:false,
    })
  }
  render() {
    let { style, buttonStyle, img='',id, disabled,children} = this.props
    let { percentage,vin } = this.state
    return (
      <div style={{
        alignItems:'center',
      }} >
        <div  
          style={{  
            alignItems: 'center',
          justifyContent:'center',
          borderRadius: 4,
          border: disabled?null:(percentage>0?'1px solid rgba(0,0,0,0.25)':'1px solid rgba(0,0,0,0.1)'),
          width: 140,
          height: 100,
          backgroundColor: '#f9f9f9',
          ...style,
          }}>
        <div  style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems:'center',
            left: 0, top: 0,
            width: '100%', height: '100%',
            backgroundColor: `rgba(120,120,120,${percentage>0?0.2:0})`,
            fontSize: 18,
            color: `rgba(255,255,255,${percentage>0?1:0})`,
            fontWeight: 500,
            backgroundImage: `url(${img})`,
            backgroundSize: `cover`,
            backgroundPosition: `50% 50%` 
          }} >{percentage}%</div>
        <div id={!disabled ? '' : id} style={{ transform: `scale(0, 0)` }} >0</div>  
      </div>
        <div
          id={disabled ? '' : id}    
          onMouseEnter={this.vin}  
        onMouseLeave={this.vout}  
          style={{
        cursor: 'pointer',
        marginTop:10,
        marginBottom: 16,
        borderRadius: 4,
        fontSize: 13,
        color: '#333',
        padding: 7,
        width: '100%',
        background: !disabled && vin?'#f8f8f8':'#fff',
        textAlign:'center',
        ...buttonStyle,
        border: '1px solid rgba(0,0,0,0.16)',
      }}>
      {children}
    </div>
      </div>
    )
  }
}
module.exports = Comp

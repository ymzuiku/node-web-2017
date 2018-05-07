let React = require('react')
let { Link } = require('react-router-dom')
let _ = require('ym-react-cli')

let Comp = ({ imgs, num,size,imgClass, imgStyle, style }) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  renderImgs = () => {
    let { imgs, num = 0,imgClass='box h',imgStyle,size='cover', children } = this.props
    let arr = []
    for (let i = 0, len = imgs.length; i < len; i++) {
      let ele = imgs[i]
      let wh = num === i ? '100%' : 0
      arr.push(
        <div
          className={imgClass}  
          style={{
            width: wh,
            height: wh,
            backgroundImage: `url(${ele})`,
            backgroundSize: size,
            backgroundPosition: '50% 50%',
            ...imgStyle
          }}>
          {num === i ? children : null}
        </div>
      )
    }
    return arr
  }
  render() {
    let {
      imgs,
      style,
      children,
      ...rest
    } = this.props
    return (
      <div
        style={{
          width: '5rem',
          height: '5rem',
          ...style
        }}
        {...rest}>
        {this.renderImgs()}
      </div>
    )
  }
}
module.exports = Comp

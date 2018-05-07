let React = require('react')

let Comp = ({ imgs, num,imgClass, imgStyle, style }) => <div />
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
          key={'icon'+i}  
          className={imgClass}  
          style={{
            width: wh,
            height: wh,
            backgroundImage: `url(${ele})`,
            backgroundRepeat:'no-repeat',
            backgroundSize: 'contain',
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
          width: 100,
          height: 100,
          ...style
        }}
        {...rest}>
        {this.renderImgs()}
      </div>
    )
  }
}
module.exports = Comp

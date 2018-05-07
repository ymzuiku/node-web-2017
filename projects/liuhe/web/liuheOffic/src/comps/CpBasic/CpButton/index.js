// 绿色按钮,带Icon
let React = require('react')
let _ = require('ym-react-cli')
let colors = require('../../CpBasic/colors.js')
let Button = require('../../basic/Button')
let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }

let Comp = ({icon, color,bgColor, type, style,onClick, fontStyle }) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      mouseIn:false
    }
  }
  mouseIn = () => {
    this.setState({
      mouseIn:true,
    })
  }
  mouseOut = () => {
    this.setState({
      mouseIn:false,
    })
  }
  render() {
    let {
      icon,
      color,
      bgColor,
      fontStyle,
      children,
      type,
      style,
      to,
      ...rest
    } = this.props
    let {mouseIn} =this.state
    let w = '100%'
    let h = '100%'
    let w2 = '80%'
    if (type === 'simple') {
      w = '20rem'
      h = '4.5rem'
      w2 = '70%'
    } else if (type === 'big') {
      w = '40rem'
      h = '4.5rem'
      w2 = '82%'
    }
    if (!icon) {
      w2='100%'
    }
    return (
      <Motion style={{q:spring(mouseIn?1.15:1,{stiffness:200, damping:7})}} >
        {mot=><Button
        to={to}
        mouseIn={this.mouseIn}
        mouseOut={this.mouseOut}
        className="box h js"
        style={{
          overflow:'hidden',
          borderRadius: '0.4rem',
          width: '100%',
          maxWidth:w,
          height: h,
          opacity: this.state.mouseIn ? 1 : 0.9,
          backgroundColor: bgColor || colors.green2,
          ...style,
        }} {...rest}>
        {icon?<div
            style={{
            width: h,
            height: h,
            backgroundColor: 'rgba(0,0,0,0.1)',
            backgroundImage: `url(${icon})`,
            backgroundSize: `4rem`,
            backgroundPosition: `50% 50%`,
            transform:`translate(${(mot.q-1)*2.2}rem, 0rem) scale(${mot.q}, ${mot.q})`
          }}
        />:null}
        <div className='box' style={{ width: w2, height: '100%', lineHeight: '100%' }}>
          <div
            style={{
              textAlign: 'center',
              color: color || colors.white1,
              fontWeight: 500,
              ...fontStyle
            }}>
            {this.props.children}
          </div>
        </div>
      </Button>}
      </Motion>
    )
  }
}
module.exports = Comp

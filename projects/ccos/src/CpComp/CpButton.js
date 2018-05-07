// 绿色按钮,带Icon
let React = require('react')
let colors = require('../model/colors')
let Button = require('../comp/Button')
let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }

let CpButton = ({icon, color,bgColor, type, style,onClick, fontStyle }) => <div />
CpButton = class CpButton extends React.PureComponent {
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
      style = {},
      to,
      ...rest
    } = this.props
    let {mouseIn} =this.state
    return (
      <Motion style={{q:spring(mouseIn?1.12:1,{stiffness:200, damping:7})}} >
        {mot=><Button
        to={to}
        vin={this.mouseIn}
        vout={this.mouseOut}
        className="box h js"
        style={{
          flexDirection: 'row',
          justifyContent:'flex-start',
          overflow:'hidden',
          borderRadius: 4,
          width: '100%',
          height: 56,
          opacity: this.state.mouseIn ? 1 : 0.9,
          backgroundColor: bgColor || colors.green2,
          ...style,
        }} {...rest}>
        {icon?<div
          style={{
            width: style.height || 56,  
            height:style.height || 56,
            backgroundColor: 'rgba(0,0,0,0.1)',
            backgroundImage: `url(${icon})`,
            transform:`translate(${(mot.q-1)*2.2}rem, 0rem) scale(${mot.q}, ${mot.q})`
          }}
        />:null}
        <div style={{flexGrow:1, height: '100%', lineHeight: '100%',flexDirection:'row', justifyContent:'center',alignItems:'center' }}>
          <div
            style={{
                textAlign: 'center',
              marginLeft:icon?'-10%':0,  
              color: color || '#fff',
              fontWeight: 500,
              fontSize:style.fontSize || 18,
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
module.exports = CpButton

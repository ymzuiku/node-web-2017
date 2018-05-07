let React = require('react')
let { Motion, spring } = require('react-motion')
let Button = require('./Button')

let Comp = ({ float=<div></div>,inFocus,inBlur,blurWaitTime, style }) => <div />
Comp = class _Comp extends React.PureComponent {
  defComp = <Motion defaultStyle={{ y: 3, opacity: 0 }} style={{
    y: spring(0, {
    stiffness:250,
  }), opacity:spring(1,{stiffness:250})}} >
    {mot=><div style={{
    position: 'absolute',
    height: '50rem',
    width: '10rem',
    opacity: mot.opacity,
    color:'#fff',
    transform:`translate(0rem, ${mot.y}rem)`,
    backgroundColor:'#2C4B5E'
  }}>
    请传入一个Tip展示所用的组件
  </div>}
  </Motion>
  constructor(props) {
    super(props)
    this.state = {
      child: <div></div>
    }
  }
  render() {
    let {float, children, ...rest} = this.props
    return (
      <Button mouseIn={this.focus} mouseOut={this.blur} {...rest}>
        {children}
        {this.state.child}
      </Button>
    )
  }
  focus = () => {
    let { float, inFocus } = this.props
    if (inFocus) {
      inFocus()
    }
    this.setState({
      child:float || this.defComp
    })
  }
  blur = () => {
    let { inBlur, blurWaitTime } = this.props
    blurWaitTime = blurWaitTime || 0
    if (inBlur) {
      inBlur()
    }
    setTimeout(() => {
      this.setState({
        child: <div></div>
      })
    }, blurWaitTime)
  }
}
module.exports =  Comp
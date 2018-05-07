let React = require('react')
let { Motion, spring } = require('react-motion')
let Button = require('./Button')

let Comp = ({ box=<div></div>,to,mouseIn,mouseOut,blurWaitTime, style }) => <div />
Comp = class _Comp extends React.PureComponent {
  defComp = <Motion defaultStyle={{ y: 3, opacity: 0 }} style={{
    y: spring(0, {
    stiffness:250,
  }), opacity:spring(1,{stiffness:250})}} >
    {mot=><div style={{
    position: 'absolute',
    height: '20rem',
    width: '10rem',
    opacity: mot.opacity,
    color: '#fff',
    zIndex:11,
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
    let {box, children, mouseIn, mouseOut, ...rest} = this.props
    return (
      <Button mouseIn={this.focus} mouseOut={this.blur} {...rest}>
        {children}
        {this.state.child}
      </Button>
    )
  }
  focus = () => {
    let { box, mouseIn } = this.props
    if (mouseIn) {
      mouseIn()
    }
    this.setState({
      child:box || this.defComp
    })
  }
  blur = () => {
    let { mouseOut, blurWaitTime } = this.props
    blurWaitTime = blurWaitTime || 0
    if (mouseOut) {
      mouseOut()
    }
    setTimeout(() => {
      this.setState({
        child: <div></div>
      })
    }, blurWaitTime)
  }
}
module.exports =  Comp
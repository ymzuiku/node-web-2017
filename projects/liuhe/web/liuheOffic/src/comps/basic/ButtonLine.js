let React = require('react')
let Button = require('./Button')
let { Motion, spring } = require('react-motion')

let Comp = ({
  style,
  to,
  canTouch = () => {},
  mouseIn = () => {},
  mouseOut = () => {},
  onClick = () => {},
  ...props
}) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      inFocus: false
    }
  }
  mouseIn = () => {
    let { mouseIn } = this.props
    this.setState({
      inFocus: true
    })
    if (mouseIn) mouseIn()
  }
  mouseOut = () => {
    let { mouseOut } = this.props
    this.setState({
      inFocus: false
    })
    if (mouseOut) mouseOut()
  }
  render() {
    let { mouseIn, mouseOut, style, ...rest } = this.props
    let sty = {
      width: '100%',
      color: '#353535',
      ...style
    }
    return (
      <div className="v jc ac">
        <Button mouseIn={this.mouseIn} mouseOut={this.mouseOut} style={sty} {...rest} />
        <Motion style={{ w: spring(this.state.inFocus ? 98 : 0, {stiffness:220}) }}>
          {mot =>
            <div style={{ width: mot.w+'%', height: 1.5, backgroundColor: sty.color }} />}
        </Motion>
      </div>
    )
  }
}
module.exports =  Comp

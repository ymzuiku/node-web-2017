let React = require('react')
let _ = require('ym-react-cli')
let Icon = require('../../basic/Icon')
let Button = require('../../basic/Button')

let Comp = ({ num, now, imgs, onClick, style }) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc:window.pc,
      num: this.props.num === this.props.now?1:0,
      opacity:this.props.num === this.props.now?1:0.8,
    }
    _.vmpc(this)
  }
  componentWillReceiveProps(props) {
    if (props.now !== this.props.num) {
      this.setState({
        num: 0,
        opacity:0.8,
      })
    } else {
      this.setState({
        num: 1,
        opacity:1,
      })
    }
    return props
  }
  mouseIn = () => {
    this.setState({
      opacity:1,
    })
   }
  mouseOut = () => {
    this.setState({
      opacity:this.state.num === 0?0.8:1,
    })
  }
  render() {
    return (
      <Button  
        to={this.props.to}
        mouseIn={this.mouseIn}  
        mouseOut={this.mouseOut}
        style={{
          opacity:this.state.opacity,
          ...this.props.style
        }}
        {...this.props}
      >
        <Icon size={(this.state.pc ? 3.6:3)+'rem'} num={this.state.num} imgs={this.props.imgs} />
      </Button>
    )
  }
}
module.exports = Comp

let React = require('react')
let { Motion, spring } = require('react-motion')
let colors = require('../colors.js')
let Button = require('../../basic/Button')
let temp = require('../../../models/temp')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isNow: this.props.now === this.props.num,
      bgColor:'rgba(229,229,229,1)',
      mouseIn:false,
    }
  }
  componentWillReceiveProps(props) {
    if (props !== this.props) {
      this.setState({
        isNow: props.now === props.num
      })
    }
    return props
  }
  mouseIn = () => {
    this.setState({
      bgColor:'rgba(220,220,245,1)',
    })
   }
  mouseOut = () => { 
    this.setState({
      bgColor:'rgba(230,230,230,1)',
    })
  }
  click = () => {
    let { onClick } = this.props
    temp.carNum = this.props.num
    if (onClick) {
      onClick(this.props.num)
    }
  }
  render() {
    let { color = colors.blue1, title, now, num, children, ...rest } = this.props
    let isNow = num===now
    return (
      <Motion style={{ full: spring(isNow? 1 : 0, {stiffness:isNow?200:300})}} >
        {mot => (
          <Button mouseIn={this.mouseIn} mouseOut={this.mouseOut} onClick={this.click} style={{ width: '100%', height: '100%' }}>
            <div style={{ marginLeft: '20%', backgroundColor: this.state.bgColor, width: '60%', height: '1rem' }} >
              <div style={{width:'100%', height:'100%',backgroundColor:color,transform:`scale(${mot.full}, 1)`, transformOrigin:'0 0'}} ></div>
            </div>
            <div style={{ marginLeft: '20%', marginTop: '0.7rem', fontWeight:isNow?400:300}} >{title}</div>
          </Button>
        )}
      </Motion>
    )
  }
}
module.exports = Comp

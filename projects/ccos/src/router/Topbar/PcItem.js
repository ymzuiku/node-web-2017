let React = require('react')
let Icon = require('../../comp/Icon')
let Button = require('../../comp/Button')
let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      vin: false
    }
  }
  vin = () => {
    this.setState({
      vin: true
    })
  }
  vout = () => {
    this.setState({
      vin: false
    })
  }
  click = () => {
    const { to } = this.props
    if (to.indexOf('tel') >= 0) {
      window.location.href = to
    } else {
      window.location.href = '#' + to
    }
  }
  render() {
    const { label, icon, now, ...rest } = this.props
    const { vin } = this.state
    return (
      <Motion style={{ opa: vin ? 1 : (now ? 1 : 0.85) }} >
        {mot => <Button vin={this.vin} vout={this.vout} onClick={this.click} style={{
          flexGrow: 1,
          alignItems: 'center'
        }} >
          <Icon imgs={icon} num={now ? 1 : 0} style={{
            width: 35,
            height: 35,
            opacity: mot.opa,
            transform: `translate(0px, -2px)`
          }} ></Icon>
        </Button>}
      </Motion>
    )
  }
}
module.exports = Comp
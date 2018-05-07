let React = require('react')
let colors = require('../colors')
let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }


class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    let { now,children } = this.props
      return (
        <Motion style={{now:spring(now)}} >
          {mot => <div style={{width:'100%', height:'100%',marginTop: '-1.9rem',}} >
        <div style={{
          left: 6+25*mot.now+'%',
          width: '5rem', height: '5rem',
          backgroundImage: `url(./icon/arrow_dot.png)`,
          backgroundSize: `cover`,
          backgroundPosition: `50% 50%`,
        }} ></div>
        <div style={{
          left: '5%',
          marginTop: '-1px',
          width: '90%',
          height: '100%',
          backgroundColor: colors.white2
        }}>
          {children}
        </div>
      </div>}
        </Motion>
      )
  }
}
module.exports = Comp
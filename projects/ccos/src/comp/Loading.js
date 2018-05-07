let React = require('react')
let { Motion, spring, Presets } = require('react-motion')
// if (window.low) { spring = function (v, d) { return v } }
let Comp = ({ title, icon }) => <div />
Comp = class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      r: -360*5
    }
    this.r = this.state.r
    this.timer = setInterval(() => {
      this.setState({
        r:0 
      }, () => {
        this.setState({
          r: -360*5
        })
      })
    }, 2000)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  render() {
    let { title = '读取信息中...', icon = './icon/loading-gay.png' } = this.props
    return (
      <Motion
        defaultStyle={{ r: 0 }}
        style={{ r: this.state.r===0?0:spring(this.state.r, { stiffness: 20, damping:27, }) }}>
        {mot => (
          <div
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%'
            }}>
            <div
              style={{
                width: 60,
                height: 60,
                backgroundImage: `url(${icon})`,
                backgroundRepeat:'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: '50% 50%',
                transform: `rotateZ(${mot.r}deg)`
              }}
            />
            <div
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign:'center',
                width: '100%',
                fontSize: '1.6rem',
                fontWeight: 300,
                fontSize:15,
                color: '#aaa'
              }}>
              {title}
            </div>
          </div>
        )}
      </Motion>
    )
  }
}
module.exports = Comp

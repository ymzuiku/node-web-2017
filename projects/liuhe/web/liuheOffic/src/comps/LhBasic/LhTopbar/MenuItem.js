let React = require('react')
let Button = require('../../basic/Button')
let { Motion, spring } = require('react-motion')
if (window.low) {
  spring = function(v, d) {
    return v
  }
}

let outOpacity = 0.7
class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    let { now } = this.props
    this.state = {
      opacity: now ? 1 : outOpacity,
      color: now ? '#fff' : '#eee',
      bgc: now ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.0)'
    }
  }
  componentWillReceiveProps(props) {
    if (props !== this.props) {
      this.setState({
        opacity: props.now ? 1 : outOpacity,
        color: props.now ? '#fff' : '#eee',
        bgc: props.now ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.0)'
      })
    }
    return props
  }
  vin = () => {
    this.setState({
      opacity: 1
    })
  }
  vout = () => {
    let { now } = this.props
    this.setState({
      opacity: now ? 1 : outOpacity
    })
  }
  click = () => {
    let { data } = this.props
    if (!data.data) {
      data.data = []
    }
    if (data.data.length > 0) {
      window.topbarSubMenu(data.data)
    } else {
      if (data.to.indexOf('http') > 0) {
        window.location.href = data.to
      } else {
        window.href('#'+data.to)
      }
      // window.location.href = data.to
      window.topbarChangeMenu(false)
    }
  }
  render() {
    let { now, data, fs = 'fs1d2' } = this.props
    if (!data.data) {
      data.data = []
    }
    return (
      <Motion style={{ opacity: this.state.opacity }}>
        {mot => (
          <Button
            onClick={this.click}
            mouseIn={this.vin}
            mouseOut={this.vout}
            className={`ff ac ${now ? 'fw500' : 'fw400'} black2 ` + fs}
            style={{
              width: '100%',
              textAlign: 'center',
              opacity: mot.opacity,
              color: this.state.color,
              backgroundColor: this.state.bgc
            }}>
            <div>
              <p>{this.props.children} </p>
              {data.data.length > 0 ? (
                <div
                  style={{
                    position: 'absolute',
                    right: '2rem',
                    top: '0',
                    width: '1.5rem',
                    height: '1.5rem',
                    backgroundImage: `url(./icon2/white_arrow.png)`,
                    backgroundPosition: `50% 50%`
                  }}
                />
              ) : null}
            </div>
          </Button>
        )}
      </Motion>
    )
  }
}
module.exports = Comp

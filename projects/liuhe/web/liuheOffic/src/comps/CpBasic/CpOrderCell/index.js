let React = require('react')
let colors = require('../colors.js')
let Button = require('../../basic/Button')
let _ = require('ym-react-cli')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      bgColor: colors.white1
    }
  }
  mouseIn = () => {
    this.setState({
      bgColor: colors.white3
    })
  }
  mouseOut = () => {
    this.setState({
      bgColor: colors.white1
    })
  }
  render() {
    let { to, img, title, info, money, arrowTitle, arrowImg, style, ...rest } = this.props
    info = _.cutString(info,32)
    return (
      <div style={{ ...style }} {...rest}>
        <Button
          mouseIn={this.mouseIn}
          mouseOut={this.mouseOut}
          to={to}
          className="box h js"
          style={{
            backgroundColor: this.state.bgColor,
            marginLeft: '1rem',
            marginRight: '1rem',
            height: '90%'
          }}>
          <div
            style={{
              width: '8rem',
              height: '8rem',
              marginLeft: '1rem',
              backgroundImage: `url(${img})`,
              backgroundSize: `cover`,
              backgroundPosition: `50% 50%`
            }}
          />
          <div style={{ marginLeft: '1rem', width: '50%', height: '100%', flex: 4 }}>
            <p
              style={{
                color: colors.black2,
                fontSize: '1.5rem',
                height: '1rem',
                fontWeight: 400
              }}>
              {title}
            </p>
            <p
              style={{
                color: colors.black3,
                fontSize: '1.2rem',
                height: '1rem',
                fontWeight: 300
              }}>
              {info}
            </p>
            {money?<p
              style={{
                color: colors.red1,
                fontSize: '1.3rem',
                height: '1rem',
                fontWeight: 300
              }}>
              ¥{money}
            </p>:null}
          </div>
          <div className="box h je" style={{ flex: 1 }}>
            <p>{arrowTitle}</p>
            <div
              style={{
                width: '2rem',
                height: '2rem',
                marginRight: '1rem',
                backgroundImage: `url(${arrowImg})`,
                backgroundSize: `cover`,
                backgroundPosition: `50% 50%`
              }}
            />
          </div>
        </Button>
      </div>
    )
  }
}
module.exports = Comp

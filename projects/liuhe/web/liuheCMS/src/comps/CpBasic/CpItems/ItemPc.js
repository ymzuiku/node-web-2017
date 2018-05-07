let React = require('react')
let Button = require('../../basic/Button')
let colors = require('../colors')
let Icon = require('../../basic/Icon')
let _ = require('ym-react-cli')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    let { title, shadow, icon, iconL, iconRight, to, line, nowTo, num } = this.props
    if (line) {
      return <div style={{ height: '0.4rem', backgroundColor: colors.white2 }} />
    }
    let isLight = nowTo === to
    console.log(nowTo, to)
    // F9FBFE
    return (
      <Button
        className="box h js"
        style={{
          width: '100%',
          height: '45px',
          boxShadow: shadow || `0 1px 0px ${colors.white2}`,
          marginBottom: '1px',
          backgroundColor:colors.white1
        }}
        to={to}>
        <div style={{ height: '0.1rem', backgroundColor: colors.white2 }} />
        <div
          style={{
            width: '0.5rem',
            height: '100%',
            backgroundColor: isLight ? colors.blue1 : colors.white1
          }}
        />
        <Icon
          imgs={[icon, iconL]}
          num={isLight ? 1 : 0}
          style={{
            marginLeft: '1.4rem',
            marginRight: '0.6rem',
            width: '3rem',
            height: '3rem'
          }}
        />
        <p style={{ color: colors.black2, fontWeight: isLight ? 400 : 300 }}>{title}</p>
      </Button>
    )
  }
}
module.exports = Comp

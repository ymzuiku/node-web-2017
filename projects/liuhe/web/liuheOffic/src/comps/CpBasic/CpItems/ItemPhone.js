let React = require('react')
let Button = require('../../basic/Button')
let Icon = require('../../basic/Icon')
let colors = require('../colors')
let _ = require('ym-react-cli')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    let { title, icon, iconL, to, line,nowTo,num,onClick } = this.props
    let isLight = nowTo === to
    if (line) {
      return <div></div>
    }
    return (
      <Button className='box v js' style={{
        width: '100%', height: '10rem', boxShadow: `1px 1px 0px ${colors.white2}`, marginRight: '1px',marginBottom: '1px',
        backgroundColor: isLight ? '#F2F7FF' : colors.white1,
      }} to={to} onClick={onClick}  >
        <Icon size='4rem' imgs={[icon, iconL]} num={isLight ? 1 : 0} style={{
          flex:3,marginTop:'1rem'
        }} ></Icon>
        <p style={{ flex: 2, color: colors.black2, marginTop: '0rem', fontWeight: isLight ? 400 : 300 }} >{title}</p>
        <div style={{
          width: '100%', height: '0.5rem', backgroundColor:isLight?colors.blue1:colors.white1
        }} ></div>
      </Button>
    )
  }
}
module.exports = Comp
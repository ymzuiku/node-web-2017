let React = require('react')
let colors = require('../../model/colors')
let {ac,so} = require('../../model/api')
let CpButton = require('../../CpComp/CpButton')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.params = this.props.match.params
    this.status = this.params.status
    this.state = {
      status: this.status
    }
  }
  componentDidMount() {
    so.dispatch(ac.ui({navTitle:'支付信息'}))
  }
  click = () => {
    window.location.href = '#/home/'
    setTimeout(() => {
      window.location.href = '#/user/project/'
    },50)
  }
  render() {
    let { status } = this.state
    if (status === 0) {
      return (
        <div style={{justifyContent:'flex-start',alignItems:'center', height: '90vh' }}>
          <div style={{ fontSize: 24,marginTop:50, fontWeight: 300, color: colors.red1 }}>
            支付失败
          </div>
          <div
            style={{
              marginTop: 30,
              fontSize: 18,
              fontWeight: 300,
              color: colors.black2,
              opacity: 0.5
            }}>
          </div>
          <CpButton onClick={this.click} style={{maxWidth:440, height:50}} >查看项目管理信息</CpButton>
        </div>
      )
    } else
      return (
        <div style={{justifyContent:'flex-start',alignItems:'center', height: '90vh' }}>
          <div style={{ fontSize: 24,marginTop:50, fontWeight: 300, color: colors.red1 }}>
            项目创建成功
          </div>
          <div
            style={{
              marginTop: 30,
              fontSize: 18,
              fontWeight: 300,
              color: colors.black2,
              opacity: 0.5
            }}>
          </div>
          <CpButton onClick={this.click} style={{maxWidth:440, height:50}} >查看项目</CpButton>
        </div>
      )
  }
}
module.exports = Comp

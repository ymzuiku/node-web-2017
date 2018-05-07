let React = require('react')
let Icon = require('../../comp/Icon')
let Button = require('../../comp/Button')
let colors = require('../../model/colors')
let { Motion, spring } = require('react-motion')
let { ac, so } = require('../../model/api')
if (window.low) {
  spring = function(v, d) {
    return v
  }
}

class Comp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vin: false,
      subMenu:so.getState().ui.openTopbarSubMenu === this.props.num,
      subNow: -1
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
  click = e => {
    const { to,num } = this.props
    const { data = [] } = this.props
    if (data.length === 0) {
      so.dispatch(ac.ui({subTopbarLabel:null,openTopbarMenu:false, openTopbarSubMenu:num}))
      window.location.href = '#' + to
      window.q.scroll(true)
      this.setState({
        subNow: -1
      })
    } else {
      this.setState({
        subMenu:!this.state.subMenu
      })
    }
  }
  componentDidMount() {
    this.changeSubSelected()
  }
  subClick = ({ label, to }) => {
    window.location.href = '#' + to
    window.q.scroll(true)
    so.dispatch(ac.ui({openTopbarMenu:false}))
    this.changeSubSelected()
  }
  changeSubSelected = () => {
    const { now, data = [] } = this.props
    if (now) {
      let subNow = -1
      let label= null
      data.map((v, i) => {
        if (window.location.href.indexOf(v.to) > 0) {
          subNow = i
          label = v.label
        }
      })
      so.dispatch(ac.ui({subTopbarLabel:label}))
      this.setState({
        subNow: subNow
      })
    }
    
  }
  render() {
    let { label, icon, now, data = [], ...rest } = this.props
    let { vin, subNow,subMenu } = this.state
    return (
      <Motion style={{ opa: vin ? 1 : now ? 1 : 0.85 }}>
        {mot => (
          <Button
            vin={this.vin}
            vout={this.vout}
            style={{
              alignItems: 'center',
              width: '100%'
            }}>
            <div
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80%',
                marginTop: 20,
                padding:2,
                backgroundColor: `rgba(255,255,255,${now && data.length === 0
                  ? 0.2
                  : 0})`,
                borderRadius: '50px'
              }}>
              <p
                onClick={this.click}  
                style={{
                  marginLeft:30,
                  fontSize: 18,
                  width:'100%',
                  color: colors.white1,
                  fontWeight: now ? 500 : 300
                }}>
                {label}
              </p>
              {data.length > 0 ? (
                <Motion style={{r:subMenu?spring(0):spring(-90)}} >
                  {mot=><div
                  style={{
                    width: 30,
                    height: 30,
                    marginLeft: 10,
                    backgroundImage: 'url(./icon/arrow-down-white.png)',
                    transform:`rotateZ(${mot.r}deg)`
                  }}
                />}
                </Motion>
              ) : null}
            </div>
            {subMenu?data.map((v, i) => {
              if(v.label === 1) return
              return (
                <Button
                  key={'subitem' + i}
                  onClick={() => {
                    this.subClick({ label: v.label, to: v.to })
                  }}
                  style={{
                    justifyContent: 'center',
                    color: colors.white1,
                    fontWeight: now && subNow === i ? 500 : 300,
                    height: 50,
                    textAlign: 'left',
                    width: '66%',
                    backgroundColor: `rgba(255,255,255,${now && subNow === i ? 0.2 : 0})`,
                    borderRadius: '50px'
                  }}>
                   <p style={{marginLeft:20}} >{v.label}</p>
                </Button>
              )
            }):null}
          </Button>
        )}
      </Motion>
    )
  }
}
module.exports = Comp

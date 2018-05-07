let React = require('react')
let PhoneItem = require('./PhoneItem')
let colors = require('../../model/colors')
let Icon = require('../../comp/Icon')
let Button = require('../../comp/Button')
let {ac, so} = require('../../model/api')
let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }

class Comp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openMenu: so.getState().ui.openTopbarMenu,
      subLabel: so.getState().ui.subTopbarLabel,
    }
  }
  componentDidMount() {
    this.unso = so.subscribe(() => {
      this.setState({
        subLabel: so.getState().ui.subTopbarLabel,
        openMenu: so.getState().ui.openTopbarMenu,
      })
    })
  }
  componentWillUnmount() {
    this.unso()
  }
  render() {
    const { titles, ...rest } = this.props
    const {openMenu,subLabel} = this.state
    let ih = 52
    let now = 0
    let label = ''
    titles.map((v, i) => {
      if (window.location.href.indexOf(v.to) > 0) {
        now = i
        label = v.label
      }
    })
    return <div >
    <div style={{
        flexDirection: 'row',
        height: ih,
        width: '100%',
        backgroundColor:colors.white1,
        boxShadow: '0px 1px 2px rgba(0,0,0,0.08)',
        position: 'fixed',
        top: 0,
        zIndex:10,
      }} >
        <Button to='#/home/' style={{
          background: colors.blue1,
          width: 100,
          flexDirection: 'row',
          justifyContent: 'center',
        }} >
        <div style={{
          width: 76,
          height:'100%',
          backgroundImage: `url(./logo/logo.png)`,
      }} ></div>
        </Button>
        <div style={{ flexDirection: 'row', flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}  >
          <div style={{ flexGrow: 2 }} >
            <p style={{ marginLeft: 10 }} >{label}{subLabel?' | ':' '}{subLabel}  </p>
          </div>      
          <div style={{ flexGrow: 3, justifyContent: 'flex-end', flexDirection: 'row', height: '100%', alignItems: 'center', marginRight: 5 }} >  
            <Button onClick={this.changeOpenMenu} style={{
              width: 50, height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }} >  
            <Icon num={openMenu?1:0} imgs={['./icon/menu.png', './icon/close.png']} style={{
              width: 30, height: 30, 
          }} ></Icon>
            </Button>  
          </div>  
      </div>
      </div>
      <div style={{ height: ih, width: '100%' }} ></div>
      <Motion style={{ y: openMenu ? spring(0) : spring(-100) }} >  
        {mot => <div style={{ zIndex: 5, position: 'absolute', width: '100%', height: '100vh', backgroundColor: colors.blue2, transform: `translate(0%, ${mot.y}%)`, justifyContent: 'flex-start', overflowY:'scroll', }} >  
          <div style={{ marginTop: 80 }} >
          {titles.map((v, i) => {
            return <PhoneItem num={i} key={'pcitem'+i}  {...v} now={now===i} ></PhoneItem>   
            })}  
          </div>  
          <div onClick={this.changeOpenMenu} style={{
            flexGrow: 1,
            }} ></div>
        </div>}
      </Motion>
  </div>
  }
  changeOpenMenu = () => {
    this.setState({
      openMenu:!this.state.openMenu
    })
    window.q.scroll(this.state.openMenu)
  }
}
module.exports = Comp
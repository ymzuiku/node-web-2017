let React = require('react')
let _ = require('ym-react-cli')
let ButtonIcon = require('../../basic/ButtonIcon')
let Button = require('../../basic/Button')
let Item = require('./Item')
let colors = require('../../CpBasic/colors.js')
let obs = require('../../../models/obs')
let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }

let itemXPC = [1.5, 11.5, 21.52]
let itemX = [1.5, 8.5, 15.5]

let Comp = ({ style }) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc,
      now: 0,
      nav: 0,
      title: '详情',
      back:'返回'
    }
    _.vmpc(this)
    _.looker.listen('topbar', ({title, back='返回'}) => {
      this.setState({
        title: title,
        back: back,
      })
    })
    this.setSelectedItem()
  }
  reloadItems = () => {
    let {pc}=this.state
    let userUrl = obs.v.token ? '/user/userinfo/' : '/nav/sign/_user_userinfo_'
    // if (!pc) {
    //   userUrl = obs.v.token ? '/user/' : '/nav/sign/_user_'
    // }
    return [
      { imgs: ['./icon/home-n.png', './icon/home-l.png'],nav:'/', to:'/', num: 0 },
      { imgs: ['./icon/car-n.png', './icon/car-l.png'],nav:'/car/', to:obs.v.token? '/car/':'/nav/sign/_car_', num: 1 },
      { imgs: ['./icon/user-n.png', './icon/user-l.png'],nav:'/user/',  to: userUrl, num: 2 }
    ]
  }
  //监听href，改变topbar
  nowHref = '/'
  timeAdd = 0
  setSelectedItem = () => {
    window.requestAnimationFrame(() => {
      // 降低requestAnimationFrame频率
      this.timeAdd += 1
      if (this.timeAdd < 2) {
        window.requestAnimationFrame(() => {
          this.setSelectedItem()
        })
        return
      }
      this.timeAdd = 0

      // 计算新的href
      if (this.nowHref === window.location.href) true
      this.nowHref = window.location.href
      let href = _.href(this.nowHref)
      let now = 0
      let nav = 0
      let items = this.reloadItems()
      for (let i = 0, len = items.length; i < len; i++) {
        let ele = items[i]
        if (href.indexOf('/nav') >= 0) {
          nav = 1
          this.lastHref
          now = this.state.now
        } else if (href.indexOf(ele.nav) >= 0) {
          now = i
        }
      }
      document.body.style.overflow = 'auto'
      this.setState(
        {
          now: now,
          nav: nav,
        },
        () => {
          window.requestAnimationFrame(() => {
            this.setSelectedItem()
          })
        }
      )
    })
  }
  renderTopbar = mot => {
    let { pc, now, nav, logoMini } = this.state
    let items = this.reloadItems()
    return (
      <div
        className="box h jsb topbar"
        style={{
          pointerEvents: nav ? 'none' : 'auto',
          width: '100%',
          height: '5rem',
          transform: `translate(${mot.tabX}rem, 0rem)`,
          opacity: mot.tabO
        }}>
        <div
          className="box v"
          style={{
            marginLeft: pc ? '2rem' : '0rem',
            width: pc ? '12rem' : '9rem',
            height: '5rem',
            backgroundColor: colors.blue1
          }}>
          <ButtonIcon
            to="/"
            size={[0.7, 0.7, 0.7]}
            imgs={['./logo/logo.png', './logo/logo.png', './logo/logo.png']}
            style={{
              top: '0.2rem',
              width: 14.6 * (pc ? 0.8 : 0.7) + 'rem',
              height: 4.5 * (pc ? 0.8 : 0.7) + 'rem'
            }}
          />
        </div>
        <div
          className="box h jsb "
          style={{
            marginRight: pc ? '0' : '1rem',
            width: (pc ? 25 : 19) + 'rem',
            height: '100%'
          }}>
          <Item {...items[0]} now={now} />
          <Item {...items[1]} now={now} />
          <Item {...items[2]} now={now} />
          <Motion
            style={{
              x: spring(pc ? itemXPC[now] : itemX[now], {
                stiffness: 170,
                damping: 18
              })
            }}>
            {line => (
              <div
                style={{
                  width: '2rem',
                  height: '0.6rem',
                  backgroundColor: colors.blue1,
                  position: 'absolute',
                  left: 0,
                  top: '4.1rem',
                  transform: `translate(${line.x}rem, 0rem)`,
                  zIndex: 11
                }}
              />
            )}
          </Motion>
        </div>
        {pc ? <div style={{ width: '12rem' }} /> : null}
      </div>
    )
  }
  navBack = () => {
    if (window.history.length <= 2) {
      window.location.href = '#/'
    } else {
      window.history.back()
    }
  }
  renderNavbar = mot => {
    let { pc, nav, title, back } = this.state
    return (
      <div
        className="box h js"
        style={{
          pointerEvents: nav ? 'auto' : 'none',
          width: '100%',
          height: '5rem',
          transform: `translate(${mot.navX}rem, 0rem)`,
          opacity: mot.navO
        }}>
        <div className='box h js' style={{width: '25%', height: '100%',}} >
        <ButtonIcon
            size={[0.7, 0.8, 0.7]}
            onClick={this.navBack}    
        imgs={['./icon/navback.png', './icon/navback.png', './icon/navback.png']}
        style={{
          marginLeft:pc?'0rem':'-0.5rem',
          width: 5  + 'rem',
          height: 5  + 'rem'
        }}
        >
        </ButtonIcon>
        <div className='btn' onClick={this.navBack} style={{color:colors.blue1, fontWeight: 400, marginLeft: '-1.5rem', fontSize: '1.5rem' }} >{back}</div>  
        </div>
        <div className='box h' style={{textAlign:'center', width:'50%',fontWeight: 400, fontSize: '1.5rem' }} >{title}</div>  
        <div style={{width:'25%'}} ></div>
      </div>
    )
  }
  render() {
    let { pc, now, nav } = this.state
    let iconsize = pc ? 0.7 : 0.5
      return (
        <div className="box v">
          <Motion
            style={{
              tabX: nav > 1?-10:spring(nav >0 ? -10 : 0),
              tabO: nav > 1?0:spring(nav >0 ? 0 : 1, { stiffness: nav?230:180 }),
              navX: nav > 1?0:spring(nav >0 ? 0 : 10),
              navO: nav > 1?1:spring(nav >0 ? 1 : 0, { stiffness: nav?180:230 })
            }}>
            {mot => (
              <div
                style={{
                  width: '100%',
                  height: '5rem',
                  zIndex: 10,
                  position:'fixed',
                  backgroundColor: colors.white1,
                  boxShadow: '0 0.1rem 0.2rem rgba(0, 0, 0, 0.05)'
                }}>
                {this.renderTopbar(mot)}
                {this.renderNavbar(mot)}
              </div>
            )}
          </Motion>
          <div style={{ width: '100%', height: '5rem' }} />
        </div>
      )
    
    
  }
}
module.exports = Comp

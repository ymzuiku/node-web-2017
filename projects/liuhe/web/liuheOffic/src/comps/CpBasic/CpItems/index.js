let React = require('react')
let ItemPc = require('./ItemPc')
let ItemPhone = require('./ItemPhone')
let colors = require('../colors')
let _ = require('ym-react-cli')
let { Motion, spring } = require('react-motion')
if (window.low) {
  spring = function(v, d) {
    return v
  }
}

class Comp extends React.PureComponent {
  reloadHref = true
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc,
      ih:window.ih,
      show: true,
      nowTo: '/user/userinfo/'
    }
    this.pcData = []
    let data = this.props.data
    let tempData = []
    for (let i = 0, len = data.length; i < len; i++) {
      if (!data[i].line) {
        tempData.push(data[i])
      }
    }
    let len = Math.ceil(tempData.length / 3)
    for (let i = 0; i < len; i++) {
      this.pcData[i] = []
      for (let n = 0, m = len * 3; n < m; n++) {
        if (n >= i * 3 && n < i * 3 + 3) {
          if (n > tempData.length) {
            this.pcData[i].push('')
          } else {
            this.pcData[i].push(tempData[n])
          }
        }
      }
    }
    _.vmpc(this)
    this.setSelectedItem()
  }
  componentDidMount() {
    this.reloadHref = true
    this.setState({
      show:false,
    })
  }
  componentWillUnmount() {
    this.reloadHref = false
  }
  //监听href，改变topbar
  nowHref = '/'
  timeAdd = 0
  setSelectedItem = () => {
    if (!this.reloadHref) return
    window.requestAnimationFrame(() => {
      // 计算新的href
      if (this.nowHref === window.location.href) true
      this.nowHref = window.location.href
      let href = _.href(window.location.href)
      let now = '/user/userinfo/'
      let nav = false
      let items = this.props.data
      for (let i = 0, len = items.length; i < len; i++) {
        let ele = items[i]
        if (ele.to === href) {
          now = ele.to
        }
      }
      if (now !== this.state.nowTo) {
        this.setState({
          nowTo: now
        })
      }
      window.requestAnimationFrame(() => {
        this.setSelectedItem()
      })
    })
  }
  render() {
    let { data, closeData,children, w = '17rem' } = this.props
    let { pc, show, nowTo,ih } = this.state
    let itembox = document.getElementById('itembox')
    if (itembox) {
      this.h = itembox.getBoundingClientRect().height
    }
    let nowItemData = closeData[0]
    if (!show) {
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].to === nowTo) {
          nowItemData = data[i]
        }
      }
    }
    let closeH = 45
    if (pc) {
      return (
        <div className="box h js as" style={{ width: '100%', height: ih,  }}>
          <div
            style={{
              width: w,
              height: '100%',
              boxShadow: '1px 0px 0 rgba(0, 0, 0, 0.11)'
            }}>
            <div style={{ width: w,height:'100%',}}>
              {data.map((v, i) => {
                return <ItemPc nowTo={nowTo} {...data[i]} />
              })}
            </div>
            <div style={{ width: w, height: '100%', backgroundColor: colors.white1 }} />
          </div>
        </div>
      )
    } else {
      return (
        <Motion
          defaultStyle={{ y: -100 }}
          style={{ y: spring(show ? 0 : -this.h + closeH) }}>
          {mot => (
            <div
              style={{
                width: '100%',
                height: `100%`,
                backgroundColor:colors.white1,
              }}>
              <div
                id="itembox"
                style={{
                  position: 'fixed',
                  zIndex: 5,
                  width: '100%',
                  transform: `translate(0px, ${mot.y}px)`
                }}>
                {this.pcData.map((items, n) => {
                  return (
                    <div className="box h">
                      {items.map((v, i) => {
                        return <ItemPhone onClick={() => {
                    this.setState({
                      show: false
                    })
                  }}  nowTo={nowTo} {...items[i]} />
                      })}
                    </div>
                  )
                })}
                <div
                  id="itemCloseBox"
                  className="box h"
                  onClick={() => {
                    this.setState({
                      show: !this.state.show
                    })
                  }}
                  style={{
                    opacity: show ? 1 : 1,
                    height: closeH,
                    boxShadow: '0px 1px 0 #f0f0f0',
                    backgroundColor:colors.white1,
                  }}>
                  {show?<div style={{width:'70%'}}></div>:null}
                  <ItemPc shadow="0px 1px 0 #f0f0f0" nowTo={1} {...nowItemData} />
                  <div style={{ opacity: show ? 0 : 0.5, width: '7rem' }}>切换菜单</div>
                  <div
                    style={{
                      opacity: show ? 0 : 0.6,
                      width: closeH,
                      height: closeH,
                      backgroundImage: `url(./icon/arrow-down.png)`,
                      backgroundSize: `66% 66%`,
                      backgroundPosition: `50% 50%`
                    }}
                  />{' '}
                  <div style={{ width: '1.4rem' }} />{' '}
                </div>
              </div>

              <div style={{ height: closeH + 'px' }} />
            </div>
          )}
        </Motion>
      )
    }
  }
}
module.exports = Comp

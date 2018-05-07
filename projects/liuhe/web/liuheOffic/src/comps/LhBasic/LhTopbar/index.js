let React = require('react')
let Item = require('./Item')
let MenuItem = require('./MenuItem')
let Search = require('./Search')
let Button = require('../../basic/Button')
let Icon = require('../../basic/Icon')
let _ = require('ym-react-cli')
let { Motion, spring } = require('react-motion')
if (window.low) {
  spring = function(v, d) {
    return v
  }
}

let titles = [
  {
    title: '首页',
    to: '/t/home/',
  },
  {
    title: '产品与服务',
    to: '/t/prod/',
    data: [
      { title: '产品中心', to: '/t/prod/' },
      { title: '技术服务', to: '/t/prod/serve/' }
    ]
  },
  {
    title: '会员专区',
    to: '/t/user/',
    data: [
      { title: '合成在线下单', to: 'http://customer.genomics.cn/customer-self/home#/primer/add' },
      { title: '历史订单查询-合成', to: 'http://customer.genomics.cn/customer-self/home#/primer/list' },
      { title: '历史订单查询-测序', to: 'http://customer.genomics.cn/customer-self/home#/seq/list' },
      { title: '在线拼接', to: 'http://customer.genomics.cn/customer-self/home#/show/pinjie-view' },
      { title: '积分商城', to: 'http://customer.genomics.cn/customer-self/home#/integral/manage' },
    ]
  },
  {
    title: '市场动态',
    to: '/t/news/',
    data: [
      { title: '促销活动', to: 'http://customer.genomics.cn/customer-self/home#/homepage' },
      { title: '产品速递', to: 'http://www.bgitechsolutions.com/market/cat-339-339.html' },
      { title: '新闻热点', to: 'https://www.bgi.com/%e5%85%b3%e4%ba%8e%e6%88%91%e4%bb%ac/%e6%96%b0%e9%97%bb' },
      { title: '会议&展会', to: 'http://www.bgitechsolutions.com/market/cat-72-72.html' }
    ]
  },
  {
    title: '关于我们',
    to: '/t/about/',
    data: [
      { title: '企业简介', to: '/t/about/' },
      { title: '招聘信息', to: '/t/about/job/' },
      { title: '联系我们', to: '/t/about/contact/' }
    ]
  }
]

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc,
      now: '/',
      openMenu: false,
      subMenu:[],
    }
    _.vmpc(this)
    this.changeNav(titles, (ele,i) => {
      this.setState({
        now: i
      })
    })
    window.topbarChangeMenu = isClose => {
      this.setState({
        openMenu: isClose,
        subMenu:[]
      })
    }
    window.topbarSubMenu = subMenu => {
      this.setState({
        subMenu:subMenu,
      })
    }
  }
  closeMenu = () => {
    if (this.state.subMenu.length > 0) {
      return
    }
    setTimeout(() => {
      if (this.state.subMenu.length === 0) {
        this.setState({
          openMenu: false,
          subMenu:[]
        })
      }
    },50)
  }
  changeNav = function(urls, event) {
    var reload = function() {
      var url = window.location.href
      for (var i = 0, len = urls.length; i < len; i++) {
        var ele = urls[i]
        if (url.indexOf(ele.to) >= 0) {
          if (event) {
            event(ele, i)
          }
        }
      }
      window.requestAnimationFrame(reload)
    }
    reload()
  }
  menuClick = () => {
    this.setState({
      openMenu: !this.state.openMenu,
      subMenu: [],
    })
  }
  render() {
    let { pc } = this.state
    if (!pc) {
      return (
        <div className="gf" >
          <div
            className="h ac topbar z10 h3d0 z5 c12"
            style={{ backgroundImage: 'linear-gradient(180deg,#fff,#E9F6FF)' }}>
            <div
              className="c3 asc h1d7 w-100"
              style={{
                backgroundImage: `url(./logo/logo2.png)`,
                backgroundPosition: `50% 50%`
              }}
            />
            <div className="c3 h-100" />
            <div
              className="btn c4 fw400 je"
              onClick={this.menuClick}
              style={{ fontSize: '1.0rem', color: '#005BAB' }}>
              {titles.map((v, i) => {
                if (v.to === this.state.now) {
                  return <p>{v.title}</p>
                }
              })}
            </div>
            <Motion style={{ x: spring(this.state.openMenu ? -1 : 1) }}>
              {mot => (
                <Icon
                  onClick={this.menuClick}
                  className="c2 ae"
                  imgStyle={{
                    backgroundPosition: '50% 50%',
                    transform: `scale(${mot.x}, 1)`
                  }}
                  imgs={['./icon2/menu.png', './icon2/close.png']}
                  size="2.3rem"
                  num={this.state.openMenu ? 1 : 0}
                />
              )}
            </Motion>
          </div>
          <div className="topbar z9 c12 z1 h3d2" style={{ backgroundColor: '#035EAD' }} />
          <div className="h3d2" />
          <Motion
            style={{
              y: this.state.openMenu
                ? spring(0, { stiffness: 170 })
                : spring(-75, { stiffness: 190 }),
              subx: this.state.subMenu.length > 0
                ? spring(0, { stiffness: 200 })
                : spring(100, { stiffness: 200 })
            }}>
            {mot => (
              <div
                onClick={this.closeMenu}  
                className="v ac posa z8"
                style={{
                  width:'100%', overflowX:'hidden',
                  height: '70rem',
                  backgroundColor: 'rgba(0,70,150,0.98)',
                  transform: `translate(0rem, ${mot.y}rem)`
                }}>
                <div className="h2d0" />
                {titles.map((v, i) => {
                  return (
                    <MenuItem data={v} now={i === this.state.now}>
                      {v.title}
                    </MenuItem>
                  )
                })}
                <div className='w-100 h70d0' onClick={() => {
                  window.topbarSubMenu([])
                }} style={{
                  position: 'absolute',
                  backgroundColor: 'rgba(0,45,120,0.98)',
                  transform: `translate(${mot.subx}%, 0rem)`
                  }} >
                <div className="h2d0" />  
                  {this.state.subMenu.map((v, i) => {
                  return (
                    <MenuItem
                      data={v}
                      now={false}>
                      {v.title}
                    </MenuItem>
                  )
                })}
                </div>
              </div>
            )}
          </Motion>
        </div>
      )
    }
    return (
      <div className="gf">
        <div
          className="h jsb topbar h7d0 z5 c12"
          style={{ backgroundImage: 'linear-gradient(180deg,#fff,#E9F6FF)' }}>
          <div className="v jc c3 w-100">
            <div
              className="asc jc h4d0 w-100"
              style={{
                marginLeft:'5rem',
                backgroundImage: `url(./logo/logo.png)`,
                backgroundPosition: `0% 50%`
              }}
            />
          </div>
          <div className=" v ae" style={{
            marginRight:'5rem'
          }} >
            <div className="h-20" />
            <div className="h h-50 fw400  fs8 c12 je ae">
              <Button
                onClick={() => {
                  window.open('tel:4007066615')
                }}
                className="ff fs0d9 je h w9 h h-100 ac ">
                <div
                  style={{
                    marginLeft: '1.5rem',
                    width: '1.3rem',
                    height: '1.3rem',
                    backgroundImage: `url(./icon/icon-03.png)`,
                    backgroundPosition: `50% 50%`
                  }}
                />
                <p style={{ opacity: 0.5 }}>400-706-6615</p>
              </Button>
              <Search className="h-100 w13d0" />
              <Button
                to="http://baidu.com"
                style={{
                  marginLeft: '0.1rem',
                  width: '3.3rem',
                  height: '100%',
                  backgroundImage: `url(./icon/icon-02.png)`,
                  backgroundPosition: `50% 50%`
                }}
              />
              <div className="w1d5" />
            </div>
            <div className="h w35d0 h-40 c12 jsa ae">
              {titles.map((v, i) => {
                return (
                  <Item data={v} now={i===this.state.now}>
                    {v.title}
                  </Item>
                )
              })}
            </div>
            <div className="h h-23 c12 jsa " />
          </div>
        </div>
        <div className="topbar c12 z1 h7d2" style={{ backgroundColor: '#035EAD' }} />
        <div className="h7d2" />
      </div>
    )
  }
}
module.exports = Comp

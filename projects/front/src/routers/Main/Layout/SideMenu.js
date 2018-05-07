import React from 'react'
import { Menu, Icon, Row, Col } from 'antd'
import { store, action } from '../../../models/api'
import menuData from '../../../models/data/menuData'
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

export default class Menus extends React.Component {
  rootSubmenuKeys = ['menu1'];
  constructor(props) {
    super(props)
    let sos = store.getState()
    this.state = {
      lang: sos.ui.langauge,
      colors: sos.uiConfig.colors,
      menuState:sos.uiConfig.menuState,
      pc:sos.ui.pc,
      openKeys: ['menu0'],
    }
    this.changeBreadcrumb('/main/dashboard/apps/')
  }
  // store监听语言修改
  componentDidMount = () => {
    this.unso = store.subscribe(() => {
      let sos = store.getState()
      this.setState({
        lang: sos.ui.langauge,
        menuState:sos.uiConfig.menuState,
        colors: sos.uiConfig.colors,
        pc:sos.ui.pc,
      })
    })
  }
  // 释放store监听
  componentWillUnmount = () => {
    this.unso()
  }
  // 切换菜单展开时，根据状态判断是否只展开1个
  onOpenChange = (openKeys) => {
    let {menuState} = this.state
    if(menuState.onlyOpenOne){
      let nowKey = openKeys[openKeys.length-1]
      console.log('only')
      this.setState({
        openKeys:[nowKey]
      })
    } else {
      this.setState({
        openKeys:openKeys
      })
    }
  }
  // 切换面包屑
  changeBreadcrumb = (key)=>{
    let breadcrumb = {}
    menuData.map((v)=>{
      v.subMenu.map((_v)=>{
        if(_v.to === key){
          breadcrumb = _v
        }
      })
    })
    store.dispatch(action.setDefaultBreadcrumb([breadcrumb]))
  }
  // 点击Item时
  handleClick = ({ item, key, selectedKeys })=>{
    this.changeBreadcrumb(key)
    window.location.href = '#'+key
  }
  render() {
    let { lang, openKeys,colors,menuState,pc } = this.state
    let openKeysProps = pc?{openKeys:openKeys}:{} 
    return <div style={{background:colors.darkBackground,height:'100vh', zIndex:4,  }} >
        <Row type="flex" justify="center" align="middle" style={{height:60}}  >
          <div style={{backgroundImage:menuState.theme==='dark'?`url(/icon/logo_white.png)`:`url(/icon/logo_blue.png)`, width:44, height:44}} ></div>
        </Row>
      <Menu
        onSelect={this.handleClick}
        onOpenChange={this.onOpenChange}
        defaultSelectedKeys={['/main/dashboard/apps/']}
        mode={menuState.mode}
        theme={menuState.theme}
        inlineIndent={20}
        inlineCollapsed={false}
        style={{
          backgroundColor:colors.darkBackground
        }}
        {...openKeysProps}
      >
        {menuData.map((v, i) => {
          if (!v.subMenu) {
            return <MenuItem ref={v.to}  key={v.to}>
              <Icon type={v.icon} />
              <span>{v.title}</span>
            </MenuItem>
          } else {
            return <SubMenu key={"menu" + i} title={<span><Icon type={v.icon} /><span>{v.title}</span></span>}>
              {v.subMenu.map((subV, subI) => {
                return <MenuItem  key={subV.to}><Icon type={subV.icon} /><span>{subV.title}</span></MenuItem>
              })}
            </SubMenu>
          }
        })}
      </Menu>
    </div>
  }
}
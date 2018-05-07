import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Icon, Row, Col, Button, Dropdown, Menu } from 'antd'
import { SSL_OP_NETSCAPE_CHALLENGE_BUG } from 'constants';
import { store, action } from '../../../../models/api';
import SystemModal from './SystemModal'
import ThemeModal from './ThemeModal'
import UserModal from './UserModal'

let BreadcrumbItem = Breadcrumb.Item

export default class Headerbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breadcrumb: store.getState().ui.breadcrumb,
    }
  }
  // store监听，切换面包屑的routers
  componentDidMount = () => {
    this.unso = store.subscribe(() => {
      this.setState({
        breadcrumb: store.getState().ui.breadcrumb,
      })
    })
  }
  // 释放store监听
  componentWillUnmount = () => {
    this.unso
  }
  itemRender(route, params, routes, paths) {
    console.log(route, params, routes, paths)
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
  }
  handleSetting = () => {

  }
  // 点击面包屑，截取保留前面的面包屑
  hanlerChangeBreadcrumb = (num) => {
    let { breadcrumb } = this.state
    store.dispatch(action.setDefaultBreadcrumb(breadcrumb.slice(0, num + 1)))
  }
  settingMenu = (
    <Menu>
      <Menu.Item>
        <div target="_blank" rel="noopener noreferrer" onClick={() => {
          store.dispatch(action.ui({ showUserModal: true }))
        }}>个人资料</div>
      </Menu.Item>
      <Menu.Item>
        <div target="_blank" rel="noopener noreferrer" onClick={() => {
          store.dispatch(action.ui({ showThemeModal: true }))
        }}>界面设置</div>
      </Menu.Item>
      <Menu.Item>
        <div target="_blank" rel="noopener noreferrer" onClick={() => {
          store.dispatch(action.ui({ showSystemModal: true }))
        }}>系统设置</div>
      </Menu.Item>
    </Menu>
  )
  render() {
    let { breadcrumb } = this.state
    return <div style={{ width: '100%', height: '100%'}} >
      <Row type='flex' align='middle' justify='space-between' style={{ width: "100%", height: "100%",}} >
        <Col >
          <Breadcrumb itemRender={this.itemRender} >
            {breadcrumb.map((v, i) => {
              return <BreadcrumbItem key={'breadcurumItem' + i} > <Icon type={v.icon} onClick={() => { this.hanlerChangeBreadcrumb(i) }} ></Icon> <Link onClick={() => { this.hanlerChangeBreadcrumb(i) }} to={v.to}>{v.title}</Link></BreadcrumbItem>
            })}
          </Breadcrumb>
        </Col>
        <Col>
        <Button style={{ borderColor: 'rgba(0,0,0,0)' }}  ><Icon style={{fontSize:16}} type='inbox' /></Button>
        <Button style={{ borderColor: 'rgba(0,0,0,0)' }}  ><Icon style={{fontSize:16}} type='lock' /></Button>
          <Dropdown onClick={this.handleSetting} overlay={this.settingMenu} >
            <Button style={{ borderColor: 'rgba(0,0,0,0)' }}  ><span style={{fontSize:14}} ><Icon style={{fontSize:15}} type='setting' />&nbsp;设置</span></Button>
          </Dropdown>
        </Col>
      </Row>
      <SystemModal></SystemModal>
      <UserModal></UserModal>
      <ThemeModal></ThemeModal>
    </div>
  }
}
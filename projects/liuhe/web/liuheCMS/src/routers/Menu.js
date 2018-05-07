const React = require('react')
const _ = require('ym-react-cli')
const { HashRouter, Router, Route } = require('react-router-dom')
const {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Switch,
  Cascader,
  Button,
  Modal,
  Input
} = require('antd')
const { Header, Content, Footer, Sider } = Layout
const { ac, so, api } = require('../models/store')
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

let titles = [
  // { label: '管理员功能', to: '/', icon: 'user', children: [] },
  { label: '产品介绍', to: '/edit/produck/', icon: 'desktop', children: [] },
  { label: '技术与服务', to: '/edit/serve/', icon: 'file', children: [] },
  { label: '招聘信息', to: '/edit/job/', icon: 'user', children: [] },
  { label: '企业简介', to: '/edit/info/', icon: 'team', children: [] },
]
const User = require('./User')
const Edit = require('./Edit')

class Comp extends React.Component {
  constructor(props) {
    super(props)
    let login = false
    so.dispatch(ac.load())
    if (so.getState().token) {
      login = Date.now() - so.getState().tokenTime < 60 * 15 * 1000
    }

    this.state = {
      collapsed: false,
      theme: 'dark',
      login: !login,
      name: '',
      password: '',
      menu: JSON.stringify(titles[0]),
      title: titles[0].label
    }
  }
  onCollapse = collapsed => {
    this.setState({ collapsed })
  }
  menuClick = e => {
    let obj = JSON.parse(e.key)
    this.setState({
      menu: e.key,
      title: obj.label
    })
    window.location.href = '#' + obj.to
  }
  renderContent = () => {
    return (
      <div>
        <Route exact path="/" component={User} />
        <Route exact path="/user/*" component={User} />
        <Route exact path="/edit/:url" component={Edit} />
      </div>
    )
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div
            className=""
            style={{
              color: '#f1f1f1',
              opacity: 0.5,
              textAlign: 'center',
              height: '60px',
              lineHeight: '60px'
            }}>
            六合官网CMS
          </div>
          <Menu
            onClick={this.menuClick}
            theme={this.state.theme}
            defaultSelectedKeys={[this.state.menu]}
            selectedKeys={[this.state.menu]}
            mode="inline">
            {titles.map((v, i) => {
              if (v.children.length > 0) {
                return (
                  <SubMenu
                    key={JSON.stringify(v)}
                    title={
                      <span>
                        <Icon type={v.icon} /> <span>{v.label}</span>{' '}
                      </span>
                    }>
                    {v.children.map((v2, i2) => {
                      return (
                        <MenuItem key={JSON.stringify(v2)} name={v2.label}>
                          <Icon type={v2.icon || 'desktop'} />
                          <span>{v2.label}</span>
                        </MenuItem>
                      )
                    })}
                  </SubMenu>
                )
              } else
                return (
                  <MenuItem key={JSON.stringify(v)} name={v.label}>
                    <Icon type={v.icon} />
                    <span>{v.label}</span>
                  </MenuItem>
                )
            })}
          </Menu>
        </Sider>
        <Layout>
          
          <Content style={{ margin: '16px 16px',height:'100vh' }}>{this.renderContent()}</Content>
          <Footer style={{ textAlign: 'center' }}>六合官网内容管理系统</Footer>
        </Layout>
        <Modal
          closable={false}
          okText="登录"
          title="登录"
          cancelText={false}
          visible={!this.state.login}
          onOk={this.LoginOk}>
          <Input
            onChange={e => {
              _.vmInput(this, 'name', e)
            }}
            value={this.state.name}
            size="large"
            placeholder="用户名"
            style={{ margin: '8px 0' }}
          />
          <Input
            onChange={e => {
              _.vmInput(this, 'password', e)
            }}
            value={this.state.password}
            size="large"
            placeholder="密码"
            style={{ margin: '8px 0' }}
          />
        </Modal>
      </Layout>
    )
  }
  LoginOk = () => {
    api.login({ name: this.state.name, password: this.state.password }, res => {
      so.dispatch(ac.login(res.token))
      this.setState({
        login: true
      })
    })
  }
}

module.exports = Comp

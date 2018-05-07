const React = require('react')
const {Route} = require('react-router-dom')
const { Layout, Menu, Breadcrumb, Icon,Switch } = require('antd')
const { Header, Content, Footer, Sider } = Layout
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

let titles = [
  { label: '修改密码',to:'/user/password/', icon: 'plus-square-o', children: [] },
  {label:'添加子用户',to:'/user/adduser/',icon:'plus-square-o', children:[]},
]


let UserPassword = require('./UserPassword')
let UserAdduser = require('./UserAdduser')

class Comp extends React.Component {
  state = {
    collapsed: false,
    theme: 'light',
    menu:'产品与服务0',
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    })
  }
  menuClick = (e) => {
    let obj = JSON.parse(e.key)
    this.setState({
      menu:e.key
    })
    window.location.href = '#' + obj.to
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh', }}>
        <Sider
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{background:'#fff'}}
        >
          <div className="logo" />
          <Menu style={{minHeight:'100vh'}} onClick={this.menuClick} theme={this.state.theme} defaultSelectedKeys={[this.state.menu]} selectedKeys={[this.state.menu]} mode="inline">
            {titles.map((v, i) => {
              if (v.children.length > 0) {
                return <SubMenu key={JSON.stringify(v)} title={<span><Icon type={v.icon} ></Icon> <span>{v.label}</span> </span>} >
                  {v.children.map((v2,i2) => {
                    return <MenuItem key={JSON.stringify(v2)} >
                      <Icon type={v2.icon} ></Icon>  
                      <span>{v2.label}</span>
                    </MenuItem>
                  })}
               </SubMenu>
              }
              else return <MenuItem key={JSON.stringify(v)} >
                <Icon type={v.icon} ></Icon>
                <span>{v.label}</span>
              </MenuItem>
            })}  
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 0px', background:'#fff',height:'100vh' }}>
            <div>
              <Route exact path='/user/password/' component={UserPassword} ></Route>
              <Route exact path='/user/adduser/' component={UserAdduser} ></Route>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

module.exports = Comp
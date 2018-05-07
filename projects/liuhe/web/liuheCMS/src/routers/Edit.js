const React = require('react')
const $ = require('jquery')
const _ = require('ym-react-cli')
const { Layout, Menu, Breadcrumb, Icon, Button, Input, Row, Col } = require('antd')
const { Header, Content, Footer, Sider } = Layout
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

let titles = [
  { label: '添加条目', icon: 'plus-square-o', children: [] },
  { label: '产品介绍', icon: 'file', children: [] },
  { label: '技术与服务', icon: 'file', children: [] }
]

class Comp extends React.Component {
  state = {
    collapsed: false,
    theme: 'light',
    menu: '产品与服务0',
    title: '',
    code: '',
    editor: false
  }
  onCollapse = collapsed => {
    this.setState({ collapsed })
  }
  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light'
    })
  }
  menuClick = e => {
    this.setState({
      menu: e.key
    })
    let obj = JSON.parse(e.key)
    console.log(obj.label)
    this.setState({
      editor: obj.label !== '添加条目'
    }, () => {
      $('#summernote').summernote({
        height: '600', // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
        focus: false // set focus to editable area after initializing summernote
      })
    })
  }
  componentDidMount() {
    $(document).ready(function() {
      $('#summernote').summernote({
        height: '600', // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
        focus: false // set focus to editable area after initializing summernote
      })
    })
  }
  getCode = () => {
    var markupStr = $('#summernote').summernote('code')
    this.setState({
      code: markupStr
    })
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{
            backgroundColor: '#fff'
          }}>
          <div className="logo" />
          <Menu
            style={{ minHeight: '100vh' }}
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
                        <MenuItem key={JSON.stringify(v2)}>
                          <Icon type={v2.icon} />
                          <span>{v2.label}</span>
                        </MenuItem>
                      )
                    })}
                  </SubMenu>
                )
              } else
                return (
                  <MenuItem key={JSON.stringify(v)}>
                    <Icon type={v.icon} />
                    <span>{v.label}</span>
                  </MenuItem>
                )
            })}
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 0px', background: '#fff' }}>
            {this.state.editor?this.renderEidtor():this.renderAdd()}
          </Content>
        </Layout>
      </Layout>
    )
  }
  renderAdd = () => {
    return <div>add</div>
  }
  renderEidtor = () => {
    return (
      <div>
        <Row gutter={8} style={{ margin: '8px 4px' }}>
          <Col span={18}>
            <Input
              onChange={e => {
                _.vmInput(this, 'title', e)
              }}
              value={this.state.title}
              style={{ fontWeight: 400, fontSize: '15px' }}
              size="large"
              placeholder="large size"
            />
          </Col>
          <Col span={6}>
            <Button size="large" type="primary" style={{ width: '100%' }}>
              保存修改
            </Button>
          </Col>
        </Row>
        <div style={{ margin: '0px 8px' }}>
          <div id="summernote" style={{ height: '100vh' }}>
            <p>请输入内容</p>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Comp

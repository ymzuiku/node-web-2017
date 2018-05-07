const React = require('react')
const $ = require('jquery')
const _ = require('ym-react-cli')
const api = require('../models/api')
const { Layout, Menu, Breadcrumb, Icon, Button, Input, Row, Col } = require('antd')
const { Header, Content, Footer, Sider } = Layout
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

class Comp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      theme: 'light',
      title: '',
      code: '',
      editor: false
    }
    api.getusers({ start: 0, limit: 50 }, res => {
      console.log(res.Data)
    })
  }
  onCollapse = collapsed => {
    this.setState({ collapsed })
  }
  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light'
    })
  }
  componentDidMount() {}
  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Content style={{ margin: '0 0px', background: '#fff' }}>
          {this.state.editor ? this.renderEidtor() : this.renderAdd()}
        </Content>
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

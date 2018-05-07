let React = require('react')
let { ac, api, so } = require('../../model/api')
let CpPlan = require('../../CpComp/CpPlan')
let colors = require('../../model/colors')
let CpButton = require('../../CpComp/CpButton')
let QRCode = require('qrcode.react')
if (false) {
  var Table = require('antd').Table
}
Table = require('antd/lib/table')

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '报名时间',
    dataIndex: 'rtime',
    key: 'rtime'
  },
  {
    title: '手机号',
    dataIndex: 'tel',
    key: 'tel'
  },
  {
    title: '身份证',
    dataIndex: 'idcard',
    key: 'idcard'
  }
]


class ProjectInfo extends React.PureComponent {
  constructor(props) {
    super(props)
    this.params = this.props.match.params
    this.state = {
      name: '',
      id: '',
      data: '',
      pid: 0,
      proid: '',
      status: '',
      pcd: '',
      addr: '',
      age: '',
      local: '',
      amount: '',
      url: 'aa',
      tableLoading: true,
      tableData: []
    }
  }
  componentDidMount() {
    document.body.style.backgroundColor = colors.white3
    so.dispatch(ac.ui({ navTitle: 'HPV筛查项目详情' }))
    api.get_project_detail({ pid: this.params.pid }, res => {
      let da = res.data[0]
      let subdata = da.data[0]
      let host = so.getState().static.host
      this.setState({
        name: da.name,
        id: da.id,
        data: da.data,
        proid: da.proid,
        status: da.status,
        pcd: subdata.pcd,
        addr: subdata.addr,
        age: subdata.age,
        local: subdata.local,
        amount: subdata.amount,
        url: `${host}/nav/lcom/${this.params.pid}/${da.proid}/`
      })
    })
    this.getTableData(1)
  }
  getTableData = (nowPage) => {
    api.project_user_list({ page: nowPage, pid: this.params.pid }, res => {
      if (res.data) {
        this.setState({
          tableLoading: false,
          tableData: res.data
        }) 
      } else {
        this.setState({
          tableData: [],
          tableLoading:false,
        })
      }
    })
  }
  componentWillUnmount() {
    document.body.style.backgroundColor = colors.white1
  }
  copy = () => {
    if (window.q.copy(this.state.url)) {
      window.msginfo('已复制报名地址到剪切板')
    } else {
      window.msgerr('该浏览器不支持拷贝剪切板功能')
    }
  }
  call = () => {
    let tel = so.getState().static.tel
    window.msginfo('准备拨打电话: ' + tel)
    window.location.href = `tel:${tel}`
  }
  changeInfo = () => {
    window.location.href = `#/nav/createproject/${this.state.id}/`
  }
  handleTabel = (page, filters, sorter) => {
    let nowPage = page.current
    this.setState({
      tableLoading: true
    })
    this.getTableData(nowPage)
  }
  render() {
    let { data } = this.props
    return (
      <div>
        <CpPlan style={{ marginTop: 20 }}>
          <div style={{ alignItems: 'center', margin: '20px 0px', marginTop: 40 }}>
            <div style={{ fontSize: 24, color: colors.green3 }}>赶快让受检者扫描二维码报名吧</div>
            <div
              style={{
                marginTop: 20,
                padding: 10,
                border: '1px solid rgba(0,0,0,0.2)',
                borderRadius: 6
              }}>
              <QRCode size={220} value={this.state.url} />
            </div>
            <div style={{ color: colors.black3, fontSize: 13, marginTop: 10 }}>
              {this.state.url}
            </div>
            {/* <CpButton
              icon="./icon/edit-white.png"
              style={{
                marginTop: 20,
                height: 45,
                maxWidth: 440,
                fontSize: 16,
                fontWeight: 300
              }}
              onClick={this.copy}>
              拷贝链接
            </CpButton> */}
            <CpButton
              icon="./icon/phone-white.png"
              style={{
                marginTop: 10,
                height: 45,
                maxWidth: 440,
                fontSize: 16,
                fontWeight: 300
              }}
              onClick={this.call}>
              联系您的客户经理
            </CpButton>
          </div>
        </CpPlan>
        <CpPlan>
          <div style={{ alignItems: 'center', margin: '20px 0px' }}>
            <div style={{ color: colors.black2, fontSize: 20 }}>已报名用户列表</div>
            <div style={{ padding: 10, width: '100%' }}>
              <Table
                columns={columns}
                dataSource={this.state.tableData}
                onChange={this.handleTabel}
                loading={this.state.tableLoading}
              />
            </div>
          </div>
        </CpPlan>
        <CpPlan>
          <div style={{ alignItems: 'center', margin: '20px 0px' }}>
            <div style={{ color: colors.black2, fontSize: 20 }}>项目信息</div>
            <div style={{ color: colors.black3, fontSize: 15, margin: '10px 0px' }}>
              项目根据此信息进行执行
            </div>
            {this.renderProjectInfoCell(
              './icon/user-project.png',
              '项目名称',
              this.state.name
            )}
            {this.renderProjectInfoCell(
              './icon/line-location.png',
              '项目区域',
              this.state.pcd
            )}
            {this.renderProjectInfoCell(
              './icon/line-location2.png',
              '项目地址',
              this.state.addr
            )}
            {this.renderProjectInfoCell(
              './icon/user-inputer.png',
              '人数上限',
              this.state.amount
            )}
            {this.renderProjectInfoCell('./icon/yangdata.png', '最低年龄', this.state.age+'岁')}
            {this.renderProjectInfoCell(
              './icon/yangdata.png',
              '限定户籍',
              this.state.local ? '限定户籍' : '不限定户籍'
            )}
            <CpButton
              icon="./icon/edit-white.png"
              style={{
                marginTop: 30,
                marginBottom: 30,
                height: 45,
                maxWidth: 440,
                fontSize: 16,
                fontWeight: 300
              }}
              onClick={this.changeInfo}>
              编辑信息
            </CpButton>
          </div>
        </CpPlan>
      </div>
    )
  }
  renderProjectInfoCell = (icon, tip, text) => {
    return (
      <div
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          maxWidth: 440,
          marginTop: 10
        }}>
        <div
          style={{
            width: 34,
            height: 34,
            backgroundImage: `url(${icon})`
          }}
        />
        <div style={{ width: 80, marginLeft: 10 }}>{tip}:</div>
        <div>{text}</div>
      </div>
    )
  }
}
module.exports = ProjectInfo

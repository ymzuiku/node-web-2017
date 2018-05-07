let React = require('react')
let { ac, api, so } = require('../../model/api')
let colors = require('../../model/colors')
let { Route, Redirect } = require('react-router-dom')
let CpButton = require('../../CpComp/CpButton')
let CpInput = require('../../CpComp/CpInput')
let Select = require('../../comp/Select')
let Alert = require('../../comp/Alert')
let QRCode = require('qrcode.react')
if (false) {
  var Table = require('antd').Table
}
Table = require('antd/lib/table')
if (false) {
  var $ = require('jquery')
}
$ = window.$

let InputerErr = require('./InputerErr')
let InputerFa = require('./InputerFa')
let InputerShou = require('./InputerShou')
let InputerSign = require('./InputerSign')
let InputerSucc = require('./InputerSucc')

const col = [
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
    title: '发放取样器时间',
    dataIndex: 'rtime',
    key: 'rtime'
  },
  {
    title: '手机号 (通知用户回递样本)',
    dataIndex: 'tel',
    key: 'tel',
    render: tel => {
      return <a href={`tel:${tel}`}>{tel}</a>
    }
  }
]

const data2 = [
  {
    name: 'John Brown',
    state: '已领取取样器',
    time: '2018年7月30日 13:24',
    tel: 133333330
  }
]
class InputerAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc(),
      url: '',
      pid: -1,
      tel: '',
      data: [],
      nowData: [],
      msg: '',
      projects: [],
      pids: [],
      userData:{
        name:'',
        idcard:''
      },
      showTop: false,
      alertFa: false,
      alertErr: false,
      alertShou: false,
      alertSign: false,
      alertSucc: false
    }
  }
  componentDidMount() {
    so.dispatch(ac.ui({ navTitle: '筛查录入系统' }))
    this.unso = so.subscribe(() => {
      if (so.getState().ui.inputerAlertUnShow) {
        // api.luruyuan_fa_list({ pid: this.state.pid }, res => {
        //   this.setState({
        //     data: res.data
        //   })
        // })
        this.setState(
          {
            alertFa: false,
            alertErr: false,
            alertShou: false,
            alertSign: false,
            alertSucc: false
          },
          () => {
            so.dispatch(ac.ui({ inputerAlertUnShow: false }))
          }
        )
      }
      this.setState({
        pc: so.getState().ui.pc
      })
    })
    this.fixProjects()
    $('#tel').bind('keypress', event => {
      if (event.keyCode == '13') {
        this.search()
      }
    })
  }
  componentWillUnmount() {
    this.unso()
  }
  fixProjects = () => {
    let ps = so.getState().inputer.projects
    let projects = []
    let pids = []
    ps.map((v, i) => {
      projects.push(v.name)
      pids.push(v.id)
    })
    this.setState({
      projects: projects,
      pids: pids
    })

  }
  changeQRCode = (pid,proid=3) => {
    let host = so.getState().static.host
    let url = ''
    if (pid) {
      url = `${host}/nav/lcom/${pid}/${proid}/`
    }
    this.setState({
      url: url
    })
  }
  changeProject = (e, v, i) => {
    //获取企业项目
    let pid = this.state.pids[i-1]
    api.luruyuan_fa_list({ pid: pid }, res => {
      this.setState({
        pid: pid,
        data: res.data
      })
      this.changeQRCode(pid)
    })
  }
  search = () => {
    if (this.state.pid === -1) {
      window.msgerr('请先选择项目')
    } else if (!window.q.regPhone(this.state.tel)) {
      window.msginfo('请输入正确的手机号')
    } else {
      api.luruyuan_search({ pid: this.state.pid, tel: this.state.tel }, res => {
        if (res.status !== '200') {
          this.setState({
            msg: res.msg
          })
          if (res.msg === '用户未注册') {
            window.msg({
              type: 'tip',
              info: (
                <p>
                  该用户未注册，<b style={{ textDecoration: 'underline' }}>点击此处帮她注册</b>
                </p>
              ),
              event: () => {
                this.setState({
                  msg: res.msg,
                  alertSign: true
                })
              }
            })
          } else if (res.msg === '用户未报名') {
            window.msg({
              type: 'tip',
              info: (
                <p>
                  该用户未提前报名，<b style={{ textDecoration: 'underline' }}>点击此处跳过报名</b>
                </p>
              ),
              event: () => {
                this.setState({
                  msg: res.msg,
                  alertSign:true,
                  userData:{
                    name:res.name,
                    addr:res.addr,
                    idcard:res.idcard,
                  }
                })
              }
            })
          } else {
            window.msgerr(res.msg)
          }
        } else {
          // 已报名，已发放采样器，我们已收到您的样本
          let data = res.data[0]
          if (data.status === '已报名' || data.status === '已通知') {
            this.setState({
              nowData: data,
              msg: res.msg,
              alertFa: true
            })
          } else if (data.status === '已发放采样器') {
            this.setState({
              nowData: data,
              msg: res.msg,
              alertShou: true
            })
          } else if (data.status === '我们已收到您的样本') {
            window.msgtip('已完成：该用户本次筛查的样本已回收')
          }
        }
      })
    }
  }
  render() {
    let { url, pc } = this.state
    return (
      <div
        style={{
          alignItems: 'center',
          margin: '0px 20px',
          flexGrow: 1
        }}>
        {this.renderTop(pc)}
        <CpButton
          color={colors.black3}
          onClick={() => {
            this.setState({
              showTop: !this.state.showTop
            })
          }}
          style={{
            marginTop: 15,
            flexGrow: 1,
            height: 30,
            fontSize: 14,
            maxWidth: 900,
            backgroundColor: `rgba(50,50,50,0.05)`
          }}>
          {this.state.showTop ? '收起说明' : '显示说明'}
        </CpButton>
        <div style={{ height: pc ? 60 : 20 }} />
        {this.renderList()}
        {this.renderAlerts()}
      </div>
    )
  }
  renderTop = () => {
    if (!this.state.showTop) {
      return <div />
    }
    let { pc } = this.state
    return (
      <div
        style={{
          flexDirection: pc ? 'row' : 'column',
          marginBottom: 20,
          maxWidth: 900,
          justifyContent: 'space-between',
          width: '100%'
        }}>
        {/* 上左边 */}
        <div>
          <div style={{ marginTop: 40, color: colors.black2, fontSize: 16 }}>
            请确定受检者满足以下条件，再发放取样器：
          </div>
          <ul className="ul" style={{ color: colors.black2, fontSize: 16 }}>
            <li>已有过性生活</li>
            <li>未处于妊娠期</li>
            <li>未接受过子宫全切术</li>
            <li>确定用户户籍信息</li>
          </ul>
          {/* <CpButton
            icon="./icon/see-white.png"
            onClick={() => {
              window.location.href = '#/nav/inputer/learn/'
            }}
            style={{ height: 42 }}>
            教程
          </CpButton> */}
        </div>
        {/* 上右边 */}
        <div
          style={{
            alignItems: 'center',
            marginLeft: pc ? 20 : 0,
            justifyContent: 'center'
          }}>
          <div
            style={{
              marginTop: 20,
              padding: 10,
              border: '1px solid rgba(0,0,0,0.2)',
              borderRadius: 6
            }}>
            <QRCode size={pc ? 190 : 300} value={this.state.url?this.state.url:so.getState().static.host} />
          </div>
          <div style={{ marginTop: 10, color:this.state.url?colors.black1:colors.red1}}>{this.state.url?'让用户扫一扫注册':'请选择项目，以生成对于二维码'}</div>
        </div>
      </div>
    )
  }
  renderList = () => {
    let { tel, projects, data, pc } = this.state
    return (
      <div style={{ maxWidth: 900, width: '100%', alignItems: 'center' }}>
        <div
          style={{
            display: pc ? null : 'none',
            flexDirection: 'row',
            fontSize: 18,
            color: colors.black2,
            fontWeight: 400
          }}>
          输入手机号定位用户，并且<span style={{ color: colors.black1, fontWeight: 600 }}>
            发放取样器
          </span>和<span style={{ color: colors.black1, fontWeight: 600 }}>回收样本</span>
        </div>
        <div
          style={{
            display: !pc ? null : 'none',
            flexDirection: 'row',
            fontSize: 18,
            color: colors.black2,
            fontWeight: 400
          }}>
          输入手机号定位用户，并且发放取样器和回收样本
        </div>
        {/* pc */}
        <div
          style={{
            display: pc ? null : 'none',
            marginTop: 20,
            flexDirection: 'row',
            maxWidth: 900,
            width: '100%'
          }}>
          <Select
            data={projects}
            style={{ height: 45, flexGrow: 1 }}
            title="请选择项目"
            onChange={this.changeProject}
          />
          <CpInput
            id="tel"
            value={tel}
            onChange={e => {
              window.q.vm(this, 'tel', e)
            }}
            icon="./icon/line-id.png"
            placeholder="输入筛查者的手机号或身份证号"
            style={{ marginLeft: 20, flexGrow: 1, height: 45 }}
          />
          <CpButton
            icon="./icon/search-white.png"
            onClick={this.search}
            style={{
              marginLeft: 20,
              width: 180,
              height: 45,
              backgroundColor: colors.blue1
            }}>
            查询
          </CpButton>
        </div>
        {/* phone */}
        <div
          style={{
            display: !pc ? null : 'none',
            marginTop: 20,
            flexDirection: 'column',
            maxWidth: 900,
            width: '100%'
          }}>
          <Select
            data={projects}
            style={{ height: 45, flexGrow: 1, width: '100%' }}
            title="请选择项目"
            onChange={this.changeProject}
          />
          <CpInput
            id="tel"
            value={tel}
            onChange={e => {
              window.q.vm(this, 'tel', e)
            }}
            icon="./icon/line-id.png"
            placeholder="输入患者身份证号"
            style={{ marginTop: 20, flexGrow: 1, height: 45 }}
          />
          <CpButton
            icon="./icon/search-white.png"
            onClick={this.search}
            style={{
              marginTop: 20,
              flexGrow: 1,
              height: 45,
              backgroundColor: colors.blue1
            }}>
            查询
          </CpButton>
        </div>

        <div style={{ width: '100%', marginTop: 20 }}>
          <Table columns={col} dataSource={data} />
        </div>
      </div>
    )
  }
  renderAlerts = () => {
    let rest = {
      tel: this.state.tel,
      pid: this.state.pid,
      msg: this.state.msg,
      data: this.state.nowData
    }
    let h = 610
    return (
      <div>
        <Alert
          h={h}
          style={{ width: 500, height: 600 }}
          box={<InputerErr {...rest} />}
          pid={this.state.pid}
          show={this.state.alertErr}
        />
        <Alert
          h={h}
          style={{ width: 400, height: 600 }}
          box={<InputerFa {...rest} />}
          pid={this.state.pid}
          show={this.state.alertFa}
        />
        <Alert
          h={h}
          style={{ width: 400, height: 600 }}
          box={<InputerShou {...rest} />}
          pid={this.state.pid}
          show={this.state.alertShou}
        />
        <Alert
          h={h}
          style={{ width: 500, height: 600 }}
          box={<InputerSign {...this.state.userData}  {...rest} />}
          pid={this.state.pid}
          show={this.state.alertSign}
        />
        <Alert
          h={h}
          style={{ width: 500, height: 600 }}
          box={<InputerSucc {...rest} />}
          pid={this.state.pid}
          show={this.state.alertSucc}
        />
      </div>
    )
  }
}
module.exports = InputerAdd

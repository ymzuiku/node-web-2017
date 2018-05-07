let React = require('react')
let { ac, api, so } = require('../../model/api')
let CpInput = require('../../CpComp/CpInput')
let CpIAgree = require('../../CpComp/CpIAgree')
let CpButton = require('../../CpComp/CpButton')
let CpSelector = require('../../CpComp/CpSelector')
let Selector = require('../../comp/Selector')
let Alert = require('../../comp/Alert')
let Select = require('../../comp/Select')
let colors = require('../../model/colors')
let Loading = require('../../comp/Loading')
if (false) {
  var Table = require('antd').Table
}
Table = require('antd/lib/table')
if (false) {
  var $ = require('jquery')
}
$ = window.$

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
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
  },
  {
    title: '录入阳性数据',
    dataIndex: 'id',
    key: 'id',
    render: id => {
      return <a href={`#/nav/upcaseuserinfo/${id}/`}>点击录入</a>
    }
  }
]

const data2 = [
  {
    name: 'John Brown',
    phone: 32,
    tel: 'New York No. 1 Lake Park',
    id: 20
  }
]
data2.map((v, i) => {
  v.key = i
})

let defHName = '选择结算医院(默认为患者自费)'
let defCity = '选择结算医院所在城市'
class Reports extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc(),
      projectList:[],
    }
  }
  componentDidMount() {
    if (so.getState().user.idcard) {
      this.setState({})
    }
    api.get_project((res) => {
      let data = []
      res.data.map((v, i) => {
        if (res.data.status !== '已关闭') {
          data.push(v)
        }
      })
      this.setState({
        projectList:data
      }) 
    })
  }
  render() {
    let { pc, search, idcard, data, showAlert } = this.state
    let sos = so.getState()
    return (
      <div
        style={{
          alignItems: 'center',
          margin: '0px 20px',
          flexGrow: 1
        }}>
        <div style={{ height: 40 }} />
        <div style={{ fontSize: 24, fontWeight: 400, color: colors.green3 }}>
        筛查人群报告
        </div>
        <div style={{ height: 20 }} />
        <div
          style={{ maxWidth: 800, color: colors.black3, fontSize: 17, fontWeight: 300 }}>
          基于项目的人群筛查报告数据
        </div>
        <div style={{ height: 20 }} />
        <div style={{flexDirection:'row', alignItems:'center', marginTop: 40, maxWidth:800, width:'100%'}} >
        <CpInput
          id="search"
          value={search}
          onChange={e => {
            window.q.vm(this, 'search', e)
          }}
          icon="./icon/line-search.png"
          placeholder="请输入手机号或身份证号码"
          style={{  flex:3, height:40}}
          />
          <CpButton onClick={this.searchList} style={{height:40,flex:1,marginLeft:20, backgroundColor:colors.blue2}} >搜索</CpButton>  
        </div>
        <div style={{ height: 20 }} />
        <Table
          columns={columns}
          dataSource={data}
          style={{ maxWidth: 800, width: '100%' }}
        />
      </div>
    )
  }
}
module.exports = Reports

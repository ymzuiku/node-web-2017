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
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '录入阳性数据',
    dataIndex: 'id',
    key: 'id',
    render: id => {
      return <a href={`#/nav/upcaseuserinfo/${id}/`}>录入/查看</a>
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
class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc(),
      hospitals: [],
      hospitalsData: [],
      data:[],
      citys: [],
      idcard: '',
      search: '',
      loadingCity: '',
      hname: defHName,
      hid: 0,
      city: defCity,
      showAlert: false
    }
  }
  componentDidMount() {
    if (so.getState().user.idcard) {
      this.setState({})
    }
    api.city(res => {
      let citys = []
      res.data.map((v, i) => {
        citys.push(v.city)
      })
      this.setState({
        citys: citys
      })
    })
    this.getList()

    $('#search').bind('keypress', (event) => {
      if (event.keyCode == "13") {
        if (this.state.search === '') {
          this.getList() 
        } else {
          api.search_patient({ idcard: this.state.search },(res) => {
            this.setState({
              data:res.data
            })
          })
        }
      }
    })
    $('#search').blur(() => {
      if (this.state.search === '') {
        this.getList() 
      }
    })
  }
  searchList = () => {
    if (!window.q.regIdcard(this.state.search)) {
      window.msgerr('请输入正确的身份证')
    } else if (this.state.search === '') {
      this.getList() 
    } else {
      api.search_patient({ idcard: this.state.search },(res) => {
        this.setState({
          data:res.data
        })
      })
    }
  }
  getList = () => {
    api.get_patient(res => {
      if (res.data != false) {
        this.setState({
          data: res.data
        })
      }
    })
  }
  alertAddUser = () => {
    this.setState({
      showAlert: true
    })
  }
  sendAddUser = () => {
    let { hid, hname, idcard } = this.state
    if (!window.q.regIdcard(idcard)) {
      window.msgerr('请输入正确的身份证')
    } else {
      api.add_patient({
        hid: hid,
        hname: hname,
        idcard: idcard,
      }, (res) => {
        this.setState({
          showAlert: false
        })
        window.msginfo(res.msg)
        this.getList()
        window.location.href = `#/nav/upcaseUserinfo/${res.zid}/`
      })
    }
  }
  changeHName = (e, value, index) => {
    this.setState({
      hname: value
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
         阳性患者管理
        </div>
        <div style={{ height: 20 }} />
        <div
          style={{ maxWidth: 600, color: colors.black3, fontSize: 17, fontWeight: 300 }}>
          阳性者的数据追踪对于区域宫颈癌发病率的控制有重要意义。您可以为宫颈癌的发病率控制作出贡献的同时，还可以获得收益。
        </div>
        <div style={{ height: 20 }} />
        <div
          style={{
            width: 140,
            height: 140,
            backgroundImage: `url(./pic/doctor.png)`
          }}
        />
        <CpButton
          onClick={this.alertAddUser}
          style={{
            maxWidth: 300,
            height: 45
          }}
          fontStyle={{
            fontSize: 16,
            fontWeight: 400
          }}
          icon="./icon/add-white.png">
          添加阳性患者
        </CpButton>
        <div style={{flexDirection:'row', alignItems:'center', marginTop: 40, maxWidth:600, width:'100%'}} >
        <CpInput
          id="search"
          value={search}
          onChange={e => {
            window.q.vm(this, 'search', e)
          }}
          icon="./icon/line-search.png"
          placeholder="根据身份证搜索"
          style={{  flex:3, height:40}}
          />
          <CpButton onClick={this.searchList} style={{height:40,flex:1,marginLeft:20, backgroundColor:colors.blue2}} >搜索</CpButton>  
        </div>
        <div style={{ height: 20 }} />
        <Table
          columns={columns}
          dataSource={data}
          style={{ maxWidth: 600, width: '100%' }}
        />
        <Alert
          style={{ height: 350 }}
          outAnime={false}
          show={showAlert}
          onChange={e => {
            this.setState({
              showAlert: e
            })
          }}
          box={this.renderAlert()}
        />
      </div>
    )
  }
  renderAlert = () => {
    let { idcard, hname, loadingCity } = this.state
    return (
      <div style={{ alignItems: 'center', padding: 20 }}>
        <div style={{ height: 10 }} />
        <div style={{ fontSize: 24, fontWeight: 400, color: colors.green3 }}>添加阳性患者</div>
        <CpInput
          id="idcard"
          value={idcard}
          onChange={e => {
            window.q.vm(this, 'idcard', e)
          }}
          icon="./icon/line-id.png"
          placeholder="输入患者身份证号"
          style={{ maxWidth: 440, marginTop: 30, height: 40 }}
        />
        <div style={{ height: 20 }} />
        <Select
          style={{ width: '100%', maxWidth: 440, height: 40 }}
          title={defCity}
          data={this.state.citys}
          onChange={(e, v, i) => {
            this.setState({
              city: v,
              loadingCity: true
            })
            api.hospital({ city: v }, res => {
              let hospitals = []
              res.data.map((v, i) => {
                hospitals.push(v.name)
              })
              this.setState({
                hospitalsData: res.data,
                hospitals: hospitals,
                loadingCity: false
              })
            })
          }}
        />
        {}
        <div style={{ height: 20 }} />
        {loadingCity ? (
          <Loading />
        ) : (
          <Select
            style={{ width: '100%', maxWidth: 440, height: 40 }}
            title={defHName}
            data={this.state.hospitals}
            onChange={(e, v, i) => {
              console.log('hospitalsData', this.state.hospitalsData)
              let num = i > 0 ? i - 1 : 0;
              if (this.state.hospitalsData.length >>> 0) {
                this.setState({
                  hname: v,
                  hid: this.state.hospitalsData[num].id
                })
              }
            }}
          />
        )}
        <CpButton
          onClick={this.sendAddUser}
          style={{
            maxWidth: 440,
            height: 45,
            marginTop: 20
          }}
          fontStyle={{
            fontSize: 16,
            fontWeight: 400
          }}
          icon="./icon/add-white.png">
          录入数据
        </CpButton>
        <div style={{ height: 20 }} />
      </div>
    )
  }
}
module.exports = Comp

let React = require('react')
let CpButton = require('../../CpComp/CpButton')
let CpInput = require('../../CpComp/CpInput')
let CpSelector = require('../../CpComp/CpSelector')
let CpIAgree = require('../../CpComp/CpIAgree')
let colors = require('../../model/colors')
let {so,ac,api} =require('../../model/api')
let defAddress = '常住地址 省、市、区'
class InputerSign extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      iagree:false,
      name: this.props.name||'',
      idcard: this.props.idcard||'',
      pcd: defAddress,
      addr:''
    }
  }
  componentWillUnmount() {
    so.dispatch(ac.ui({inputerAlertUnShow:true}))
  }
  checkInputs = () => {
    let check = true
    if (!window.q.regFont(this.state.name)) {
      check = false
      window.msgtip('请输入正确的姓名')
    } else if (!window.q.regIdcard(this.state.idcard)){
      check = false
      window.msgtip('请输入正确的身份证')
    } else if (this.state.pcd === defAddress) {
      check = false
      window.msgtip('请输入地区')
    } else if (!this.state.addr || this.state.addr === '') {
      check = false
      window.msgtip('请输入正确详细地址')
    } else if (!this.state.iagree ) {
      check = false
      window.msg({ info: "请阅读并同意条款" })
    }
    return check
  }
  iagreeChange = (e) => {
    this.setState({
      iagree: e.target.checked
    })
  }
  send = () => {
    // 报名成功
    if (this.checkInputs()) {
      // 改为用户报名接口
      api.luruyuan_baoming(
        {
          tel:this.props.tel,
          pid: this.props.pid,
          proid: this.proid,
          name: this.state.name,
          idcard: this.state.idcard,
          pcd: this.state.pcd,
          addr: this.state.addr
        },
        (res) => {
          window.msginfo(res.msg)
          so.dispatch(ac.ui({inputerAlertUnShow:true}))
        }
      ) 
    }
  }
  renderCell = (icon='./icon/line-user.png', text) => {
    return <div style={{ marginTop:10, flexDirection: 'row',maxWidth:300,width:'100%', alignItems: 'center' }}>
    <div
      style={{
        width: 30,
        height: 30,
        backgroundImage: `url(${icon})`
      }}
    />
    <div style={{ color: colors.black2 }}>{text}</div>
  </div>
  }
  render() {
    let { msg, data,tel } = this.props
    let {addr, idcard, name, pcd} = this.state
    return (
      <div style={{padding:20,alignItems:'center'}} >
        <div style={{color:'#59A65C', fontSize:18,marginTop:20,marginBottom:10,}} >
        请向登记人展示知情同意书内容，并确认登记人同意，再进行注册</div>
        <CpInput icon='./icon/clock.png' disabled value={tel} style={{ height: 45, maxWidth: 440, marginTop: 10 }} ></CpInput>
        
        <CpInput
                id="name"
                value={name}
                onChange={e => {
                  window.q.vm(this, 'name', e)
                }}
                icon="./icon/line-user.png"
                placeholder="用户真实姓名"
                style={{marginTop:20}}
              />

              <CpInput
                id="idcard"
                value={idcard}
                onChange={e => {
                  window.q.vm(this, 'idcard', e)
                }}
                icon="./icon/line-id.png"
                placeholder="用户身份证号"
                style={{marginTop:20}}
              />
              <div style={{ height: 20 }} />
              <CpSelector onChange={(str) => {
                this.setState({
                  pcd:str
                })
              }} value={pcd} style={{ width: '100%', maxWidth: 440, }} ></CpSelector>
              <CpInput
                id="addr"
                value={addr}
                onChange={e => {
                  window.q.vm(this, 'addr', e)
                }}
                icon="./icon/line-id.png"
                placeholder="用户街道、门牌号"
                style={{marginTop:20}}
        />
        <div style={{height:20}} ></div>
              <CpIAgree leftText='用户确认同意' url="#/nav/iagreeuser/" onChange={this.iagreeChange}>
                《个人用户服务协议》
              </CpIAgree>
              <div style={{ height: 20 }} />
              <div
                style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                <CpButton
                  onClick={this.send}
                  style={{
                    flexGrow: 1,
                    maxWidth: 440,
                    height: 45
                  }}
                  icon="./icon/right-white.png">
                  提交
                </CpButton>
              </div>
        
      </div>
    )
  }
}
module.exports = InputerSign

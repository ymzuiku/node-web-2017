let React = require('react')
let { ac, api, so } = require('../../model/api')
let CpInput = require('../../CpComp/CpInput')
let CpIAgree = require('../../CpComp/CpIAgree')
let CpButton = require('../../CpComp/CpButton')
let Selector = require('../../comp/Selector')
let colors = require('../../model/colors')
let Loading = require('../../comp/Loading')


class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    let _temp_name = window._temp_name || ''
    let _temp_idcard = window._temp_idcard || ''
    let _temp_phone = window._temp_phone || ''
    this.state = {
      reload: 1,
      eidt: false,
      pc: window.pc(),
      input_name: so.getState().user.name || _temp_name,
      input_idcard: so.getState().user.idcard || _temp_idcard,
      input_iagree: false,
      input_phone: so.getState().user.tel || _temp_phone,
    }
    // window._temp_clear()

  }
  componentDidMount() {
    if (so.getState().user.idcard) {
      this.setState({
        input_name: so.getState().user.name,
        input_idcard: so.getState().user.idcard
      })
    }
  }
  iagreeChange = (e) => {
    this.setState({
      input_iagree: e.target.checked
    })
  }
  send = () => {
    let { input_idcard, input_name, input_iagree } = this.state
    let sos = so.getState()
    if (input_name.length < 2) {
      window.msg({ info: "请输入姓名" })
      let obj = document.getElementById('name')
      if (obj) obj.focus()
    }
    else if (!isNaN(input_name)) {
      window.msg({ info: "请输入正确的姓名" })
      let obj = document.getElementById('name')
      if (obj) obj.focus()
    }
    else if (window.q.regFont(input_name) !== true) {
      window.msg({ info: window.q.regFont(input_name) })
      let obj = document.getElementById('name')
      if (obj) obj.focus()
    }
    else if (window.q.regIdcard(input_idcard) !== true) {
      window.msg({ info: window.q.regIdcard(input_idcard) })
      let obj = document.getElementById('idcard')
      if (obj) obj.focus()
    } else if (input_iagree === false && !sos.user.idcard) {
      window.msg({ info: "请阅读并同意条款" })
    } else {
      api.updateUserInfo({ idcard: input_idcard, name: input_name }, (res) => {
        if (res.status !== '200') {
          window.msg({ type: 'err', info: res.msg })
        } else {
          window.location.reload(true)
          window.msg({ info: '信息提交成功' })
          this.setState({
            edit: true
          })
        }
      })
    }
  }
  render() {
    let { pc, input_idcard, input_name, input_phone, edit } = this.state
    let sos = so.getState()
    return (
      <div style={{
        alignItems: 'center',
        margin: '0px 20px',
        flexGrow: 1,
      }}>
        <div style={{ height: 40 }}></div>
        <div style={{ fontSize: 24, fontWeight: 400, color: colors.green3 }} >{so.getState().user.idcard ? '个人资料' : '完善个人资料'}</div>
        <div style={{ height: 20 }}></div>
        <div style={{ maxWidth: 440, color: colors.black3, fontSize: 18 }} >检测报告和您的身份信息绑定，为了让后续服务和合作医院生效，请务必提供真实身份信息</div>
        <div style={{ height: 20 }}></div>

        <CpInput disabled id='phone' value={input_phone} onChange={(e) => { 
          window._temp_phone = e.target.value;
          window.q.vm(this, 'input_phone', e) }} icon='./icon/line-phone.png' placeholder='您的手机号' ></CpInput>
        <div style={{ height: 20 }} />

        <CpInput disabled={!edit && sos.user.idcard} id='name' value={input_name} onChange={(e) => {
          window._temp_name = e.target.value;
           window.q.vm(this, 'input_name', e) }} icon='./icon/line-user.png' placeholder='请输入真实姓名' ></CpInput>
        <div style={{ height: 20 }} />

        <CpInput disabled={!edit && sos.user.idcard} id='idcard' value={input_idcard} onChange={(e) => { 
          window._temp_idcard = e.target.value;window.q.vm(this, 'input_idcard', e) }} icon='./icon/line-id.png' placeholder='请输入身份证号' ></CpInput>
        <div style={{ height: 20 }} />

        {!sos.user.idcard && <CpIAgree url='#/nav/iagreeuser/' onChange={this.iagreeChange} >《互联网宫颈癌预防服务知情同意书（代服务协议）》</CpIAgree>}
        {!sos.user.idcard && <div style={{ height: 20 }}></div>}
        <div style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }} >
          {!sos.user.idcard && <CpButton onClick={this.send} style={{
            flexGrow: 1,
            maxWidth: 440,
            height: 50,
          }} icon='./icon/right-white.png' >提交</CpButton>}
          {edit && sos.user.idcard && <CpButton onClick={this.send} style={{
            flexGrow: 1,
            maxWidth: 440,
            height: 50,
          }} icon='./icon/right-white.png' >提交修改</CpButton>}
          {!edit && sos.user.idcard && <CpButton onClick={() => {
            this.setState({
              edit: true
            })
          }} style={{
            flexGrow: 1,
            maxWidth: 440,
            height: 50,
          }} icon='./icon/edit-white.png' >编辑</CpButton>}
        </div>
      </div>
    )
  }
}
module.exports = Comp
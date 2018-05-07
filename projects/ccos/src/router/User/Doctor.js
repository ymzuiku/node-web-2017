let React = require('react')
let {ac, api, so} =require('../../model/api')
let CpInput = require('../../CpComp/CpInput')
let CpIAgree = require('../../CpComp/CpIAgree')
let CpButton = require('../../CpComp/CpButton')
let Selector = require('../../comp/Selector')
let colors =require('../../model/colors')
let Loading = require('../../comp/Loading')
let Uploader = require('../../comp/Uploader')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    let user = so.getState().user
    let _temp_name = window._temp_name || ''
    let _temp_idcard = window._temp_idcard || ''
    let _temp_doctorcode = window._temp_doctorcode || ''
    let _temp_doctorhospital = window._temp_doctorhospital || ''
    this.state = {
      reload: 1,
      pc: window.pc,
      input_name: user.name || _temp_name,
      input_idcard: user.idcard || _temp_idcard,
      input_doctorcode: user.doctorcode || _temp_doctorcode,
      input_doctorhospital: user.doctorhospital || _temp_doctorhospital,
      input_iagree: false,
    }
    // window._temp_clear()

  }
  componentDidMount() {
    let user = so.getState().user
    if (user.idcard) {
      this.setState({
        input_name: user.name,
        input_idcard: user.idcard
      })
    }
    if (user.doctorcode) {
      this.setState({
        input_doctorcode: user.doctorcode,
        input_doctorhospital: user.doctorhospital
      })
    }
  }
  iagreeChange = (e) => {
    this.setState({
      input_iagree:e.target.checked
    })
  }
  send = () => {
    let { input_idcard, input_name, input_doctorcode, input_doctorhospital, input_iagree } = this.state
    let user = so.getState().user
    if (input_name.length < 2) {
      window.msginfo("请输入姓名")
      let obj = document.getElementById('name')
      if(obj) obj.focus()
    }
    else if (!isNaN(input_name)) {
      window.msginfo("请输入正确的姓名")
      let obj = document.getElementById('name')
      if(obj) obj.focus()
    }
    else if (window.q.regFont(input_name) !== true) {
      window.msginfo(window.q.regFont(input_name))
      let obj = document.getElementById('name')
      if(obj) obj.focus()
    }
    else if (window.q.regIdcard(input_idcard) !== true) {
      window.msginfo(window.q.regIdcard(input_idcard))
      let obj = document.getElementById('idcard')
      if(obj) obj.focus()
    }
    else if (input_doctorcode === '') {
      window.msginfo('请输入执业医师资格号码')
      let obj = document.getElementById('input_doctorcode')
      if(obj) obj.focus()
    }  
    else if (input_doctorhospital === '') {
      window.msginfo('请输入执业医院')
      let obj = document.getElementById('input_doctorhospital')
      if(obj) obj.focus()
    }    
    else if (input_iagree === false) {
      window.msginfo("请阅读并同意条款")
    } else {
      if (!user.idcard) {
        // 提交个人信息
        api.updateUserInfo({ idcard: input_idcard, name: input_name }, (res) => {
          if (res.status !== '200') {
            window.msginfo(res.msg)
          } else {
            // 提交医生信息
            this.updae()
          }
        }) 
      } else {
        this.updae()
      }
    }
  }
  // 提交医生信息
  updae = () => {
    let { input_doctorcode, input_doctorhospital } = this.state
    api.updateDoctor({ code: input_doctorcode, hospital: input_doctorhospital }, (res) => {
      this.setState({
        reload: this.state.reload+1,
      })
      window.msg({ info: '信息提交成功' })
      let _tempUrl = window.location.href
      window.location.reload(true)
      window.location.href = _tempUrl
    })
  }
  render() {
    let { reload, pc, input_idcard, input_name, input_doctorcode, input_doctorhospital } = this.state
    let user = so.getState().user
    let title = '专业用户是医职从业人员'
    if (user.status_pro === 1) {
      title = '正在审核您的专业用户资料'
      input_doctorcode = '执业医师资格证号码:  '+input_doctorcode
      input_doctorhospital = '执业医院: '+input_doctorhospital
    } else if (user.status_pro === 2) {
      title = '您已注册成为专业用户'
      input_doctorcode = '执业医师资格证号码:  '+input_doctorcode
      input_doctorhospital = '执业医院: '+input_doctorhospital
    }
    return (
        <div  style={{
        alignItems: 'center',
        margin:'0px 10px',
        flexGrow:1,
      }}>
      <div style={{height:40}}></div>  
      <div style={{ fontSize: 24, fontWeight: 400, color: colors.green3 }} >{title}</div>
        <div style={{height:20}}></div>
        <div style={{maxWidth:440, color:colors.black3,fontSize:18}} >升级为专业用户，您可以为自己收集的数据进行科学研究，并且成为我们的合作伙伴，为女性宫颈癌数据跟踪做出贡献</div>
        <div style={{height:20}}></div>
        
        {user.name ? null :<CpInput id='name' value={input_name} onChange={(e) => {
          window._temp_name = e.target.value;
          window.q.vm(this, 'input_name', e)}}  icon='./icon/line-user.png' placeholder='请输入真实姓名' ></CpInput>}
        {user.name ? null : <div style={{ height: 20 }} />}
        
        {user.idcard ? null : <CpInput id='idcard' value={input_idcard} onChange={(e) => { 
          window._temp_idcard = e.target.value;
          window.q.vm(this, 'input_idcard', e) }} icon='./icon/line-id.png' placeholder='请输入身份证号' ></CpInput>}
        {user.idcard ? null : <div style={{ height: 20 }} />}
        <CpInput disabled={user.status_pro !== 0} id='input_doctorcode' value={input_doctorcode} onChange={(e) => {
          window._temp_doctorcode = e.target.value;
          window.q.vm(this, 'input_doctorcode', e)}} icon='./icon/line-tip.png' placeholder='执业医师资格证号码' ></CpInput>
        <div style={{ height: 20 }} />

        <CpInput disabled={user.status_pro !== 0} id='input_doctorhospital' value={input_doctorhospital} onChange={(e) => {
          window._temp_doctorhospital = e.target.value;
          window.q.vm(this, 'input_doctorhospital', e)}} icon='./icon/hospital-2.png' placeholder='执业医院' ></CpInput>
        <div style={{ height: 20 }} />

        {user.status_pro !== 0? null:<CpIAgree url='#/nav/iagreedoctor/' onChange={this.iagreeChange} >《专业用户注册须知》</CpIAgree>}
        <div style={{height:20}}></div>

        {user.status_pro !== 0?null:<div style={{ flexDirection: 'row',width:'100%', justifyContent:'center' }} >
        <CpButton onClick={this.send} style={{
            flexGrow: 1,
          maxWidth:440,  
          height:50,
        }} icon='./icon/right-white.png' >提交</CpButton>    
        </div>}
        <div style={{ height: 20 }} />
        
        </div>
    )
  }
}
module.exports = Comp
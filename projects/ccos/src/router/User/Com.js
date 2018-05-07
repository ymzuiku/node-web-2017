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
    // require.ensure(['react-dropzone'], () => {
    //   Dropzone = require('react-dropzone')
    // })
    let _temp_name = window._temp_name || ''
    let _temp_idcard = window._temp_idcard || ''
    let _temp_phone = window._temp_phone || ''
    let _temp_comname = window._temp_comname || ''
    let _temp_comcode = window._temp_comcode || ''
    let _temp_combossid = window._temp_combossid || ''
    let _temp_comauthority = window._temp_comauthority || ''

    let user = so.getState().user
    this.state = {
      loading: false,
      loadingTitle:'提交中',
      pc: window.pc(),
      input_name: user.name || _temp_name,
      input_idcard: user.idcard || _temp_idcard,
      input_comname: user.comname || _temp_comname,
      input_comcode: user.comcode || _temp_comcode,
      input_combossid: user.combossid || _temp_combossid,
      input_comauthority: user.comauthority || _temp_comauthority,
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
    if (user.comname) {
      this.setState({
        input_comname: user.comname,
        input_comcode: user.comcode,
        input_combossid: user.combossid,
        input_comauthority: user.comauthority,
      })
    }
  }
  iagreeChange = (e) => {
    this.setState({
      input_iagree:e.target.checked
    })
  }
  send = () => {
    let { input_idcard, input_name, input_comname, input_comcode, input_combossid, input_comauthority, input_iagree } = this.state
    
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
    else if (input_comname === '') {
      window.msginfo('请输入企业名称')
      let obj = document.getElementById('input_comname')
      if(obj) obj.focus()
    }
    else if (input_comcode === '') {
      window.msginfo('请输入企业机构代码')
      let obj = document.getElementById('input_comcode')
      if(obj) obj.focus()
    }  
    else if (input_combossid === '') {
      window.msginfo('请上传法人身份证')
      let obj = document.getElementById('input_combossid')
      if(obj) obj.focus()
    }
    else if (input_comauthority === '') {
      window.msginfo('请上传法人授权书')
      let obj = document.getElementById('input_comauthority')
      if(obj) obj.focus()
    }  
    else if (input_iagree === false) {
      window.msginfo("请阅读并同意条款")
    } else {
      if (!so.getState().user.idcard) {
        // 提交个人信息
        api.updateUserInfo({ idcard: input_idcard, name: input_name }, (res) => {
          if (res.status !== '200') {
            window.msginfo(res.msg)
          } else {
            // 提交企业信息
            this.update()
          }
        }) 
      } else { 
        // 提交企业信息
        this.update()
      }
    }
  }
  // 提交企业信息
  update = () => {
    let { input_combossid, input_comauthority, input_comcode, input_comname } = this.state
    this.setState({
      loading: true,
      loadingTitle:'提交信息中...',
    })
    api.apply_com({ name: input_comname, code: input_comcode, bossid: input_combossid, authority: input_comauthority }, (res) => {
      this.setState({
        loading: false,
        loadingTitle:'信息提交完毕',
      })
      window.msginfo('信息提交成功') 
      let _tempUrl = window.location.href
      window.location.reload(true)
      window.location.href = _tempUrl
    })
  }
  
  up_input_combossid = (res) => {
    this.setState({
      input_combossid:res.image,
    })
  }
  up_input_comauthority = (res) => {
    this.setState({
      input_comauthority:res.image,
    })
  }
  render() {
    let {loading,loadingTitle, pc, input_idcard, input_name, input_comname, input_comcode, input_combossid, input_comauthority } = this.state
    if (loading) {
      return <div style={{height:'90vh'}} ><Loading title={loadingTitle}></Loading></div>
    }
    let title = '组织用户管理员注册须知'
    let user = so.getState().user
    if (user.status_com === 1) {
      title = '正在审核您的组织用户资料'
      input_comcode = '企业机构代码:  '+input_comcode
      input_comname = '企业机构代码:  '+input_comname
    } else if (user.status_com === 2) {
      title = '您已注册成为组织用户'
      input_comcode = '企业机构代码:  '+input_comcode
      input_comname = '企业机构代码:  '+input_comname
    }
    return (
      <div style={{
        alignItems: 'center',
        margin:'0px 10px',
        flexGrow:1,
        }}>
      <div style={{height:40}}></div>  
      <div style={{ fontSize: 24, fontWeight: 400, color: colors.green3 }} >{title}</div>
        <div style={{height:20}}></div>
        <div style={{maxWidth:440,width:'100%',  color:colors.black3,fontSize:18, textAlign:'left'}} >宫颈癌群体筛查需要遵循一定的规范规划与实施。本网站所提供的宫颈癌筛查解决方案，包括HPV检测和阳性患者管理两部分。</div>
        <div style={{ height: '2rem' }}></div>
        {/* <div style={{maxWidth:440,width:'100%', color:colors.black3,fontSize:18,textAlign:'left'}} >您可以代表您的组织通过以下步骤完成</div> */}
        <div style={{ height: '2rem' }}></div>
        
        <div style={{ flexDirection:'row', justifyContent:'flex-start', alignItems:'center', width:'100%', height:'100%', maxWidth:440}} >
          <div style={{
            width: 90, height: 90,
            backgroundImage: `url(./icon/kefu.png)`,
          }} ></div>
          <p style={{marginLeft:20,color:colors.black3, fontSize:18, fontWeight:400}} >有疑问,请联系专业客服: 955888</p>
        </div>
        <div style={{ height: 20 }}></div>
        
        {user.name ? null :<CpInput id='name' value={input_name} onChange={(e) => {
          window._temp_name = e.target.value;
          window.q.vm(this, 'input_name', e)}}  icon='./icon/line-user.png' placeholder='请输入真实姓名' ></CpInput>}
        {user.name ? null : <div style={{ height: 20 }} />}
        
        {user.idcard ? null : <CpInput id='idcard' value={input_idcard} onChange={(e) => { 
          window._temp_idcard = e.target.value;
          window.q.vm(this, 'input_idcard', e) }} icon='./icon/line-id.png' placeholder='请输入身份证号' ></CpInput>}
        {user.idcard ? null : <div style={{ height: 20 }} />}

        <CpInput disabled={user.status_com  !== 0} id='name' value={input_comname} onChange={(e) => {
          window._temp_comname = e.target.value;
          window.q.vm(this, 'input_comname', e)}} icon='./icon/line-tip.png' placeholder='企业名称' ></CpInput>
        <div style={{ height: 20 }} />

        <CpInput  disabled={user.status_com !== 0} id='code' value={input_comcode} onChange={(e) => {
          window._temp_comcode = e.target.value;
          window.q.vm(this, 'input_comcode', e)}} icon='./icon/hospital-2.png' placeholder='企业机构代码' ></CpInput>
        <div style={{ height: 20 }} />

        {user.status_com !== 0?null:<CpIAgree url='#/nav/iagreecom/' onChange={this.iagreeChange} >《组织用户管理员注册须知》</CpIAgree>}
        <div style={{ height: 20 }}></div>
          
        <div style={{ flexDirection:'row', justifyContent:'flex-start', width: '100%', maxWidth: 440, height: '100%' }} >    
          <Uploader url={api.url_updateImage} img={input_combossid} complete={this.up_input_combossid} disabled={user.status_com === 1} id='input_combossid' >{user.status_com>0?'法人身份证':'上传法人身份证'}</Uploader>  
          <div style={{width:20,}}></div>
          <Uploader url={api.url_updateImage} img={input_comauthority} complete={this.up_input_comauthority} disabled={user.status_com === 1} id='input_comauthority' >{user.status_com > 0 ? '法人授权书' : '上传法人授权书'}</Uploader>  
        </div>
        <div style={{ height: 20 }} />

 
        {user.status_com !== 0 ? null : <div style={{ flexDirection: 'row',width:'100%', justifyContent:'center' }} >
        <CpButton onClick={this.send} style={{
            flexGrow: 1,
          maxWidth:440,  
          height:50,
        }} icon='./icon/right-white.png' >提交</CpButton>    
        </div>}
        <div style={{ height: '20rem' }} />
        </div>
    )
  }
}
module.exports = Comp
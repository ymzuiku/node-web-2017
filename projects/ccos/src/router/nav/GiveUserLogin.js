let React = require('react')
let { ac, so, api } = require('../../model/api')
let CpPlan = require('../../CpComp/CpPlan')
let colors = require('../../model/colors')
let UserInfo = require('../User/UserInfo')
let Loading = require('../../comp/Loading')
let CpInput = require('../../CpComp/CpInput')
let CpSelector = require('../../CpComp/CpSelector')
let CpIAgree = require('../../CpComp/CpIAgree')
let CpButton = require('../../CpComp/CpButton')

class GiveUserLogin extends React.PureComponent {
  constructor(props) {
    super(props)
    this.params = this.props.match.params
    this.sid = this.params.sid
    let _temp_name = window._temp_name || ''
    let _temp_idcard = window._temp_idcard || ''
    let _temp_phone = window._temp_phone || ''
    let _temp_addr = window._temp_addr || ''
    let _temp_ship = window._temp_ship || ''
    this.state = {
      tel:_temp_phone,
      idcard:_temp_idcard,
      pirce:'',
      pro_name:'',
      sname:'',
      pcd:'',
      addr:_temp_addr,
      name:_temp_name,
      ship:_temp_ship,
      proid:-1,
    }
  }
  componentDidMount() {
    so.dispatch(ac.ui({ navTitle: '接受宫颈癌预防服务' }))
    api.accept_service_page({sid:this.sid},(res)=>{
      let data = res.data[0]
      let pcd = data.addr.split('|')[0]
      let addr = data.addr.split('|')[1]
      this.setState({
        proid:data.proid,
        sname:data.sname,
        tel:data.tel,
        idcard:data.idcard,
        pirce:data.price,
        pro_name:data.pro_name,
        addr:addr,
        pcd:pcd,
        name:data.name,
        ship:data.ship,
      },()=>{
        console.log(this.state)
      })
    })
    document.body.style.backgroundColor = colors.white2
  }
  componentWillUnmount() {
    document.body.style.backgroundColor = colors.white1
  }
  send = () => {
    // 接受服务成功
    api.accept_service({
      sid:this.sid,
      name:this.state.name,
      tel:this.state.tel,
      idcard:this.state.idcard,
      pcd:this.state.pcd,
      addr:this.state.addr,
      ship:this.state.ship
    },(res)=>{
      window.msginfo(res.msg)
      window.location.href = '#/nav/statusgive/1/'
    })
  }
  render() {
    let {tel, sname,name, idcard,addr,pcd,pirce,pro_name,proid} = this.state
    return (
      <div>
        <div style={{height:20}} ></div>
        <CpPlan>
          <div style={{flexDirection:'row', justifyContent:'flex-start', flex:6  }}>
            <div
              style={{
                width: 100,
                height: 100,
                margin:10,
                backgroundImage: `url(${proid === '1'
                  ? './icon/product_1.png'
                  : './icon/product_2.png'})`,
              }}
            />
            <div style={{ width: 10 }} />
            <div  style={{alignItems:'flex-start', flexGrow:1, justifyContent:'center' }} >
              <div
                style={{
                  color: colors.black2,
                  fontSize: 20,
                  fontWeight: 400
                }}>
                {pro_name}
              </div>
              <div
                style={{
                  marginTop:5,
                  color: colors.black2,
                  fontSize: 16,
                  flexDirection:'row'
                }}>
               此订单由 <span style={{color: colors.red1, margin:'0px 6px'}} >{sname}</span> 购买并赠送给您
              </div>
              <div
                style={{
                  marginTop:5,
                  color: colors.red1,
                  fontSize: 16,
                  fontWeight: 400
                }}>
                订单价值 ¥{pirce} 
                
              </div>
            </div>
          </div>
        </CpPlan>
        <CpPlan>
          {/* 用户资料 */}
          <div>
          <div style={{
        alignItems:'center',
        margin:'0px 20px',
        flexGrow:1,
        }}>
        <div style={{height:30}}></div>  
        <div style={{ fontSize: 24, fontWeight: 400, color: colors.green3 }} >{'接送赠送服务'}</div>
        <div style={{height:20}}></div>
        <div style={{maxWidth:440, color:colors.black3,fontSize:18}} >检测报告和您的身份信息绑定，为了让后续服务和合作医院生效，请务必确认身份信息真实</div>
        <div style={{height:20}}></div>
        
        <CpInput disabled id='tel' value={tel} onChange={(e) => {
          window._temp_phone = e.target.value;
          window.q.vm(this, 'tel', e)}}  icon='./icon/line-phone.png' placeholder='您的手机号' ></CpInput>
        <div style={{height:20}} />

        <CpInput id='name' value={name} onChange={(e) => {
          window._temp_name = e.target.value;
          window.q.vm(this, 'name', e)}}  icon='./icon/line-user.png' placeholder='请输入真实姓名' ></CpInput>
        <div style={{height:20}} />
      
        <CpInput id='idcard' value={idcard} onChange={(e) => {
          window._temp_idcard = e.target.value;
          window.q.vm(this, 'idcard', e)}} icon='./icon/line-id.png' placeholder='请输入身份证号' ></CpInput>
        <div style={{ height: 20 }} />
        <CpSelector onChange={(str) => {
                this.setState({
                  pcd:str
                })
          }} value={pcd} style={{ width: '100%', maxWidth: 440, }} ></CpSelector>
          <div style={{ height: 20 }} />
          <CpInput
                id="addr"
                value={addr}
                onChange={e => {
                  window._temp_addr = e.target.value;
                  window.q.vm(this, 'addr', e)
                }}
                icon="./icon/line-id.png"
                placeholder="用户街道、门牌号"
        />
        <div style={{height:20}} ></div>
        <CpIAgree url='#/nav/iagreeuser/' onChange={this.iagreeChange} >《个人用户服务协议》</CpIAgree>
        <div style={{ height: 20 }}></div>
        <div style={{ flexDirection: 'row',width:'100%', justifyContent:'center' }} >
        <CpButton onClick={this.send} style={{
            flexGrow: 1,
          maxWidth:440,  
          height:50,
        }} icon='./icon/right-white.png' >提交</CpButton>    
          </div>
            </div>
            <div style={{height:30}}></div>    
          </div>
        </CpPlan>
        
      </div>
    )
  }
}
module.exports = GiveUserLogin
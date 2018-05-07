let React = require('react')
let { ac, so, api } = require('../../model/api')
let CpPlan = require('../../CpComp/CpPlan')
let colors = require('../../model/colors')
let UserInfo = require('../User/UserInfo')
let Loading = require('../../comp/Loading')
let CpInput = require('../../CpComp/CpInput')
let CpIAgree = require('../../CpComp/CpIAgree')
let CpButton = require('../../CpComp/CpButton')
let CpSelector = require('../../CpComp/CpSelector')

let defAddress = '常住地址 省、市、区'
class ComUserLogin extends React.PureComponent {
  constructor(props) {
    super(props)
    this.params = this.props.match.params
    this.pid = this.params.pid
    this.proid = this.params.proid
    if (this.proid === '1') {
      this.title = '个人三年保障计划'
      this.img = './icon/product_1.png'
    } else if (this.proid === '2') {
      this.title = '个人终身保障计划'
      this.img = './icon/product_2.png'
    } else if (this.proid === '3') {
      this.title = '组织HPV筛查'
      this.img = './icon/product_3.png'
    } else {
      this.title = '组织HPV筛查及阳性管理'
      this.img = './icon/product_4.png'
    }

    let _temp_name = window._temp_name || ''
    let _temp_idcard = window._temp_idcard || ''
    let _temp_phone = window._temp_phone || ''
    let _temp_addr = window._temp_addr || ''
    let _temp_ship = window._temp_ship || ''
    this.state = {
      name: _temp_name,
      idcard: _temp_idcard,
      pcd: defAddress,
      addr: _temp_addr,
      ship: _temp_ship,
      pc: window.pc()
    }
    window._temp_clear()

  }
  componentDidMount() {
    so.dispatch(ac.ui({ navTitle: 'HPV筛查报名' }))
    document.body.style.backgroundColor = colors.white2
    api.person(()=>{
      this.setState({
        name:so.getState().user.name,
        idcard:so.getState().user.idcard,
      })
    })
  }
  componentWillUnmount() {
    document.body.style.backgroundColor = colors.white1
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
    }
    return check
  }
  send = () => {
    // 报名成功
    if (this.checkInputs()) {
      api.project_apply(
        {
          pid: this.pid,
          proid: this.proid,
          name: this.state.name,
          idcard: this.state.idcard,
          pcd: this.state.pcd,
          addr: this.state.addr
        },
        (res) => {
          window.msginfo(res.msg)
          window.location.href = '#/nav/statuscom/1/'
        }
      ) 
    }
  }
  render() {
    let { pcd,addr, name, idcard, pc } = this.state
    return (
      <div>
        <div style={{ height: 20 }} />
        <CpPlan>
          {/* 顶部产品信息 */}
          <div
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: this.state.bgColor,
              margin: '10px 0px'
            }}>
            <div
              style={{
                width: pc ? 90 : 80,
                height: pc ? 90 : 80,
                margin: pc ? 15 : 10,
                backgroundImage: `url(${this.img})`
              }}
            />
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 18, color: colors.black1 }}> {this.title} </div>
              <div style={{ fontSize: 15, color: colors.black3, marginTop: 6 }}>
                {' '}
                通过线下组织进行筛查{' '}
              </div>
              <div style={{ fontSize: 17, color: colors.red1, marginTop: 6 }}> 企业代付 </div>
            </div>
          </div>
          <div
            style={{
              height: 1,
              opacity: 0.3,
              backgroundColor: colors.black3,
              width: '100%'
            }}
          />
          {/* 用户资料 */}
          <div>
            <div
              style={{
                alignItems: 'center',
                margin: '0px 20px',
                flexGrow: 1
              }}>
              <div style={{ height: 40 }} />
              <div style={{ fontSize: 24, fontWeight: 400, color: colors.green3 }}>
                {'我确认参加线下筛查'}
              </div>
              <div style={{ height: 20 }} />
              <div style={{ maxWidth: 440, color: colors.black3, fontSize: 18 }}>
              您的个人身份信息将和您的检测样本，作为识别您身份的必要信息，请务必输入真实正确的个人信息
              </div>
              <div style={{ height: 20 }} />

              <CpInput
                id="name"
                value={name}
                onChange={e => {
                  window._temp_name = e.target.value;
                  window.q.vm(this, 'name', e)
                }}
                icon="./icon/line-user.png"
                placeholder="真实姓名"
                style={{marginTop:20}}
              />

              <CpInput
                id="idcard"
                value={idcard}
                onChange={e => {
                  window._temp_idcard = e.target.value;
                  window.q.vm(this, 'idcard', e)
                }}
                icon="./icon/line-id.png"
                placeholder="身份证号"
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
                  window._temp_addr = e.target.value;
                  window.q.vm(this, 'addr', e)
                }}
                icon="./icon/line-id.png"
                placeholder="街道、门牌号"
                style={{marginTop:20}}
              />
              <div style={{height:20}} ></div>
              <CpIAgree url="#/nav/iagreeuser/" onChange={this.iagreeChange}>
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
                    height: 50
                  }}
                  icon="./icon/right-white.png">
                  提交
                </CpButton>
              </div>
            </div>
            <div style={{ height: 30 }} />
          </div>
        </CpPlan>
      </div>
    )
  }
}
module.exports = ComUserLogin

let React = require('react')
let { ac, api, so } = require('../../model/api')
let Button = require('../../comp/Button')
let colors = require('../../model/colors')
let NumberEditor = require('../../comp/NumberEditor')
let CpInput = require('../../CpComp/CpInput')
let Selector = require('../../comp/Selector')
let Loading = require('../../comp/Loading')
let CpPlan = require('../../CpComp/CpPlan')
let CpButton = require('../../CpComp/CpButton')
let defAddress = '收件地区 省、市、区'
let $ = window.$

let defaultInputs = [
  { tel: '', name: '', idcard: '', pcd: defAddress, addr: '', ship: '' }
]
let defaultPcd = '请选择项目地区'
module.exports = class OrderGive extends React.Component {
  constructor(props) {
    super(props)
    let sos = so.getState()
    let inputs = defaultInputs
    if (window.q.is(sos.ui.orderInputs, 'Array')) {
      inputs = sos.ui.orderInputs
    }
    this.params = this.props.match.params
    this.pid = Number(this.params.pid)
    this.state = {
      loading: true,
      pc: window.pc(),
      iagree: false,
      name: '',
      proid: 3,
      amount: '',
      age: '',
      pcd: defaultPcd,
      addr: '',
      local: false,
      order_total3: 0,
      order_total4: 0
    }
  }
  componentDidMount() {
    let sos = so.getState()
    this.unso = so.subscribe(() => {
      this.setState({
        pc: sos.ui.pc
      })
    })
    so.dispatch(ac.ui({ navTitle: '创建HPV筛查项目' }))
    if (this.pid !== 0) {
      api.get_project_detail({ pid: this.params.pid }, (res) => {
        let da = res.data[0]
        let subdata =da.data[0]
        this.setState({
          loading:false,
          name: da.name,
          id:da.id,
          data: da.data,
          proid: da.proid,
          status: da.status,
          pcd: subdata.pcd,
          addr: subdata.addr,
          age: subdata.age,
          local: subdata.local,
          amount: subdata.amount,
        })
      })
    } else {
      this.setState({
        loading:false,
      })
    }
    api.order_balance(res => {
      this.setState({
        order_total3: Number(res.data[0].order_total),
        order_total4: Number(res.data[1].order_total)
      })
    })
    document.body.style.backgroundColor = colors.white3
  }
  componentWillUnmount() {
    this.unso()
    document.body.style.backgroundColor = colors.white1
  }
  send = () => {
    if (this.state.name === '') {
      window.msginfo('请输入项目名')
      window.q.focusId('name')
    }
    else if (this.state.pcd === defaultPcd) {
      window.msginfo('请选择项目地址')
      window.q.focusId('pcd')
    } 
    // else if (this.state.addr === '') {
    //   window.msginfo('请输入街道、社区名称/自然村名称')
    //   window.q.focusId('addr')
    // } 
    else if (!window.q.regNum(this.state.amount)) {
      window.msginfo('请输入正确的筛查人数上限')
      window.q.focusId('amount')
    } else if (!window.q.regNum(this.state.age)) {
      window.msginfo('请输入正确的年龄范围')
      window.q.focusId('age')
    } else {
      api.project_save(
        {
          pid: this.pid,
          proid: this.state.proid,
          status: '进行中',
          name: this.state.name,
          pcd: this.state.pcd,
          addr: this.state.addr,
          age: this.state.age,
          local: this.state.local,
          amount: this.state.amount
        },
        res => {
          if (this.pid === 0) {
            window.location.href = '#/nav/createprojectstatus/'
          } else {
            window.history.back()
          }
        }
      )
    }
  }
  getRedioPayType = e => {
    var isAutoSend = document.getElementsByName('selec')
    for (var i = 0; i < isAutoSend.length; i++) {
      if (isAutoSend[i].checked == true) {
        this.setState({
          project_type: isAutoSend[i].id
        })
      }
    }
  }
  render() {
    let {loading, pc, data, order_total3, order_total4 } = this.state
    let sos = so.getState()
    if (loading === true) {
      return <div style={{height:'92vh'}} ><Loading></Loading></div>
    }
    return (
      <div style={{ backgroundColor: colors.white3 }}>
        <div style={{ height: 10 }} />
        <CpPlan>
          <div style={{ alignItems: 'center', margin: '20px 0px' }}>
            <div style={{ color: colors.green3, fontSize: 20 }}>填写项目信息</div>
            <div style={{ color: colors.black4, fontSize: 16, marginTop: 12 }}>
              以项目为单位作为筛查管理和统计
            </div>
            <div
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '92%',
                maxWidth: 440
              }}>
              <div style={{ flexDirection: 'column', flexGrow: 1 }}>
                {/* cell 1 */}
                <div
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 60,
                    width: '100%'
                  }}>
                  <div
                    style={{
                      width: pc ? 60 : 50,
                      height: pc ? 60 : 50,
                      backgroundImage: `url(./icon/product_3.png)`
                    }}
                  />
                  <div style={{ marginLeft: 10, flexGrow: 1 }}>
                    <div
                      style={{
                        color: colors.black2,
                        fontSize: pc ? 16 : 14,
                        width: pc ? 'auto' : 150
                      }}>
                      团体HPV筛查
                    </div>
                    <div
                      style={{
                        color: colors.black4,
                        fontSize: pc ? 14 : 12,
                        marginTop: pc ? 10 : 0
                      }}>
                      订单剩余: {order_total3}份
                    </div>
                  </div>
                  <input
                      className='radio'
                    type="radio"
                    defaultChecked
                    onClick={this.getRedioPayType}
                    id={3}
                    style={{
                      transform: `scale(1.5, 1.5)`,
                      marginRight: 10
                    }}
                    name="selec"
                  />
                  {pc ? '选择此服务' : '选择'}
                </div>
                {/* cell 2 */}
                <div
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 30,
                    width: '100%'
                  }}>
                  <div
                    style={{
                      width: pc ? 60 : 50,
                      height: pc ? 60 : 50,
                      backgroundImage: `url(./icon/product_4.png)`
                    }}
                  />
                  <div style={{ marginLeft: 10, flexGrow: 1 }}>
                    <div
                      style={{
                        color: colors.black2,
                        fontSize: pc ? 16 : 14,
                        width: pc ? 'auto' : 150
                      }}>
                      团体HPV筛查及阳性管理
                    </div>
                    <div
                      style={{
                        color: colors.black4,
                        fontSize: pc ? 14 : 12,
                        marginTop: pc ? 10 : 0
                      }}>
                      订单剩余: {order_total4}份
                    </div>
                  </div>
                  <input
                    type="radio"
                    className='radio'
                    onClick={this.getRedioPayType}
                    id={4}
                    style={{
                      transform: `scale(1.5, 1.5)`,
                      marginRight: 10
                    }}
                    name="selec"
                  />
                  {pc ? '选择此服务' : '选择'}
                </div>
              </div>
            </div>
            <CpInput
              id={'name'}
              value={this.state.name}
              onChange={e => {
                window.q.vm(this, 'name', e)
              }}
              icon="./icon/user-project.png"
              placeholder="请输入项目名称"
              style={{ marginTop: 40 }}
            />
            <div
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                pointerEvents: null,
                height: 44,
                width: '100%',
                maxWidth: 440,
                borderRadius: 3,
                marginTop: 20,
                border: '1px solid rgba(0,0,0,0.15)'
              }}>
              <div
                style={{
                  marginLeft: 5,
                  marginRight: 10,
                  minWidth: 34,
                  gridRow: 1,
                  height: 44,
                  backgroundImage: `url(./icon/line-location.png)`
                }}
              />
              <Selector
                type="address"
                nowDatas={this.state.pcd}
                onChange={({ str }) => {
                  this.setState({
                    pcd: str
                  })
                }}>
                <div
                  style={{
                    mixWidth: 250,
                    height: 40,
                    lineHeight: '40px',
                    fontSize: 16,
                    fontWeight: 300,
                    color: this.state.pcd ===defaultPcd?'#8C8C8C':colors.black2
                  }}>
                  {this.state.pcd}
                </div>
              </Selector>
              <div
                style={{
                  position: 'absolute',
                  minWidth: 34,
                  width: 34,
                  height: 44,
                  opacity: 0.6,
                  right: 8,
                  backgroundImage: `url(./icon/arrow-down.png)`,
                  backgroundPosition: `50% 50%`
                }}
              />
            </div>
            <CpInput
              id='addr'
              value={this.state.addr}
              onChange={e => {
                window.q.vm(this, 'addr', e)
              }}
              icon="./icon/line-location2.png"
              placeholder="请输入街道、社区名称/自然村名称(选填)"
              style={{ marginTop: 20 }}
            />
            <div
              style={{
                marginTop: 20,
                width: '92%',
                maxWidth: 440,
                alignItems: 'flex-start',
                color: colors.black2
              }}>
              请输入筛查人数上限, 输入0则不设定上限。
            </div>
            <CpInput
              id={'amount'}
              value={this.state.amount}
              onChange={e => {
                window.q.vm(this, 'amount', e)
              }}
              icon="./icon/enterprise.png"
              placeholder="输入筛查人数上限"
              style={{ marginTop: 10 }}
            />
            <div
              style={{
                marginTop: 20,
                width: '92%',
                maxWidth: 440,
                alignItems: 'flex-start',
                color: colors.black2
              }}>
              根据国际卫生组织及中国阴道镜和宫颈病理学会相关规范，人群筛查年龄范围应为：30~65岁
            </div>
            <CpInput
              id={'age'}
              value={this.state.age}
              onChange={e => {
                window.q.vm(this, 'age', e)
              }}
              icon="./icon/yangdata.png"
              placeholder="设定最小筛查年龄：建议30岁"
              style={{ marginTop: 10 }}
            />
            <div
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: 45,
                width: '100%',
                maxWidth: 440,
                color: colors.black2,
                fontSize: 15
              }}>
              <input
                onChange={e => {
                  this.setState({
                    local: e.target.checked
                  })
                }}
                className='checkbox'
                type="checkbox"
                checked={this.state.local}
                style={{ top: '0.2rem', transform: `scale(1.2, 1.2)` }}
              />
              <span style={{ marginLeft: '0.5rem' }}>只筛查本地户籍人口</span>{' '}
            </div>
          </div>
        </CpPlan>
        <CpPlan>
          <div style={{ alignItems: 'center', margin: '20px 0px' }}>
            <div style={{ color: colors.black2, fontSize: 20 }}>
              根据国家筛查规范，系统自动为您设定了以下筛查条件
            </div>
            <div style={{ color: colors.black2, fontSize: 16, marginTop: 12 }}>
              <ul className='ul' >
                <li>已有过性生活</li>
                <li style={{ marginTop: 10 }}>未处于妊娠期</li>
                <li style={{ marginTop: 10 }}>未接受过子宫全切术</li>
              </ul>
            </div>
            <CpButton
              onClick={this.send}
              icon="./icon/edit-white.png"
              style={{ maxWidth: 400, width:'100%', width:'100%', height: 50, marginTop: 30 }}
              type="simple">
              {this.pid===0?'创建项目':'更新项目信息'}
            </CpButton>
            <div style={{ height: 20 }} />
          </div>
        </CpPlan>
        <div style={{ height: 40 }} />
      </div>
    )
  }
}

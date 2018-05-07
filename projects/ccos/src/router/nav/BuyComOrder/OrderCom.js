let React = require('react')
let { ac, api, so } = require('../../../model/api')
let Button = require('../../../comp/Button')
let colors = require('../../../model/colors')
let NumberEditor = require('../../../comp/NumberEditor')
let CpInput = require('../../../CpComp/CpInput')
let CpIAgree = require('../../../CpComp/CpIAgree')
let Selector = require('../../../comp/Selector')
let Loading = require('../../../comp/Loading')
let CpPlan = require('../../../CpComp/CpPlan')
let CpButton = require('../../../CpComp/CpButton')
let defAddress = '收件地区 省、市、区'
let $ = window.$
if (false) { var Steps = require('antd').Steps }; Steps = require('antd/lib/steps'); var Step = Steps.Step

let defaultInputs = [
  { tel: '', name: '', idcard: '', pcd: defAddress, addr: '', ship: '' }
]
class OrderGive extends React.Component {
  constructor(props) {
    super(props)
    let sos = so.getState()
    let inputs = defaultInputs
    if (window.q.is(sos.ui.orderInputs, 'Array')) {
      inputs = sos.ui.orderInputs
    }
    this.state = {
      loading: true,
      type: this.props.type || '自己用',
      payway: 'wechat',
      data: null,
      citys: null,
      input_iagree:false,
      pid: this.props.produckId,
      oid: this.props.oid,
      pc: window.pc,
      lookproduck: this.props.lock,
      inputs: inputs,
      iagree: false,
      fixMoney: '...',
      num: sos.ui.orderInputs ? sos.ui.orderInputs.length : 1
    }
  }
  componentDidMount() {
    let sos = so.getState()
    this.unso = so.subscribe(() => {
      this.setState({
        pc: sos.ui.pc,
      })
    })
    api.city(res => {
      if (res.status !== '200') {
        window.msg({ info: res.msg })
      } else {
        this.setState({
          citys: res.data
        })
      }
    })
    api.produckList(res => {
      if (res.status !== '200') {
        window.msg({ info: res.msg })
      } else {
        let data = res.data
        for (let i = 0, len = data.length; i < len; i++) {
          let ele = data[i]
          if (ele.id === this.props.produckId) {
            this.setState(
              {
                data: ele
              },
              () => {
                let money = this.fixMoney()
                this.setState({
                  fixMoney: money
                })
              }
            )
          }
        }
      }
    })
    document.body.style.backgroundColor = colors.white3
  }
  componentWillUnmount() {
    this.unso()
    so.dispatch(ac.ui({ orderInputs: defaultInputs }))
    document.body.style.backgroundColor = colors.white1
  }
  send = () => {
    let { inputs, data, oid, payway, num } = this.state
    let sos = so.getState()
    if(!this.state.input_iagree){
      window.msginfo("请阅读并同意条款")
    } else {
      api.save_order(
        {
          oid: oid,
          proid: data.id,
          type: '企业用',
          money: this.fixMoney(),
          amount: num
        },
        res => {
          api.pay({ oid: res.orderid, payway: payway, money: this.fixMoney() }, res => {
            if (res.status !== '200') {
              window.location.href = '#/nav/statuspay/0/'
            } else {
              window.msginfo(res.msg)
              window.location.href = '#/nav/statuspay/1/'
            }
          })
        }
      )
    }
  }

  fixMoney = () => {
    let { type, data, num } = this.state
    if (!data && num > 0) {
      return '请完善信息'
    }
    let _moneys = data.money.split('|')
    let moneys = []
    _moneys.map((v, i) => {
      moneys.push(Number(v))
    })
    let money = moneys[0]
    let end = money * num
    if (end === 0) {
      end = '请完善信息'
    }
    return end
  }
  getRedioPayType = () => {
    var isAutoSend = document.getElementsByName('pay')
    for (var i = 0; i < isAutoSend.length; i++) {
      if (isAutoSend[i].checked == true) {
        this.setState({
          payway: isAutoSend[i].id
        })
      }
    }
  }
  changeNumbuers = num => {
    this.setState({
      num: num
    })
  }
  iagreeChange = (e) => {
    this.setState({
      input_iagree:e.target.checked
    })
  }
  render() {
    let { type, data, pc, num, fixMoney, citys, inputs, lookproduck } = this.state
    let sos = so.getState()
    if (!data || data.lenght < 1 || !citys) {
      return (
        <div style={{ height: '90vh' }}>
          <Loading />
        </div>
      )
    }
    let money = this.fixMoney()
    let tip = data.tip.split('|')
    let formatCitys = []
    for (var i = 0, len = citys.length; i < len; i++) {
      let cell = Math.floor(i / 4)
      let coll = i % 4
      if (!formatCitys[cell]) {
        formatCitys[cell] = []
      }
      formatCitys[cell][coll] = citys[i].city
    }
    return (
      <div style={{ backgroundColor: colors.white3 }}>
        <div style={{ height: 10 }} />
        <CpPlan>
          <div style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 6 }}>
            <div
              style={{
                width: 100,
                height: 100,
                margin: 10,
                backgroundImage: `url(${this.props.produckId === '3'
                  ? './icon/product_3.png'
                  : './icon/product_4.png'})`
              }}
            />
            <div style={{ width: 10 }} />
            <div
              style={{ alignItems: 'flex-start', flexGrow: 1, justifyContent: 'center' }}>
              <div
                style={{
                  color: colors.black2,
                  fontSize: 20,
                  fontWeight: 400
                }}>
                {data.title}
              </div>
              <div
                style={{
                  marginTop: 5,
                  color: colors.black3,
                  fontSize: 16
                }}>
                订单 x{num} 免运费
              </div>
              <div
                style={{
                  marginTop: 5,
                  color: colors.red1,
                  fontSize: 22,
                  fontWeight: 400
                }}>
                ¥{money}
              </div>
            </div>
            {type === 'self' ? null : (
              <div style={{ justifyContent: 'center', marginRight: 20 }}>
                <NumberEditor
                  disabled={lookproduck}
                  min={1}
                  num={num}
                  onChang={this.changeNumbuers}
                />
              </div>
            )}
          </div>
        </CpPlan>
        <CpPlan>
          <div
            style={{ margin: 20, marginBottom: 10, fontSize: 16, color: colors.black2 }}>
            {data.info}
          </div>
          <ul className='ul' >
            {tip.map((v, i) => {
              return (
                <li
                  key={'orderselfli' + i}
                  style={{ height: 30, fontSize: 16, color: colors.black2 }}>
                  {v}
                </li>
              )
            })}
          </ul>
        </CpPlan>
        <CpPlan style={{ alignItems: 'center', justifyContent: 'center' }} >
          <div style={{ height: 15 }} ></div>
          <Steps current={lookproduck ? -1 : 0} style={{ flexDirection: 'row', justifyContent: 'center', width: '90%', }}>
            <Step title="购买订单" description={pc ? "根据筛查所需购买订单个数" : ''} />
            <Step title="创建项目" description={pc ? "以项目为单位管理线下筛查" : ''} />
            <Step title="用户报名" description={pc ? "通过用户报名统计筛查人数和评估筛查工作量" : ''} />
            <Step title="通知筛查" description={pc ? "做好线下筛查的准备之后，批量发送短信通知已报名的用户在指定时间到指定地点筛查" : ''} />
          </Steps>
          <div style={{ height: 15 }} ></div>
        </CpPlan>
        <CpPlan>
          <div style={{marginLeft:16}} >
          <CpIAgree url='#/nav/iagreecombuy/' onChange={this.iagreeChange} >《组织服务购买须知》</CpIAgree>
          </div>
        </CpPlan>
        {sos.user.status_com === 2 ? null : this.renderFixCombossid()}
        {sos.user.status_com === 2 ? (
          <CpPlan
            style={{
              justifyContent: 'center',
              display: lookproduck === true ? 'none' : null
            }}>
            <div
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 20
              }}>
              <div
                style={{
                  flexDirection: 'column',
                  marginLeft: 10,
                  flexGrow: 2,
                  color: colors.black2,
                  fontSize: 17,
                  fontWeight: 400,
                  margin: 20
                }}>
                <div style={{ flexGrow: 1, flexDirection: 'row' }}>
                  <input
                    type="radio"
                    className='radio'
                    defaultChecked
                    onClick={this.getRedioPayType}
                    id="wechat"
                    style={{
                      transform: `scale(1.5, 1.5)`,
                      marginRight: 10
                    }}
                    name="pay"
                  />{' '}
                  微信
                  <input
                    type="radio"
                    className='radio'
                    onClick={this.getRedioPayType}
                    id="ali"
                    style={{
                      transform: `scale(1.5, 1.5)`,
                      marginLeft: 30,
                      marginRight: 10
                    }}
                    name="pay"
                  />{' '}
                  支付宝
                  <input
                    type="radio"
                    className='radio'
                    onClick={this.getRedioPayType}
                    id="offline"
                    style={{
                      transform: `scale(1.5, 1.5)`,
                      marginLeft: 30,
                      marginRight: 10
                    }}
                    name="pay"
                  />{' '}
                  线下交易
                </div>
                <div style={{ flexGrow: 1, flexDirection: 'row', marginTop: 10 }}>
                  共计 <span style={{ color: colors.red1 }}>{money}</span> 元
                </div>
              </div>
              <CpButton
                onClick={this.send}
                icon="./icon/pay-white.png"
                style={{ flexGrow: 3, width: 10, height: 50 }}>
                支付
              </CpButton>
            </div>
          </CpPlan>
        ) : null}
        <div style={{ height: 20 }} />
      </div>
    )
  }
  renderFixCombossid = () => {
    return (
      <CpPlan style={{ justifyContent: 'space-between' }}>
        <div
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20
          }}>
          <div
            style={{
              color: colors.black2,
              fontSize: 20,
              marginTop: 20,
              fontWeight: 400
            }}>
            此产品只对企业、事业单位、团体组织开放
          </div>
          <div
            style={{
              height: 120,
              width: 120,
              marginTop: 30,
              backgroundImage: `url(./icon/upfile.png)`
            }}
          />
          <CpButton
            to="#/user/com/"
            icon="./icon/edit-white.png"
            style={{ maxWidth: 400, width: '100%', height: 50, marginTop: 30 }}
            type="simple">
            去完善组织信息
          </CpButton>
          <div style={{ height: 20 }} />
        </div>
      </CpPlan>
    )
  }
  renderSelf = num => {
    let { inputs, lookproduck } = this.state
    let { addr, idcard, name, pcd, ship, tel } = inputs[num]
    let sos = so.getState()
    return (
      <CpPlan key={'ordergivePlan' + num}>
        {num !== 0 ? (
          <Button
            className="btn"
            onClick={() => {
              inputs.splice(num, 1)
              this.setState({
                inputs: inputs
              })
              so.dispatch(ac.ui({ orderInputs: inputs }))
            }}
            style={{
              zIndex: 2,
              position: 'absolute',
              right: 15,
              top: 15,
              opacity: 0.5,
              width: 50,
              height: 50,
              backgroundImage: `url(./icon/close.png)`,
              backgroundSize: `34px 34px`,
              backgroundPosition: `50% 50%`
            }}
          />
        ) : null}
        <div style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ height: 20 }} />
          <div
            className="box v"
            style={{
              color: colors.black2,
              width: '60%',
              fontSize: 16,
              fontWeight: 400
            }}>
            收货信息
          </div>
          <div style={{ height: 20 }} />
          <CpInput
            disabled={lookproduck || sos.user.name}
            id={'name' + num}
            value={inputs[num].name}
            onChange={e => {
              let v = e.target.value
              inputs[num].name = v
              this.setState({
                inputs: inputs
              })
            }}
            icon="./icon/line-user.png"
            placeholder="请输入您的真实姓名"
          />
          <div style={{ height: 20 }} />

          <CpInput
            disabled={lookproduck || sos.user.idcard}
            id={'idcard' + num}
            value={inputs[num].idcard}
            onChange={e => {
              let v = e.target.value
              inputs[num].idcard = v
              this.setState({
                inputs: inputs
              })
            }}
            icon="./icon/line-id.png"
            placeholder="请输入您的身份证号"
          />
          <div style={{ height: 20 }} />

          <CpInput
            disabled={lookproduck || sos.user.tel}
            id={'tel' + num}
            value={inputs[num].tel}
            onChange={e => {
              let v = e.target.value
              inputs[num].tel = v
              this.setState({
                inputs: inputs
              })
            }}
            icon="./icon/line-phone.png"
            placeholder="请输入您的手机"
          />
          <div style={{ height: 20 }} />
          <div
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              pointerEvents: lookproduck ? 'none' : null,
              height: 44,
              width: '100%',
              maxWidth: 440,
              borderRadius: 3,
              border: lookproduck ? null : '1px solid rgba(0,0,0,0.15)'
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
              nowDatas={pcd === defAddress ? '' : inputs[num].pcd}
              onChange={({ str }) => {
                inputs[num].pcd = str
                this.setState({
                  inputs: inputs
                })
              }}
              style={{}}>
              <div
                style={{
                  mixWidth: 250,
                  height: 40,
                  lineHeight: '40px',
                  fontSize: 16,
                  fontWeight: 300,
                  color: pcd === defAddress ? colors.black2 : colors.black1
                }}>
                {inputs[num].pcd}
              </div>
            </Selector>
            <div
              style={{
                position: 'absolute',
                minWidth: 34,
                width: 34,
                height: 44,
                opacity: lookproduck ? 0 : 0.6,
                right: 8,
                backgroundImage: `url(./icon/arrow-down.png)`,
                backgroundPosition: `50% 50%`
              }}
            />
          </div>
          <div style={{ height: 20 }} />

          <CpInput
            disabled={lookproduck}
            id={'addr' + num}
            value={inputs[num].addr}
            onChange={e => {
              let v = e.target.value
              inputs[num].addr = v
              this.setState({
                inputs: inputs
              })
            }}
            icon="./icon/line-location2.png"
            placeholder="收件地址 街道、门牌号"
          />
          <div style={{ height: 20 }} />

          <CpInput
            disabled={lookproduck}
            id={'ship' + num}
            value={inputs[num].ship}
            onChange={e => {
              let v = e.target.value
              inputs[num].ship = v
              this.setState({
                inputs: inputs
              })
            }}
            icon="./icon/line-tip.png"
            placeholder="备注(选填)"
          />
          <div style={{ height: 40 }} />
        </div>
      </CpPlan>
    )
  }
}

module.exports = OrderGive

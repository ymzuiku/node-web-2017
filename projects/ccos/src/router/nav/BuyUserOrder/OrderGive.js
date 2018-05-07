let React = require('react')
let { ac, api, so } = require('../../../model/api')
let Button = require('../../../comp/Button')
let colors = require('../../../model/colors')
let NumberEditor = require('../../../comp/NumberEditor')
let CpInput = require('../../../CpComp/CpInput')
let Selector = require('../../../comp/Selector')
let Loading = require('../../../comp/Loading')
let CpPlan = require('../../../CpComp/CpPlan')
let CpButton = require('../../../CpComp/CpButton')
let defAddress = '收件地区 省、市、区'
let $ = window.$
if (false) { var Steps = require('antd').Steps }; Steps = require('antd/lib/steps');var Step = Steps.Step

let defaultInputs = [{tel:'', name:'', idcard:'',pcd:defAddress,addr:'',ship:''}]
class Comp extends React.Component {
  ispay = false
  constructor(props) {
    super(props)
    let sos = so.getState()
    let inputs = defaultInputs
    if (window.q.is(sos.ui.orderInputs, 'Array')) {
      inputs = sos.ui.orderInputs
    }
    this.state = {
      type: this.props.type || 'self',
      data: null,
      payway:'wechat',
      citys: null,
      pid: this.props.produckId,
      oid:this.props.oid,
      pc: window.pc(),
      inputs:inputs,
      fixMoney: '...',
      lookproduck:this.props.lock,
      num: sos.ui.orderInputs?sos.ui.orderInputs.length:1
    }
  }
  componentDidMount() {
    document.body.style.backgroundColor = colors.white3
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
            // window.msg({ info: JSON.stringify(ele), time: 999999 })
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
  }
  componentWillUnmount() {
    this.unso()
    if (!this.ispay) {
      let _inputs = []
      let {inputs} = this.state
      for (let i = 0, len = inputs.length; i < len; i++) {
        let ele = inputs[i]
        let num = i + 1
        if (ele.tel !== '' && ele.name !== '' && ele.idcard !== '' && ele.pcd !== '') {
          _inputs.push(ele)
        }
      }
      so.dispatch(ac.ui({orderInputs:this.state.inputs}))
    }
    document.body.style.backgroundColor = colors.white1
  }
  update = (_inputs, event) => {
    let { inputs, data, oid } = this.state
    if (!data) {
      return data
    }
    api.save_order(
      {
        oid: oid,
        money: this.fixMoney(),
        proid: data.id,
        type:'送她人',
        data: _inputs,
      },
      res => {
        this.setState({
          oid:res.orderid
        }, () => {
          if (event) {
            event({oid:this.state.oid, payway:this.state.payway, money:this.fixMoney()})
          }
        })
      }
    )
  }
  pay=(paydata)=>{
    api.pay(paydata, (res) => {
      if (res.status !== '200') {
        window.location.href = '#/nav/statuspay/0/'
      } else {
        this.ispay = true
        window.msginfo(res.msg)
        window.location.href = '#/nav/statuspay/1/'
      }
    })
  }
  getRedioPayType = () => {
    var isAutoSend = document.getElementsByName('pay');
    for (var i = 0; i < isAutoSend.length; i++) {
      if (isAutoSend[i].checked == true) {
        this.setState({
          payway:isAutoSend[i].id
        })
      }
    }
  }
  send = () => {
    let { inputs,data,oid } = this.state
    let addr, idcard, name, pcd, ship, tel = ''
    let _inputs = []
    for (let i = 0, len = inputs.length; i < len; i++) {
      let ele = inputs[i]
      let num = i + 1
      if (ele.name.length < 2) {
        window.msg({ info: `订单${num}: 请输入姓名` })
        let obj = document.getElementById('name' + num)
        if(obj) obj.focus()
        return
      }
      else if (!isNaN(ele.name)) {
        window.msg({ info: `订单${num}: 请输入正确的姓名` })
        let obj = document.getElementById('name' + num)
        if(obj) obj.focus()
        return
      }
      else if (window.q.regPhone(ele.tel) !== true) {
        window.msg({ info: `订单${num}: 请输入正确的手机号` })
        let obj = document.getElementById('tel' + num)
        if(obj) obj.focus()
        return
      }  
      else if (window.q.regIdcard(ele.idcard) !== true) {
        window.msg({ info: `订单${num}: ` + window.q.regIdcard(ele.idcard) })
        let obj = document.getElementById('idcard' + num)
        if(obj) obj.focus()
        return
      } else if (window.q.regIdcardInfo(ele.idcard).age <29) {
        window.msg({ info: `订单${num}: `+'受益人年龄小于30岁, 不适合购买该服务' })
        return
      } else if (window.q.regIdcardInfo(ele.idcard).sex === 'x') {
        window.msg({ info: '该服务只适用于30岁以上的女性' })
        return
      }  else if (ele.pcd === '') {
        window.msg({ info: `订单${num}: 请选择地区` })
        return
      } else if (ele.addr === '') {
        window.msg({ info: `订单${num}: 请输入详细地址` })
        let obj = document.getElementById('addr' + num)
        if(obj) obj.focus()
        return
      } else {
          _inputs.push(ele)
      }
    }
    if (_inputs.length === 0) {
      window.msgtip(`请完善订单信息`) 
    } else {
      console.log(_inputs)
      this.update(_inputs,this.pay)
    }
  }
  pay = (paydata)=>{
    api.pay(paydata, (res) => {
      if (res.status !== '200') {
        window.location.href = '#/nav/statuspay/0'
      } else {
        window.msginfo(res.msg)
        window.location.href = '#/nav/statuspay/1'
      }
    })
  }

  fixMoney = () => {
    let { type, data, inputs } = this.state
    let input_len = inputs.length >>> 0
    if (!data && !input_len) {
      return '请完善信息'
    }
    let _moneys = data.money.split('|')
    let moneys =[]
    _moneys.map((v, i) => {
      moneys.push(Number(v))
    })
    for (var i = 0, len = input_len; i < len; i++) {
      var ele = inputs[i]
    }
    let end = 0
    for (let i = 0, len = inputs.length; i < len; i++) {
      let v = inputs[i]
      let ele = window.q.regIdcardInfo(v.idcard)  
      if (ele.age < 29.5 || ele.sex === 'x') {
        ele += 0
      } else {
        let num = ele.age - Number(data.age)
        num = num < 0 ? 0 : num
        if (num > moneys.length - 1) {
          num = moneys.length-1
        }
        end += moneys[num]
      }
    }
    if (end === 0) {
      end = '请完善信息'
    }
    return end
  }
  ChangeNumbuers = (num) => {
    let { inputs } = this.state
    let inps = []
    for (let i = 0, len = num; i < len; i++) {
      if (i <= inputs.length-1) {
        inps.push(inputs[i])  
      }
      else {
        inps.push({tel:'', name:'', idcard:'',pcd:defAddress,addr:'',ship:''},)
      }
    }
    this.setState({
      inputs: inps,
      num: num
    })
    so.dispatch(ac.ui({orderInputs:inps}))
  }
  render() {
    let { data, pc, num, fixMoney, citys, inputs, lookproduck } = this.state
    let {type} = this.props
    let sos = so.getState()
    if (!data || !citys) {
      return <div style={{height:'90vh'}} ><Loading /></div>
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
      <div style={{  backgroundColor: colors.white3 }}>
        <div style={{ height: 10 }} />
        <CpPlan>
          <div style={{flexDirection:'row', justifyContent:'flex-start',  }}>
            <div
              style={{
                width: 100,
                height: 100,
                margin:10,
                backgroundImage: `url(${this.props.produckId === '1'
                  ? './icon/product_1.png'
                  : './icon/product_2.png'})`,
              }}
            />
            <div style={{ width: 10 }} />
            <div  style={{alignItems:'flex-start',flexGrow:1, justifyContent:'center', flex: 6 }}>
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
                  marginTop:5,
                  color: colors.black3,
                  fontSize: 16,
                }}>
                订单 x{num} 免运费
              </div>
              <div
                style={{
                  marginTop:5,
                  color: colors.red1,
                  fontSize: 22,
                  fontWeight: 400
                }}>
                ¥{money}
              </div>
            </div>
            {type === 'self' ? null : (
              <div style={{justifyContent:'center', marginRight: 20,}}>
                <NumberEditor disabled={lookproduck} min={1} num={num} onChang={this.ChangeNumbuers} />
              </div>
            )}
          </div>
        </CpPlan>
        <CpPlan>
          <div style={{ margin:20, marginBottom:10, fontSize:16,color:colors.black2 }}>{data.info}</div>
          <ul className='ul'>
            {tip.map((v, i) => {
              return <li key={'orderselfli'+i} style={{ height: 30,fontSize:16, color:colors.black2 }}>{v}</li>
            })}
          </ul>
        </CpPlan>
        <CpPlan style={{ alignItems: 'center', justifyContent: 'center' }} >
        <div style={{height:15}} ></div>  
        <Steps current={lookproduck?-1:0} style={{ flexDirection:'row', justifyContent: 'center', width: '90%', }}>
            <Step title="在线下单" description={pc?"在线购买合适亲友的服务":''} />    
            <Step title="绑定样本" description={pc ? "在收到样本之后，先行取样，再绑定样本" : ''} />
            <Step title="回递样本" description={pc ? "填写基本信息，我们会有专业客服上门取回样本" : ''} />
            <Step title="查看结果" description={pc ? "查看检测报告及后续服务" : ''} />
          </Steps>
          <div style={{height:15}} ></div>    
        </CpPlan>
        <CpPlan >
          <div style={{ justifyContent: 'center', alignItems:'center'}} >
            <div
              style={{
                margin:20,
                justifyContent: 'center',
                alignItems:'center',
                color: colors.black2,
                fontSize: 20,
                fontWeight: 400
              }}>
              我们在以下城市有合作医院
            </div>
            {formatCitys.map((items, cell) => {
              return (
                <div
                  key={'orderselfcitycell'+cell}  
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems:'center',
                    marginTop: 5,
                    marginBottom: 10,
                    maxWidth: 440,
                  }}>
                  {items.map((item, coll) => {
                    return (
                      <div  
                        key={'orderselfcitycoll'+coll}    
                        style={{
                          justifyContent: 'center',
                          alignItems:'center',
                          marginLeft: 10,
                          width: 70,
                          marginRight: 10,
                          fontSize: 17,
                          color: colors.black2
                        }}>
                        {item}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </CpPlan>
        {inputs.map((v,i) => {
          return this.renderSelf(i)
        })}
        <CpPlan style={{ justifyContent:'center', display:lookproduck===true?'none':null,}} >
          <div
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems:'center',
              margin:20
            }}>
            <div style={{ flexDirection: 'column', marginLeft:10, flexGrow:2, color: colors.black2, fontSize: 17, fontWeight: 400,margin:20 }}>
              <div style={{flexGrow:1, flexDirection: 'row' }} >
              <input className='radio' type="radio" defaultChecked onClick={this.getRedioPayType} id="wechat" style={{
             transform:`scale(1.5, 1.5)`, marginRight:10
            }}  name="pay"/>  微信
            <input className='radio' type="radio" onClick={this.getRedioPayType} id="ali" style={{  
             transform:`scale(1.5, 1.5)`, marginLeft:30,marginRight:10,
            }} name="pay"/>  支付宝   
              </div>  
              <div style={{flexGrow:1,flexDirection:'row',marginTop:10}} >共计 <span style={{ color: colors.red1 }}>{money}</span> 元</div>
            </div>
            <CpButton
              onClick={this.send}
              icon="./icon/pay-white.png"
              style={{flexGrow:3,width:10,height:50, }}
            >
              支付
            </CpButton>
          </div>
        </CpPlan>
      </div>
    )
  }
  renderSelf = num => {
    let { inputs, lookproduck } = this.state
    let sos = so.getState()
    let { addr, idcard, name, pcd, ship, tel } = inputs[num]
    return (
      <CpPlan key={'orderselfself'+num} >
        {num !== 0?<Button
          onClick={() => {
            inputs.splice(num, 1)
            this.setState({
              inputs: inputs,
              num:inputs.length,
            })
            so.dispatch(ac.ui({orderInputs:inputs}))
          }}
          style={{
            zIndex:2,
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
        />:null}
        <div style={{ justifyContent: 'center', alignItems:'center' }}>
          <div style={{ height: 20 }} />
          <div
            style={{
              justifyContent: 'center',
              color: colors.black2,
              fontSize: 16,
              fontWeight: 400
            }}>
            订单 {num+1} 的收货信息
          </div>
          <div style={{ height: 20 }} />
          <CpInput
            disabled={lookproduck}  
            id={"name"+num}
            value={inputs[num].name}
            onChange={e => {
              let v = e.target.value
              inputs[num].name = v
              this.setState({
                inputs:inputs  
              })
            }}
            icon="./icon/line-user.png"
            placeholder="请输入受益人真实姓名"
          />
          <div style={{ height: 20 }} />

          <CpInput
            disabled={lookproduck}  
            id={"idcard"+num}
            value={inputs[num].idcard}
            onChange={e => {
              let v = e.target.value
              inputs[num].idcard = v
              this.setState({
                inputs:inputs  
              })
            }}
            icon="./icon/line-id.png"
            placeholder="请输入受益人身份证号"
          />
          <div style={{ height: 20 }} />

          <CpInput
            disabled={lookproduck}  
            id={"tel"+num}
            value={inputs[num].tel}
            onChange={e => {
              let v = e.target.value
              inputs[num].tel = v
              this.setState({
                inputs:inputs  
              })
            }}
            icon="./icon/line-phone.png"
            placeholder="请输入受益人手机"
          />
          <div style={{ height: 20 }} />
          <div
            style={{
              flexDirection:'row',
              justifyContent: 'flex-start',
              pointerEvents:lookproduck?'none':null,
              height: 44,
              width: '100%',
              maxWidth: 440,
              borderRadius: 3,
              border: lookproduck?null:'1px solid rgba(0,0,0,0.15)'
            }}>
            <div
              style={{
                marginLeft: 5,
                marginRight: 10,
                minWidth: 34,
                gridRow:1,
                height: 44,
                backgroundImage: `url(./icon/line-location.png)`,
              }}
            />
            <Selector
              type="address"
              nowDatas={pcd===defAddress?'':inputs[num].pcd}
              onChange={({ str }) => {
                  inputs[num].pcd = str
                  this.setState({
                    inputs:inputs  
                  })
              }}
              style={{}}>
              <div
                style={{
                  minWidth: 250,
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
                opacity:lookproduck?0:0.6,
                right: 8,
                backgroundImage: `url(./icon/arrow-down.png)`,
                backgroundPosition: `50% 50%`,
              }}
            />
          </div>
          <div style={{ height: 20 }} />

          <CpInput
            disabled={lookproduck}
            id={"addr"+num}
            value={inputs[num].addr}
            onChange={e => {
              let v = e.target.value
              inputs[num].addr = v
              this.setState({
                inputs:inputs  
              })
            }}
            icon="./icon/line-location2.png"
            placeholder="收件地址 街道、门牌号"
          />
          <div style={{ height: 20 }} />

          <CpInput
          disabled={lookproduck}  
            id={"ship"+num}
            value={inputs[num].ship}
            onChange={e => {
              let v = e.target.value
              inputs[num].ship = v
              this.setState({
                inputs:inputs
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
module.exports = Comp
let React = require('react')
let { ac, so, api } = require('../../../model/api')
let colors = require('../../../model/colors')
let CpPlan = require('../../../CpComp/CpPlan')
let CpInput = require('../../../CpComp/CpInput')
let CpButton = require('../../../CpComp/CpButton')
let CpSelector = require('../../../CpComp/CpSelector')
if (false) {
  var Steps = require('antd').Steps
}
Steps = require('antd/lib/steps')
var Step = Steps.Step

let defAddress = '取件地区 省、市、区'

class Step1 extends React.PureComponent {
  constructor(props) {
    super(props)
    console.log('-------')
    console.log(this.props)
    this.state = {
      pcd: this.props.pcd || defAddress,
      addr: this.props.addr || '',
      pc: window.pc()
    }
  }
  send = () => {
    api.order_service_sample_addr({ sid: this.props.sid, pcd: this.state.pcd, addr: this.state.addr }, (res) => {
      window.msginfo(res.msg)
      so.dispatch(ac.ui({reload:so.getState().ui.reload+1}))      
    })
  }
  render() {
    let { pcd, addr, } = this.state
    return (
      <div>
        <CpPlan>
          <div style={{ alignItems: 'center', padding: 20 }}>
            <h3>请提供您的地址,我们的客服人员会与您联系回收样本</h3>
            <div style={{height:20}} ></div>
            <CpSelector onChange={(str) => {
              this.setState({
                pcd:str
              })
            }} value={pcd} style={{ width: '100%', maxWidth: 440, }} ></CpSelector>
            <CpInput
              id={'addr'}
              value={addr}
              onChange={e => {
                let v = e.target.value
                this.setState({
                  addr: v
                })
              }}
              icon="./icon/line-id.png"
              placeholder="请输入街道、门牌号"
              style={{width:'100%', maxWidth:440,height:45,marginTop:15}}
            />
            <CpButton onClick={this.send} icon='./icon/right-white.png'  style={{width:'100%', maxWidth:440, height:45,marginTop:15}}>提交</CpButton>
          </div>
        </CpPlan>
        <div style={{height:50}} ></div>
      </div>
    )
  }
}
module.exports = Step1
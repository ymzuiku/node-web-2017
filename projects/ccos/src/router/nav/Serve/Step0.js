let React = require('react')
let { ac, so, api } = require('../../../model/api')
let colors = require('../../../model/colors')
let CpPlan = require('../../../CpComp/CpPlan')
let CpInput = require('../../../CpComp/CpInput')
let CpButton = require('../../../CpComp/CpButton')
if (false) {
  var Steps = require('antd').Steps
}
Steps = require('antd/lib/steps')
var Step = Steps.Step

class Step0 extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      pc: window.pc()
    }
  }
  send = () => {
    api.order_service_sample_code({ sid: this.props.sid,code:this.state.code}, (res) => {
      window.msginfo(res.msg)
      so.dispatch(ac.ui({reload:so.getState().ui.reload+1}))
    })
  }
  render() {
    let { code } = this.state
    let {status,data}= this.props
    if(status === '等待寄送取样器'){
      return <div>
      <CpPlan>
        <div style={{ alignItems: 'center', padding: 20 }}>
          <h3>{status}</h3>
          <div style={{color:colors.black2, marginTop:15}} >等待寄送取样器</div>
        </div>
      </CpPlan>
    </div>
    }
    return (
      <div>
        <CpPlan>
          <div style={{ alignItems: 'center', padding: 20 }}>
            <h3>您的样本已寄出</h3>
            <div>您的物流单号:{data.sample_ship}</div>
          </div>
        </CpPlan>
        <CpPlan>
          <div style={{ alignItems: 'center', padding: 20 }}>
            <h3>收到样本后，请先行取样，再绑定样本编号</h3>
            <div style={{color:colors.black2, fontSize:14,marginTop:10}} >此行为会将此样本和您的信息进行绑定</div>
            <div
              style={{
                width: 260,
                height: 200,
                backgroundImage: `url(./pic/card.png)`
              }}
            />
            <CpInput
              id={'code'}
              value={code}
              onChange={e => {
                let v = e.target.value
                this.setState({
                  code: v
                })
              }}
              icon="./icon/line-id.png"
              placeholder="请输入样本编号"
              style={{width:'100%', maxWidth:440,height:45,marginTop:15}}
            />
            <CpButton onClick={this.send} icon='./icon/right-white.png'  style={{width:'100%', maxWidth:440, height:45,marginTop:15}}>提交</CpButton>
          </div>
        </CpPlan>
      </div>
    )
  }
}
module.exports = Step0

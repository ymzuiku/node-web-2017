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
  // send = () => {
  //   api.order_service_sample_code({ sid: this.props.sid,code:this.state.code}, (res) => {
  //     window.msginfo(res.msg)
  //     so.dispatch(ac.ui({reload:so.getState().ui.reload+1}))
  //   })
  // }
  render() {
    let { code } = this.state
    let { status } = this.props
    console.log(status)
    if (status === '已报名') {
      return <div>
        <CpPlan>
          <div style={{ alignItems: 'center', padding: 20 }}>
            <h3>{status}</h3>
            <div style={{ color: colors.black2, marginTop: 15 }} >请等待参加线下筛查活动通知</div>
          </div>
        </CpPlan>
      </div>
    } else if (status === '已通知') {
      return <div>
        <CpPlan>
          <div style={{ alignItems: 'center', padding: 20 }}>
            <h3>{status}</h3>
            <div style={{ color: colors.black2, marginTop: 15 }} >请根据短信内容参加线下筛查活动</div>
          </div>
        </CpPlan>
      </div>
    } else if (status === '已发放采样器') {
      return <div >
        <CpPlan>
          <div style={{ alignItems: 'center', padding: 20 }}>
            <h3>{status}</h3>
            <div style={{ color: colors.black2, marginTop: 15 }} >请尽快按照采样器上的说明进行采样，并把样本交还录入员</div>
          </div>
        </CpPlan>
      </div >

    } else {

      return <div >
        <CpPlan>
          <div style={{ alignItems: 'center', padding: 20 }}>
            <h3>{status}</h3>
          </div>
        </CpPlan>
      </div >
    }

  }
}
module.exports = Step0

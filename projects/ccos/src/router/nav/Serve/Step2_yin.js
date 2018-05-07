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

class Step2_yin extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      pc: window.pc()
    }
  }
  render() {
    let { code } = this.state
    let { proid, texts, url, incase,status,yangStart } = this.props
    if (incase) {
      return <div>
        <CpPlan>
          <div style={{ alignItems: 'center', padding: 20 }}>
            <h3>{status}</h3>
            <div style={{color:colors.black2, marginTop:15}} >{status==='您已预约上门回收样本'?'我们的客服会与您联系，确认回收样本的方式':'当检测完毕，我们将会提供完整报告信息'}</div>
          </div>
        </CpPlan>
      </div>
    }
    return (
      <div>
        <CpPlan>
          <div style={{ alignItems: 'center', padding: 20 }}>
          <div
              style={{
                width: 100,
                height: 100,
                backgroundImage: `url(./icon/moon.png)`
              }}
            />  
          <h3>HPV检测阴性</h3>
          <CpButton onClick={()=>{window.location.href=url}} icon='./icon/see-white.png'  style={{width:'100%', maxWidth:300, height:45,marginTop:15}}>查看完整报告</CpButton>
          </div>
        </CpPlan>
        <CpPlan>
          <div style={{ alignItems: 'center', padding: 20 }}>
            <h3>{texts.title}</h3>
            <div style={{ color: colors.black2, fontSize: 14, marginTop: 10 }} >{texts.tip}</div>
            <ul className='ul' style={{color: colors.black2}} >
              {texts.infos.map((v, i) => {
                return <li style={{marginTop:10}} >{v}</li>
              })}
            </ul>
           
          </div>
        </CpPlan>
        <CpPlan>
          <div style={{ alignItems: 'center', padding: 20 }}>
          <h4>{texts.yin}</h4>  
        </div>    
        </CpPlan>
        <div style={{height:60}} ></div>
      </div>
    )
  }
}
module.exports = Step2_yin
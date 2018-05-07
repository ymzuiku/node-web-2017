let React = require('react')
let { ac, so, api } = require('../../../model/api')
let colors = require('../../../model/colors')
let CpPlan = require('../../../CpComp/CpPlan')
let CpInput = require('../../../CpComp/CpInput')
if (false) {
  var Steps = require('antd').Steps
}
Steps = require('antd/lib/steps')
var Step = Steps.Step

let Step0 = require('./Step0')
let Step1 = require('./Step1')
let Step9 = require('./Step9')
let Step2_yang = require('./Step2_yang')
let Step2_yin = require('./Step2_yin')

let produckTexts = [
  {
    title: '服务说明 - 个人宫颈癌预防三年保障计划',
    tip: '包括HPV检测初筛；结果异常者的免费诊断、治疗和诊疗后一年内的复查，以及免患宫颈癌保障险。保障期限为三年。',
    infos: [
      '本计划采用已经科学研究验证的HPV检测技术、筛查者自取样技术、和互联网技术，根据国家宫颈癌筛查指南设计，并受到CSCCP组成的专家委员会的监督，适用于已经过或未经过HPV疫苗注射的30岁以上女性。参加这项计划，可以确保您在保障期限内避免罹患宫颈浸润癌。',
      '当您的初次HPV检测结果为阴性时，或结果为阳性，经医院确诊您未患有宫颈浸润癌时，您的保障计划即开始生效',
      '如果您的HPV检测初筛结果为阳性，我们会为您提供CSCCP认定的具备阳性患者管理能力的医院为您进行进一步诊断和必要的治疗。有关阳性结果诊断和治疗的一切费用由本网站支付',
      '任何预防计划都有可能出现小概率漏诊。为保障受益者权益，如果你作为受益人在保障计划生效期间被诊断为宫颈浸润癌，我们将给予5万元人民币的赔偿'
    ],
    yangStart:
      'HPV检测结果阳性并不代表患有宫颈癌。请不要过于担心。如果您的HPV及 检测结果为阳性，大多数情况下只表示您正在受到可能引发宫颈癌的病毒感染，并可能存在需要治疗的宫颈癌前病变。您需要尽早去我们指定的医院接受进一步确诊和必要的治疗。这也是您维持您的保障计划有效性需要承担的责任。您的计划已经包含了医院诊疗的相关费用。如果您未能在收到HPV检测报告后2个月之内去医院接受诊疗，我们将无法确保您远离宫颈癌的风险，您的保障计划也只好中止。',
    yangEnd: '您的诊疗流程已经结束，我们将在此后1年后发送短信通知，为您复查。',
    yin: '您的本次筛查已结束,您的宫颈癌预防保障计划即将到期。如果您想继续享受宫颈癌预防保障服务，建议您购买终身保障计划，以确保您终身远离宫颈癌危害'
  },
  {
    title: '服务说明 - 个人终身保障计划',
    tip: '包括定期的HPV检测；结果异常者的免费诊断、治疗、和诊疗后一年内的复查，以及免患宫颈癌保障险。保障期限为终身（70年）',
    infos: [
      '本计划采用已经科学研究验证的HPV检测技术、筛查者自取样技术、和互联网技术，根据国家和世界卫生组织发布的《宫颈癌筛查指南》设计，并受到CSCCP组成的专家委员会的监督，适用于已经过或未经过HPV疫苗注射的30岁以上女性。参加这项计划，可以确保您在保障期限内避免罹患宫颈浸润癌',
      '当您的初次HPV检测结果为阴性时，或结果为阳性，经医院确诊您未患有宫颈浸润癌时，您的保障计划即开始生效',
      '在保障计划有效期内，您会得到定期HPV检测筛查，如果您的HPV检测结果为阳性，我们会为您提供CSCCP认定的具备阳性患者管理能力的医院为您进行进一步诊断和必要的治疗。有关阳性结果诊断和治疗的一切费用由本网站支付',
      '任何预防计划都有可能出现小概率漏诊。为保障受益者权益，如果保障计划的受益人在保障计划生效期间被诊断为宫颈浸润癌，我们将给予50万元人民币的赔偿。'
    ],
    yangStart:
      'HPV检测结果阳性并不代表患有宫颈癌。请不要过于担心。如果您的HPV及 检测结果为阳性，大多数情况下只表示您正在受到可能引发宫颈癌的病毒感染，并可能存在需要治疗的宫颈癌前病变。您需要尽早去我们指定的医院接受进一步确诊和必要的治疗。这也是您维持您的保障计划有效性需要承担的责任。您的计划已经包含了医院诊疗的相关费用。如果您未能在收到HPV检测报告后2个月之内去医院接受诊疗，我们将无法确保您远离宫颈癌的风险，您的保障计划也只好中止',
    yangEnd: '您本次HPV检测相关的诊疗流程已经结束，我们将在此后1年后发送短信通知，为您复查',
    yin: '您的本次筛查已结束，我们将在下次需要筛查时（3-5年内）通知您再次筛查。'
  },
  {
    title: '服务说明 - 单次HPV检测',
    tip: '基于互联网的自取样HPV检测，让您不必访问医院即可了解自己的HPV检测结果。但次HPV检测的报告已出，我们对您的服务即已结束。如果您的检测结果为“阴性”，您在今后的3年内无需再进行宫颈癌筛查。如果您的检测结果为“阳性”,请不用过分担心，因为HPV检测结果阳性并不代表您有宫颈癌。大多是情况下仅代表您可能存在完全可以彻底治疗宫颈癌前病变。您需要尽快到医院就诊，明确诊断，遵照医生的建议接受必要的治疗。这样就可以预防宫颈癌的发生。',
    infos: ['1 次HPV检测', '自取样技术'],
    yangStart: '您的服务已结束',
    yin: '您的服务已结束'
  },
  {
    title: '服务说明 – 宫颈癌预防三年保障计划',
    tip: '基于互联网模式的单次HPV检测，让您免去医院即可了解自己的HPV检测结果，我们使用科技前沿的自取样技术、基因保存卡、云端跟踪系统，为您提供专业的检测服务',
    infos: ['宫颈癌预防三年保障计划的阳性结果确诊服务',],
    yangStart: '您的计划包含阳性结果的临床确诊，我们会尽早安排您去指定的医院接受进一步检查',
    yin: '您的服务已结束'
  }
]

let states = [
  '等待寄送取样器', '已寄出取样器', '您已签收取样器', '您已绑定样本', '您已预约上门回收样本', '我们已预约快递员上门取样', '我们已收到您的样本', '您的样本正在检测', '您的报告已出', '您需要去医院进行阳性确诊', '您需要进行HPV复查', '您的服务处于阴性保险期', '您的服务结束'
]

class Comp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc(),
      current: 0,
      data: {},
      proid: 1,
      status: '',
      yang: false,
      incase: false,
      yangStart: true,
      pcd:'',
      addr:'',
      check_result_yang: '',
      err:'',
    }
    this.params = this.props.match.params
    this.sid = this.params.sid
  }
  componentDidMount() {
    so.dispatch(ac.ui({ navTitle: '服务详情' }))
    document.body.style.backgroundColor = colors.white3
    this.unso = so.subscribe(() => {
      this.geSericeDetail()
    })
    this.geSericeDetail()
  }
  geSericeDetail = () => {
    api.order_service_detail({ sid: this.sid }, res => {
      let status = res.data[0].status
      let check_result = res.data[0].check_result
      let current = 9
      let current_0_arr = ['等待寄送取样器']
      let current_1_arr = ['已寄出取样器', '您已签收取样器']
      let current_2_arr = ['您已绑定样本',]
      let current_3_arr = ['您已预约上门回收样本','我们已预约快递员上门取样', '我们已收到您的样本', '您的样本正在检测', '您的报告已出', '您需要去医院进行阳性确诊', '您需要进行HPV复查', '您的服务处于阴性保险期', '您的服务结束']
      let incase_arr = ['您已预约上门回收样本','我们已预约快递员上门取样', '我们已收到您的样本', '您的样本正在检测', ]
      console.log(current)
      current_0_arr.map((v)=>{
        if(status===v){
          current = 0
        }
      })
      current_1_arr.map((v)=>{
        if(status===v){
          current = 0
        }
      })
      current_2_arr.map((v)=>{
        if(status===v){
          current = 1
        }
      })
      current_3_arr.map((v)=>{
        if(status===v){

          current = 2
        }
      })
      let yang = false
      let err = false
      if (check_result === '阳性') {
        yang = true
      } 
      if (check_result === 'DNA量不足' || check_result === '样本不合格') {
        err = true
      }
      let incase = false
      incase_arr.map((v,i)=>{
        if(status === v) {
          incase = true
        }
      })
      let yangStart = true
      if (status === '您的服务结束') {
        yangStart = false
      }
      this.setState({
        check_page:res.data[0].check_page,
        current: current,
        data: res.data[0],
        proid: res.data[0].proid,
        yang: yang,
        pcd: res.data[0].addr.split('|')[0],
        addr: res.data[0].addr.split('|')[1],
        yangStart: yangStart,
        status: status,
        incase: incase,
        check_result_yang: res.data[0].check_result_yang,
        err:err,
      })
    })
  }
  componentWillUnmount() {
    document.body.style.backgroundColor = colors.white1
    this.unso()
  }
  render() {
    let { pc, current, status,pcd,addr, } = this.state
    return (
      <div>
        <div style={{ height: 10 }} />
        <CpPlan style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ height: 15 }} />
          <Steps
            current={current}
            style={{ flexDirection: 'row', justifyContent: 'center', width: '90%' }}>
            <Step title="绑定样本" description={pc ? '在收到样本之后，先行取样，再绑定样本' : ''} />
            <Step title="预约回递样本" description={pc ? '填写基本信息，我们会有专业客服上门取回样本' : ''} />
            <Step
              title={current === 2 ? '检测进度' : '等待检测结果'}
              description={pc ? '查看检测报告及后续服务' : ''}
            />
          </Steps>
          <div style={{ height: 15 }} />
        </CpPlan>
        <div
          style={{
            marginTop: 10,
            width: '100%',
            maxWidth: 900,
            height: 1,
            backgroundColor: '#f3f3f3'
          }}
        />
        {current === 9 ? <Step9 data={this.state.data} status={status} sid={this.sid} /> : null}
        {current === 0 ? <Step0 data={this.state.data} status={status} sid={this.sid} /> : null}
        {current === 1 ? <Step1 pcd={pcd} addr={addr} sid={this.sid} /> : null}
        {current === 2 ? this.renderCurrent2() : null}
      </div>
    )
  }
  renderCurrent2 = () => {
    let { proid, yang, yangStart, incase, status, check_result_yang ,check_page} = this.state
    proid = Number(proid)
    let rest = {
      url:check_page,
      status: status,
      incase: incase,
      proid: proid,
      yang: yang,
      yangStart: yangStart,
      check_result_yang: check_result_yang,
      called: status === '您已预约上门回收样本'
    }

    if ((proid === 1 || proid === 2) && !yang) {
      return (
        <Step2_yin {...rest} texts={proid == 1 ? produckTexts[0] : produckTexts[1]} />
      )
    } else if ((proid === 1 || proid === 2) && yang) {
      return (
        <Step2_yang
          {...rest}
          texts={proid == 1 ? produckTexts[0] : produckTexts[1]}
        />
      )
    } else if ((proid === 3 || proid === 4) && !yang) {
      return (
        <Step2_yin {...rest} texts={proid == 3 ? produckTexts[2] : produckTexts[3]} />
      )
    } else if ((proid === 3 || proid === 4) && yang) {
      return (
        <Step2_yang
          {...rest}
          texts={proid == 3 ? produckTexts[2] : produckTexts[3]}
        />
      )
    }
  }
}
module.exports = Comp

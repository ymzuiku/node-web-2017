let React = require('react')
let colors = require('../../model/colors')
let {ac, so} = require('../../model/api')

let data = [
  {
    img: './pic/feature0.png',
    title: '⾃取样技术',
    tip: '各项指标，轻松获取',
    info: '无需长途跋涉和长时间排队等候医生取样检查，可在私密处自行完成取样。此项技术是由美国国际防癌组织开发，并经过大规模临床试验验证的一项最新技术，效果与医生取样相同。'
  },
  {
    img: './pic/feature1.png',
    title: '云端数据管理',
    tip: '各项指标，轻松获取',
    info: '登录CSCCPonline网站，个人用户可随时查询个人检测结果及进度，组织用户可实时查询和管理原始数据，生成数据报表，并可通过历史数据制定适宜的筛查计划。'
  },
  {
    img: './pic/feature2.png',
    title: '基因测序',
    tip: '各项指标，轻松获取',
    info: '优选适用于自取样技术的HPV基因检测技术，HPV检测技术方法经过科学验证，具备精准分型、高灵敏度、高特异性、成本较低等技术优势。'
  },
  {
    img: './pic/feature3.png',
    title: '阳性患者管理',
    tip: '各项指标，轻松获取',
    info: '委托国际权威专家对阳性患者管理单位进行培训与监督，与具备专业宫颈病变处理能力的合格医院合作，为阳性患者提供便捷优质可靠的临床诊疗服务。'
  },
]

let Comp = ({ style }) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc:window.pc()
    }
  }
  componentDidMount() {
    this.unso= so.subscribe(() => {
      this.setState({
        pc:so.getState().ui.pc
      })
    })
  }
  componentWillUnmount() {
    this.unso()
  }
  render() {
    let {pc}= this.state
    return (
      <div  style={{}} >
        <div style={{ marginTop: 50,marginBottom: 30, fontSize:pc?46:36,fontWeight:300, flexDirection:'row', justifyContent:'center'}}>
          <p>服务特点</p>
        </div>
        <div style={{ flexDirection: pc ?'row':'column',}}  >
        <CpFeaturePlan {...data[0]} />
        <CpFeaturePlan {...data[1]} />
        </div>
        <div style={{flexDirection: pc ?'row':'column',}} >
        <CpFeaturePlan {...data[2]} />
        <CpFeaturePlan {...data[3]} />
        </div>
        <div style={{ height: '7rem' }} />
      </div>
    )
  }
}


class CpFeaturePlan extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc:window.pc()
    }
  }
  componentDidMount() {
    this.unso = so.subscribe(() => {
      this.setState({
        pc:so.getState().ui.pc
      })
    })
  }
  componentWillUnmount() {
    this.unso()
  }
  render() {
    let {pc}=this.state
    let { img, title, tip, info } = this.props
    let w = pc?300:150
    return (
      <div style={{ justifyContent:'center', alignItems:'center', flexGrow:1}} >
        <div style={{
          width: w, height: w,
          minWidth:pc?500:320,
          backgroundImage: `url(${img})`,
        }} ></div>
        <div style={{
          color: colors.black2,
          fontSize: pc?32:24,
          fontWeight:400,
          marginTop:10,
        }} >{title}</div>
        <div style={{fontSize:pc?23:16,color:colors.black2,fontWeight:300, marginTop:20,marginBottom:30,maxWidth:300}} >{info}</div>
      </div>
    )
  }
}
module.exports = Comp

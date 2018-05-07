let React = require('react')
let { ac, so, api } = require('../../../model/api')
let colors = require('../../../model/colors')
let Select = require('../../../comp/Select')
let CpPlan = require('../../../CpComp/CpPlan')
let CpInput = require('../../../CpComp/CpInput')
let CpButton = require('../../../CpComp/CpButton')
if (false) {
  var Steps = require('antd').Steps
}
Steps = require('antd/lib/steps')
var Step = Steps.Step

class Hospital extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc(),
      citys:[],
      city: '',
      hospitals:[],
    }
  }
  componentDidMount() {
    so.dispatch(ac.ui({navTitle:'合作医院列表'}))
    api.city((res) => {
      let citys = []
      res.data.map((v, i) => {
        citys.push(v.city)
      })
      this.setState({
        citys:citys,
        city:citys[0],
      })
      this.changeHospitalList(citys[0])
    })
    document.body.style.backgroundColor = colors.white3
  }
  componentWillUnmount() {
    document.body.style.backgroundColor = colors.white1
  }
  changeHospitalList = (city) => {
    api.hospital({ city: city }, (res) => {
      this.setState({
        hospitals:res.data
      })
    })
  }
  changeCity = (e, v, i) => {
    this.setState({
      city:v
    })
    this.changeHospitalList(v)
  }
  render() {
    let { hospitals,citys,city,pc } = this.state
    let {proid, texts, url} = this.props
    return (
      <div>
        <div style={{height:10}} ></div>
        <CpPlan>
          <div style={{ alignItems: 'center', padding: 20 }}>
            <h4>选择医院所在城市</h4>
          <div style={{height:20}} ></div>  
          <Select
            data={citys}
            style={{ height: 45, flexGrow: 1 }}
            title="请选择项目"
            onChange={this.changeCity}
          />
          </div>
        </CpPlan>
        <CpPlan>
          <div style={{ alignItems: 'center', padding: 20 }}>
            <h4>已开通阳性服务的医院</h4>  
            <div style={{fontSize:13, marginTop:10,marginBottom:20}} >请前往以下任意医院，进行阳性确诊</div>
            {hospitals.map((v, i) => {
              return <Item {...v} i={i} ></Item>
              })}
          </div>
        </CpPlan>
        <div style={{height:60}} ></div>
      </div>
    )
  }
}

class Item extends React.Component {
  render() {
    let { name, city, addr='尚无值班时间',i } = this.props
    let icons = ['./icon/Hospital-0.png', './icon/Hospital-1.png', './icon/Hospital-2.png', './icon/Hospital-3.png',]
    let icon = icons[i % icons.length]
    console.log(icon)
    return <div style={{ height: 70, width:'100%',}}>
      <div style={{ width:'100%', flexDirection:'row'}} >
      <div style={{
        width:40, height:40,
        backgroundImage: `url(${icon})`,
      }} ></div>
      <div style={{}} >
        <div style={{color:colors.black2, fontSize:15}}>{name}</div>
        <div style={{color:colors.black3, fontSize:12, marginTop:5}} >{addr}</div>
      </div>
    </div>
    <div style={{width:'100%',height:1, backgroundColor:'#f3f3f3',marginTop:5}} ></div>
    </div>
  }
}

module.exports = Hospital
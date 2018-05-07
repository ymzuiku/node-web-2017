let React = require('react')
let ProjectCell = require('./ProjectCell')
let { ac, so, api } = require('../../../model/api')
let colors =require('../../../model/colors')
let Loading = require('../../../comp/Loading')
let Button = require('../../../comp/Button')

let theData = []
for (let i = 0, len = 10000; i < len; i++) {
  theData.push({
    id: i,
    orderID: '3213',
    money:'400',
    to:'/nav/order/product1/3121',
    img: './icon/product_0.png',
    title: '个人三年保障计划',
    info: '林戏雨、王探、李云红、方杰...等10个亲朋',
    arrowTitle: '',
    arrowImg: './icon/next.png'
  })
}

module.exports = class PayDidList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
    }
  }
  componentDidMount() {
    api.get_project((res) => {
      let data = []
      res.data.map((v, i) => {
        if (res.data.status !== '已关闭') {
          data.push(v)
        }
      })
      this.setState({
        data:data
      }) 
    })
  }
  render() {
    let { data, } = this.state
    if (!data) {
      return (
        <div style={{height:'78vh'}} ><Loading></Loading></div>
      )
    }
    else {
      return (
        <div id='listbox' style={{ overflowY:'scroll', height:'78vh' }} >
          <AddNewProjectCell></AddNewProjectCell>
          {data.map((v, i) => {
            return this.rowRenderer({value:v, index:i})
          })}
        </div>
      )
    }
  }
  rowRenderer = ({ value, index }) => {
    return (
      <ProjectCell key={'ProjectCell'+index} edit={true} arrowImg='./icon/next.png' index={index} {...value} ></ProjectCell>
    )
  }
}

class AddNewProjectCell extends React.PureComponent {
  static defaultProps = {}
  constructor(props){
    super(props)
    this.state = {
      bgColor: colors.white1,
      pc:window.pc()
    }
  }
  mouseIn = () => {
    this.setState({
      bgColor: colors.white3
    })
  }
  mouseOut = () => {
    this.setState({
      bgColor: colors.white1
    })
  }
  render() {
    let {pc} =this.state
    return (
      <div  >
        <Button
          vin={this.mouseIn}
          vout={this.mouseOut}
          to='#/nav/createproject/0/'
          style={{
            justifyContent: 'space-between',
            alignItems:'center',
            flexDirection: 'row',
            backgroundColor: this.state.bgColor,
            margin:'10px 0px',
          }}>
          <div
            style={{
              width: pc?90:60,
              height: pc?90:60,
              margin:pc?15:10,
              backgroundImage: `url(./icon/product_add.png)`,
            }}
          />
          <div style={{flexGrow:1}} >
            <div style={{fontSize:18, color:colors.black1}} > 新增一个新项目 </div>
            <div style={{fontSize:15,marginTop:6}}> 以项目为单位作为筛查的管理 </div>
          </div>
          
          <div style={{flexDirection:'row', justifyContent:'flex-end' }}>
            <div
              style={{
                width: 20,
                height: 20,
                marginRight: 10,
                backgroundImage: `url(${'./icon/next.png'})`,
              }}
            />
          </div>
        </Button>
      </div>
    )
  }
}

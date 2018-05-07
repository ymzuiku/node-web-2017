let React = require('react')
let ProjectCell = require('./ProjectCell')
let { ao, so, api } = require('../../../model/api')
let colors =require('../../../model/colors')
let Loading = require('../../../comp/Loading')

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
    let { data } = this.state
    if (!data) {
      return (
        <div style={{height:'78vh'}} ><Loading></Loading></div>
      )
    }
    else if (data.length === 0) {
      return (
        <div style={{height:'78vh', justifyContent:'center', alignItems:'center', color:colors.black3}} >列表为空</div>
      )
    } else {
      return (
        <div id='listbox' style={{ overflow:'scroll', height:'78vh' }} >
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

let React = require('react')
let PayCell = require('./PayCell')
let { ao, so, api } = require('../../model/api')
let colors =require('../../model/colors')
let Loading = require('../../comp/Loading')

let data = []
for (let i = 0, len = 10000; i < len; i++) {
  data.push({
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
    api.userOrder((res) => {
      if (res.data) {
        console.log(res.data)
        let data = []
        res.data.map((v, i) => {
          if (v.status === '已支付') {
            data.push(v)
          }
        })
        this.setState({
          data:data
        }) 
      }
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
        <div id='listbox' style={{ overflowY:'scroll', height:'78vh' }} >
          {data.map((v, i) => {
            return this.rowRenderer({value:v, index:i})
          })}
        </div>
      )
    }
  }
  rowRenderer = ({ value, index }) => {
    return (
      <PayCell key={'PayDidList'+index} lock={1} arrowImg='./icon/next.png' index={index} {...value} ></PayCell>
    )
  }
}

let React = require('react')
let { ac, api, so } = require('../../../model/api')
let Button = require('../../../comp/Button')
let colors = require('../../../model/colors')
let defAddress = '收件地区 省、市、区'
let $ = window.$

let OrderCom = require('./OrderCom')

class BuyUserOrder extends React.Component {
  constructor(props) {
    super(props)
    this.params = this.props.match.params
    this.lock = this.params.lock === '1'
    this.state = {
      type: null,
      title: null,
    }
  }
  componentDidMount() {
    this.reload(this.params.type)
  }
  reload = (type) => {
    this.setState({
      type: type,
      title:this.title(type)
    }, () => {
      if (this.lock) {
        so.dispatch(ac.ui({navTitle:'订单详情'}))  
      } else {
        so.dispatch(ac.ui({navTitle:this.state.title}))
      }
    })
  }
  // 渲染顶部按钮
  title = (type) => {
    let isself = type === 'self'
    return "组织HPV筛查"
  }

  render() {
    let { type, pc } = this.state
    return <OrderCom lock={this.lock} type={type} produckId={this.params.id} oid={this.params.oid} />
  }
}

module.exports = BuyUserOrder

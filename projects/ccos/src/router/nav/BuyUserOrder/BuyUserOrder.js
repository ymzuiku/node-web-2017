let React = require('react')
let { ac, api, so } = require('../../../model/api')
let Button = require('../../../comp/Button')
let colors = require('../../../model/colors')
let defAddress = '收件地区 省、市、区'
let $ = window.$

let OrderGive = require('./OrderGive')
let OrderSelf = require('./OrderSelf')

class BuyUserOrder extends React.Component {
  constructor(props) {
    super(props)
    this.params = this.props.match.params
    this.lock = this.params.lock === "1"
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
    return (
      <div style={{ flexDirection: 'row' }}>
        <Button
          onClick={() => {
            this.reload('self')
            let to = String(window.location.href.split('#')[1]).replace(/give/, 'self')
            window.location.href = '#'+to
          }}
          style={{ color: isself ? colors.blue1 : colors.black3 }}>
          自己用
        </Button>
        <div style={{ width: 20 }} />
        <Button
          onClick={() => {
            this.reload('give')
            let to = String(window.location.href.split('#')[1]).replace(/self/, 'give')
            window.location.href = '#'+to
          }}
          style={{ color: isself ? colors.black3 : colors.blue1 }}>
          送她人
        </Button>
      </div>
    )
  }

  render() {
    let { type, pc } = this.state
    if (type === 'self') {
      return <div style={{justifyContent:'center', alignItems:'center'}} ><OrderSelf lock={this.lock} type={type} produckId={this.params.id} oid={this.params.oid} /></div>
    }
    return <OrderGive lock={this.lock} type={type} produckId={this.params.id} oid={this.params.oid} />
  }
}

module.exports = BuyUserOrder

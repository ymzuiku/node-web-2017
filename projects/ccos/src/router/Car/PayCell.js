let React = require('react')
let colors = require('../../model/colors')
let {api, ac, so} = require('../../model/api')
let Button = require('../../comp/Button')

class CarListCell extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc:window.pc(),
      bgColor: colors.white1
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
    let {pc} = this.state
    let { amount, cid, data, id, money, ordertime, payno, payway, proid, status, type, edit, arrowImg,lock, ...rest } = this.props
    let to, title, img
    let typeId = 1
    let typeURL = 'give'
    if (type === '自己用') {
      typeId = 0
      typeURL = 'self'
    }
    if (proid === '1') {
      to = `#/nav/buyuserorder/1/${id}/${typeURL}/${lock}/`
      title = '个人三年保障计划'
      img = './icon/product_1.png'
    } else if (proid === '2') {
      to = `#/nav/buyuserorder/2/${id}/${typeURL}/${lock}/`
      title = '个人终身保障计划'
      img = './icon/product_2.png'
    } else if (proid === '3') {
      to = `#/nav/buycomorder/3/${id}/${lock}/`
      title = '组织HPV筛查'
      img = './icon/product_3.png'
    } else {
      to = `#/nav/buycomorder/4/${id}/${lock}/`
      title = '组织HPV筛查及阳性管理'
      img = './icon/product_4.png'
    }
    type = window.q.cutString(type + ' ' + ordertime, 20)

    return (
      <div  {...rest}>
        <Button
          vin={this.mouseIn}
          vout={this.mouseOut}
          onClick={() => {
            so.dispatch(ac.ui({ orderInputs: data}))
            window.location.href = to  
            
          }}
          style={{
            justifyContent: 'space-between',
            alignItems:'center',
            flexDirection: 'row',
            backgroundColor: this.state.bgColor,
            margin:'10px 0px',
          }}>
          <div
            style={{
              width: pc?90:80,
              height: pc?90:80,
              margin:pc?15:10,
              backgroundImage: `url(${img})`,
            }}
          />
          <div style={{flexGrow:1}} >
            <div style={{fontSize:18, color:colors.black1}} > {title} </div>
            <div style={{fontSize:15,color:colors.black3, marginTop:6}}> {type} </div>
            {money?<div style={{fontSize:18, color:colors.red1, marginTop:6}} > ¥{money} </div>:null}
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
module.exports = CarListCell

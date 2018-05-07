let React = require('react')
let colors = require('../../../model/colors')
let {api, ac, so} = require('../../../model/api')
let Button = require('../../../comp/Button')

class ProjectCell extends React.PureComponent {
  constructor(props) {
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
    let { name, data, proid, id, rtime, status, type, edit, arrowImg, ...rest } = this.props
    
    let to, title, img
    to = `#/nav/projectinfo/${id}/${proid}/`
    if (proid === '1') {
      title = '个人三年保障计划'
      img = './icon/product_1.png'
    } else if (proid === '2') {
      title = '个人终身保障计划'
      img = './icon/product_2.png'
    } else if (proid === '3') {
      title = '组织HPV筛查'
      img = './icon/product_3.png'
    } else {
      title = '组织HPV筛查及阳性管理'
      img = './icon/product_4.png'
    }

    return (
      <div  {...rest}>
        <Button
          vin={this.mouseIn}
          vout={this.mouseOut}
          onClick={() => {
            so.dispatch(ac.ui({ orderInputs: data, lookproduck: edit }))
            window.location.href = to
          }}
          style={{
            justifyContent: 'space-between',
            alignItems:'center',
            flexDirection: 'row',
            backgroundColor: this.state.bgColor,
            margin:'10px 0',
          }}>
          <div
            style={{
              width: pc?90:60,
              height: pc?90:60,
              margin:pc?15:10,
              backgroundImage: `url(${img})`,
            }}
          />
          <div style={{flexGrow:1}} >
            <div style={{fontSize:18, color:colors.black1}} > {name} </div>
            <div style={{fontSize:14,marginTop:6, color:colors.black3}}> {title} </div>
            <div style={{fontSize:14,marginTop:6, color:colors.black3}}> 创建于: {rtime} </div>
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
module.exports = ProjectCell

let React = require('react')
let colors = require('../colors.js')
let Button = require('../../basic/Button')
let _ = require('ym-react-cli')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
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
    let { data, id,proid, type, money, arrowTitle, arrowImg, style, ...rest } = this.props
    let to, title, img
    let typeId = 1
    if (type === '自己用') {
      typeId = 0
    }
    if (proid === '1') {
      ;(to = `/nav/userorder/1/${id}/${type}/`),
        (title = '个人三年保障计划'),
        (img = './icon/product_1.png')
    } else if (proid === '2') {
      ;(to = `/nav/userorder/2/${id}/${type}/`),
        (title = '个人终身保障计划'),
        (img = './icon/product_2.png')
    } else if (proid === '3') {
      ;(to = `/nav/userorder/3/${id}/`),
        (title = '组织HPV筛查'),
        (img = './icon/product_3.png')
    } else if (proid === '4') {
      ;(to = `/nav/userorder/4/${id}/`),
        (title = '组织HPV筛查及阳性管理'),
        (img = './icon/product_4.png')
    }
    type = _.cutString(type, 32)
    return (
      <div style={{ ...style }} {...rest}>
        <Button
          className="h jc"  
          mouseIn={this.mouseIn}
          mouseOut={this.mouseOut}
          to={to}
          onClick={() => {
            window.tempinputs = data
          }}
          style={{
            backgroundColor: this.state.bgColor,
            marginLeft: '1rem',
            marginRight: '1rem',
            height: '90%'
          }}>
          <div
            style={{
              width: '8rem',
              height: '8rem',
              marginLeft: '1rem',
              marginTop: '0.5rem',
              backgroundImage: `url(${img})`,
              backgroundSize: `cover`,
              backgroundPosition: `50% 50%`
            }}
          />
          <div className='v jc w-50 h-100' style={{ marginLeft: '1rem',flex: 4 }}>
            <p
              style={{
                color: colors.black2,
                fontSize: '1.5rem',
                height: '1.5rem',
                fontWeight: 400
              }}>
              {title}
            </p>
            <p
              style={{
                color: colors.black3,
                fontSize: '1.2rem',
                height: '1rem',
                fontWeight: 300
              }}>
              {type}
            </p>
            {money ? (
              <p
                style={{
                  color: colors.red1,
                  fontSize: '1.3rem',
                  height: '1rem',
                  fontWeight: 300
                }}>
                ¥{money}
              </p>
            ) : null}
          </div>
          <div className="box h je" style={{ flex: 1 }}>
            <p>{arrowTitle}</p>
            <div
              style={{
                width: '2rem',
                height: '2rem',
                marginRight: '2.5rem',
                backgroundImage: `url(${arrowImg})`,
                backgroundSize: `cover`,
                backgroundPosition: `50% 50%`
              }}
            />
          </div>
        </Button>
      </div>
    )
  }
}
module.exports = Comp

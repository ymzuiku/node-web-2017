let React = require('react')
let { Link } = require('react-router-dom')

let Icon = require('../../../comp/Icon')
let Button = require('../../../comp/Button')
let colors = require('../../../model/colors')

let { Motion, spring } = require('react-motion')

let Comp = ({ onClick,to, style }) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: colors.white1,
      fontColor: colors.black2,
      arrowX: 0,
      iconNum: 0
    }
  }
  mouseIn = () => {
    this.setState({
      arrowX: 8,
      iconNum: 1,
      backgroundColor: colors.blue1,
      fontColor: colors.white1
    })
  }
  mouseOut = () => {
    this.setState({
      arrowX: 0,
      iconNum: 0,
      backgroundColor: colors.white1,
      fontColor: colors.black2
    })
  }
  render() {
    let { style, onClick, children,to} = this.props
    return (
      <Motion style={{ arrowX: spring(this.state.arrowX) }}>
        {mot => (
          <Button
            onClick={onClick}  
            to={to}
            vin={this.mouseIn}
            vout={this.mouseOut}
            style={{ width: '100%', height: 56, ...style }}>
            <div
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems:'center',
                width: '100%',
                height: '100%',
                backgroundColor: this.state.backgroundColor
              }}>
              <p 
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems:'center',
                  color: this.state.fontColor,
                  marginLeft: 20,
                  fontSize: 16,
                  textAlign:'center',
                  fontWeight: this.state.iconNum===0?400:800,
                }}>
                {children}
              </p>
              <Icon
                num={this.state.iconNum}
                imgs={['./icon/arrow-down.png', './icon/arrow-down-white.png']}
                style={{ transform: `rotateZ(-90deg) translate(0%, ${mot.arrowX}%)`, width:50, height:50 }}
              />
            </div>
          </Button>
        )}
      </Motion>
    )
  }
}
module.exports = Comp

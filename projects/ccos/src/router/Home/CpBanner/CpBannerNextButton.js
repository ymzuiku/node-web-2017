let React = require('react')
let { Link } = require('react-router-dom')
let Icon = require('../../../comp/Icon')
let Button = require('../../../comp/Button')
let colors = require('../../../model/colors')
let { Motion, spring } = require('react-motion')

let Comp = ({ type,onClick, style }) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      backgroundColor: 'rgba(0,0,0,0.15)',
      fontColor: colors.black2,
      arrowX: 0,
      iconNum: 0
    }
  }
  mouseIn = () => {
    this.setState({
      arrowX: 8,
      iconNum: 1,
      backgroundColor: 'rgba(0,0,0,0.3)',
      fontColor: colors.white1
    })
  }
  mouseOut = () => {
    this.setState({
      arrowX: 0,
      iconNum: 0,
      backgroundColor: 'rgba(0,0,0,0.15)',
      fontColor: colors.black2
    })
  }
  render() {
    let { style, onClick, children } = this.props
    return (
      <Motion style={{ arrowX: spring(this.state.arrowX) }}>
        {mot => (
          <Button
            onClick={onClick}  
            vin={this.mouseIn}
            vout={this.mouseOut}
            style={{ width: '100%', height: '7rem', ...style }}>
            <div
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems:'center',
                width: '100%',
                height: '100%',
                borderRadius:4,
                backgroundColor: this.state.backgroundColor
              }}>
              <Icon
                num={this.state.iconNum}
                imgs={['./icon/arrow-down-white.png', './icon/arrow-down-white.png']}
                style={{ transform: `rotateZ(${this.props.type==='left'?90:-90}deg) translate(0px, ${mot.arrowX}px)`, width:50, height:50 }}
              />
            </div>
          </Button>
        )}
      </Motion>
    )
  }
}
module.exports = Comp

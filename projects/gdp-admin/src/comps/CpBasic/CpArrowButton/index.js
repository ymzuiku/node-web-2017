let React = require('react')
let { Link } = require('react-router-dom')
let _ = require('ym-react-cli')
let Icon = require('../../basic/Icon')
let Button = require('../../basic/Button')
let colors = require('../../CpBasic/colors.js')
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
            mouseIn={this.mouseIn}
            mouseOut={this.mouseOut}
            style={{ width: '100%', height: '5.2rem', ...style }}>
            <div
              className="row jsb"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: this.state.backgroundColor
              }}>
              <p
                className='row ac h-100'  
                style={{
                  color: this.state.fontColor,
                  marginLeft: '2rem',
                  fontSize: '1.6rem',
                  fontWeight: this.state.iconNum===0?400:800,
                }}>
                {children}
              </p>
              <Icon
                size="3.5rem"
                num={this.state.iconNum}
                imgs={['./icon/arrow-down.png', './icon/arrow-down-white.png']}
                style={{ transform: `rotateZ(-90deg) translate(0%, ${mot.arrowX}%)` }}
              />
            </div>
          </Button>
        )}
      </Motion>
    )
  }
}
module.exports = Comp

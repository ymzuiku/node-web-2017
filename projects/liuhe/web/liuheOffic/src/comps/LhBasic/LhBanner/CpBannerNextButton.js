let React = require('react')
let { Link } = require('react-router-dom')
let _ = require('ym-react-cli')
let Icon = require('../../basic/Icon')
let Button = require('../../basic/Button')
let colors = require('../../CpBasic/colors.js')
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
      arrowX: 4,
      iconNum: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
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
            mouseIn={this.mouseIn}
            mouseOut={this.mouseOut}
            style={{ width: '3rem', height: '3rem',...style }}>
            <div
              className="box h jsb"
              style={{
                width: '100%',
                height: '100%',
                borderRadius:'5rem',
                backgroundColor: this.state.backgroundColor
              }}>
              <Icon
                size="2rem"
                num={this.props.type==='left'?0:1}
                imgs={['./icon/icon-05.png', './icon/icon-06.png']}
                style={{ transform: `translate(0%, ${-mot.arrowX}%)` }}
              />
            </div>
          </Button>
        )}
      </Motion>
    )
  }
}
module.exports = Comp

let React = require('react')
let Button = require('./Button')
let Icon = require('./Icon')
let { Motion, spring } = require('react-motion')

let Comp = ({ to, opacity, rotate, onClick, className, style }) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    let {
      opacity = [1, 1, 1],
      size = ['cover', 'cover', 'cover'],
      rotate = [0, 0, 0]
    } = this.props
    this.state = {
      isSelected: false,
      num: 0,
      opacity: opacity[0],
      size: size[0],
      rotate: rotate[0]
    }
  }
  mouseIn = () => {
    let {
      opacity = [1, 1, 1],
      size = ['cover', 'cover', 'cover'],
      rotate = [0, 0, 0]
    } = this.props
    this.setState({
      num: 1,
      opacity: opacity[1],
      size: size[1],
      rotate: rotate[1]
    })
  }
  mouseOut = () => {
    let {
      opacity = [1, 1, 1],
      size = ['cover', 'cover', 'cover'],
      rotate = [0, 0, 0]
    } = this.props
    this.setState({
      num: this.state.isSelected ? 2 : 0,
      opacity: this.state.isSelected ? opacity[2] : opacity[0],
      size: this.state.isSelected ? size[2] : size[0],
      rotate: this.state.isSelected ? rotate[2] : rotate[0]
    })
  }
  click = () => {
    if (this.props.children.length > 1 && !this.state.isSelected) {
      let {
        opacity = [1, 1, 1],
        size = ['cover', 'cover', 'cover'],
        rotate = [0, 0, 0]
      } = this.props
      this.setState({
        isSelected: !this.state.isSelected,
        num: 2,
        opacity: opacity[2],
        size: size[2],
        rotate: rotate[2]
      })
    } else if (this.props.children.length > 1 && this.state.isSelected) {
      let {
        opacity = [1, 1, 1],
        size = ['cover', 'cover', 'cover'],
        rotate = [0, 0, 0]
      } = this.props
      this.setState({
        isSelected: !this.state.isSelected,
        num: 0,
        opacity: opacity[0],
        size: size[0],
        rotate: rotate[0]
      })
    }
    let { onClick = () => {} } = this.props
    onClick()
  }
  renderText = () => {
    let { children } = this.props
    let { num } = this.state
    let ele = children[num]
    return this.props.children[this.state.num]
  }
  render() {
    let {
      onClick,
      children,
      size,
      style,
      rotate,
      className='box h',
      ...rest
    } = this.props
    return (
      <Motion
        style={{
          opa: spring(this.state.opacity, { stiffness: 200 }),
          size: spring(this.state.size, { stiffness: 200 }),
          rotate: spring(this.state.rotate, { stiffness: 170 })
        }}>
        {mot => (
          <Button  
            className={className}
            onClick={this.click}
            style={{ width: '5rem', height: '5rem',transform:`rotateZ(${mot.rotate}deg) scale(${mot.size}, ${mot.size})`,opacity:mot.opa, ...style }}
            mouseIn={this.mouseIn}
            mouseOut={this.mouseOut}
            {...rest}>
            {this.props.children[this.state.num]}
          </Button>
        )}
      </Motion>
    )
  }
}
module.exports = Comp

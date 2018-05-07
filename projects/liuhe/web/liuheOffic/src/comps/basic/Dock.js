let React = require('react')
let { Motion, spring } = require('react-motion')


let Comp = ({
  w = 2,
  h = 2,
  scale = 1.2,
  onClick,
  num,
  count,
  color,
  showText,
  emptyColor,
  borderColor,
  style
}) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      color: this.props.color || 'rgba(255,255,255,1)',
      emptyColor: this.props.emptyColor || 'rgba(255,255,255,0.5)',
      w: this.props.w || 2,
      h: this.props.h ? this.props.h : this.props.w ? this.props.w : 2
    }
  }
  componentWillReceiveProps(props) {
    if (this.props != props) {
      this.setState({
        color: props.color || 'rgba(255,255,255,1)',
        emptyColor: props.emptyColor || 'rgba(255,255,255,0.5)',
        w: props.w || 2,
        h: props.h ? props.h : props.w ? props.w : 2
      })
    }
    return props
  }
  render() {
    let {
      w,
      h,
      scale,
      num,
      showText,
      count,
      onClick,
      color,
      emptyColor,
      borderColor,
      style
    } = this.props
    scale = scale || 1.8
    let arr = []
    for (let i = 0; i < count; i++) {
      arr.push(
        <Motion style={{ s: spring(num === i ? scale : 1) }}>
          {mot =>
            <div
              className="btn box v"
              onClick={() => {
                if (onClick) {
                  onClick(i)
                }
              }}
              style={{
                marginLeft: this.state.w / 2 + 'rem',
                marginRight: this.state.w / 2 + 'rem',
                borderRight: borderColor ? `1px solid ${borderColor}` : null,
                borderRadius: this.state.w / 2 + 'rem',
                width: this.state.w * mot.s + 'rem',
                height: this.state.h + 'rem',
                backgroundColor: num === i ? this.state.color : this.state.emptyColor,
                color: num === i ? 'rgba(0,0,0,0.5)':'rgba(0,0,0,0.3)',
                fontWeight:500,
              }}
            >{showText?i+1:null}</div>}
        </Motion>
      )
    }
    return (
      <div className="box h" style={style}>
        {arr}
      </div>
    )
  }
}
module.exports =  Comp

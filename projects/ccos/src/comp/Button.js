let React = require('react')
if (window.isTocuh === undefined) {
  let ua = navigator.userAgent.toLowerCase()
  window.isTocuh =
    'ontouchstart' in window || ua.indexOf('touch') !== -1 || ua.indexOf('mobile') !== -1
}

let Button = ({
  style,
  to,
  canTouch = true,
  className,
  vin = () => {},
  vout = () => {},
  onClick = () => {},
  ...props
}) => <div />

Button = class Comp extends React.PureComponent {
  click = () => {
    let { to, onClick = () => {}, canTouch = true } = this.props
    if (canTouch) {
      onClick()
      if (to) {
        window.location.href = to
      }
    }
  }

  render() {
    let {
      to,
      vin = () => {},
      vout = () => {},
      onClick = () => {},
      style,
      ...rest
    } = this.props
    let sty = {
      cursor: 'pointer',
      ...style
    }
    if (window.isTocuh === true) {
      return (
        <div
          onClick={this.click}
          style={sty}
          onTouchStart={vin}
          onTouchCancel={vout}
          onTouchEnd={vout}
          {...rest}
        />
      )
    } else {
      return (
        <div
          onClick={this.click}
          style={sty}
          onMouseEnter={vin}
          onMouseLeave={vout}
          {...rest}
        />
      )
    }
  }
}

module.exports = Button

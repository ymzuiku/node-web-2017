let React = require('react')
if (window.isTocuh === undefined) {
  let ua = navigator.userAgent.toLowerCase()
  window.isTocuh =
    'ontouchstart' in window || ua.indexOf('touch') !== -1 || ua.indexOf('mobile') !== -1
}

if (window.href === undefined) {
  window.hrefs = []
  window.last = window.location.href + ''
  window.hrefs.push(window.location.href + '')
  window.href = function (url) {
    window.last = window.location.href+''
    window.location.href = url
    if (window.hrefs[window.hrefs.length - 1] !== window.location.href) {
      window.hrefs.push(window.location.href + '')
    }
  }
  window.go = function (num) {
    var len = window.hrefs.length - 1
    var url = window.hrefs[len + num]
    window.href(url)
  }
  window.getGo = function (num) {
    var len = window.hrefs.length - 1
    var url = window.hrefs[len + num]
    return url
  }
}

let Button = ({
  style,
  to,
  canTouch = true,
  className,
  mouseIn = () => {},
  mouseOut = () => {},
  onClick = () => {},
  ...props
}) => <div />

Button = class Comp extends React.PureComponent {
  click = () => {
    let {to, onClick=()=>{},canTouch = true} = this.props
    if (canTouch) {
      onClick()
      if (to) {
        if (to.indexOf('http') >= 0) {
          // window.location.href = to
          window.href(to)
        } else if (to.indexOf('file:') >= 0) {
          let file = to.split('file:')[1]
          // window.location.href = file
          window.href(file)
        } else if (to.indexOf('open:') >= 0) {
          let file = to.split('open:')[1]
          window.open(file)
        } else {
          // window.location.href = '#' + to
          window.href('#'+to)
        }
      }
    }
  }

  render() {
    let {
      to,
      mouseIn = () => {},
      mouseOut = () => {},
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
          onTouchStart={mouseIn}
          onTouchCancel={mouseOut}
          onTouchEnd={mouseOut}
          {...rest}
        />
      )
    } else {
      return (
        <div
          onClick={this.click}
          style={sty}
          onMouseEnter={mouseIn}
          onMouseLeave={mouseOut}
          {...rest}
        />
      )
    }
  }
}

module.exports = Button

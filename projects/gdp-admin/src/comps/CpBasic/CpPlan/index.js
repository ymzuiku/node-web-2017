let React = require('react')
let _ = require('ym-react-cli')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc:window.pc
    }
    _.vmpc(this)
  }
  render() {
    let { style, children, ...rest } = this.props
    let {pc} = this.state
    return (
      <div
        style={{
          left: pc?'15%':'5%',
          width: pc?'70%':'90%',
          backgroundColor: '#fff',
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow:'0 1px 0 rgba(0, 0, 0, 0.06)',
          ...style
        }}
        {...rest}>
        {children}
      </div>
    )
  }
}
module.exports = Comp

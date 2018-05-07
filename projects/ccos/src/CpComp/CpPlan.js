let React = require('react')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc:window.pc()
    }
  }
  render() {
    let { style, children, ...rest } = this.props
    return (
      <div
        style={{
          overflowX:'hidden',
          justifyContent: 'center',
          margin: '10px 20px',
          marginLeft: '3.5%',
          marginRight:'3.5%',
          maxWidth: '93%',
          padding:10,
          backgroundColor: '#fff',
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

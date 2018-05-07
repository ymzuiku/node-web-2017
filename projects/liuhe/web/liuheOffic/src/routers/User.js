let React = require('react')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    window.scrollTo(0,0)
  }
  render() {
    return (
      <div className='h20 bg2' >
        user
      </div>
    )
  }
}
module.exports = Comp
let React = require('react')
let Right = require('./Right')
let Left = require('./Left')
let _ = require('ym-react-cli')
class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      info: this.props.data[0][0],
      now:this.props.data[0]
    }
    window.serveChangeRightData = (info) => {
      this.setState({
        info:info
      })
      if (info.data && info.data.length > 0) {
        _.looker.trigger('serveRightChangeTab', info.data[0].info || '') 
      }
    }
  }
  render() {
    let { data } = this.props
    let { info } = this.state
    return (
      <div className='gf h js' >
        <Left data={data} ></Left>
        <Right data={info} ></Right>
      </div>
    )
  }
}
module.exports = Comp

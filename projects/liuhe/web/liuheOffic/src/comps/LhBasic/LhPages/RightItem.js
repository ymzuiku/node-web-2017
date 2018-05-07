let React = require('react')
let _ = require('ym-react-cli')
let Button = require('../../basic/Button')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      now: this.props.now,
      vin:false,
    }
    if (this.props.now) {
      _.looker.trigger('serveRightChangeTab', this.props.data.info || '')
    }
    _.looker.listen('serveRightCloseTab', (callback) => {
      this.setState({
        now:false
      }, callback)
    })
  }
  componentWillReceiveProps(props) {
    return props
  }
  click = () => {
    _.looker.trigger('serveRightChangeTab', this.props.data.info || '')
    _.looker.trigger('serveRightCloseTab', () => {
      this.setState({
        now:true,
      })
    })
  }
  vin = () => {
    this.setState({
      vin:true
    })
   }
  vout = () => { 
    this.setState({
      vin:false
    })
  }
  render() {
    let { vin, now } = this.state
    let bg = vin?'#f5f5f5':'rgba(0,0,0,0)'
    bg = now ? '#fff' : bg
    return (
      <Button mouseIn={this.vin} mouseOut={this.vout} onClick={this.click} className='' style={{ minWidth: '9rem', height: '100%', textAlign: 'center', fontSize: '1.2rem', lineHeight: '2.8rem', color:now?'#005BAB':'#505050', fontWeight: 500, backgroundColor: bg }} >
        <div style={{height:'0.2rem', backgroundColor:now?'#005BAB':'rgba(0,0,0,0)'}} ></div>  
        {this.props.children}
      </Button>
    )
  }
}
module.exports = Comp
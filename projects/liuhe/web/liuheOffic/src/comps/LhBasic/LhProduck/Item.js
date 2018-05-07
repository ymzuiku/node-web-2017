let React = require('react')
let Icon = require('../../basic/Icon')
let Button = require('../../basic/Button')
let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      num:0
    }
  }
  vin = () => { 
    this.setState({
      num:1
    })
  }
  vout = () => {
    this.setState({
      num:0
    })
  }
  render() {
    return (
      <div className="g">
        <div className="v ac">
          <Motion style={{y:spring(this.state.num === 0?0:-1.1)}} >
            {mot => <Button mouseIn={this.vin} mouseOut={this.vout} to={this.props.to} style={{
              transform:`translate(0rem, ${mot.y}rem)`
            }}>
            <Icon
              imgs={this.props.imgs}
              num={this.state.num}
              style={{
                width: '5rem',
                height: '5rem'
              }}
            />
          </Button>}
          </Motion>
          <div style={{marginTop:'1rem',color:'#26A9E0', backgroundColor:'#fff', borderRadius:'5rem', paddingLeft:'1rem',paddingRight:'1rem', fontWeight:400, fontSize:'1.2rem'}} >{this.props.title}</div>
        </div>
      </div>
    )
  }
}
module.exports = Comp

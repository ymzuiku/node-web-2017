let React = require('react')
let _ = require('ym-react-cli')
let colors = require('../../CpBasic/colors.js')

let Comp = ({ style }) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc:window.pc
    }
    _.vmpc(this)
  }
  renderLine = () => {
    return <div style={{marginLeft:'1.5rem', marginRight:'1.5rem', width:'3px', height:'3rem', backgroundColor:colors.blue1 }} 
    ></div>
  }
  render() {
    let {pc} = this.state
    return (
      <div>
        <div className='box h' {...this.props} >
          {/* {this.renderLine()} */}
          <div style={{color:colors.black2, fontWeight:300, fontSize:pc?'4.2rem':'3rem'}} >{this.props.children}</div>
          {/* {this.renderLine()} */}
        </div>
      </div>
    )
  }
}
module.exports = Comp
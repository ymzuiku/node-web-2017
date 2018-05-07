let React = require('react')
let Plan = require('../../basic/Plan')
let _ = require('ym-react-cli')
let colors = require('../colors')
let CpButton = require('../CpButton')
class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc,
      show: false,
      box: <div></div> ,
      buttons: ['确定']
    }
    _.vmpc(this)
    _.looker.listen('alert', ({ show,box, buttons, event }) => {
      show = show === undefined ? true : show
      buttons = buttons === undefined ? ['确定', '取消'] : buttons
      if (!event) {
        event = ()=>{}
      }
      this.event = event
      this.setState({
        show: show,
        box: box,
        buttons: buttons
      })
    })
  }
  onChange = show => {
    this.setState({
      show: show
    })
  }
  renderBox = () => {
    let {box, buttons, pc,event, } = this.state
    return (
      <div className="box" style={{ width: '100%', height: '100%' }}>
        <div className="box v" style={{flex:6,width:'100%', height:'100%',}} >
          <div style={{ flex: 7,marginTop:'1rem' }}>{box}</div>
          <div className={pc ? 'box h' : ''} style={{ flex: 2,width:'100%' }}>
            {buttons.map((v, i) => {
              let first = i===0
              let last = i === buttons.length-1
              if (pc) {
                return (
                  <CpButton
                    onClick={() => {
                      this.setState({
                        show:false,
                      }, () => {
                        this.event(i)
                      })
                    }}  
                    style={{
                      backgroundColor:first?colors.green2:colors.green1,
                      marginLeft:first?'2rem': '1rem',
                      marginRight:last?'2rem': '1rem',
                      flex: 1,
                      height: '4rem'
                    }}>
                    {v}
                  </CpButton>
                )
              }
              return (
                <CpButton
                onClick={() => {
                      this.event(i)
                      this.setState({
                        show:false,
                      })
                    }}   
                  style={{
                    backgroundColor:first?colors.green2:colors.green1,
                    marginTop: '1.2rem',
                    marginBottom: '1.2rem',
                    left: '5%',
                    width: '90%',
                    height: '4rem'
                  }}>
                  {v}
                </CpButton>
              )
            })}
          </div>
          
        </div>
      </div>
    )
  }
  render() {
    let { show,pc } = this.state
    return (
        <Plan
          pc={2}
          big={pc?false:true}
          show={show}
          onChange={this.onChange}
          box={this.renderBox()}
        />
    )
  }
}
module.exports = Comp

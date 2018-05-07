let React = require('react')
let PcBar = require('./PcBar')
let PhoneBar = require('./PhoneBar')
let NavBar = require('./NavBar')
let { ac, so } = require('../../model/api')
let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }

class Comp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc(),
      first:true,
      titles: this.props.titles(so.getState().ui.userItems),
      href:so.getState().ui.href,
    }
  }
  componentDidMount() {
    this.unso = so.subscribe(() => {
      this.setState({
        pc:so.getState().ui.pc,
        titles: this.props.titles(so.getState().ui.userItems),
        href:so.getState().ui.href,
      })
    })
    this.setState({
      first: false,
    })
  }
  componentWillUnmount() {
    this.unso()
  }
  componentWillReceiveProps(props) {
    return props
  }
  renderBar= ()=>{
    const { pc, titles, href = '', first } = this.state
    if (href.indexOf('nav') > 0) {
      return <Motion key='tobbarnav' defaultStyle={{x:50}} style={{x:spring(0, {stiffness:220})}} >
        {mot => <div style={{
          transform: `translate(${mot.x}px, 0px)`,
          zIndex:50,
        }} ><NavBar ></NavBar></div>}
      </Motion>
    } else {
      return <Motion key='tobbarhome' defaultStyle={{x:first?0:-50}} style={{x:spring(0, {stiffness:180})}}  >
      {mot => <div style={{
          transform: `translate(${mot.x}px, 0px)`,
          zIndex:50,  
      }} >{pc ? <PcBar titles={titles} /> : <PhoneBar titles={titles} />}</div>}
     </Motion>
    }
  }
  render() {
    const { pc, titles, href = '', first } = this.state
    return <div>
      <div style={{
        zIndex:50,
        position:'fixed',
        left:0,
        top:0,
        width:'100%',
      }}>
      {this.renderBar()}
      </div>
      <div style={{height:52, width:'100%'}} ></div>
    </div>
  }
}
module.exports = Comp

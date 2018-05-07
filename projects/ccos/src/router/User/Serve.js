let React = require('react')
let {ac, so} = require('../../model/api')
let CpSwitchGroup = require('../../CpComp/CpSwitchGroup')
let colors = require('../../model/colors')
let ServerEndList = require('../Car/ServerEndList')
let ServerNowList = require('../Car/ServerNowList')

let data = [ { title: '服务中' }, { title: '服务结束' }]
class Car extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc(),
      rect: { left: 0, top: 0, width: 0, height: 0 },
    }
    window.addEventListener('resize', () => {
      this.changeRect()
    })
  }
  componentDidMount() {
    // 代码分割
    this.unso = so.subscribe(() => {
      let sos = so.getState()
      this.setState({
        pc: sos.ui.pc,
        carTabNumber:sos.ui.carTabNumber,
      })
    })
    this.changeRect()
    window.scrollTo(0,0)
  }
  componentWillMount() {
    so.dispatch(ac.href(window.location.href))
  }
  componentWillUnmount() {
    this.unso()
  }
  changeRect = () => {
    let box = document.getElementById('listbox')
    if (box) {
      let rect = box.getBoundingClientRect()
      this.setState({
        rect:rect
      })
    }
  }
  render() {
    let {  rect, } = this.state
    return (
      <div style={{ width: '100%', height: '90vh'}}>
        <div style={{ height: '3rem' }} />
        <CpSwitchGroup count={2} data={data} num={0} >
          <ServerNowList></ServerNowList>
          <ServerEndList></ServerEndList>
        </CpSwitchGroup>
      </div>
    )
  }
}
module.exports = Car

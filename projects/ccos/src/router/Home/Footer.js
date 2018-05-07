// 页脚
let React = require('react')
let colors = require('../../model/colors')
let Button = require('../../comp/Button')

let Comp = ({ style }) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc:window.pc()
    }
  }
  componentDidMount() {
    this.unso = window.q.vmpc(this)
  }
  componentWillUnmount() {
    this.unso()
  }
  renderIcons = () => {}
  render() {
    let logoValue = 1
    let {pc} =this.state
    return (
      <div
        style={{ backgroundColor: '#283448',width:'100%',  justifyContent:'center', alignItems:'center' }}>
        {this.renderIcons()}
        <Button
          to='http://www.csccp.org/'
          style={{
            justifyContent:'center', alignItems:'center',
            marginTop: 10,
            marginBottom: 10,
            fontSize: pc?24:16,
            color: 'rgba(255,255,255,0.5)'
          }}>
          访问 csccp.org 官网
        </Button>
        <div
          className="box v"
          style={{
            fontSize:pc?20:14,
            color: 'rgba(255,255,255,0.35)',
            marginBottom: 10,
            
          }}>
          2018 粤ICP备17165455号
        </div>
      </div>
    )
  }
}
module.exports = Comp

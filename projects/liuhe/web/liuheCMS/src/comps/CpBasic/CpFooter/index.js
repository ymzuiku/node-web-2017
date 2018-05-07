// 页脚
let React = require('react')
let _ = require('ym-react-cli')
let colors = require('../../CpBasic/colors.js')
let Button = require('../../basic/Button')

let Comp = ({ style }) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  renderIcons = () => {}
  render() {
    let logoValue = 1
    return (
      <div
        className="box v"
        style={{ backgroundColor: '#283448', width: '100%', height: '100%' }}>
        {this.renderIcons()}
        <Button
          className="box"
          to='http://www.csccp.org/'
          style={{
            marginTop: '0.2rem',
            fontSize: '1.2rem',
            height: '3rem',
            color: 'rgba(255,255,255,0.5)'
          }}>
          访问 csccp.org 官网
        </Button>
        {/* <div className='box' style={{ color: '#fff', opacity: 0.3, width:'4rem'}} > | </div> */}
        <div
          className="box v"
          style={{
            fontSize: '1.2rem',
            height: '3rem',
            color: 'rgba(255,255,255,0.35)'
          }}>
          2017abcde-online版权所有2ICP备17046319号
        </div>
      </div>
    )
  }
}
module.exports = Comp

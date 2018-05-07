let React = require('react')
let CpButton = require('../../CpComp/CpButton')
let CpInput = require('../../CpComp/CpInput')
let colors = require('../../model/colors')
let {so,ac,api} =require('../../model/api')

class InputerShou extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      code:'',
    }
  }
  componentWillUnmount() {
    so.dispatch(ac.ui({inputerAlertUnShow:true}))
  }
  send = () => {
    let {pid, data} = this.props
    api.luruyuan_shou({ pid: pid, sid: data.id,code:this.state.code }, (res) => {
      window.msginfo(res.msg)
    })
    so.dispatch(ac.ui({inputerAlertUnShow:true}))
  }
  renderCell = (icon='./icon/line-user.png', text) => {
    return <div style={{ marginTop:10, flexDirection: 'row',maxWidth:300,width:'100%', alignItems: 'center' }}>
    <div
      style={{
        width: 30,
        height: 30,
        backgroundImage: `url(${icon})`
      }}
    />
    <div style={{ color: colors.black2,marginLeft:10 }}>{text}</div>
  </div>
  }
  render() {
    let { msg, data,tel} = this.props
    return (
      <div style={{padding:20,alignItems:'center'}} >
        <div style={{color:colors.black2, fontSize:20,marginTop:20,marginBottom:10,}} >请回收样本</div>
        {this.renderCell('./icon/line-user.png', data.name)}
        {this.renderCell('./icon/line-phone.png', data.tel)}
        {this.renderCell('./icon/line-id.png', data.idcard)}
        {this.renderCell('./icon/location-list.png', data.addr)}
        <div style={{ backgroundImage: `url(./pic/push-obj.png)`, width: 200, height: 200,marginTop:20, }} ></div>
        <div>
          <CpInput icon='./icon/clock.png' onChange={(e) => { window.q.vm(this, 'code', e)}} value={this.state.code} placeholder='请输入样本编号' style={{height:45,maxWidth:440,marginTop:10}} ></CpInput>
        <CpButton onClick={this.send} icon='./icon/right-white.png' style={{height:45,maxWidth:440,marginTop:10}} >绑定样本并回收</CpButton>
        </div>
      </div>
    )
  }
}
module.exports = InputerShou

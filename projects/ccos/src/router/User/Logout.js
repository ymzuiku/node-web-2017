let React = require('react')
let {ac, so} = require('../../model/api')
let Alert = require('../../comp/Alert')
let Button = require('../../comp/Button')
let colors = require('../../model/colors')
class Comp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show:false,
    }
  }
  componentDidMount() {
    this.setState({
      show:true
    })
  }
  componentWillUnmount() {
  }
  cancel = () => {
    this.setState({
      show:false
    }, () => {
      window.history.back()
    })
  }
  ok = () => {
    this.setState({
      show:false
    }, () => {
      window.location.href = '#/home/'
      so.dispatch(ac.clean())
    })
  }
  alertBox = () => {
    return <div style={{ top: '5%', width: '100%', height: '90%', justifyContent: 'space-between', alignItems: 'center' }} >
    <div style={{flexGrow:1}} ></div>  
      <div style={{ fontSize: 24, fontWeight: 300, color: colors.green3 }} >是否登出账号?</div>
      <div style={{ marginTop: 20, fontSize: 18, fontWeight: 300, color: colors.black2, opacity: 0.5 }} >同时会清空本地数据</div>
      <div style={{flexGrow:1}} ></div>  
      <div style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '90%' }} >  
        <Button onClick={this.cancel} style={{flexGrow:1, height:50, background:colors.green1, borderRadius:3, color:colors.white1, justifyContent:'center', alignItems:'center' }} >取消</Button>
        <div style={{ flexGrow: 0.1 }} ></div>
        <Button onClick={this.ok} style={{flexGrow:1, height:50, background:colors.green3, borderRadius:3, color:colors.white1, justifyContent:'center', alignItems:'center' }} >确定</Button>
      </div>
    </div>
  }
  render() {
    return (
      <div>
        <Alert style={{width:'40%',height:'30%'}} box={this.alertBox()} show={this.state.show} ></Alert>
      </div>
    )
  }
}
module.exports = Comp
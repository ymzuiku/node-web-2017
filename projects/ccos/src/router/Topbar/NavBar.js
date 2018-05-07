let React = require('react')
let PcItem = require('./PcItem')
let colors = require('../../model/colors')
let {so,ac} = require('../../model/api')
let Button = require('../../comp/Button')

let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }

class Comp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: so.getState().ui.navTitle,
      backColor: colors.blue1,
      homeColor: colors.blue1,
    }
    this.unso = so.subscribe(() => {
      this.setState({
        title:so.getState().ui.navTitle
      })
    })
  }
  componentWillUnmount() {
    this.unso()
  }
  back = () => {
    window.history.back()
  }
  backHome = () => {
    window.location.href = '#/home/'
  }
  backVin = () => {
    this.setState({
      backColor:colors.green2,
    })
   }
  backVout = () => {
    this.setState({
      backColor:colors.blue1,
    })
   }
  homeVin = () => { 
    this.setState({
      homeColor:colors.green2,
    })
  }
  homeVout = () => { 
    this.setState({
      homeColor:colors.blue1,
    })
  }
  render() {
    let ih = 52
    let {backColor, homeColor} = this.state
    return <div style={{
        flexDirection: 'row',
        height: ih,
        width:'100%',
        boxShadow: '0px 1px 2px rgba(0,0,0,0.08)',
        backgroundColor:colors.white1,
        zIndex:10,
      }} >
        <Button vin={this.backVin} vout={this.backVout} onClick={this.back}  style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems:'center',
          marginLeft: 10,
          zIndex:11,
        }} >
        <div style={{
          width: 34,
          height:'100%',
          backgroundImage: `url(./icon/navback.png)`,
          }} ></div>
        <p style={{
            color: backColor,
          }} >返回</p>
        </Button>
        <p style={{marginLeft: 12,lineHeight:ih+'px', }} >|</p>
        <Button vin={this.homeVin} vout={this.homeVout}  onClick={this.backHome} style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems:'center',
          marginLeft: 12,
          zIndex:11,
        }} >
        <p style={{
            color: homeColor,
          }} >首页</p>
        </Button>
        <div style={{ flexGrow: 1,justifyContent:'center', alignItems:'center',marginLeft:'-12%' }} >
        {this.state.title}  
        </div>  
      </div>
  }
}
module.exports = Comp
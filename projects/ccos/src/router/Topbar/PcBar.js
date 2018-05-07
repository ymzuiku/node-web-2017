let React = require('react')
let PcItem = require('./PcItem')
let colors = require('../../model/colors')
let Button = require('../../comp/Button')
let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }

class Comp extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { titles,...rest } = this.props
    let ih = 52
    let now = 0
    titles.map((v, i) => {
      if (window.location.href.indexOf(v.to) > 0) {
        now = i
      }
    })
    return <div style={{
        flexDirection: 'row',
        height: ih,
        width:'100%',
        boxShadow: '0px 1px 2px rgba(0,0,0,0.08)',
        backgroundColor:colors.white1,
        zIndex:10,
      }} >
        <Button to='#/home/' style={{
          background: colors.blue1,
          width: 136,
          flexDirection: 'row',
          justifyContent: 'center',
          marginLeft:20,
        }} >
        <div style={{
          width: 88,
          height:'100%',
          backgroundImage: `url(./logo/logo.png)`,
      }} ></div>
        </Button>
        <div style={{ flexDirection: 'row', flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}  >
          <div style={{ flexGrow: 2 }} ></div>      
          <div style={{ flexGrow: 3,flexDirection:'row',height:'100%',alignItems:'center' }} >
          {titles.map((v, i) => {
       return <PcItem key={'pcitem'+i}  {...v} now={now===i} ></PcItem>   
          })}        
          <Motion style={{x:spring(now)}} >
            {mot=><div style={{width: '100%', height: 5, background: colors.blue1, position: 'absolute',left:0, bottom: 0,transform:`translate(${-50+12.5+mot.x*25}%, 0%) scale(0.07, 1)` }} ></div>  
          }
            </Motion>
            </div>  
      <div style={{flexGrow:3}} ></div>    
        </div>  
      </div>
  }
}
module.exports = Comp
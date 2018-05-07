let React = require('react')
let Icon = require('../../basic/Icon')
let Button = require('../../basic/Button')
let _ = require('ym-react-cli')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      num: 0,
      pc: window.pc,
      titleBg:'#f9f9f9',
    }
    _.vmpc(this)
  }
  vin = () => {
    this.setState({
      num: 1,
      titleBg:'#f3f3f3',
    })
   }
  vout = () => {
    this.setState({
      num: 0,
      titleBg:'#f9f9f9',
    })
  }
  click = () => {
    window.location.href = this.props.to
  }
  render() {
    let {pc} = this.state
    return (
      <div className='g' >
        <div className='v js ac h-100' >
        <div style={{backgroundColor:this.state.titleBg, borderRadius:'3rem', padding:'0.3rem',paddingLeft:'1rem',paddingRight:'1rem', maxWidth: '12rem',color:'#5C7A8B', fontSize: '1.2rem', fontWeight:400 }}  >{this.props.title}</div>
        <Button mouseIn={this.vin} mouseOut={this.vout} style={{width:'12rem',height:'12rem'}} >
        <Icon mouseIn={this.vin} mouseOut={this.vout} className='btn' onClick={this.click}  style={{ height: '12rem' }} imgs={this.props.imgs} size={pc?'11rem':'12.5rem'} num={this.state.num} ></Icon>  
        </Button>
        <div style={{textAlign:'center', maxWidth: '12rem', color:'#678393',fontWeight:400, fontSize: '0.9rem',opacity:0.8 }} >{this.props.info}</div> 
        <div className='h3d0' ></div>
      </div>
      </div>
    )
  }
}
module.exports = Comp
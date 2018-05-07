let React = require('react')
let _ = require('ym-react-cli')

let Comp = ({img})=><dev></dev>
Comp = class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc:window.pc
    }
    _.vmpc(this)
  }
  render() {
    let { img,children } = this.props
    let { pc } = this.state
    return (
      <div className='gf' >
        <div className='v jc ec' style={{
          width: '100%', height:pc?'15rem':'12rem',
          backgroundImage: `url(${img})`,
          backgroundSize: `cover`,
          backgroundPosition: `50% 50%`
        }} >  
          <p style={{color:'#fff',letterSpacing:pc?'0.5rem':'0.2rem',fontSize:pc?'4rem':'2.5rem',fontWeight:600, textAlign:'center', textShadow:'0 0.5rem 0.4rem rgba(0, 0, 20, 0.1)',}} >{children}</p>
        </div>
        <div style={{height:'1.66rem'}} ></div>
        <div style={{height:'1px', backgroundColor:'#D9D9D9'}} ></div>
      </div>
    )
  }
}
module.exports = Comp
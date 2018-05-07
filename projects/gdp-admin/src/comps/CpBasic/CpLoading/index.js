let React = require('react')
let { Motion, spring } = require('react-motion')
// if (window.low) { spring = function (v, d) { return v } }
let Comp = ({title})=><div></div>
Comp = class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      r:-360*10,
    }
    this.r = this.state.r
    this.timer = setInterval(() => {
      this.r -= 360 * 10
      this.setState({
        r:this.r
      })
    },6000)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  render() {
    let {title='读取信息中...'} = this.props
    return (
      <Motion defaultStyle={{r:0}} style={{r:spring(this.state.r, {stiffness:10,precision:100})}} >
      {mot => <div className='box v' style={{
        width: '100%',
        height: '100%',
        }}>    
      <div style={{ height: '20rem' }} />
      <div style={{
        width: '6rem', height: '6rem',
        backgroundImage: `url(./icon/loading-gay.png)`,
        backgroundSize: `cover`,
        backgroundPosition: `50% 50%`,
        transform:`rotateZ(${mot.r}deg)`
      }} ></div>
          <div className='box h' style={{height:'5rem', width:'100%', fontSize:'1.6rem', fontWeight:300, color:'#aaa'}} >
         {title}
      </div>
      </div>}
    </Motion>
    )
  }
}
module.exports = Comp
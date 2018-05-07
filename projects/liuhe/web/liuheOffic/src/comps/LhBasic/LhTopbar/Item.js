let React = require('react')
let Button = require('../../basic/Button')
let Tip = require('../../basic/Tip')
let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }

class SubItem extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      vin:false
    }
  }
  vin = () => { 
    this.setState({
      vin:true
    })
  }
  vout = () => {
    this.setState({
      vin:false
    })
  }
  render() {
    let { vin, } = this.state
    return <Button mouseIn={this.vin} mouseOut={this.vout} to={this.props.to} style={{
      backgroundColor: vin ? '#0B59AC' : '#EBF8FF',
      color: vin ? '#fff' : '#0B59AC',
      height: '3rem', width: '100%',
      lineHeight: '3rem',
      textAlign: 'center',
      fontSize:'1rem',
    }}>{ this.props.children }</Button>
  }
}

let outOpacity = 0.7
class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    let {now}=this.props
    this.state = {
      opacity: now ? 1 : outOpacity,
      color:now?'#005BAB':'#666666'
    }
  }
  componentWillReceiveProps(props) {
    if (props !== this.props) {
      this.setState({
        opacity: props.now ? 1 : outOpacity,
        color:props.now?'#005BAB':'#666666',
      })
    }
    return props
  }
  vin = () => { 
    this.setState({
      opacity: 1,
    })

  }
  vout = () => {
    let {now}=this.props
    this.setState({
      opacity:now?1:outOpacity
    })
  }
  subItem = () => {
    let { data } = this.props
    if (!data.data) {
      return <div></div>
    }
    else if (data.data.length === 0) {
      return <div></div>
    }
    return <Motion defaultStyle={{ y: 3.5, opacity: 0 }} style={{
      y: spring(-1, {
      stiffness:250,
    }), opacity:spring(1,{stiffness:250})}} >
      {mot=><div className='v'  style={{
      position: 'absolute',
      width: '10rem',
      opacity: mot.opacity,
      color: '#3C4145',
      zIndex:11,
      transform:`translate(-2.7rem, ${mot.y}rem)`,
      }}>
        <div style={{
          height:'2.15rem',
        backgroundColor:'rgba(0,0,0,0)'  
      }} ></div>  
        <div className='h0d3' style={{
          backgroundColor:'#0B59AC'
        }} ></div>
        <div className='v ac' style={{
          backgroundColor: '#EAF6FF',
          padding: 0,
          margin:0,
        }} >
          {data.data.map((v, i) => {
            return <SubItem to={v.to} >{v.title}</SubItem>
          })}  
           
        </div>
      
    </div>}
    </Motion>
  }
  render() {
    let {now,data}=this.props
    return (
      <Motion style={{ opacity: this.state.opacity, }} >
        {mot => <Tip to={data.data ? '' : data.to} box={this.subItem()}  mouseIn={this.vin} mouseOut={this.vout} className={`ff ${now?'fw500':'fw400'}`} style={{
          opacity: mot.opacity,
          color:this.state.color
        }} >
          <div className='' style={{
          fontSize:'1.1rem'
        }} >{this.props.children}</div>  
        </Tip>}
      </Motion>
    )
  }
}
module.exports = Comp
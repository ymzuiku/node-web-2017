import React from 'react'
import { Link } from 'react-router-dom'
import { Motion, spring } from 'react-motion'

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      vin:false,
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
    let {title,value, onChange, def, long} = this.props
    return (
      <Motion style={{x:this.state.vin?spring(1):spring(0,{stiffness:200})}} >
        {mot=><div className='row' style={{width:'100%',}} >
          <p className={long?'col-md-2':'col-md-3'} style={{minWidth:long?200:0, textAlign:long?'left':'left',color:'#a0a0a0' }} >{title}</p>
          <div className={long?'col-md-8':'col-md-9'} >
            <input value={value} onChange={onChange} onFocus={this.vin} onBlur={this.vout} className='row' placeholder={def} type="text" style={{width:'100%', marginLeft:long?-7:-30}} />
            <div className='row' style={{ width: '100%', height: '1px', backgroundColor: this.state.vin?'#35B69E':'#dfdfdf' }} ></div>
          </div>
        </div>}
      </Motion>
    )
  }
}
export default Comp
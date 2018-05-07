import React from 'react'
import { Link } from 'react-router-dom'

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
<div className='container'>
    <div className='container' style={{paddingBottom:126}}>
        <div className='row'>
            <div className='col-xs-1 col-sm-1' style={{marginLeft:36}}></div>
            <div className='col-xs-3'>
                <div style={{marginBottom:20,marginLeft:80,width:100,height:100,backgroundImage:'url(./icon/home_no1.png)',backgroundSize: `cover`,backgroundPosition: `50% 50%`,backgroundRepeat:'no-repeat'}}></div>
                <div className='col-xs-12' style={{textAlign:'center',color:'#35B69E',fontSize:14,fontWeight:400}}>2017年10月——2018年12月</div>
                <div className='col-xs-12' style={{textAlign:'center',color:'#D5D5D5',fontSize:12,marginTop:6}}>计划执行10万个</div>
            </div>
            <div className='col-xs-3'>
                 <div style={{marginBottom:20,marginLeft:80,width:100,height:100,backgroundImage:'url(./icon/home_no2.png)',backgroundSize: `cover`,backgroundPosition: `50% 50%`,backgroundRepeat:'no-repeat'}}></div>
                 <div className='col-xs-12' style={{textAlign:'center',color:'#35B69E',fontSize:14,fontWeight:400}}>2019年1月——2019年12月</div>
                 <div className='col-xs-12' style={{textAlign:'center',color:'#D5D5D5',fontSize:12,marginTop:6}}>计划执行20万个</div>
            </div>
            <div className='col-xs-3'>
                <div style={{marginBottom:20,marginLeft:80,width:100,height:100,backgroundImage:'url(./icon/home_no3.png)',backgroundSize: `cover`,backgroundPosition: `50% 50%`,backgroundRepeat:'no-repeat'}}></div>
                <div className='col-xs-12' style={{textAlign:'center',color:'#35B69E',fontSize:14,fontWeight:400}}>2020年1月——2020年12月</div>
                <div className='col-xs-12' style={{textAlign:'center',color:'#D5D5D5',fontSize:12,marginTop:6}}>计划执行50万个</div>
            </div>
        </div>
    </div>
    <div className='container' style={{position:'absolute',zIndex:-1,top:this.props.top}}>
        <div className='col-xs-3'></div>
        <div className='col-xs-6' style={{borderTop:'1px solid #D5D5D5'}}></div>
        <div className='col-xs-3'></div>
    </div>
</div>
    )
  }
}
export default Comp
import React from 'react'
import Progress from '../../comps/ProgressComp'
import {action, store} from '../../model/store'

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: store.getState().isLogin,
      token:-1,
    }
    store.subscribe(() => {
      this.setState({
        isLogin: store.getState().isLogin,
        token:store.getState().token,
      })
    })
  }
  componentDidMount() {

  }
  render() {
    return (
      <div>
      <div className='container-fluid' >
        <div className='row' >
        <div className='col-xs-12' style={{
          width:'100%',height:300,
          backgroundImage: `url(./icon/home_banner.jpg)`,
          backgroundSize: `cover`,
          backgroundPosition: `50% 50%`
        }} ></div>
        </div>
      </div>
      <div className='container' style={{marginTop:36}}>
        <div className='row'>
          <div className='col-xs-12'>
            <div className='col-xs-1 col-sm-1' style={{marginLeft:36}}></div>
            <div className='col-xs-3 col-sm-3' style={{height:136,backgroundImage: `url(./icon/home_img_one.png)`,backgroundSize: `cover`,backgroundPosition: `50% 50%`,marginRight:10}}></div>
            <div className='col-xs-3 col-sm-3' style={{height:136,backgroundImage: `url(./icon/home_img_two.png)`,backgroundSize: `cover`,backgroundPosition: `50% 50%`,marginRight:10}}></div>
            <div className='col-xs-3 col-sm-3' style={{height:136,backgroundImage: `url(./icon/home_img_tree.png)`,backgroundSize: `cover`,backgroundPosition: `50% 50%`,marginRight:10}}></div>
          </div>
        </div>
      </div>
      <div className='container' style={{marginTop:56,marginBottom:36}}>
        <div className='row'>
          <div className='col-xs-12 col-sm-12' style={{fontSize:28,textAlign:'center',fontWeight:300}}>GDP整体规划</div>
          <div className='col-xs-12 col-sm-12' style={{fontWeight:300,fontSize:14,color:'#A0A0A0',textAlign:'center',marginBottom:10,fontWeight:300}}>OVERALL PLANNING</div>
          <div className='col-xs-12 col-sm-12' style={{fontWeight:300,fontSize:14,color:'#A1A1A1',textAlign:'center'}}>GENOME DECODE PROGRAM (GDP) 基因组解码计划于10月27日第十二届国际基因组学大会 (ICG-12) 上公开发布并启动。 </div>
          <div className='col-xs-12 col-sm-12' style={{fontWeight:300,fontSize:14,color:'#A1A1A1',textAlign:'center'}}>该计划分为三期，进一步促进测序价格的降低，推动测序进入基因组百元人民币时代，</div>
          <div className='col-xs-12 col-sm-12' style={{fontWeight:300,fontSize:14,color:'#A1A1A1',textAlign:'center'}}>实现人人拥有自己的WGS (WHOLE GENOME RESEQUENCING) 序列。解码基因组，从未如此简单。</div>
        </div>
      </div>
      <Progress top={830}></Progress>
      </div>
    )
  }
}
export default Comp
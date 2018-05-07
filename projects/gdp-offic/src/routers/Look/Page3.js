import React from 'react'
import MerginHeight from '../../comps/MerginHeight'
class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    let imgH = 120
    return (
      <div className='container-fluid' >
        <MerginHeight h={10} ></MerginHeight>
        <div className='row' style={{
          height: 50,
          lineHeight: '50px',
        }} >
          <span style={{ marginLeft: 10, color: '#35B69E', fontSize: 18 }} >快交付</span><span style={{ marginLeft: 20, fontSize: 12, fontWeight: 300, color: '#35b69e', opacity: 0.8 }} >FAST DELIVERY</span>
        </div>
        <div className='row' style={{
          height: 1, background: '#fff',
          boxShadow:'0px 1px 0px #35B69E',
        }} ></div>
        <div className='row' style={{
          paddingLeft: '10px',
          paddingRight:'10px',
          marginTop:'10px'
        }} >
          <MerginHeight h={10} ></MerginHeight>
          <p className='p' style={{textAlign:'center'}} > 华大专有云+BGI Online公有云的相互结合，完成数据的快速传输、分析资源的弹性调度，数据下机后5个工作日可接收结题报告。 </p>
        </div>
        <div className='row' >
          <div className='' style={{height:20}} ></div>
        </div>
        <div className='row'  >
          <div className='col-xs-2' ></div>
          <img className='col-xs-8' src="./icon/img_biiao3.png"  alt=""/>
          <div className='col-xs-2' ></div>
        </div>
        <MerginHeight h={50} ></MerginHeight>
      </div>
    )
  }
}
export default Comp
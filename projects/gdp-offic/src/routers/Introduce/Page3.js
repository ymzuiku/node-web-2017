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
          <span style={{ marginLeft: 10, color: '#35B69E', fontSize: 18 }} >实时签约量</span><span style={{ marginLeft: 20, fontSize: 12, fontWeight: 300, color: '#35b69e', opacity: 0.8 }} >BRIEF INTRODUCTION</span>
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
          <p className='h5' style={{ textAlign: 'center' }} > 一期总计划样本量限量10万个、二期20万个、三期50万个, 额满为止 </p>
          <p className='p' style={{textAlign:'center'}} > 计划总样本量及已签约样本量 </p>
        </div>
        <div className='row' >
          <div className='' style={{height:20}} ></div>
        </div>
        <div className='row'  >
          <div className='col-xs-3' ></div>
          <img className='col-xs-6' src="./icon/img_Chart.png"  alt=""/>
          <div className='col-xs-3' ></div>
        </div>
        <MerginHeight h={50} ></MerginHeight>
      </div>
    )
  }
}
export default Comp
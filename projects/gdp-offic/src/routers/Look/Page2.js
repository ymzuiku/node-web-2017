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
          <span style={{ marginLeft: 10, color: '#35B69E', fontSize: 18 }} >低价格</span><span style={{ marginLeft: 20, fontSize: 12, fontWeight: 300, color: '#35b69e', opacity: 0.8 }} >LOW PRICE</span>
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
          <MerginHeight h={90} ></MerginHeight>
          <div className='' style={{ textAlign: 'center' }} >
            <p className='h5'  >更多样本，更多惊喜 <span style={{ fontSize: 20, color: '#00B197' }} ></span> ，具体价格请咨询</p> <span><a href="tel:4007066615" style={{color:'#00B197'}}>联系我们: 400-706-6615</a></span>  
          </div>
          <MerginHeight h={30} ></MerginHeight>
        </div>  
      </div>
    )
  }
}
export default Comp
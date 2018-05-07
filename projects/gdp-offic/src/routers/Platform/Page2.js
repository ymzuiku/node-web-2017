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
          <span style={{ marginLeft: 10, color: '#35B69E', fontSize: 18 }} >BGI Online</span>
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
          <p className='h5' >基因组解码计划（GDP）拟使用BGI Online来传输和分析数据。</p>
          <p className='p' >华大携手阿里云、英特尔不断进行强强联合的持续创新，开发了一款基于“云”的生物信息数据云平台——BGI Online。BGI Online是一个致力于大数据存、算、传、管的生物信息云平台。</p>
          <p className='p' >为了能够让测序后的数据更加方便地进行分析与解读，目前BGI Online平台上已经有免费的公共流程，全面支持BGISEQ-500的测序数据，其中包括全基因组分析、全外显子分析、RNA-Seq数据分析。</p>
          <MerginHeight h={10} ></MerginHeight>
          <p className='p' style={{textAlign:'center'}} >想了解更多信息，请点击 <span><a href="https://www.bgionline.cn/index.html">https://www.bgionline.cn/index.html</a></span> </p>
          <MerginHeight h={30} ></MerginHeight>
          </div>
      </div>
    )
  }
}
export default Comp
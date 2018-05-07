import React from 'react'
import MerginHeight from '../../comps/MerginHeight'
import ProgressComp from '../../comps/ProgressComp'

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
          <span style={{ marginLeft: 10, color: '#35B69E', fontSize: 18 }} >GDP整体规划</span><span style={{ marginLeft: 20, fontSize: 12, fontWeight: 300, color: '#35b69e', opacity: 0.8 }} >BRIEF INTRODUCTION</span>
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
          <p className='p' >Genome Decode Program（GDP）基因组解码计划于10月27日第十二届国际基因组学大会（ICG-12）上公开发布并启动。该计划共分为三期，进一步促进测序价格的降低，推动测序进入基因组百元人民币时代，实现人人拥有自己的WGS（Whole genome resequencing）序列。解码基因组，从未如此简单。</p>
        </div>
        <div className='row' style={{
          transform:'translate(-150px, 40px)'
        }} >
        <ProgressComp top={51}></ProgressComp>
        </div>
      </div>
    )
  }
}
export default Comp
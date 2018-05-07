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
          <span style={{ marginLeft: 10, color: '#35B69E', fontSize: 18 }} >GDP简介</span><span style={{ marginLeft: 20, fontSize: 12, fontWeight: 300, color: '#35b69e', opacity: 0.8 }} >BRIEF INTRODUCTION</span>
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
          <MerginHeight h={10}></MerginHeight>
          <p className='h5' >GDP(Genome Decode Program),基因组解码计划</p>  
          <p className='p' >自人类基因组计划开展以来，基因测序产业得到蓬勃发展。不论是测序技术，还是数据存储、分析技术都同时以前所未有的速度在快速发展。短短的二十年时间，使得基因数据的获得和解读都变得更加容易，这无疑大大加快了科研发现。许多新的发现都在颠覆之前的生物学知识。比如来自ENCODE项目的结果显示，先前认为只有占基因组中1%的编码区基因是有用的，这也是为什么之前很多研究只关注外显子区域，但是后续发现许多与疾病相关的DNA变异位于基因组DNA编码区之外。世界如此奇妙，生物界更是存在无限的未知，等待我们去解码。</p>
          <p className='p' >华大基因目前拥有自主知识产权的测序仪，经过反复测试和众多项目考验，测序质量值和产能已经达到国际领先水平。再配上BGI Online的信息分析能力，华大基因具有全球最大的测序基础和能够快速、自信地执行全基因组测序服务的能力。</p>
          <p className='p' >华大基因2017年10月正式推出基因组解码计划，旨在为广大科研工作者提供高度准确、最具性价比的基因组测序服务和一站式科研解决方案。作为生物行业的一员，我们希望履行社会职责，让每个人都了解自己的基因，解码自己的基因信息。</p>
        </div>
        <div className='row' >
          <div className='col-xs-1' style={{
            height: imgH, width: '31%',
            marginLeft:'3%',
            backgroundImage: `url(./icon/img1.png)`,
          backgroundSize: `cover`,
          backgroundPosition: `50% 50%`
          }} ></div>
          <div className='col-xs-1' style={{
            height: imgH, width: '31%',
            marginLeft:'2%',
            backgroundImage: `url(./icon/img2.png)`,
          backgroundSize: `cover`,
          backgroundPosition: `50% 50%`
          }} ></div>
          <div className='col-xs-1' style={{
            height: imgH, width: '31%',
            marginLeft:'2%',
            backgroundImage: `url(./icon/img3.png)`,
          backgroundSize: `cover`,
          backgroundPosition: `50% 50%`
          }} ></div>
          <div className='row' style={{ height: '20px' }} >
          <div className='col-xs-1' style={{height:'100%'}} ></div>  
          </div>
        </div>
      </div>
    )
  }
}
export default Comp
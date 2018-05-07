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
          <span style={{ marginLeft: 10, color: '#35B69E', fontSize: 18 }} >高质量</span><span style={{ marginLeft: 20, fontSize: 12, fontWeight: 300, color: '#35b69e', opacity: 0.8 }} >High Quality</span>
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
          <MerginHeight to={10} ></MerginHeight>
          <p className='p' >测试数据选用了“瓶中基因组（Genome in a Bottle）”的人类样本NA12878，这是目前被世界上认为研究最透彻的二倍体人类基因组，并发布了高置信变异集，可作为一个重要工具来了解测序仪和检测结果的表现。HiSeq X Ten平台的数据为Illumina官网下载的数据。两个平台的分析均严格采用了GATK Best Practices推荐的流程进行分析。</p>
          <MerginHeight to={10} ></MerginHeight>
          <p className='h5' >高测序质量</p> 
          <p className='p' >对标准品样本进行BGISEQ-500同一测序仪内不同lane，以及BGISEQ-500测序仪之间分别进行三次技术重复，平均Q值质量较高：</p>
          <p className='h5' style={{ textAlign: 'center' }} > Q20＞96%，Q30＞85% </p>
          <MerginHeight to={10} ></MerginHeight>
          <p className='h5' >高比对率、高覆盖度、低重复率</p>  
          <p className='p' >表明BGISEQ-500产生的WGS数据可以发现更多变异位点，有助于挖掘疾病的低频和罕见突变，获取更加全面的基因组变异信息。</p>
          <MerginHeight to={10} ></MerginHeight>
          <div className='row'>
          <div className='col-xs-1' ></div>
          <img className='col-xs-10' src="./icon/img_biiao1.png"  alt=""/>
          <div className='col-xs-1' ></div>
          </div>
          <MerginHeight to={10} ></MerginHeight>
          <p className='h5' >变异结果高精准度、高敏感度和高一致性</p>  
          <p className='p' >高灵敏度（Sensitivity）和高精准度（Precision）意味着BGISEQ-500平台检测发现变异的能力更强，并且结果中为真的突变的概率也高。</p>
          <MerginHeight to={10} ></MerginHeight>
          <div className='row'  >
          <div className='col-xs-1' ></div>
          <img className='col-xs-10' src="./icon/img_biiao2.png"  alt=""/>
          <div className='col-xs-1' ></div>
          </div>
        </div>
        <MerginHeight to={30} ></MerginHeight>
      </div>
    )
  }
}
export default Comp
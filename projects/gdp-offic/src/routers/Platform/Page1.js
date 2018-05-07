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
          <span style={{ marginLeft: 10, color: '#35B69E', fontSize: 18 }} >BGISEQ-500</span><span style={{ marginLeft: 20, fontSize: 12, fontWeight: 300, color: '#35b69e', opacity: 0.8 }} ></span>
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
          <p className='h5' >基因组解码计划（GDP）拟使用BGISEQ-500来完成基因测序工作。</p>
          <p className='p' >基因组解码计划（GDP）拟使用华大自主平台完成基因测序工作。BGISEQ-500是华大自主开发的桌面型、高通量、一站式、开放性测序平台。配合可选的全自动文库制备系统和全自动样品加载系统，从测序到数据分析结果，最快完成周期可缩短在24小时内。</p>
          <p className='p' >BGISEQ-500采用优化的联合探针锚定聚合技术（cPAS）和改进的DNA纳米球（DNB）核心测序技术，是行业领先的高通量测序平台之一。</p>
          <p className='p' >具体而言，首先DNA分子锚和荧光探针在纳米球上进行聚合，随后高分辨率成像系统对光信号进行采集，光信号经过数字化处理后即可获得待测序列。其中，DNB通过线性扩增增强信号，降低单拷贝的错误率。此外，DNB大小与芯片上活性位点的大小相匹配，每个位点结合一个DNA纳米球，在保证测序精度的情况下提高了测序芯片的利用效率。</p>
          <MerginHeight h={10} ></MerginHeight>
          <div className='row'  >
          <div className='col-xs-2' ></div>
          <img className='col-xs-8' src="./icon/机器.png"  alt=""/>
          <div className='col-xs-2' ></div>
          </div>  
          <MerginHeight h={10} ></MerginHeight>  
          <p className='p' style={{textAlign:'center'}} >想了解更多信息，请点击 <span><a href="http://www.seq500.com/">http://www.seq500.com/</a></span> </p>  
        </div>
          <MerginHeight h={30} ></MerginHeight>
      </div>
    )
  }
}
export default Comp
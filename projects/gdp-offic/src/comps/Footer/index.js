import React from 'react'
import { Link } from 'react-router-dom'

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='container-fluid' style={{color:'#A0A0A0',background:'#F6F6F6',height:116,borderTop:'1px solid #EFEFEF',fontSize:10}}>
          <div className='container'>
          <div className='row' style={{marginTop:39,}}>
            <div className='col-xs-4' style={{borderRight:'1px solid #D5D5D5',marginLeft:68}}>
              <div className='row' style={{paddingBottom:10}}>
                <div className='col-xs-12' style={{fontWeight:600}}>其他站点 :</div>
              </div>
              <div className='row'>
                <div className='col-xs-3'><a style={{color:'#A0A0A0'}} href='http://www.genomics.cn/index'>华大基因</a></div>
                <div className='col-xs-3'><a style={{color:'#A0A0A0'}} href='http://www.bgitechsolutions.com/'>华大科技</a></div>
                <div className='col-xs-3'><a style={{color:'#A0A0A0',whiteSpace:'nowrap'}} href=''>BGISEQ-500</a></div>
                <div className='col-xs-2'><a style={{color:'#A0A0A0'}} href='https://www.bgionline.cn/'>BGIOnline</a></div>
              </div>
            </div>
            <div className='col-xs-3' style={{marginLeft:15,borderRight:'1px solid #D5D5D5'}}>
              <div className='row' style={{paddingBottom:10}}>
                <div className='col-xs-12' style={{fontWeight:600}}>资源下载 :</div>
              </div>
              <div className='row'>
                <div className='col-xs-3'><a style={{color:'#A0A0A0'}} href=''>合同</a></div>
                <div className='col-xs-4'><a style={{color:'#A0A0A0'}} href=''>结题报告</a></div>
                <div className='col-xs-4'><a style={{color:'#A0A0A0'}} href=''>注意事项</a></div>
              </div>
            </div>
            <div className='col-xs-2' style={{marginLeft:15,borderRight:'1px solid #D5D5D5'}}>
              <div className='row' style={{paddingBottom:10}}>
                <div className='col-xs-12' style={{fontWeight:600}}>联系我们 :</div>
              </div>
              <div className='row'>
                <div className='col-xs-12' style={{fontWeight:600,color:'#35B69E',fontSize:14}}>400-706-6615</div>
              </div>
            </div>
            <div className='col-xs-1'>
                <div className='row' style={{marginLeft:32}}>
                  <div className='col-xs-12' style={{backgroundRepeat:'no-repeat',backgroundPosition: `100% 10%`,height:80,width:80,backgroundImage: `url(./icon/logo_bgi.png)`,backgroundSize:'100%'}}></div>
                </div>
            </div>
        </div>
          </div>
      </div>
    )
  }
}
export default Comp
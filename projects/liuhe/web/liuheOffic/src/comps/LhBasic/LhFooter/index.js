let React = require('react')
let Items = require('./Items')
let _ = require('ym-react-cli')

let titles = [
  {
    title: '资源',
    data: [{ title: '产品目录下载',to:'/cdn/六合华大订单模板下载.zip' }, { title: '订单模版下载',to:'' }, { title: '重要文献',to:'http://www.bgitechsolutions.com/science/cat-89-103.html?year=2015' }, { title: '帮助中心',to:'http://v.youku.com/v_show/id_XMTczNTIxMzM2MA==.html' }]
  },
  { title: '加入我们', data: [{ title: '招聘信息',to:'' }, { title: '招商加盟',to:'' }] },
  {
    title: '联系我们',
    data: [
      { title: '电话：400-706-6615',to:'tel:4007066615' },
      { title: '邮箱：marketing-bj@genomics.cn' },
      { title: '自助系统：customer.genomics.cn', to:'customer.genomics.cn' },
    ]
  }
]

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc:window.pc
    }
    _.vmpc(this)
  }
  render() {
    let { pc } = this.state
    if (!pc) {
      return <div
      className="gf"
      style={{
        height: '14.5rem',
        backgroundImage: 'linear-gradient(0deg,#fff,#E8F6FF)'
      }}>
      <div
        style={{
          height: '0.2rem',
          backgroundColor: '#005BAB'
        }}
      />
      <div className="v jc ac">
          <div className='c6 v' >  
        {titles.map((v, i) => {
          return <Items data={v} ></Items>
        })}
          </div>
          <div style={{height:'2rem', width:'100%'}} ></div>    
        <div className='c12' style={{
          width: '13rem', height: '13rem',
          backgroundImage: `url(./icon/LiuHe-BGI.png)`,
          backgroundPosition: `50% 50%`
        }} ></div>
        <div className='c12' style={{
          width: '13rem', height: '13rem',
          backgroundImage: `url(./icon/BGI-Home.png)`,
          backgroundPosition: `50% 50%`
        }} ></div>
      </div>
      <div className='h jc ac' style={{
        fontSize: '0.9rem',
        color:'#666',
        marginTop:'2.5rem'
        }} >版权所有2017北京六合华大基因科技有限公司</div>
      <div className='h jc ac' style={{
        fontSize: '0.9rem',
        color:'#666',
      }} >All rights reserved 粤ICP备：123456</div>  
      <div style={{height:'0.5rem'}} ></div>  
    </div>
    }
    else return (
      <div
        className="gf"
        style={{
          height: '14.5rem',
          backgroundImage: 'linear-gradient(0deg,#fff,#E8F6FF)'
        }}>
        <div
          style={{
            height: '0.2rem',
            backgroundColor: '#005BAB'
          }}
        />
        <div style={{height:'2rem'}} ></div>
        <div className="h jc h-20d0">
          <div className='c6 h' >
          {titles.map((v, i) => {
            return <Items data={v} ></Items>
          })}
          </div>
          <div className='c2' style={{
            marginLeft:'4rem',
            width: '9rem', height: '9rem',
            backgroundImage: `url(./icon/LiuHe-BGI.png)`,
            backgroundPosition: `50% 50%`
          }} ></div>
          <div className='c2' style={{
            width: '9rem', height: '9rem',
            backgroundImage: `url(./icon/BGI-Home.png)`,
            backgroundPosition: `50% 50%`
          }} ></div>
        </div>
        <div className='h jc ac' style={{
          fontSize: '0.9rem',
          color:'#666',
          marginTop:'2.5rem'
        }} >版权所有2017北京六合华大基因科技有限公司 all rights reserved. 粤ICP备：123456</div>
        <div style={{height:'0.5rem'}} ></div>
      </div>
    )
  }
}
module.exports = Comp

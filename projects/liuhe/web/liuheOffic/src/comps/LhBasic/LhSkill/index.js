let React = require('react')
let Item = require('./Item')
let _ = require('ym-react-cli')

let titles = [
  {
    title: '合成业务',
    info: '快速、精准定制DNA合成',
    imgs: ['./icon/hechengyewu-before.png', './icon/hechengyewu-after.png'],
    to: 'http://www.baidu.com'
  },
  {
    title: 'Sanger测序',
    info: '高精度、高品质、高效率',
    imgs: ['./icon/Sanger-cexu-before.png', './icon/Sanger-cexu-after.png'],
    to: 'http://www.baidu.com'
  },
  {
    title: '分子生物学服务',
    info: '提供分子生物学基础实验服务及整体解决方案',
    imgs: ['./icon/fenzi-before.png', './icon/fenzi-after.png'],
    to: 'http://www.baidu.com'
  },
  {
    title: 'Sanger医学检测',
    info: '提供HLA配型检测、心血管用药指导基因检测等服务',
    imgs: ['./icon/Sanger-medical-before.png', './icon/Sanger-medical-after.png'],
    to: 'http://www.baidu.com'
  }
]

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc
    }
    _.vmpc(this)
  }
  render() {
    let { pc } = this.state
    return (
      <div className="g v w-100" style={{
        height:pc>0?'23.5rem':'80rem'
      }}>
        <div className='h2d0' ></div>
        <div className={pc > 0 ? 'h js as h-100' : 'v js as h-100'}>
          {titles.map((v, i) => {
            return <Item {...v} ></Item>
          })}
        </div>
      </div>
    )
  }
}
module.exports = Comp

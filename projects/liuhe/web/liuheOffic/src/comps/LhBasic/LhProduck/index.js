let React = require('react')
let Item = require('./Item')
let _ = require('ym-react-cli')

let titles = [
  { title: '试剂', imgs: ['./icon/icon-20.png', './icon/icon-19.png'] },
  { title: '耗材', imgs: ['./icon/icon-22.png', './icon/icon-21.png'] },
  { title: '仪器', imgs: ['./icon/icon-24.png', './icon/icon-23.png'] },
  { title: '优选', imgs: ['./icon/icon-26.png', './icon/icon-25.png'] }
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
    if (pc) {
      return (
        <div className="gf">
          <div
            className="v ac jc"
            style={{
              width: '100%',
              height: '25rem',
              backgroundImage: `url(./pic/Product-center-background.jpg)`,
              backgroundSize: `cover`,
              backgroundPosition: `50% 50%`
            }}>
            <div
              style={{
                color: '#fff',
                width: '9rem',
                fontWeight: 400,
                border: '2px solid rgba(255,255,255,0.5)',
                textAlign: 'center',
                padding: '0.2rem',
                borderRadius: '3rem'
              }}>
              产品中心
            </div>
            <div className="h3d0" />
            <div className="h jc ac h-20d0">
              <div className="c1" />
              {titles.map((v, i) => {
                return <Item {...v} />
              })}
              <div className="c1" />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="gf">
          <div
            className="v ac jc h-20d0"
            style={{
              width: '100%',
              height: '30rem',
              backgroundImage: `url(./pic/Product-center-background.jpg)`,
              backgroundSize: `cover`,
              backgroundPosition: `50% 50%`
            }}>
            <div
              style={{
                color: '#fff',
                width: '9rem',
                fontWeight: 400,
                border: '2px solid rgba(255,255,255,0.5)',
                textAlign: 'center',
                padding: '0.2rem',
                borderRadius: '3rem'
              }}>
              产品中心
            </div>
            <div className="h3d0" />
            <div className="v jc ac h-20d0">
              <div className="h">
                <div className="c1" />
                {titles.map((v, i) => {
                  if (i < 2) {
                    return <Item {...v} />
                  }
                })}
                <div className="c1" />
              </div>
              <div className="h2d0" />  
              <div className="h">
                <div className="c1" />
                {titles.map((v, i) => {
                  if (i >= 2) {
                    return <Item {...v} />
                  }
                })}
                <div className="c1" />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
module.exports = Comp

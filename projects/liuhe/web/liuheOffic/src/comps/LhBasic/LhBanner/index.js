let React = require('react')
let _ = require('ym-react-cli')
let Banner = require('../../basic/Banner.js')
let CpBannerNextButton = require('./CpBannerNextButton')
let Banner1 = require('./CpBanner1.js')
let Banner2 = require('./CpBanner2.js')
let Banner3 = require('./CpBanner3.js')
let Dock = require('../../basic/Dock')

let Comp = ({ style }) => <div />
Comp = class _Comp extends React.PureComponent {
  count = 3
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc,
      bannerNow: 0
    }
    _.vmpc(this)
  }
  getBannerTrueNum = num => {
    if (num > this.count - 1) {
      num = 0
    } else if (num < 0) {
      num = this.count - 1
    }
    return num
  }
  nextBannerNum = () => {
    let num = this.getBannerTrueNum(this.state.bannerNow + 1)
    this.setState({
      bannerNow: num
    })
  }
  lastBannerNum = () => {
    let num = this.getBannerTrueNum(this.state.bannerNow - 1)
    this.setState({
      bannerNow: num
    })
  }
  render() {
    let { pc } = this.state
    let h = '28rem'
    if (pc === 0) {
      h = '22rem'
    }
    return (
      <div style={{ width: '100%', height: h }}>
        <Banner
          num={this.state.bannerNow}
          onChange={num => {
            this.setState({
              bannerNow: num
            })
          }}
          autoScrollTime={50000000000}
          infinite={true}
          style={{ width: '100%', height: '100%' }}>
          <Banner1 num={0} now={this.state.bannerNow} in out />
          <Banner2 num={1} now={this.state.bannerNow} in out />
          <Banner3 num={2} now={this.state.bannerNow} in out />
        </Banner>
        <div
          className="box h"
          style={{
            position: 'absolute',
            width: '100%',
            height: '8.5rem',
            left: 0,
            bottom: 0
          }}>
          <Dock
            color='rgba(255,255,255,1)' //005BAB
            emptyColor='rgba(255,255,255,0.6)'  //'rgba(0,90,170,0.5)' 
            onClick={num => {
              this.setState({
                bannerNow: num
              })
            }}
            num={this.state.bannerNow}
            w={0.85}
            count={this.count}
          />
        </div>
        {pc ? (
          <div
            className="h jc ac"
            style={{
              position: 'absolute',
              width: '3.5rem',
              height: '100%',
              left: '2rem',
              top: 0
            }}>
            <CpBannerNextButton onClick={this.lastBannerNum} type="left" />
          </div>
        ) : null}
        {pc ? (
          <div
            className="h jc ac"
            style={{
              position: 'absolute',
              width: '3.5rem',
              height: '100%',
              right: '2rem',
              top: 0
            }}>
            <CpBannerNextButton onClick={this.nextBannerNum} type="right" />
          </div>
        ) : null}
      </div>
    )
  }
}
module.exports = Comp

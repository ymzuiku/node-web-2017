let React = require('react')
let Banner = require('../../../comp/Banner')
let CpBannerNextButton = require('./CpBannerNextButton')
let Banner1 = require('./CpBanner1.js')
let Banner2 = require('./CpBanner2.js')
let Banner3 = require('./CpBanner3.js')
let Dock = require('../../../comp/Dock')

let Comp = ({ style }) => <div />
Comp = class _Comp extends React.PureComponent {
  count = 3
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc(),
      bannerNow: 0,
    }
  }
  componentDidMount() {
    this.unso = window.q.vmpc(this)
  }
  componentWillUnmount() {
    this.unso()
  }
  getBannerTrueNum = (num) => {
    if (num > this.count - 1) {
      num = 0
    } else if (num < 0) {
      num = this.count-1
    }
    return num
  }
  nextBannerNum = () => { 
    let num = this.getBannerTrueNum(this.state.bannerNow + 1)
    this.setState({
      bannerNow:num
    })
  }
  lastBannerNum = () => {
    let num = this.getBannerTrueNum(this.state.bannerNow - 1)
    this.setState({
      bannerNow:num
    })
  }
  render() {
    let { pc } = this.state
    let ih = 335
    if (pc === 1) {
      ih=430
    } else if (pc === 2) {
      ih=550
    }
    return (
      <div style={{ width: '100%', height: ih }}>
        <Banner 
          num={this.state.bannerNow}  
          onChange={(num) => {
            this.setState({
              bannerNow:num
            })
        }}  
          autoScrollTime={50000000000}
          infinite={true}
          style={{ width: '100%', height: '100%' }}>
          <Banner1 num={0} now={this.state.bannerNow} in out />
          <Banner2 num={1} now={this.state.bannerNow} in out />
          <Banner3 num={2} now={this.state.bannerNow} in out />
        </Banner>
        <div style={{
          flexDirection:'row',
          position: 'absolute',
          justifyContent:'center',
          width: '100%', height: pc ? 40 : 32,
          left: 0,
          bottom: 0,
        }}>
          <Dock onClick={(num) => {
            this.setState({
              bannerNow:num
            })
          }} num={this.state.bannerNow} w={20} count={this.count}></Dock>
        </div>
        {pc ? <div style={{
          position: 'absolute',
          width:50, height:'100%',
          left: 20,
          justifyContent:'center',
          top:0,
        }}>
          <CpBannerNextButton onClick={this.lastBannerNum} type='left'></CpBannerNextButton>
        </div>:null}
        {pc?<div style={{
          position: 'absolute',
          width: 50, height: '100%',
          right: 20,
          justifyContent:'center',
          top:0,
        }}>
          <CpBannerNextButton onClick={this.nextBannerNum} type='right'></CpBannerNextButton>
        </div>:null}
      </div>
    )
  }
}
module.exports = Comp

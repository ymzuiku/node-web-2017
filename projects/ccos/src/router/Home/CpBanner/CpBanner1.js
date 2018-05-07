let React = require('react')
let { Link } = require('react-router-dom')
let Icon = require('../../../comp/Icon')
let { Motion, spring } = require('react-motion')
let CpArrowButton = require('./CpArrowButton')
let colors = require('../../../model/colors')

let Comp = ({ num, style }) => <div />
Comp = class _Comp extends React.PureComponent {
  isNow = false
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc(),
      backgroundSize: 1,
      infoSize: 1,
      iconY: 100,
      titleY: 150,
      buttonY: 200,
    }

    if (this.props.num === 0) {
      setTimeout(() => { this.in() }, 200)
    }
  }
  componentDidMount() {
    this.unso = window.q.vmpc(this)
  }
  componentWillUnmount() {
    this.unso()
  }
  componentWillReceiveProps(props) {
    if (this.props.num === props.now) {
      this.in()
    } else {
      this.out()
    }
    return props
  }
  in = () => {
    if (this.isNow) return
    this.isNow = true
    this.setState({
      backgroundSize: 1.15,
      infoSize: 1,
      iconY: 0,
      titleY: 0,
      buttonY: 0,
    })
  }
  out = () => {
    if (!this.isNow) return
    this.isNow = false
    this.setState({
      backgroundSize: 1,
      infoSize: 1,
      iconY: 100,
      titleY: 150,
      buttonY: 200,
    })
  }
  render() {
    let { pc } = this.state
    let motSty = {}
    if (!window.low) {
      motSty = {
        // backgroundSize: spring(this.state.backgroundSize, {stiffness:120}),
        infoSize: spring(this.state.infoSize, { stiffness: 150, damping: 27 }),
        iconY: spring(this.state.iconY, { stiffness: 200 }),
        titleY: spring(this.state.titleY, { stiffness: 170 }),
        buttonY: spring(this.state.buttonY, { stiffness: 120 }),
      }
    }
    return (
      <Motion style={motSty}>
        {mot => (
          <div style={{ overflow: 'hidden', width: '100%', height: '100%' }}>
            <div
              style={{
                transform: `scale(${mot.backgroundSize}, ${mot.backgroundSize})`,
                width: '100%',
                height: '100%',
                backgroundColor: colors.white2,
                backgroundImage: `url(./pic/banner1.jpg)`,
                backgroundSize: `cover`,
                backgroundPosition: `50% 50%`
              }}
            />
            <div
              style={{ width: '100%', height: '100%', top: '-100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ height: 20 }} />
              <div style={{
                transform: `translate(0px, ${mot.titleY}px)`,
                width: pc ? 240 : 180, height: 100,
                backgroundImage: `url(./logo/logo.png)`,
              }} ></div>
              <p style={{ marginTop: 15, transform: `translate(0px, ${mot.titleY}px)`, fontSize: this.state.pc ? 40 : 24, color: '#fff', fontWeight: 600, textShadow: '0 2px 2px rgba(0, 0, 0, 0.15)', }}>
              宫颈癌预防专业网站
              </p>
              <CpArrowButton to='#/nav/newbanner1/' style={{ transform: `translate(0%, ${mot.buttonY}px)`, marginTop: 15, width: '70%', maxWidth: 450 }}>了解详情</CpArrowButton>
              <div style={{ height: '2rem' }} />
            </div>
          </div>
        )}
      </Motion>
    )
  }
}
module.exports = Comp

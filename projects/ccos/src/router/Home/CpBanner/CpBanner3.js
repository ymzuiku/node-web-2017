let React = require('react')
let { Link } = require('react-router-dom')
let Icon = require('../../../comp/Icon')
let { Motion, spring } = require('react-motion')
let CpArrowButton = require('./CpArrowButton')
let colors = require('../../../model/colors')

let Comp = ({num, style }) => <div />
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
      buttonY:0,
    })
  }
  out=()=>{
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
    let motSty = {}
    if (!window.low) {
      motSty = {
      // backgroundSize: spring(this.state.backgroundSize, {stiffness:120}),
      infoSize: spring(this.state.infoSize, {stiffness:150,damping:27}),
      iconY: spring(this.state.iconY, {stiffness:200}),
      titleY: spring(this.state.titleY, {stiffness:170}),
      buttonY:spring(this.state.buttonY, {stiffness:120}),
      }
    }
    return (
      <Motion style={motSty}>
        {mot => (
          <div style={{overflow:'hidden', width: '100%', height: '100%' }}>
            <div
              style={{
                transform:`scale(${mot.backgroundSize}, ${mot.backgroundSize})`,
                width: '100%',
                height: '100%',
                backgroundColor:colors.white2,
                backgroundImage: `url(./pic/banner3.jpg)`,
                backgroundSize: `cover`,
                backgroundPosition: `50% 50%`
              }}
            />
            <div
              style={{ width: '100%', height: '100%', left: 0, top: '-100%', justifyContent:'center', alignItems:'center' }}>
              <div style={{ height: '2rem' }} />
              <p style={{ transform:`translate(0%, ${mot.titleY}px)`,fontSize: this.state.pc?40:22, color: '#fff', fontWeight: 600,textShadow:'0 0.2rem 0.2rem rgba(0, 0, 0, 0.15)', }}>
              如何降低区域人群的HPV发病率？
              </p>
              <CpArrowButton to='#/nav/newbanner3/' style={{transform:`translate(0%, ${mot.buttonY}px)`, width: '70%', maxWidth:450 }}>了解HPV大规模人群筛查</CpArrowButton>
              <div style={{ height: '2rem' }} />
            </div>
          </div>
        )}
      </Motion>
    )
  }
}
module.exports = Comp

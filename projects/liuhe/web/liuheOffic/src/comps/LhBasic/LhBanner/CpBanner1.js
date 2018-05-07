let React = require('react')
let { Link } = require('react-router-dom')
let _ = require('ym-react-cli')
let Icon = require('../../basic/Icon')
let { Motion, spring } = require('react-motion')
let CpArrowButton = require('../../CpBasic/CpArrowButton')
let colors = require('../../CpBasic/colors.js')

let Comp = ({num, style }) => <div />
Comp = class _Comp extends React.PureComponent {
  isNow = false
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc,
      backgroundSize: 1,
      infoSize: 1,
      iconY: 100,
      titleY: 150,
      buttonY: 200,
    }
    _.vmpc(this)
    
    if (this.props.num === 0) {
      setTimeout(() => { this.in() }, 200)  
    }
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
                backgroundImage: `url(./pic/banner1.jpg)`,
                backgroundSize: `cover`,
                backgroundPosition: `50% 50%`
              }}
            />
            <div className='' style={{
              top:'-100%',
              height: '100%',
              width:'100%',
            }} >
              <div className='h ac h-100 ff fw400 fs10' style={{
                top:'91%',
                width: '100%',
                height: '9%',
                color: '#fff',
                paddingLeft: '10%',
                fontSize:'1.1rem',
              backgroundColor:'rgba(88,88,88,0.6)'  
              }} >
              banner标题  
              </div>  
            </div>
          </div>
        )}
      </Motion>
    )
  }
}
module.exports = Comp

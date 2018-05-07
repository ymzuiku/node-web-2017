let React = require('react')
let { Motion, spring } = require('react-motion')
if (window.low) {
  spring = function(v, d) {
    return v
  }
}

let id = 0
let Comp = ({ anime, w, h, pc, box, onChange, type, style, show,colorHeight,color, }) => <div />
Comp = class _Comp extends React.PureComponent {
  unso = () => {}
  constructor(props) {
    super(props)
    id += 1
    this.id = 'plan' + id
    let { show = false, anime = true } = this.props
    this.state = {
      pc: window.pc(),
      show: show,
      display: show
    }
    if (!anime) {
      spring = function(v, d) {
        return v
      }
    }
  }
  componentDidMount() {
    if (window.q) {
      this.unso = window.q.vmpc(this)
    }
  }
  componentWillUnmount() {
    this.unso()
    this.setState({
      show: false,
      display: false
    })
    document.body.style.overflow = 'auto'
  }
  componentWillReceiveProps(props) {
    if (props !== this.props) {
      if (props.show) {
        this.show()
      } else {
        this.unShow()
      }
    }
    return props
  }
  unShow = () => {
    if (this.state.show) {
      document.body.style.overflow = 'auto'
      this.setState({
        show: false
      })
      setTimeout(() => {
        this.setState({
          display: false
        })
      }, 400)
      if (this.props.onChange) {
        this.props.onChange(false)
      }
    }
  }
  show = () => {
    if (!this.state.show) {
      document.body.style.overflow = 'hidden'
      this.setState(
        {
          display: true
        },
        () => {
          this.setState({
            show: true
          })
        }
      )
      if (this.props.onChange) {
        this.props.onChange(true)
      }
    }
  }
  changeShow = () => {
    if (this.state.show === false) {
      this.show()
    } else {
      this.unShow()
    }
  }

  renderPhone = () => {
    let { show, display } = this.state
    let { h = 440, box, style, type } = this.props
    return (
      <Motion key={this.id} style={{ y: spring(show ? 0 : h + 2) }}>
        {mot => (
          <div>
            <div
              style={{
                zIndex: 200,
                position: 'fixed',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundColor: `rgba(0,0,0,${show ? 0.333 : 0})`
              }}
              onClick={this.unShow}
            />
            <div
              style={{
                zIndex: 250,
                bottom: 0,
                left: 0,
                overflow: 'hidden',
                position: 'fixed',
                backgroundColor: '#f8f8f8',
                ...style,
                height: h,
                width: '100%',
                transform: `translate(0px, ${mot.y}px)`
              }}>
              {box}
            </div>
          </div>
        )}
      </Motion>
    )
  }
  renderPC = () => {
    let { show, display } = this.state
    let { w, h = 300, style = {}, color = '#FA9199', box, type,colorHeight=7 } = this.props
    h = type === 'down' ? h : 300
    h = show === true ? h : 500
    style = {
      width: '50%', height: '50%',
      minWidth:400,
      ...style
    }
    // let sw = Number(style.width.split('%').join(''))
    // let sh = Number(style.height.split('%').join(''))
    return (
      <Motion
        style={{
          r: show ? spring(0, { stiffness: 140 }) : 100,
          y: show ? spring(0, { stiffness: 170 }) : h
        }}>
        {mot => (
          <div>
            <div
              style={{
                display:show?null:'none',
                zIndex: 200,
                position: 'fixed',
                left: '0',
                top: '0',
                width: '100%',
                height: '100%',
                backgroundColor: `rgba(0,0,0,${show?0.2:0})`,
                transform: 'translateZ(20px)',
              }}
              onClick={this.unShow}
            />
            <div style={{
               position: 'fixed',
               zIndex: 300,
               left: '0',
               top: '0',
               width: '100%',
               height: '100%',
               justifyContent:'center',
               alignItems:'center',
               pointerEvents:'none'
            }} >
            <div
              style={{
                pointerEvents:'auto',
                zIndex: 999,
                borderRadius: 5,
                overflow: 'hidden',
                width: style.width || '100%',
                maxWidth:style.width || 600,
                height: style.height || 600,
                backgroundColor: '#fff',
                // boxShadow: `0 10rem 30rem rgba(0, 0, 40, ${show ? 0.15 : 0})`,
                ...style,
                backfaceVisibility: 'hidden',
                transform: `perspective(2000px) translateZ(200px) translate(0px, ${mot.y}px) rotateY(${mot.r}deg)`,
                perspectiveOrigin: '50% 50%'
              }}>
              {/* <div style={{ position: 'absolute',zIndex:260, left: 0, top: 0, height: colorHeight, width: '100%', backgroundColor: color }} /> */}
              {box}
            </div>
            </div>
          </div>
        )}
      </Motion>
    )
  }
  render() {
    let { pc, display, show } = this.state
    let { children } = this.props
    if (this.props.pc !== undefined) {
      pc = this.props.pc
    }
    return (
      <div>
        {display ? (pc > 0 ? this.renderPC() : this.renderPhone()) : null}
        <div onClick={this.changeShow}>{children}</div>
      </div>
    )
  }
}
module.exports = Comp

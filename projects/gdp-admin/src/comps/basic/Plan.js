let React = require('react')
let _ = require('ym-react-cli')

let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }

let id = 0
let Comp = ({ w, h, pc, big, box, onChange, type, style, show }) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    id += 1
    this.id = 'plan' + id
    this.state = {
      pc: window.pc || 0,
      show: this.props.show ? true : false,
      display: this.props.show ? true : false
    }
    _.looker.listen('pc', pc => {
      this.setState({
        pc: pc
      })
    })
  }
  componentWillReceiveProps(props) {
    if (props !== this.props) {
      if (props.show) {
        this.setShow()
      } else {
        this.setUnShow()
      }
    }
    return props
  }
  setUnShow = () => {
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
  setShow = () => {
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
      this.setShow()
    } else {
      this.setUnShow()
    }
  }
  renderPhone = () => {
    let { show, display } = this.state
    let { h = 30, box, style, type } = this.props
    return (
      <Motion style={{ y: spring(show ? 0 : h + 2), opa: spring(show ? 1 : 0) }}>
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
                backgroundColor: `rgba(0,0,0,${0.333 * mot.opa})`
              }}
              onClick={this.setUnShow}
            />
            <div
              onClick={this.setShow}
              style={{
                zIndex: 250,
                bottom: 0,
                left: 0,
                position: 'fixed',
                height: '30rem',
                backgroundColor: '#f8f8f8',
                ...style,
                width: '100%',
                transform: `translate(0rem, ${mot.y}rem)`
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
    let { w, h = 10, style, box, type, pc, big } = this.props
    h = type === 'down' ? h : 10
    h = show === true ? h : 50

    return (
      <Motion
        style={{
          r: show ? spring(0, { stiffness: 140 }) : spring(100, { stiffness: 120 }),
          y: show ? spring(0,{ stiffness: 170 }) : spring(h, { stiffness: 120 }),
          opa: spring(show ? 1 : 0,{stiffness:170}),
        }}>
        {mot => (
          <div>
            <div
              style={{
                zIndex: 200,
                position: 'fixed',
                left: '0',
                top: '0',
                width: '100%',
                height: '100%',
                backgroundColor: `rgba(0,0,0,${0.15 * mot.opa})`,
                transform:'translateZ(20px)'
              }}
              onClick={this.setUnShow}
            />
            <div
              style={{
                zIndex: 250,
                position: 'fixed',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                left: big ? '10%' : '25%',
                width: big ? '80%' : '50%',
                top: big ? '25%' : '25%',
                height: big ? '50%' : '50%',
                backgroundColor: '#fff',
                boxShadow: window.low?null:`0 10rem 30rem rgba(0, 0, 40, ${show ? 0.15 : 0})`,
                ...style,
                backfaceVisibility: 'hidden',
                transform: `perspective(2000px) translateZ(200px) translate(0rem, ${mot.y}rem) rotateY(${mot.r}deg)`,
                perspectiveOrigin: '50% 50%',
              }}>
              {box}
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

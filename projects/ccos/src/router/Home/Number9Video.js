let React = require('react')
let colors = require('../../model/colors')
let { ac, so } = require('../../model/api')
let Button = require('../../comp/Button')
let { Motion, spring } = require('react-motion')


let Comp = ({ style }) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc(),
      mouseIn: false
    }
  }
  componentDidMount() {
    this.unso = so.subscribe(() => {
      this.setState({
        pc: so.getState().ui.pc
      })
    })
  }
  componentWillUnmount() {
    this.unso()
  }
  mouseIn = () => {
    this.setState({
      mouseIn: true
    })
  }
  mouseOut = () => {
    this.setState({
      mouseIn: false
    })
  }
  render() {
    let { pc, mouseIn } = this.state
    if (!pc) {
      return <div></div>
    }
    return (
      <div style={{ width: '100%', }} >
        <Motion style={{ big: spring(mouseIn ? 1.1 : 1), y: mouseIn ? spring(40) : spring(30) }} >
          {mot => <div style={{ width: '100%', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}  >
            <Button to='/ccos/video/hpvvideo' vin={this.mouseIn} vout={this.mouseOut} style={{
              justifyContent: 'center', alignItems: 'center',
              zIndex: 2,
              width: '100%',
              marginLeft: 20,
              marginRight: 20,
              marginTop: 40,
              marginBottom: 60,
              maxWidth: 900,
              height: 500,
              backgroundImage: `url(./pic/video.jpg)`,
            }}  >
              <div style={{ justifyContent: 'center', alignItems: 'center' }} >
                <div style={{
                  transform: `scale(${mot.big}, ${mot.big})`,
                  width: 120, height: 120,
                  backgroundImage: `url(icon/play.png)`,
                }} ></div>
                <div style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 400 }} >自取样技术介绍</div>
              </div>
            </Button>
            <div style={{
              zIndex: 1,
              position: 'absolute',
              width: '100%',
              maxWidth: '84rem',
              height: 420,
              transform: `translate(0px, ${mot.y}px) scale(${1.2 * mot.big}, ${1.2 * mot.big})`,
              backgroundImage: `url(./pic/video_shadow.png)`,
            }}  ></div>

          </div>
          }
        </Motion>
      </div>
    )
  }
}
module.exports = Comp
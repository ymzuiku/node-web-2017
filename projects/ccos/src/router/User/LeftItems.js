let React = require('react')
let userItems = require('../../model/userItems')
let colors = require('../../model/colors')
let { ac, so } = require('../../model/api')
let Button = require('../../comp/Button')
let Icon = require('../../comp/Icon')
let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      now: window.location.href.indexOf(this.props.to) > 0
    }
  }
  componentDidMount() {
    if (window.location.href.indexOf(this.props.to) > 0) {
      so.dispatch(ac.ui({ userLeftItemNow: this.props.num })) 
    }
    this.unSo = so.subscribe(() => {
      this.setState({
        now: so.getState().ui.userLeftItemNow === this.props.num
      })  
    })
  }
  componentWillUnmount() {
    this.unSo()
  }
  click = () => {
    so.dispatch(ac.ui({ userLeftItemNow: this.props.num }))
  }
  render() {
    let { label, icon, to } = this.props
    if (label === 1) {
      return <div style={{ height: 5, backgroundColor: colors.white2 }} />
    }
    let { now } = this.state
    let ih = 60
    return (
      <Button
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: ih,
          boxShadow: `0 1px 0px ${colors.white2}`,
          marginBottom: '1px',
          fontSize:15,
          backgroundColor: colors.white1
        }}
        to={'#' + to}
        onClick={this.click}>
        <Motion style={{
          x:now?spring(1, {damping:10}):spring(0,{damping:12,stiffness:200})
        }} >  
          {mot=><div style={{
          position:'absolute',
          width: 7,
          height:'100%',
          left: 0,
          transformOrigin:'0% 50%',
          background: colors.blue1,
          transform:`scale(${mot.x}, 1)`
        }} ></div>}
        </Motion>
        <Icon
          imgs={icon}
          num={now ? 1 : 0}
          style={{
            marginLeft: 20,
            marginRight: 12,
            width: 40,
            height: '100%'
          }}
        />
        <p style={{ color: colors.black2, fontWeight: now ? 400 : 300 }}>{label}</p>
      </Button>
    )
  }
}

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      titles: userItems(so.getState().ui.userItems)
    }
  }
  componentDidMount = () => {
    this.unso = so.subscribe(() => {
      this.setState({
        titles: userItems(so.getState().ui.userItems)
      })
    })
  }
  componentWillUnmount = () => {
    this.unso()
  }
  render() {
    let { titles } = this.state
    return (
      <div style={{ width: 230 }}>
        {titles.map((v, i) => {
          return <Item key={'leftItem'+i} num={i} {...v} />
        })}
      </div>
    )
  }
}

module.exports = Comp

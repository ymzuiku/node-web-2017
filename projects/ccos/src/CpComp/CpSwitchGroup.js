let React = require('react')
let {ac, so} = require('../model/api')
let colors = require('../model/colors')
let Button = require('../comp/Button')
let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }


class Box extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    let { now, children, count } = this.props
      return (
        <Motion style={{now:spring(now)}} >
          {mot => <div style={{marginTop: -20,}} >
        <div style={{
          left: 6+100/count*mot.now+'%',
          width: 60, height: 60,
          backgroundImage: `url(./icon/arrow_dot.png)`,
        }} ></div>
        <div style={{
          flexGrow: 1,
          margin: '0px 20px',
          marginTop: '-1px',
          height: '100%',
          padding:15,
          backgroundColor: colors.white2
        }}>
          {children}
        </div>
      </div>}
        </Motion>
      )
  }
}


class Item extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isNow: this.props.now === this.props.num,
      bgColor:'rgba(229,229,229,1)',
      mouseIn:false,
    }
  }
  componentWillReceiveProps(props) {
    if (props !== this.props) {
      this.setState({
        isNow: props.now === props.num
      })
    }
    return props
  }
  mouseIn = () => {
    this.setState({
      bgColor:'rgba(220,220,245,1)',
    })
   }
  mouseOut = () => { 
    this.setState({
      bgColor:'rgba(230,230,230,1)',
    })
  }
  click = () => {
    let { onClick } = this.props
    so.dispatch(ac.ui({carTabNumber:this.props.num}))
    if (onClick) {
      onClick(this.props.num)
    }
  }
  render() {
    let { color = colors.blue1, title, now, num, children, ...rest } = this.props
    let isNow = num===now
    return (
      <Motion style={{ full: spring(isNow? 1 : 0, {stiffness:isNow?200:300})}} >
        {mot => (
          <Button vin={this.mouseIn} vout={this.mouseOut} onClick={this.click} style={{ flexGrow:1, }}>
            <div style={{ margin:'0px 20px', maxWidth:180, backgroundColor: this.state.bgColor,  height: 12 }} >
              <div style={{width:'100%', height:'100%',backgroundColor:color,transform:`scale(${mot.full}, 1)`, transformOrigin:'0 0'}} ></div>
            </div>
            <div style={{ marginLeft: '22px', marginTop: 10, fontSize:15, fontWeight:isNow?400:300}} >{title}</div>
          </Button>
        )}
      </Motion>
    )
  }
}

let CpSwitchGroup = ({data,onChange, style }) => <div />
CpSwitchGroup = class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      now:this.props.num,
    }
  }
  itemClick = (num) => {
    this.setState({
      now:num
    })
    let { onChange } = this.props
    if (onChange) {
      onChange(num)
    }
  }
  render() {
    let { data = [],children, count } = this.props
    return (
      <div >
        <div style={{flexDirection:'row'}} >
        {data.map((v, i) => {
            return <Item key={'CpSwitchGroupItem'+i} {...v} num={i} now={this.state.now} onClick={this.itemClick}></Item>
        })}
        </div>
        <Box now={this.state.now} count={count} >{children[this.state.now]}</Box>
      </div>
    )
  }
}
module.exports = CpSwitchGroup


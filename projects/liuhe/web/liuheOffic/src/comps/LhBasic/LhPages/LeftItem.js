let React = require('react')
let Button = require('../../basic/Button')
let _ = require('ym-react-cli')
let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }


class SubItem extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      vin: false,
      now: this.props.now,
    }
    if (this.props.now) {
      window.serveChangeRightData(this.props.data)
    }
    this.looker = _.looker.listen('leftItemSuItemCancelNow', (callback) => {
      this.setState({
        now:false
      },callback)
    })
  }
  vin = () => {
    this.setState({
      vin:true
    })
   }
  vout = () => {
    this.setState({
      vin:false
    })
  }
  click = () => {
    _.looker.trigger('leftItemSuItemCancelNow', () => {
      this.setState({
        now:true
      })
    })
    window.serveChangeRightData(this.props.data)
  }
  render() {
    let { onClick, style, ...rest } = this.props
    let { now, vin } = this.state
    let bg = vin ? 'rgba(0,70,140,0.1)' : '#fff'
    bg = now?'#005bab':bg
    return <Button style={{
          fontSize: '1.0rem',
          fontWeight: 400,
          marginTop: '0.5rem',
          marginLeft: '13%',
          marginRight:'2rem',
          borderRadius:'5rem',
          padding: '0.2rem',
          paddingLeft:'0.5rem',
          backgroundColor:bg,
          color:now?'#fff':'#000000',
          ...style 
    }} mouseIn={this.vin} mouseOut={this.vout} onClick={this.click} {...rest}>
    </Button>
  }
}

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc:window.pc,
      open: this.props.open,
      select:this.props.open?0: -1,
    }
    _.vmpc(this)
  }
  componentWillReceiveProps(props) {
    if (props !== this.props) {
      this.setState({
        open: props.open,
        select: this.props.open?0: -1,
      })
    }
    return props
  }
  changeOpen = () => {
    this.setState({
      open:!this.state.open
    })
  }
  renderSubItem = () => {
    if (!this.state.open) return
    let { data } = this.props
    let { select } = this.state
    let titles = []
    let tips = []
    for (let i = 0, len = data.data.length; i < len; i++) {
      let ele = data.data[i]
      if (ele.tip) {
        tips.push(ele)
      } else {
        titles.push(ele)
      }
    }
    return <div>
      {tips.map((v, i) => { 
        return <div style={{
          fontSize: '0.8rem',
          fontWeight: 400,
          marginTop: '0.5rem',
          marginLeft:'12%',
          color:'#666',
        }} >{v.tip}</div>
      })}
      {titles.map((v, i) => { 
        return <SubItem data={v} now={select === i} onClick={() => {
          this.setState()
        }} >{v.title}</SubItem>
      })}
    </div>
  }
  render() {
    let { data } = this.props
    let {open,pc} = this.state
    return (
      <div className='' style={{width:pc?'13rem':'7rem',}} >
        <Button className='h ac jsb' style={{
          marginTop: '0.6rem',
          marginLeft: '12%',
          width:'100%',
        }} onClick={this.changeOpen} >
          <div style={{
            fontWeight: 400,
            fontSize:'1.2rem',
        }} >{data.title}</div>  
          <Motion style={{z:spring(open?0:135)}}>
           {mot=><div style={{
          width: '1.2rem', height: '1.2rem',
          backgroundImage: `url(./icon2/close.png)`,
          backgroundPosition: `50% 50%`,
          marginRight:'2rem',
          transform:`rotateZ(${mot.z}deg)`,
           }} ></div>} 
         </Motion>
        </Button>
        {this.renderSubItem()}
        <div style={{height:'1px', backgroundColor:'#D9D9D9', width:'100%',marginTop:'0.6rem'}} ></div>
      </div>
    )
  }
}
module.exports = Comp
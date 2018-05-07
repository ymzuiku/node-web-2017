let React = require('react')
let colors = require('../model/colors')

let key = 0

let Comp = ({ icon,onFocus,onBlur, style,disabled, placeholder,onChange,value,  }) => <div></div>
Comp = class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    key += 1
    this.key = key
    this.state = {
      border: '1px solid rgba(0,0,0,0.16)',
      pc:window.pc()
    }
    this.unso = window.q.vmpc(this)
  }
  componentWillUnmount() {
    this.unso()
  }
  focus = (e) => { 
    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
    this.setState({
      border:`1px solid ${colors.blue2}`,
    })
  }
  blur = (e) => {
    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
    this.setState({
      border:'1px solid rgba(0,0,0,0.16)',
    })
  }
  render() {
    let {id, icon='./icon/line-phone.png',onChange,value,disabled, style,placeholder='请输入', ...rest } = this.props
    let { border, text,pc } = this.state
    return (
      <div  style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        border: disabled?null:border,
        borderRadius: 3,
        height: 44,
        width: pc?'100%':'100%',
        maxWidth:440,
        ...style
      }} {...rest} >
        <div style={{
          marginLeft: 10,
          minWidth:30,
          width: 30, height: 30,
          backgroundImage: `url(${icon})`,
        }} ></div>
        <input disabled={disabled} id={id} key={this.key} onChange={onChange} value={value} onFocus={this.focus} onBlur={this.blur} placeholder={placeholder} type="text" style={{
          padding: 6,
          width: '100%',
          height:'100%',
          border: '0px solid rgba(0,0,0,0)',
          backgroundColor: 'rgba(0,0,0,0)',
          fontSize: 15,
          fontWeight:300,
        }} />
      </div>
    )
  }
}
module.exports = Comp
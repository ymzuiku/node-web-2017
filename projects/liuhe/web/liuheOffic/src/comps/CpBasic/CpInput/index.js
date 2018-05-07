let React = require('react')
let _ = require('ym-react-cli')
let colors = require('../colors')

let key = 0

let Comp = ({ icon,onFocus,onBlur, style,disabled, placeholder,onChange,value,  }) => <div></div>
Comp = class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    key += 1
    this.key = key
    this.state = {
      border: '1px solid rgba(0,0,0,0.16)',
    }
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
    let { border, text } = this.state
    return (
      <div className='box h js' style={{
        border: disabled?null:border,
        borderRadius: '0.4rem',
        height: '4rem',
        width: '100%',
        maxWidth:'40rem',
        ...style
      }} {...rest} >
        <div style={{
          marginLeft: '0.5rem',
          minWidth:'2.5rem',
          width: '2.5rem', height: '2.5rem',
          backgroundImage: `url(${icon})`,
          backgroundSize: `cover`,
          backgroundPosition: `50% 50%`
        }} ></div>
        <input disabled={disabled} id={id} key={this.key} onChange={onChange} value={value} onFocus={this.focus} onBlur={this.blur} placeholder={placeholder} type="text" style={{
          padding: '0.5rem',
          width: '100%',
          height:'100%',
          border: '0px solid rgba(0,0,0,0)',
          backgroundColor: 'rgba(0,0,0,0)',
          fontSize: '1.4rem',
          fontWeight: 300,
        }} />
      </div>
    )
  }
}
module.exports = Comp
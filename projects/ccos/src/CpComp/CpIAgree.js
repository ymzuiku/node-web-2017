let React = require('react')
let colors = require('../model/colors')

let Comp = ({leftText,url, onChange})=><div></div>
Comp = class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    let h = 30  
    let {onChange, url, leftText='我同意'} = this.props
    return (
      <div  style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        height: h, width: '100%', maxWidth: 440, color: colors.black2, fontSize: 15
      }}>
        <input onChange={onChange} className='checkbox'  type="checkbox" style={{top:'0.2rem', transform:`scale(1.2, 1.2)`}} />
        <span style={{ marginLeft: '0.5rem' }} >{leftText}</span> <span className='btn' onClick={() => { 
          window.location.href = url
        }} style={{fontSize:15, textDecoration:'underline', }}>
          {this.props.children}
        </span>
      </div>
    )
  }
}
module.exports = Comp
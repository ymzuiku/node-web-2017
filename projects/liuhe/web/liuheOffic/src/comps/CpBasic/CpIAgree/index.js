let React = require('react')
let colors = require('../../CpBasic/colors')

let Comp = ({url, onChange})=><div></div>
Comp = class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    let h = '4rem'
    let {onChange, url} = this.props
    return (
      <div className='box h js' style={{height:h,width:'100%', maxWidth:'40rem', color:colors.black2,fontSize:'1.4rem'}}>
        <input onChange={onChange} className='checkbox' type="checkbox" style={{top:'0.2rem', transform:`scale(1.2, 1.2)`}} />
        <span style={{marginLeft:'0.5rem'}} >我同意</span> <span className='btn' onClick={() => { 
          window.href(url)
        }} style={{ textDecoration:'underline',height: '100%',lineHeight:h }}>
          {this.props.children}
        </span>
      </div>
    )
  }
}
module.exports = Comp
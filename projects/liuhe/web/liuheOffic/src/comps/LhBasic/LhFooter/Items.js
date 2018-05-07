let React = require('react')
let _ = require('ym-react-cli')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc:window.pc
    }
    _.vmpc(this)
  }
  render() {
    let {pc} = this.state
    let { data } = this.props
    if (!data.data) {
      data.data = []
    }
    let last = data.title === '联系我们'
    return (
      <div className={!pc?'v c12':(last?'v c6':'v c3')} >
        <div style={{textAlign:'left', fontWeight:400, fontSize:'1.1rem', color:'4D4D4D', marginBottom:'0.7rem', marginTop:pc?'0rem':'2rem'}} >{data.title}</div>
        {data.data.map((v, i) => { 
          return <a href={v.to} style={{marginTop:pc?'0.2rem':'1rem',color:'#666666', fontWeight:400, fontSize:'1rem'}} >{v.title}</a>
        })}
      </div>
    )
  }
}
module.exports = Comp
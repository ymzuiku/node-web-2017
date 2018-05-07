let React = require('react')
let _ = require('ym-react-cli')
let LeftItem = require('./LeftItem')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc,
      ih: window.ih,
    }
    _.vmpc(this)
  }
  render() {
    let { pc, ih } = this.state
    let { data } =this.props
    return (
      <div
        style={{
          width: pc?'14rem':'7rem',
        }}
      >
        {data.map((v, i) => {
          return <LeftItem data={v} open={i===0} ></LeftItem>
        })}
      </div>
    )
  }
}
module.exports = Comp

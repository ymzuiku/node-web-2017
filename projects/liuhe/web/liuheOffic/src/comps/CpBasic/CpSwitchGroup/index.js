let React = require('react')
let _ = require('ym-react-cli')
let Item = require('./Item')
let Box = require('./Box')

let Comp = ({data,onChange, style }) => <div />
Comp = class _Comp extends React.PureComponent {
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
    let { data = [],children } = this.props
    return (
      <div style={{width:'100%', height:'100%',}} >
        <div className='box h' >
        {data.map((v, i) => {
            return <Item {...v} num={i} now={this.state.now} onClick={this.itemClick}></Item>
        })}
        </div>
        <Box now={this.state.now} >{children[this.state.now]}</Box>
      </div>
    )
  }
}
module.exports = Comp
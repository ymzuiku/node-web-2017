let React = require('react')
let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }

let Comp = ({ onClick, color, selected, level, num, data, style }) => <div />
Comp = class _Comp extends React.Component {
  click = () => {
    let { onClick, color, level, num, data } = this.props
    // 把记录的数据层级，编号，数据都返回到onClick中
    if (onClick) {
      onClick(level, num, data)
    }
  }
  render() {
    let { selected } = this.props

    return (
      <div  
        onClick={this.click}
        style={{
          // justifyContent: 'center',
          // alignItems:'center',
          cursor: 'pointer',
          height: 44,
          // flexGrow:1,
        }}>
        <div
          style={{
            borderRadius: 44,
            backgroundColor: selected ? 'rgba(5,5,20,0.05)' : 'rgba(0,0,0,0)'
          }}
        />
        <p
          style={{
            lineHeight: '44px',
            fontSize: 15,
            fontWeight: selected ? 500 : 300,
            color:selected?'#000':'#555',
            ...this.props.style
          }}>
          {this.props.children}
        </p>
      </div>
    )
  }
}
module.exports = Comp

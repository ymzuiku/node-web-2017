let React = require('react')

let Comp = ({ onClick, color, level, selected, style }) => <div />
Comp = class _Comp extends React.Component {
  click = () => {
    let { onClick, level } = this.props
    if (onClick) {
      onClick(level)
    }
  }
  render() {
    // textDecoration:'underline',
    let { selected, style, color } = this.props
    return (
      <div
        onClick={this.click}
        style={{margin:'0px 10px', justifyContent:'center',  cursor: 'pointer', height: '100%', minWidth: 40,flexDirection:'row' }}>
        <div
          style={{
            justifyContent: 'center',
            alignItems:'center',
            fontSize: 15,
            textAlign: 'center',
            color: selected ? color : '#444',
            fontWeight: selected ? 500 : 400,
            ...style
          }}>
          {this.props.children}
        </div>
        <div
          style={{
            position: 'absolute',
            left: '10%',
            bottom:0,
            width: '80%',
            height:3,
            backgroundColor: selected ? color : 'rgba(0,0,0,0)'
          }}>
        </div>
      </div>
    )
  }
}
module.exports = Comp

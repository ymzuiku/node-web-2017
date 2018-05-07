let React = require('react')

let Comp = ({ onClick, color, level, selected, style }) => <div />
Comp = class _Comp extends React.PureComponent {
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
        style={{ cursor: 'pointer', height: '100%', minWidth: '4rem' }}>
        <p
          className='v jc'  
          style={{
            fontSize: '1.5rem',
            marginLeft: '1.5rem',
            lineHeight: '100%',
            width:'100%',
            height:'100%',
            textAlign: 'center',
            color: selected ? color : '#444',
            fontWeight: selected ? 400 : 500,
            ...style
          }}>
          {this.props.children}
        </p>
        <div
          style={{
            position: 'absolute',
            left: '55%',
            bottom:0,
            height: '0.4rem',
            width: '2rem',
            backgroundColor: selected ? color : 'rgba(0,0,0,0)'
          }}>
        </div>
      </div>
    )
  }
}
module.exports = Comp

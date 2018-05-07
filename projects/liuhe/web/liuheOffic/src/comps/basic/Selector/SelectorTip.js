let React = require('react')

let btn = {
  cursor: 'pointer'
}

let Comp = ({ onClick, color, level, selected, style }) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
  }
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
          style={{
            top:'1rem',
            fontSize: '1.5rem',
            marginLeft: '1.5rem',
            lineHeight:'100%',
            textAlign: 'center',
            color: selected ? color : '#444',
            fontWeight: selected ? 400 : 500,
            height: '100%',
            ...style
          }}>
          {this.props.children}
        </p>
        <div
          style={{
            position: 'absolute',
            left: '48%',
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

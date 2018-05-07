let React = require('react')
let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }

let Comp = ({ onClick, color, selected, level, num, data, style }) => <div />
Comp = class _Comp extends React.PureComponent {
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
      <Motion style={{ wp: spring(selected ? 1 : 0.5, { stiffness: 200 }) }}>
        {mot => (
          <div
            onClick={this.click}
            className="box v"
            style={{
              cursor: 'pointer',
              height: '4rem',
              width: '78%',
              left: '11%'
            }}>
            <div
              style={{
                height: '100%',
                width: 100 * mot.wp + '%',
                borderRadius: '3rem',
                backgroundColor: selected ? 'rgba(5,5,20,0.05)' : 'rgba(0,0,0,0)'
              }}
            />
            <p
              style={{
                position: 'absolute',
                height: '100%',
                lineHeight:'4rem',
                fontSize: '1.4rem',
                ...this.props.style
              }}>
              {this.props.children}
            </p>
          </div>
        )}
      </Motion>
    )
  }
}
module.exports = Comp

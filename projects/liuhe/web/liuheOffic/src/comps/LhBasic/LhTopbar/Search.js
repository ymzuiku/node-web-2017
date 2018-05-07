let React = require('react')
let _ =require('ym-react-cli')
class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      text:'',
    }
  }
  render() {
    let { className } = this.props
    return (
      <div className={'h ac h-100 ' + className}>
        <input
          onChange={(e) => { _.vmInput(this, 'text', e) }}  
          value={this.state.text}
          style={{
            width: '100%',
            marginLeft: '1.5rem',
            padding: 0,
            height: '1.5rem',
            paddingLeft: '1rem',
            paddingRight:'1rem',
            backgroundColor: 'rgba(0,0,0,0)',
            borderRadius: '5rem'
          }}
        />
        <div style={{
          width: '2.3rem', height: '2.3rem',
          backgroundImage: `url(./icon/icon-04.png)`,
          backgroundPosition: `50% 50%`,
          opacity:this.state.text.length < 8?1:0,
          transform:`translate(-1.7rem, 0rem)`
        }} ></div>
      </div>
    )
  }
}
module.exports = Comp

let React = require('react')
let Button = require('./Button')

let Comp = ({ num = 0, min = 0, max = 0, onChang = () => {}, style }) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      num: this.props.num || 1,
      min: this.props.min || 0,
      max: this.props.max || 999
    }
  }
  render() {
    let bor = {
      width: '3rem',
      height: '100%',
      border: '1px solid rgba(0,0,0,0.2)'
    }
    let r = '0.5rem'
    return (
      <div className="box h" style={{ height: '3rem' }}>
        <Button
          onClick={() => {
            this.change(-1)
          }}
          className="box"
          style={{
            ...bor,
            backgroundColor: 'rgba(0,0,0,0.01)',
            borderRadius: `${r} 0rem 0rem ${r}`,
            fontSize: '1.5rem',
          }}>
          -
        </Button>
        <input
          type="tel"  
          className="box"
          onChange={this.onChange}
          value={this.state.num}
          onBlur={this.onBlur}
          style={{
            ...bor,
            width: '4.3rem',
            padding: 0,
            textAlign:'center',
            fontSize: '1.4rem',
            fontWeight: 400,
            borderRadius: '0rem',
            backgroundColor:'#fff',
            borderLeft: '0px solid rgba(0,0,0,0.1)',
            borderRight: '0px solid rgba(0,0,0,0.1)'
          }} />
          
        <Button
          onClick={() => {
            this.change(1)
          }}
          className="box"
          style={{
            ...bor,
            fontSize: '1.5rem',
            backgroundColor: 'rgba(0,0,0,0.01)',
            borderRadius: `0rem ${r} ${r} 0rem`
          }}>
          +
        </Button>
      </div>
    )
  }
  onChange = (e) => {
    let value = Number(e.target.value) || 0
    if (value > this.state.max) {
      value = this.state.max
    }
    this.setState({
      num:value
    })
  }
  onBlur = (e) => {
    let value = Number(e.target.value) || this.state.min
    if (value > this.state.max) {
      value = this.state.max
    } else if(value < this.state.min ){
        value = this.state.min
    }
    this.setState({
      num:value
    }, () => {
      if (this.props.onChang) {
        this.props.onChang(this.state.num)
      }
    })
  }
  change = v => {
    let newNum = this.state.num + v
    if (newNum < this.state.min) {
      newNum = this.state.min
    } else if (newNum > this.state.max) {
      newNum = this.state.max
    }
    this.setState(
      {
        num: newNum
      },
      () => {
        if (this.props.onChang) {
          this.props.onChang(this.state.num)
        }
      }
    )
  }
}
module.exports =  Comp

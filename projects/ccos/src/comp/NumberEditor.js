let React = require('react')
let Button = require('./Button')

let Comp = ({disabled, num = 0, min = 0, max = 0, onChang = () => {}, style }) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      num: this.props.num || 1,
      min: this.props.min || 0,
      max: this.props.max || 9999999
    }
  }
  componentWillReceiveProps(props) {
    if (props !== this.props) {
      this.setState({
        num:props.num
      })
    }
    return props
  }
  render() {
    let bor = {
      width: 42,
      height: '100%',
      border: '1px solid rgba(0,0,0,0.2)'
    }
    let r = 3
    let ih = 40
    return (
      <div  style={{flexDirection:'row', alignItems:'center', justifyContent:'center',  height: ih, pointerEvents:this.props.disabled?'none':null,
      opacity:this.props.disabled?0.66:1, }}>
        <Button
          onClick={() => {
            this.change(-1)
          }}
          style={{
            justifyContent: 'center',
            alignItems:'center',
            ...bor,
            opacity:this.props.disabled?0.5:1,
            backgroundColor: 'rgba(0,0,0,0.01)',
            borderRadius: `${r}px 0px 0px ${r}px`,
            fontSize: 18,
          }}>
          -
        </Button>
        <input
          type="tel"  
          onChange={this.onChange}
          value={this.state.num}
          onBlur={this.onBlur}
          style={{
            ...bor,
            justifyContent: 'center',
            alignItems:'center',
            width: 50,
            padding: 0,
            margin: 0,
            height:ih-2,
            textAlign:'center',
            fontSize: 17,
            fontWeight: 400,
            borderRadius: 0,
            backgroundColor:'#fff',
            borderLeft: '0px solid rgba(0,0,0,0.1)',
            borderRight: '0px solid rgba(0,0,0,0.1)'
          }} />
          
        <Button
          onClick={() => {
            this.change(1)
          }}
          style={{
            ...bor,
            justifyContent: 'center',
            alignItems:'center',
            opacity:this.props.disabled?0.5:1,
            fontSize: 18,
            backgroundColor: 'rgba(0,0,0,0.01)',
            borderRadius: `0px ${r}px ${r}px 0px`
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

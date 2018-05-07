let React = require('react')
let Button = require('../../basic/Button')
let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      show:true
    }
  }
  close = () => {
    this.setState({
      show:false
    })
  }
  moveUp = () => {
    window.scrollTo(0,0)
  }
  render() {
    let { show } = this.state
    return (
      <Motion style={{x:spring(show?0:5)}} >
        {mot=><div className='v ac'  style={{
        position: 'fixed', zIndex: 4,
        right: 0, top: '42%',
        backgroundColor: '#fff',
        width:'4rem',
        border: '1px solid #9BBFDE',
        borderRadius: '1rem 0rem 0rem 1rem',
        borderRight: 'none',
        paddingTop: '0.7rem',
        paddingBottom: '0.7rem',
        transform:`translate(${mot.x}rem, 0rem)`
      }} >
        <Button onClick={this.moveUp} className='v ac' to=''>
        <div style={{
          width: '1.5rem', height: '1.5rem',
          backgroundImage: `url(./icon/icon-07.png)`,
          backgroundPosition: `50% 50%`
          }} ></div>
        <div style={{ color: '#005BAB', fontSize: '0.8rem', fontWeight: 400 }} >返回顶部</div>  
        </Button>
        <div style={{height:'0.5rem'}} ></div>
        <div className='' style={{ height: '1px', backgroundColor: '#9BBFDE', width: '100%' }} ></div>
        <div style={{height:'0.5rem'}} ></div>
        <Button className='v ac' to='' >
        <div style={{
          width: '2.5rem', height: '2.5rem',
          backgroundImage: `url(./icon/icon-08.png)`,
          backgroundPosition: `50% 50%`
          }} ></div>
        <div style={{ color: '#005BAB', fontSize: '0.8rem', fontWeight: 400 }} >在线客服</div> 
        </Button>
        <div style={{height:'0.5rem'}} ></div>
        <div className='' style={{ height: '1px', backgroundColor: '#9BBFDE', width: '100%' }} ></div>
        <div style={{height:'0.5rem'}} ></div>
        <Button onClick={this.close} style={{
          width: '2rem', height: '2rem',
          backgroundImage: `url(./icon/icon-27.png)`,
          backgroundPosition: `50% 50%`
          }} ></Button>
      </div>}
      </Motion>
    )
  }
}
module.exports = Comp
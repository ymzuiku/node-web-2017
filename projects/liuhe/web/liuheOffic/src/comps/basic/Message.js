let React = require('react')
let { Motion, spring } = require('react-motion')
if (window.low) {
  spring = function(v, d) {
    return v
  }
}
// Array.prototype.remove = function(dx) {
//   if (isNaN(dx) || dx > this.length) {
//     return false
//   }
//   for (var i = 0, n = 0; i < this.length; i++) {
//     if (this[i] != this[dx]) {
//       this[n++] = this[i]
//     }
//   }
//   this.length -= 1
// }
class Comp extends React.Component {
  time = 0
  constructor(props) {
    super(props)
    this.state = {
      anim:[],
      icons: [],
      infos: [],
      events: [],
      types:[],
    }
    
    window.msg = ({type, info, event, icon})=>{
      if (!event) event = function () { }
      if (!icon) icon = './icon/closew.png'
      if (!type) type = 'tip'
      let icons = this.state.icons
      icons.push(icon)
      let infos = this.state.infos
      infos.push(info)
      let events = this.state.events
      events.push(event)
      let anim = this.state.anim
      anim.push(0)
      let types = this.state.types
      types.push(type)
      this.setState({
        infos: infos,
        icons: icons,
        events: events,
        types:types,
        anim:anim,
      })
    }  
    window.msginfo = function (str) {
      window.msg({type:'info',info:str})
    }
    window.msgtip = function (str) {
      window.msg({type:'tip',info:str})
    }
    window.msgerr = function (str) {
      window.msg({type:'err',info:str})
    }
    window.msgwarn = function (str) {
      window.msg({type:'warn',info:str})
    }
    window.msgg = function (str) {
      try {
        str = JSON.stringify(str)
      } catch (err) {
        
      }
      window.msg({type:'info',info:str})
    }
  }
  renderItem = () => {
    let { icons, infos, events,anim,types} = this.state
    let items = []
    for (let i = 0, len = infos.length; i < len; i++) {
      let event = () => {
        if (this.state.events[i]) {
          this.state.events[i]()
        }
        let _anim = anim
        _anim[i] = 45
        this.setState({
          anim:_anim
        })
        setTimeout(() => {
          icons.splice(i,1)
          infos.splice(i,1)
          events.splice(i,1)
          anim.splice(i,1)
          this.setState({
            icons: icons,
            infos: infos,
            events: events,
            anim:anim,
          })
        },infos.length>1?0:400)
      }
      let bg = '#3E4858'
      let type = types[i]
      if (type === 'info') {
        bg = '#20A755'
      }
      else if (type === 'warn') {
        bg = '#3E4858'
      }
      else if (type === 'err') {
        bg = '#F45864'
      }
      else if (type === 'tip') {
        bg = '#3C84EB'
      }
      items.push(<Motion defaultStyle={{x: 45 }}
        style={{  x: spring(infos.length>1?0:anim[i])}}>
        {mot => <div
          onClick={event}
          className="btn box h jsb"
          style={{
            backgroundColor: bg,
            color: '#fff',
            width: '27rem',
            padding: '1.5rem',
            height: '100%',
            opacity: 0.93,
            minHeight: '2rem',
            marginTop: '1rem',
            borderRadius: '0.66rem',
            transform: `translate(${mot.x}rem, 0rem)`
          }}>
          {infos[i]}
          <div
            style={{
              width: '2rem',
              height: '2rem',
              left:'rem',
              backgroundImage: `url(${icons[i]})`,
              backgroundSize: `cover`,
              backgroundPosition: `50% 50%`
            }}
          />
        </div>}
        </Motion>
      )
    }

    clearInterval(this.clean)
    this.clean = setInterval(() => {
      let _anim = anim
      _anim[0] = 45
      this.setState({
        anim:_anim
      })
      setTimeout(() => {
        icons.splice(0,1)
        infos.splice(0,1)
        events.splice(0,1)
        anim.splice(0,1)
        this.setState({
          icons: icons,
          infos: infos,
          events: events,
          anim:anim,
        }, () => {
          if (infos.length === 0) {
            clearInterval(this.clean)
          }
        })
      },400)
    }, window.msgtime || 4000)
    
    return <div>
      {items}
    </div>
  }
  render() {
    let {num } = this.state
    return (
      <div
        style={{
          maxWidth: '30rem',
          width: '100%',
          right: '1rem',
          top: '0.5rem',
          position: 'fixed',
          zIndex: 50,
          ...this.props.style
        }}>
        {this.renderItem(num)}
      </div>
    )
  }
}
module.exports = Comp

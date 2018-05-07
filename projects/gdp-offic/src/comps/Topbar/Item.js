import React from 'react'
import { Link } from 'react-router-dom'
import { action, store } from '../../model/store'
import { Motion, spring } from 'react-motion'

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      select: window.location.href.indexOf(this.props.fixTo) > 0,
      vin:false,
    }
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        select: store.getState().changeSelecte.indexOf(this.props.fixTo) > 0
      })
    })
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  click = () => {
    store.dispatch(action.changeSelecte(this.props.to))
  }
  vin = () => {
    this.setState({
      vin:true
    })
   }
  vout = () => {
    this.setState({
      vin:false,
    })
  }
  render() {
    let { to,icon, className, children, info, ...rest } = this.props
    let { select,vin } = this.state
    return (
      <Motion style={{ x: spring(select ? 1 : 0),opa:spring(vin||select?1:0.66),bgOpa:spring(vin?0.05:0) }}>
        {mot => (
          <Link
            to={to}
            onMouseEnter={this.vin}
            onMouseLeave={this.vout}
            className=" col-xs-2 "
            onClick={this.click}
            style={{background:`rgba(118,130,76,${mot.bgOpa})`, textDecoration: 'none',height:88,opacity:mot.opa}}
            {...rest}>
            <div className="row " style={{height:'100%', textAlign:'center'}} >
              <div className="row " style={{ color: '#555555', fontSize: 15 }}>  
                <div className='' style={{marginTop:27}} >{children}</div>
                <div className='' style={{
                  position: 'absolute',
                  right: 4,
                  top: 5+27,
                  width:12, height:12,
                  backgroundImage: `url(${icon})`,
                  backgroundSize:'contain',
                  backgroundPosition: `50% 50%`
                }} ></div>
              </div>
              <div className="row " style={{ color: '#C0C0C0', fontSize: 12 }}>
                {info}
              </div>
              <div
                className="row"
                style={{
                  position:'absolute',
                  height: 2,
                  width: '40%',
                  bottom: 0,
                  left:'45%',
                  backgroundColor: '#35B69E',
                  transform: `scale(${mot.x}, 1)`
                }}
              />
            </div>
          </Link>
        )}
      </Motion>
    )
  }
}

export default Comp

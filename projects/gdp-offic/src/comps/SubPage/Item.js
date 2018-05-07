import React from 'react'
import { Link } from 'react-router-dom'
import { action, store } from '../../model/store'

class Comp extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      vin:false,
    }
  }
  vin = () => {
    this.setState({
      vin:true,
    })
  }
  vout = () => {
    this.setState({
      vin:false,
    })
  }
  click = to => {
    store.dispatch(action.changeSelecte(to))
  }
  render() {
    let { data, now } = this.props
    return (
      <div
        className="row"
        onMouseEnter={this.vin}
        onMouseLeave={this.vout}
        onClick={() => {
            this.click(data.to)
          }}
        style={{
          marginTop: '1px'
        }}>
        <Link
          className="col-12"
          to={data.to}
          style={{
            textDecoration: 'none',
            textAlign: 'center',
            backgroundColor: 'rgba(0,0,0,0)'
          }}>
          <div
            className="col-md-12"
            style={{
              lineHeight: '50px',
              background: now ? '#FAFAFA' : (this.state.vin?'#fafafa':'rgba(0,0,0,0)'),
              boxShadow: '0 1px 0px rgba(0, 0, 0, 0.11)',
              height: '50px',
              color:now ? '#1E947E': this.state.vin?'#1E947E':'#35b69e',
            }}>
            <div className='col-sm-3' style={{
              left: -8,
              top: 14,
              opacity:now?1:0,
              position:'absolute',
              width: 20, height: 20,
              transform:'translate(20px, 0px)',
              backgroundImage: `url(./icon/right_arrow.png)`,
              backgroundSize:'contain',
              backgroundPosition: `50% 50%`,
            }}  ></div>
            <div className="col-sm-12"  >{data.label}</div>
          </div>
        </Link>
      </div>
    )
  }
}

export default Comp

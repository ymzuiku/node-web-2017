import React from 'react'
import {action, store} from '../../model/store'
import { Link, Route } from 'react-router-dom'
import Send from './Send'
import Succeed from './Succeed'

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      href:window.location.href.split('#')[1]
    }
    store.subscribe(() => {
      this.setState({
        href:store.getState().changeSelecte
      })
    })
  }
  render() {
    let {data, banner} = this.props
    return (
      <div style={{
        background:'#FAFAFA',
      }} >
        <div className=" container-fluid ">
          <div className="row">
            <div
              className="col-xs-12"
              style={{
                width: '100%',
                height: 300,
                backgroundImage: `url(./icon/banner5.jpg)`,
                backgroundSize: `cover`,
                backgroundPosition: `50% 50%`
              }}
            />
          </div>
        </div>
        <div className="container" style={{
          transform: 'translate(0, -40px)',
        }} >
          <div className="row">
            <div className='col-xs-1' ></div>
            <div className="col-xs-10" style={{
              background: '#fff',
              minHeight:400
            }} >
              <Route exact path='/join/' component={Send} ></Route>
              <Route exact path='/join/succeed/' component={Succeed} ></Route>
            </div>
            <div className='col-xs-1' ></div>
          </div>
        </div>
      </div>
    )
  }
}
export default Comp

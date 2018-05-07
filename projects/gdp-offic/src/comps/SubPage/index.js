import React from 'react'
import {action, store} from '../../model/store'
import { Link, Route } from 'react-router-dom'
import Item from './Item'


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
                backgroundImage: `url(${banner})`,
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
            <div className="col-xs-2" style={{marginLeft: 10, marginRight:10, background: '#fff', border: '1px solid #dcdcdc',}}>
              {data.map((v, i) => {
                if (v.title) {
                  return <div key={'item' + i} className='row' style={{
                    textAlign: 'center',
                    height:'64px',
                    backgroundColor: '#35B69E',
                    color:'#fff',
                  }} >  
                    <div style={{marginTop:12,fontWeight:500,fontSize:15}} >{v.title}</div>  
                    <div style={{ fontWeight:300,opacity:0.7}} >{v.info}</div>
                  </div>
                } else {
                  return (
                    <Item key={'item'+i} now={this.state.href===v.to} data={v} ></Item>
                  )
                }
              })}
            </div>
            <div className="col-xs-9" style={{
              marginLeft: 10,
              marginRight:20,
              background: '#fff',
              minHeight:400
            }} >
              {data.map((v, i) => {
                return <Route exact path={v.to} component={v.comp} />
              })}  
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Comp

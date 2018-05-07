import React from 'react'
import Item from './Item'

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="container-fluid" style={{
        zIndex: 50,
        background:'#fff'
      }} >
        <div className="container">
          <div
            className="row "
            style={{ height: 88 }}>
            <div className="col-xs-4 ">
              <img
                src="./icon/logo.png"
                alt=""
                style={{
                  height: 50,
                  marginTop:17,
                }}
              />
            </div>
            <div className="col-xs-8">
              <div className="row">
              <Item  to="/home/" fixTo='home' info='Home'>
                  首页
                </Item>
                <Item icon='./icon/arrow.png' fixTo='introduce'  to="/introduce/page1/" info='introduction' >
                  项目介绍
                </Item>
                <Item icon='./icon/arrow.png' fixTo='look'  to="/look/page1/" info='Main Points' >
                  项目看点
                </Item>
                <Item icon='./icon/arrow.png' fixTo='platform'  to="/platform/page1/" info='Platform' >
                  平台介绍
                </Item>
                <Item to="/join/" fixTo='join' info='Join GDP' >
                  加入GDP
                </Item>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Comp

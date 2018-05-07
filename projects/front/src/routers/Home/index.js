import React from 'react'
import { Button, Col, Row } from 'antd'
import {store,action} from '../../models/api'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  handleClick = ()=>{
     store.dispatch(action.user({token:'newToken'}))
     window.location.href = "#/main/dashboard/apps/"
  }
  render() {
    return <div>
      <Row style={{height:60}}>
      <Col span={4} style={{height:'100%'}} >
        <Row type='flex' justify='center' align='middle' style={{height:'100%'}} >
          <p style={{fontSize:15}} >前端工作平台</p>
        </Row>
      </Col>
      </Row>
      <Row type='flex' justify='center' align='middle' style={{backgroundColor:'#f3f3f3', height:400}}  >
        <Button onClick={this.handleClick} span={10} size='large' >
          模拟登录
        </Button>
      </Row>
    </div>
  }
}

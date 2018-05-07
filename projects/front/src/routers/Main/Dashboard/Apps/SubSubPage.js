import React from 'react'
import { store } from '../../../../models/api'
import Plan from '../../../../comps/Plan'
import { Row, Col, Button } from 'antd'

export default class SubSubPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colors:store.getState().uiConfig.colors
    }
  }
  render() {
    let {colors} = this.state
    return <Plan style={{ backgroundColor: colors.backgroundGary }} >
        <Row gutter={16}  >
          <Col span={24 / 3} style={{ height: 200 }} >
            <Plan>
              hello 子子页面
            </Plan>
          </Col>
          <Col span={24 / 3} ></Col>
          <Col span={24 / 3} ></Col>
        </Row>
      </Plan>
  }
}
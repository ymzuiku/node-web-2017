import React from 'react'
import { store, action } from '../../../../models/api'
import Plan, {colStyle} from '../../../../comps/Plan'
import { Row, Col, Button } from 'antd'
import routersApps from './routersApps'

export default class SubPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colors:store.getState().uiConfig.colors,
      pc:store.getState().ui.pc
    }
  }
  componentDidMount=()=>{
    this.unso = store.subscribe(()=>{
      this.setState({
        pc:store.getState().ui.pc,
      })
    })
  }
  componentWillUnmount=()=>{
    this.unso()
  }
  handleNextPage = () => {
    store.dispatch(action.addBreadcrumb(routersApps.subSubPage))
  }
  render() {
    let {colors, pc} = this.state
    return <Plan style={{ backgroundColor: colors.backgroundGary }} >
        <Row gutter={16}  >
          <Col span={16} style={{...colStyle(pc), height: 200 }} >
            <Plan>
              <Button type='primary' onClick={this.handleNextPage} >切换下下一级页面</Button>
            </Plan>
          </Col>
          <Col span={8} style={{...colStyle(pc), height:200}} >
          <Plan>
              text
            </Plan>
          </Col>
        </Row>
      </Plan>
  }
}
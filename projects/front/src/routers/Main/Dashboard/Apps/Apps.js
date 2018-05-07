import React from 'react'
import { store, action } from '../../../../models/api'
import { Row, Col, Button, Modal,Icon } from 'antd'
import Plan, {colStyle}from '../../../../comps/Plan'
import routersApps from './routersApps'

export default class Apps extends React.Component {
  constructor(props) {
    super(props)
    let sos = store.getState()
    this.state = {
      colors: sos.uiConfig.colors,
      pc:sos.ui.pc,
      modalVisible: false,
    }
  }
  componentDidMount= ()=>{
    // 启用 store 监听
    this.unso = store.subscribe(()=>{
      let sos = store.getState()
      this.setState({
        colors: sos.uiConfig.colors,
        pc:sos.ui.pc,
      })
    })
  }
  componentWillUnmount=()=>{
    // 释放store监听
    this.unso()
  }
  // Modal(弹框)相关的方法
  handelModal = () => {
    this.setState({
      modalVisible: true
    })
  }
  handleModalOk = () => {
    this.setState({
      modalVisible: false
    })
  }
  handleModalCancel = () => {
    this.setState({
      modalVisible: false
    })
  }
  // 切换到下一级别面包屑
  handleNextPage = () => {
    store.dispatch(action.addBreadcrumb(routersApps.subPage))
  }
  render() {
    let { colors,pc } = this.state
    console.log(pc)
    return <Plan style={{ backgroundColor: colors.backgroundGary }} >
      <Row gutter={16} type='flex' >
        <Col span={24} style={{ minWidth: pc?0:'100%', marginBottom: 16, height:'auto'}} >
          <Plan>
            <div><span><Icon type="exclamation-circle-o" />&nbsp;&nbsp;顶部条，一般放置说明区域</span></div>
            <div><span><Icon type="exclamation-circle-o" />&nbsp;&nbsp;顶部条，一般放置说明区域</span></div>
          </Plan>
        </Col>
      </Row>
      <Row gutter={16} type='flex'>
        <Col span={12} style={colStyle(pc)} >
         <Plan>
            <Button type='primary' onClick={this.handleNextPage} >切换下一级页面</Button>
          </Plan>
        </Col>
        <Col span={12} style={colStyle(pc)} >
          <Plan>
            <Button type='primary' onClick={this.handelModal} >弹框</Button>
          </Plan>
        </Col>
      </Row>
      <Modal
        title="弹框"
        visible={this.state.modalVisible}
        onOk={this.handleModalOk}
        onCancel={this.handleModalCancel}
        width='90%'
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Plan>
  }
}


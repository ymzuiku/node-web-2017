import React from 'react'
import {Modal,Switch,Row, Col} from 'antd'
import { store, action } from '../../../../models/api';
export default class ThemeModal extends React.Component {
  constructor(props){
    super(props)
    let sos = store.getState()
    this.state = {
      visible:false,
      isDark:sos.uiConfig.menuState.theme === 'dark'
    }
  }
  componentDidMount=()=>{
    this.unso = store.subscribe(()=>{
      let sos = store.getState()
      this.setState({
        visible:sos.ui.showThemeModal,
        isDark:sos.uiConfig.menuState.theme === 'dark'
      })
    })
  }
  componentWillUnmount = ()=>{
    this.unso()
  }
  handleCancel = ()=>{
    store.dispatch(action.ui({showThemeModal:false}))
  }
  handleOk =()=>{
    store.dispatch(action.ui({showThemeModal:false}))
  }
  handleDark = (checked)=>{
    // this.setState({
    //   isDark:checked
    // })
    let str = checked?'dark':'light'
    store.dispatch(action.changeTheme(str))
  }
  render(){
    return <Modal title='界面设置' onCancel={this.handleCancel} onOk={this.handleOk} visible={this.state.visible} >
      <Row type='flex' justify='space-between' >
        <p>使用Dark样式</p>
        <Switch defaultChecked={this.state.isDark} onChange={this.handleDark} />
      </Row>
    </Modal>
  }
}
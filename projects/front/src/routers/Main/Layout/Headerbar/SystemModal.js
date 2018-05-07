import React from 'react'
import {Modal} from 'antd'
import { store, action } from '../../../../models/api';
export default class SystemModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible:false,
    }
  }
  componentDidMount=()=>{
    this.unso = store.subscribe(()=>{
      let sos = store.getState()
      this.setState({
        visible:sos.ui.showSystemModal
      })
    })
  }
  componentWillUnmount = ()=>{
    this.unso()
  }
  handleCancel = ()=>{
    store.dispatch(action.ui({showSystemModal:false}))
  }
  handleOk =()=>{
    store.dispatch(action.ui({showSystemModal:false}))
  }
  render(){
    return <Modal title='系统设置' onCancel={this.handleCancel} onOk={this.handleOk} visible={this.state.visible} >
      系统设置内容
    </Modal>
  }
}
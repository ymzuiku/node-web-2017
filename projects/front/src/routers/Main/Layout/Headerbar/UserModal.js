import React from 'react'
import {Modal} from 'antd'
import { store, action } from '../../../../models/api';
export default class UserModal extends React.Component {
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
        visible:sos.ui.showUserModal
      })
    })
  }
  componentWillUnmount = ()=>{
    this.unso()
  }
  handleCancel = ()=>{
    store.dispatch(action.ui({showUserModal:false}))
  }
  handleOk =()=>{
    store.dispatch(action.ui({showUserModal:false}))
  }
  render(){
    return <Modal title='个人资料' onCancel={this.handleCancel} onOk={this.handleOk} visible={this.state.visible} >
      个人资料-内容
    </Modal>
  }
}
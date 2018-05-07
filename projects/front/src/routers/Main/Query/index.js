import React from 'react'
import { store } from '../../../models/api'
import {Route} from 'react-router-dom'
import menuData from '../../../models/data/menuData'

export default class Query extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colors:store.getState().uiConfig.colors
    }
  }
  render() {
    let {colors} = this.state
    return <div style={{ width: "100%", height: "100%", backgroundColor:colors.backgroundGary }} >
    Query
    这里写入子路由
    </div>
  }
}
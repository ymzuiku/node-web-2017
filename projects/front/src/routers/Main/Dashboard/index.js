import React from 'react'
import { store } from '../../../models/api'
import {Route} from 'react-router-dom'
import menuData from '../../../models/data/menuData'
import Apps from './Apps'
import Team from './Team'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colors:store.getState().uiConfig.colors
    }
  }
  render() {
    let {colors} = this.state
    return <div style={{ width: "100%", height: "100%", backgroundColor:colors.backgroundGary }} >
      <Route exact path={menuData[0].subMenu[0].to+'*'} component={Apps} ></Route>
      <Route exact path={menuData[0].subMenu[1].to+'*'} component={Team} ></Route>
    </div>
  }
}
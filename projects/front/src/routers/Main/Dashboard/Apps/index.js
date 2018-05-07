import React from 'react'
import { store } from '../../../../models/api'
import { Route,Switch,Redirect } from 'react-router-dom'
import SubPage from './SubPage'
import SubSubPage from './SubSubPage'
import Apps from './Apps'
import Plan from '../../../../comps/Plan'
import routersApps from './routersApps'

export default class AppIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colors: store.getState().uiConfig.colors
    }
  }

  render() {
    let { colors } = this.state
    return <div style={{height:'100%', width:'100%'}} >
    <Switch>
      <Route exact path={routersApps.apps.to} component={Apps} ></Route>
      <Route exact path={routersApps.subPage.to} component={SubPage} ></Route>
      <Route exact path={routersApps.subSubPage.to} component={SubSubPage} ></Route>
    </Switch>
    </div>
  }
}
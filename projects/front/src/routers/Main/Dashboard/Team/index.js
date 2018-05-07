import React from 'react'
import { store } from '../../../../models/api'
import Plan from '../../../../comps/Plan';

export default class TeamIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colors:store.getState().uiConfig.colors
    }
  }
  render() {
    let {colors} = this.state
    return <Plan style={{ width: "100%", height: "100%", backgroundColor:colors.backgroundGary }} >
        团队信息
    </Plan>
  }
}
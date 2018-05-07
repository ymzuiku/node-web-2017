import React from 'react'
import {store} from '../../../models/api'

export default class Footbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colors: store.getState().uiConfig.colors
    }
  }
  render() {
    return <div>
    foot
    </div>
  }
}
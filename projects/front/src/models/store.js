import { createStore } from 'redux'
import langaugeCN from '../models/data/langaugeCN'
import colors from '../models/data/colors'
import stateTree from '../models/data/stateTree'
import { action } from './api';

const SISSTIONKEY = 'front_local_1'
let save = state => {
  state = {
    ...state,
    constant: {
      ...stateTree.constant,
    },
    ui: {
      ...stateTree.ui
    }
  }
  window.localStorage[SISSTIONKEY] = JSON.stringify(state)
}
let load = () => {
  if (window.localStorage[SISSTIONKEY]) {
    if(JSON.parse(window.localStorage[SISSTIONKEY])){
      let lastState = JSON.parse(window.localStorage[SISSTIONKEY])
      return {
        ...stateTree,
        ...lastState
      }
    } else {
      return stateTree
    }
  } else {
    return stateTree
  }
}

let dispatch = (state = stateTree, action) => {
  switch (action.type) {
    case 'save':
      save(state)
      return state
    case 'load':
      state = load()
      return state
    case 'clear':
      state = {
        ...stateTree
      }
      save(state)
      return state
    case 'user':
      state = {
        ...state,
        user: { ...state.user, ...action.data }
      }
      save(state)
      return state
    case 'uiConfig':
      state = {
        ...state,
        uiConfig: { ...state.uiConfig, ...action.data }
      }
      return state
    case 'ui':
      state = {
        ...state,
        ui: { ...state.ui, ...action.data }
      }
      return state
    case 'constant':
      state = {
        ...state,
        constant: { ...state.constant, ...action.data }
      }
      return state
    case 'addBreadcrumb':
      state.ui.breadcrumb.push(action.data)
      state = {
        ...state,
      }
      window.location.href = '#' + action.data.to
      return state
    case 'setDefaultBreadcrumb':
      state.ui.breadcrumb = action.data
      window.location.href = '#' + action.data[0].to      
      state = {
        ...state
      }
      return state
    case 'changeTheme':
      state.uiConfig.colors = colors[action.data]
      state.uiConfig.menuState.theme = action.data
      state = {
        ...state,
      }
      return state
    default:
      return state
  }
}

let store = createStore(dispatch)
window.store = store

export default store
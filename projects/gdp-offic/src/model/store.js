import { createStore } from 'redux'
import action from './action'

let defaultState = { isLogin: false, token: -1,changeSelecte:'/home/' }

let dispatch = (state=defaultState, action) => {
  switch (action.type) {
    case 'clean':
      state = {...defaultState}  
      return state
    case 'save':
      window.localStorage['dps_page'] = JSON.stringify(state)  
      return state
    case 'load':
      state = JSON.parse(window.localStorage['dps_page'])  
      return state
    case 'login':
      return {
        ...state,
        token:action.token,
        isLogin:true
      }  
    case 'changeSelecte':
      return {
        ...state,
        changeSelecte:action.to,
      }  
    default:
      return state  
  }
}

let store = createStore(dispatch)

export {store, action}
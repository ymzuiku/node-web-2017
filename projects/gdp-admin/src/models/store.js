const { createStore } = require('redux')
const action = require('./action')
const api = require('./api')
const defaultState = { actions: 0, token: -1, tokenTime: 0, num: 0 }

const save = function (state) {
  window.localStorage['obs'] = JSON.stringify(state)
}
const load = function () {
  return JSON.parse(window.localStorage['obs']) 
}

const reducer = function(state = defaultState, action) {
  state = {
    actions: state.actions + 1,
    ...state
  }
  window.state = {...state}
  switch (action.type) {
    case 'save':
      save(state)
      return {
        ...state,
      }
    case 'load':
      state = load()
      return state
    case 'clean':
      state = {
        ...defaultState
      }
      return state
    case 'login':
      state = {
          ...state, token: action.token, tokenTime: Date.now(),
      }   
      save(state)
      return state
    case 'add_todu':
      return {
        ...state,
        num: state.num + action.num
      }
    case 'remove_todu':
      return {
        ...state,
        num: 0
      }
    default:
      return state
  }
}
const store = createStore(reducer)
store.getState()
module.exports = {
  so: store,
  ac: action,
  api: api,
}

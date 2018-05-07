var { createStore } = require('redux')

if (!window.pc) {
  window.pc = function () {
    return 0
  }
}

const SISSTIONKEY = 'ccos2_1'
let save = state => {
  state = {
    ...state,
    static: {
      ...defaultState.static,
    },
    ui: {
      ...defaultState.ui
    }
  }
  window.localStorage[SISSTIONKEY] = JSON.stringify(state)
}
let load = () => {
  if (window.localStorage[SISSTIONKEY]){
    return JSON.parse(window.localStorage[SISSTIONKEY])  
  } else {
    return defaultState
  }
}

let defaultState = {
  static: {
    host: 'http://csccponline.cn/ccos/#',
    tel: '95550',
  },
  user: {
    token: '',
    cid:'',
    id: null,
    name: null,
    idcard: null,
    tel: null,
    comname: null,
    comcode: null,
    combossname: null,
    combossid: null,
    comauthority: null,
    status_com: null,
    doctorcode: null,
    doctorhospital: null,
    status_pro: null,
    regtime: null,
    parent: null
  },
  ui: {
    orderInputs: null,
    pc: window.pc(),
    reload:0,
    href: '/home/',
    subTopbarLabel: '',
    userItems: 'defalut',
    openTopbarMenu: false,
    openTopbarSubMenu: -1,
    userLeftItemNow: false,
    navTitle: '详情',
    carTabNumber: 0,
    inputerAlertUnShow:false,
  },
  inputer: {
    token: null,
    projects:[],
  }
}
let dispatch = (state = defaultState, ac) => {
  switch (ac.type) {
    case 'pc':
      state = {
        ...state,
        ui: {
          ...state.ui,
          pc:ac.pc
        }
      }
      return state
    case 'clean':
      state = { ...defaultState }
      save(state)
      return state
    case 'save':
      save(state)
      return state
    case 'load':
      state = load()
      return state
    case 'login':
      state = {
        ...state,
        user: {
          ...state.user,
          ...ac.data
        }
      }
      save(state)
      return state
    case 'href':
      //让页面可以滚动  
      document.documentElement.style.overflow = 'visible'
      document.documentElement.style.height = 'auto'
      document.body.style.overflow = 'visible'
      document.body.style.height = 'auto'
      return {
        ...state,
        ui: {
          ...state.ui,
          href: ac.href
        }
      }
    case 'user':
      state = {
        ...state,
        user: { ...state.user, ...ac.data }
      }
      // com doctor all
      let userType = 'default'
      if (state.user.status_com === 2 && state.user.status_pro !== 2) {
        userType = 'com'
      } else if (state.user.status_com !== 2 && state.user.status_pro === 2){
        userType = 'doctor'
      } else if (state.user.status_com === 2 && state.user.status_pro === 2){
        userType = 'all'
      }
      state = {
        ...state,
        ui:{...state.ui, userItems:userType }
      }
      save(state)
      return state
    case 'ui':
      state = {
        ...state,
        ui: { ...state.ui, ...ac.data }
      }
      return state
    case 'inputer':
      state = {
        ...state,
        inputer: { ...state.inputer, ...ac.data }
      }
      save(state)
      return state
    default:
      return state
  }
}

let store = createStore(dispatch)
window.so = store

module.exports = store

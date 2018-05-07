
let actions = {
  clean: () => {
    return { type: 'clean' }
  },
  save: () => {
    return { type: 'save' }
  },
  load: () => {
    return { type: 'load' }
  },
  login: (token) => {
    return {type:'login', token:token}
  },
  changeSelecte: (to) => {
    return {type:'changeSelecte', to:to}
  }
}

export default actions
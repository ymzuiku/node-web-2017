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
  login: (data = { token: '', cid: '' }) => {
    return { type: 'login', data: data }
  },
  user: (
    data = {
      token: '',
      cid:'',
      id: '',
      name: '',
      idcard: '',
      tel: '',
      comname: '',
      comcode: '',
      combossname: '',
      combossid: '',
      comauthority: '',
      status_com: '',
      doctorcode: '',
      doctorhospital: '',
      status_pro: '',
      regtime: '',
      parent: ''
    }
  ) => {
    return { type: 'user', data: data }
  },
  href: href => {
    return { type: 'href', href: href }
  },
  ui: (
    data = {
      pc: 0,
      reload:0,
      orderInputs:null,
      subTopbarLabel: null,
      userItems: null,
      openTopbarMenu: null,
      openTopbarSubMenu: null,
      userLeftItemNow: false,
      navTitle: '详情',
      carTabNumber: 0,
      inputerAlertUnShow:false,
    }
  ) => {
    return { type: 'ui', data: data }
  },
  inputer: (
    data = {
      token: null,
      projects:[],
    }
  ) => {
    return { type: 'inputer', data: data }
  }
}

module.exports = actions

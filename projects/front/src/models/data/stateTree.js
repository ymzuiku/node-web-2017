import colors from './colors'
import langaugeCN from './langaugeCN'
let stateTree = {
  // 用户数据，保存到服务端
  user: {
    token: null,
    team: null,
  },
  // 保存ui数据，保存到服务端
  uiConfig: {
    colors: colors.dark,
    menuState: {
      onlyOpenOne: true,
      theme: "dark", //dark, light
      mode: "inline"  //inline, vertical
    }
  },
  // 运行时的ui状态
  ui: {
    breadcrumb:[{
      title: '', icon:'', to: ''
    }], 
    pc:0,
    showSystemModal:false,
    showThemeModal:false,
    showUserModal:false,
    langauge: langaugeCN,
  },
  // constant 常量
  constant: {
    host: null,
    dev: 0,
    tel: '999555',
  },
}

export default stateTree
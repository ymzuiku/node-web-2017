import stateTree from '../models/data/stateTree'
let action = {
  save:()=>{
    return {type:'save'}
  },
  load:()=>{
    return {type:'load'}
  },
  clear:()=>{
    return {type:'clear'}
  },
  user: (param = stateTree.user) => {
    return { type: 'user', data:param }
  },
  uiConfig: (param = stateTree.uiConfig) => {
    return {type:'uiConfig', data:param}
  },
  ui: (param = stateTree.ui) => {
    return {type:'ui', data:param}
  },
  constant: (param = stateTree.constant) => {
    return {type:'constant', data:param}
  },
  changeTheme:(param='dark|light')=>{
    return {type:'changeTheme', data:param}
  },
  setDefaultBreadcrumb:(param)=>{
    return {type:'setDefaultBreadcrumb', data:param}
  },
  addBreadcrumb:(param={title:'', to:'', icon:''})=>{
    return {type:'addBreadcrumb', data:{title:'', to:'', icon:'',...param}}
  }
}
window.action = action
export default action
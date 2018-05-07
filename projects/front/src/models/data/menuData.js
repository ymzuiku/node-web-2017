import store from '../store'
let menu = store.getState().ui.langauge.menu
export default [
  {
    title: menu.dashboard.title, 
    to:'/main/dashboard/*',
    icon:'rocket',
    subMenu: [
      { title: menu.dashboard.apps, icon:'appstore-o', to: "/main/dashboard/apps/" },
      { title: menu.dashboard.team, icon:'team', to: "/main/dashboard/team/" },
    ],
  },
  {
    title: menu.systemManage.title, 
    to:'/main/systemManage/*',
    icon:'desktop',
    subMenu: [
      { title: menu.systemManage.basicDic, icon:'solution', to: "/main/systemManage/basicDic/" },
      { title: menu.systemManage.userManage, icon:'user-add', to: "/main/systemManage/userManage/" },
      { title: menu.systemManage.personManage, icon:'skin', to: "/main/systemManage/personManage/" },
      { title: menu.systemManage.produckManage, icon:'layout', to: "/main/systemManage/produckManage/" },
      { title: menu.systemManage.customerManage, icon:'smile-o', to: "/main/systemManage/customerManage/" },
      { title: menu.systemManage.projectManage, icon:'switcher', to: "/main/systemManage/projectManage/" },
      { title: menu.systemManage.templateManage, icon:'file-excel', to: "/main/systemManage/templateManage/" },
      { title: menu.systemManage.createTemplate, icon:'file', to: "/main/systemManage/createTemplate/" },
    ],
  },
  {
    title: menu.reportCenter.title,
    to:'/main/reportCenter/*',
    icon:'inbox',
    subMenu: [
      { title: menu.reportCenter.reportCheck, icon:'edit', to: "/main/reportCenter/reportCheck/" },
      { title: menu.reportCenter.reportDownload, icon:'download', to: "/main/reportCenter/reportDownload/" },
      { title: menu.reportCenter.queryReport, icon:'search', to: "/main/reportCenter/queryReport/" },
    ],
  },
  {
    title: menu.positiveManage.title, 
    to:'/main/positiveManage/*',
    icon:'database',
    subMenu: [
      { title: menu.positiveManage.newbornPositiveManage,icon:'user', to: "/main/positiveManage/newbornPositiveManage/" },
      { title: menu.positiveManage.newbornPositiveCensus,icon:'line-chart', to: "/main/dashpositiveManageboard/newbornPositiveCensus/" },
      { title: menu.positiveManage.antenatalPositiveManage,icon:'bulb', to: "/main/positiveManage/antenatalPositiveManage/" },
      { title: menu.positiveManage.antenatalPositiveManageInsurance,icon:'file-text', to: "/main/positiveManage/antenatalPositiveManageInsurance/" },
      { title: menu.positiveManage.antanatalPositiveCensusInspection,icon:'fork', to: "/main/positiveManage/antanatalPositiveCensusInspection/" },
      { title: menu.positiveManage.antanatalPositiveCensusChromosome,icon:'share-alt', to: "/main/positiveManage/antanatalPositiveCensusChromosome/" },
    ],
  },
  {
    title: menu.scientificServe.title, 
    to:'/main/scientificServe/*',
    icon:'api',
    subMenu: [
      { title: menu.scientificServe.statisticalAnalysis,icon:'bar-chart', to: "/main/scientificServe/statisticalAnalysis/" },
    ],
  },
  {
    title: menu.publicSpirited.title, 
    to:'/main/publicSpirited/*',
    icon:'gift',
    subMenu: [
      { title: menu.publicSpirited.hlaInput,icon:'heart-o', to: "/main/publicSpirited/hlaInput/" },
    ],
  },
  {
    title: menu.query.title, 
    to:'/main/query/*',
    icon:'search',
    subMenu: [
      { title: menu.query.personQuery,icon:'search', to: "/main/query/personQuery/" },
    ],
  },
  {
    title: menu.census.title, 
    to:'/main/census/*',
    icon:'dot-chart',
    subMenu: [
      { title: menu.census.reportCensus,icon:'copy', to: "/main/census/reportCensus/" },
      { title: menu.census.simpleClientCensus,icon:'book', to: "/main/census/simpleClientCensus/" },
      { title: menu.census.simpleRegionCensus,icon:'environment-o', to: "/main/census/simpleRegionCensus/" },
      { title: menu.census.simpleCollectCensus,icon:'inbox', to: "/main/census/simpleCollectCensus/" },
    ],
  }
]
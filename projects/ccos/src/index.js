import registerServiceWorker from './model/registerServiceWorker'
let React = require('react')
let ReactDOM = require('react-dom')
require('./index.css')
require('./model/utils')
let { ac, so, api, dev } = require('./model/api')
let { HashRouter, Route, Redirect, Switch } = require('react-router-dom')
let userItems = require('./model/userItems')

window._temp_clear = function () {
  window._temp_name = null
  window._temp_idcard = null
  window._temp_phone = null
  window._temp_addr = null
  window._temp_ship = null
  window._temp_comname = null
  window._temp_comcode = null
  window._temp_combossid = null
  window._temp_comauthority = null
  window._temp_doctorcode = null
  window._temp_doctorhospital = null
}

let Home = require('./router/Home/Home')
let Car = require('./router/Car/Car')
let User = require('./router/User/User')
let Topbar = require('./router/Topbar/Topbar')
let Msg = require('./comp/Msg')
let Alert = require('./comp/Alert')
let Nav = require('./router/nav/Nav')
let Inputer = require('./router/Inputer/Inputer')

let titles = function (type) {
  return [
    { label: '首页', icon: ['./icon/home-n.png', './icon/home-l.png'], to: '/home/', },
    { label: '购物车', icon: ['./icon/car-n.png', './icon/car-l.png'], to: '/car/', },
    { label: '联系客服', icon: ['./icon/call-n.png', './icon/call-l.png'], to: 'tel:'+so.getState().static.tel, },
    {
      label: '用户中心', icon: so.getState().user.token?['./icon/user-in-n.png', './icon/user-in-l.png']:['./icon/user-n.png', './icon/user-l.png'], to: '/user/', data: userItems(type)
    },
  ]
}

let inputTitle = function (type) {
  return [
    {
      label: '录入员中心', icon: ['./icon/user-n.png', './icon/user-l.png'], to: '/input/', data: [
        {
          label: '操作指南',
          icon: ['./icon/user-normal.png', './icon/user-normal-l.png'],
          to: '/input/learn/'
        },
        {
          label: '录入数据',
          icon: ['./icon/user-normal.png', './icon/user-normal-l.png'],
          to: '/input/data/'
        },
      ]
    }
  ]
}


class App extends React.Component {
  constructor(props) {
    super(props)
    so.dispatch(ac.load())
    if (so.getState().user.token) {
      api.person((res) => {
        // window.msgtip('已自动登录')  
      })
    }
    // this.devTest()
  }
  componentDidMount() { }
  devTest = () => {
    if (!dev) return
    setTimeout(() => {
      if (so.getState().user.status_com === 1) {
        so.dispatch(ac.user({ status_com: 2 }))
      }
      if (so.getState().user.status_pro === 1) {
        so.dispatch(ac.user({ status_pro: 2 }))
      }
    }, 500)
  }
  render() {
    return (
      <div>
        <HashRouter>
          <div>
            <Route exact path="/" render={() => {
              return <Redirect to='/home/' />
            }} />
            <Route exact path="/*" component={Msg} />
            <Route exact path="/*" component={Alert} />
            <Route exact path="/*" render={(props) => {
              if (window.location.href.indexOf('input/') > 0) {
                return <Topbar titles={inputTitle} {...props} />
              } else {
                return <Topbar titles={titles} {...props} />
              }
            }} />
              <Route exact path="/home/*" render={(props) => {
                return <Home {...props} />
              }} />
              <Route exact path="/car/*" render={(props) => {
                return so.getState().user.token ? <Car {...props} /> : <Redirect to='/nav/login/_car_/' />
              }} />
              <Route exact path="/user/*" render={(props) => {
                return so.getState().user.token ? <User {...props} /> : <Redirect to='/nav/login/_user_/' />
              }}  >
              </Route>
              <Route exact path="/nav/*" component={Nav} />
              <Route exact path="/nav/inputer/*" render={(props) => {
                return so.getState().inputer.token ? <Inputer {...props} /> : <Redirect to='/nav/logininputer/_nav_inputer_/' />
              }} />
          </div>
        </HashRouter>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()

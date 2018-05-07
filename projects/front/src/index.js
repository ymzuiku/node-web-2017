import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import registerServiceWorker from './models/registerServiceWorker';
import $ from 'jquery'
import { BrowserRouter,HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import Home from './routers/Home'
import Main from './routers/Main'
import exp from './models/exp'
import { store, action,api} from './models/api'


class App extends React.Component {
  constructor(props) {
    super(props)
    // 读取本地历史记录
    store.dispatch(action.load())
    this.devUtils()
  }
  devUtils = ()=>{
    // 每次都清空本地数据
    store.dispatch(action.clear())
    store.dispatch(action.user({token:'testToken'}))
    // 113 = f2, 重新读取store
    
    exp.keyboard('body', 112, ()=>{
      store.dispatch(action.clear())
    })
  }
  componentDidMount = ()=>{
    exp.pc()
    // api.testGet((res)=>{
    //   console.log(res)
    // })
  }
  render() {
    return (
      <div id='test'  >
        <HashRouter>
          <div>
            <Route exact path="/" render={() => {
              return <Redirect to='/main/' />
            }} />
            <Switch>
              <Route exact path='/home/*' component={Home} ></Route>
              <Route exact path='/main/*' render={(props)=>{
                if (!store.getState().user.token) {
                  return <Redirect to='/home/' />
                } else {
                  return <Main {...props} />
                }
              }}></Route>
            </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

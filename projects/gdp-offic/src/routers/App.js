import React, { Component } from 'react'
import {action, store} from '../model/store'
import { HashRouter, Route } from 'react-router-dom'

import Messign from '../comps/Messign'
import Topbar from '../comps/Topbar'
import Footer from '../comps/Footer'
import Introduce from './Introduce'
import Join from './Join'
import Look from './Look'
import Platform from './Platform'
import Home from './Home'

class App extends Component {
  componentDidMount = () => {
    if (window.location.href.split('#').length > 0) {
      if (window.location.href.split('#')[1] === '/') {
        window.location.href = '#/home/'    
        store.dispatch(action.changeSelecte('/home'))
      }
    }
  }
  render() {
    return (
      <div className="App ">
        <HashRouter>
          <div>
            <Route exact path='/*' component={Topbar} ></Route>
            <Route exact path='/' component={Home} ></Route>
            <Route exact path='/home' component={Home} ></Route>
            <Route exact path='/introduce/*' component={Introduce} ></Route>
            <Route exact path='/look/*' component={Look} ></Route>
            <Route exact path='/platform/*' component={Platform} ></Route>
            <Route exact path='/join/*' component={Join} ></Route>
            <Route exact path='/*' component={Footer} ></Route>
            <Route exact path='/*' component={Messign} ></Route>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;

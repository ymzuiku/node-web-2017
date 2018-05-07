let React = require('react')
let ReactDOM = require('react-dom')
let { HashRouter, Route } = require('react-router-dom')
let _ = require('ym-react-cli')
require('./css/global.css')
require('./css/rem.css')
require('./css/book.css')

let Beian = require('./routers/Beian')
let LhTopbar = require('./comps/LhBasic/LhTopbar')
let Home = require('./routers/Home')
let Prod = require('./routers/Prod')
let Serve = require('./routers/Serve')
let About = require('./routers/About')
let User = require('./routers/User')
let Job = require('./routers/Job')
let Contact = require('./routers/Contact')
let News = require('./routers/News')

class App extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path="/beian" component={Beian} />
          <Route exact path="/" component={Home} />
          <Route exact path="/t/*" component={LhTopbar} />
          <Route exact path="/t/home/" component={Home} />
          <Route exact path="/t/prod/" component={Prod} />
          <Route exact path="/t/prod/serve/" component={Serve} />
          <Route exact path="/t/user/" component={User} />
          <Route exact path="/t/about/job/" component={Job} />
          <Route exact path="/t/about/contact/" component={Contact} />
          <Route exact path="/t/news/" component={News} />
          <Route exact path="/t/about/" component={About} />
        </div>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

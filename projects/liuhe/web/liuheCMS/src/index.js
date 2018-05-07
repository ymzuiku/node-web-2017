let React = require('react')
let ReactDOM = require('react-dom')
let { HashRouter, Route } = require('react-router-dom')
let _ = require('ym-react-cli')
require('./css/global.css')
require('./css/antd.css')
require('./css/virtualized.css')

let Menu = require('./routers/Menu')
let Message = require('./comps/basic/Message')
class App extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <HashRouter >
        <div>
          <Route exact path="/*" component={Menu} />
          <Route exact path="/*" component={Message} />
        </div>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

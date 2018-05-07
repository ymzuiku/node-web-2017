let React = require('react')
let {so,ac} = require('../../model/api')
let LeftItems = require('./LeftItems')
let { Route,Redirect } = require('react-router-dom')
let UserInfo = require('./UserInfo')
let Serve = require('./Serve')
let Com = require('./Com')
let Census = require('./Census')
let Reports = require('./Reports')
let Project = require('./Project/Project')
let Doctor = require('./Doctor')
let UpCase = require('./UpCase')
let Logout = require('./Logout')

class Comp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc(),
    }
  }
  componentDidMount() {
    this.unso = window.q.vmpc(this)
    so.dispatch(ac.href(window.location.href))
    window.scrollTo(0,0)
  }
  componentWillUnmount() {
    this.unso()
  }
  renderPages = () => {
    return (
      <div style={{ minHeight: '100vh', width:'100%' }} >
        <Route exact path="/user/" render={() => {
          return <Redirect to='/user/userinfo/' />
      }} />
        <Route exact path="/user/userinfo/" component={UserInfo} />
        <Route exact path="/user/serve/" component={Serve} />
        <Route exact path="/user/com/" component={Com} />
        <Route exact path="/user/project/" render={(props) => {
          return so.getState().user.status_com === '' ? <Redirect to='/user/com/' />: <Project {...props} />
        }} />
        <Route exact path="/user/doctor/" component={Doctor} />
        <Route exact path="/user/upcase/" render={(props) => {
          return so.getState().user.status_pro === '' ? <Redirect to='/user/doctor/' />: <UpCase {...props} />
        }} />
        <Route exact path="/user/census/" render={(props) => {
          return so.getState().user.status_com === '' ? <Redirect to='/user/com/' />: <Census {...props} />
        }} />
        <Route exact path="/user/reports/" render={(props) => {
          return so.getState().user.status_com === '' ? <Redirect to='/user/com/' />: <Reports {...props} />
        }} />
        <Route exact path="/user/logout/" component={Logout} />
      </div>
    )
  }
  renderPc = () => {
    return (
      <div
        style={{
          flexDirection: 'row'
        }}>
        <LeftItems />
        <div
          style={{minWidth:'50vh',flexGrow:1, minHeight: '100vh', boxShadow: '-1px 0px 0px rgba(0, 0, 0, 0.11)' }}>
          {this.renderPages()}
        </div>
      </div>
    )
  }
  renderPhone = () => {
    return (
      <div
        style={{
          flexDirection: 'column'
        }}>
        <div style={{ minHeight: '100vh' }}>{this.renderPages()}</div>
      </div>
    )
  }
  render() {
    let { pc } = this.state
    return <div>{pc ? this.renderPc() : this.renderPhone()}</div>
  }
}
module.exports = Comp

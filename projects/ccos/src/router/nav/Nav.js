let React = require('react')
let { Route,Redirect } = require('react-router-dom')
let {so,ac} = require('../../model/api')

let BuyComOrder = require('./BuyComOrder/BuyComOrder')
let BuyUserOrder = require('./BuyUserOrder/BuyUserOrder')
let ComUserLogin = require('./ComUserLogin')
let GiveUserLogin = require('./GiveUserLogin')
let Login = require('./Login')
let LoginInputer = require('./LoginInputer')
let Serve = require('./Serve/Serve')
let Hospital = require('./Serve/Hospital')
let News1 = require('./News1')
let News2 = require('./News2')
let News3 = require('./News3')
let NewsBanner1 = require('./NewsBanner1')
let NewsBanner2 = require('./NewsBanner2')
let NewsBanner3 = require('./NewsBanner3')
let IAgreeCom = require('./IAgreeCom')
let IAgreeComBuy = require('./IAgreeComBuy')
let IAgreeDoctor = require('./IAgreeDoctor')
let IAgreeUser = require('./IAgreeUser')
let StatusPay = require('./StatusPay')
let StatusGive = require('./StatusGive')
let StatusCom = require('./StatusCom')
let CreateProject = require('./CreateProject')
let CreateProjectStatus = require('./CreateProjectStatus')
let ProjectInfo = require('./ProjectInfo')
let UpCaseUserInfo = require('./UpCaseUserInfo')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    window.scrollTo(0,0)
  }
  componentWillMount() {
    so.dispatch(ac.href(window.location.href))
  }
  render() {
    return (
      <div>
        <Route exact path='/nav/login/:to/*' component={Login} ></Route>
        <Route exact path='/nav/logininputer/:to/*' component={LoginInputer} ></Route>
        <Route exact path='/nav/serve/:sid/' render={(props) => {
          if (!so.getState().user.token) {
            return <Redirect to='/nav/login/_home_/' />
          }
          return <Serve {...props} />
        }}  ></Route>
        <Route exact path='/nav/hospital/' render={(props) => {
          if (!so.getState().user.token) {
            return <Redirect to='/nav/login/_home_/' />
          }
          return <Hospital {...props} />
        }}  ></Route>
        <Route exact path='/nav/buycomorder/:id/:oid/:lock/' render={(props) => {
          if (!so.getState().user.token) {
            return <Redirect to='/nav/login/_home_/' />
          }
          return <BuyComOrder {...props} />
        }}  ></Route>
        <Route exact path='/nav/buyuserorder/:id/:oid/:type/:lock/' render={(props) => {
          if (!so.getState().user.token) {
            return <Redirect to={'/nav/login/_home_/'} />
          } 
          return <BuyUserOrder {...props} />
        }}  ></Route>
        {/* comuserlogin */}
        <Route exact path='/nav/lcom/:pid/:proid' render={(props) => {
          let params = props.match.params
          let pid = params.pid
          let proid = params.proid
          let to = `/nav/login/_nav_lcom_${pid}_${proid}_/`
          if (!so.getState().user.token) {
            return <Redirect to={to} />
          } 
          return <ComUserLogin {...props} />
        }} ></Route>
        <Route exact path='/nav/luser/:sid/' component={GiveUserLogin} ></Route>
        <Route exact path='/nav/news1/' component={News1} ></Route>
        <Route exact path='/nav/news2/' component={News2} ></Route>
        <Route exact path='/nav/news3/' component={News3} ></Route>
        <Route exact path='/nav/newbanner1/' component={NewsBanner1} ></Route>
        <Route exact path='/nav/newbanner2/' component={NewsBanner2} ></Route>
        <Route exact path='/nav/newbanner3/' component={NewsBanner3} ></Route>
        <Route exact path='/nav/iagreeuser/' component={IAgreeUser} ></Route>
        <Route exact path='/nav/iagreecom/' component={IAgreeCom} ></Route>
        <Route exact path='/nav/iagreecombuy/' component={IAgreeComBuy} ></Route>
        <Route exact path='/nav/statuspay/:status/' component={StatusPay} ></Route>
        <Route exact path='/nav/statusgive/:status/' component={StatusGive} ></Route>
        <Route exact path='/nav/statuscom/:status/' component={StatusCom} ></Route>
        <Route exact path='/nav/iagreedoctor/' component={IAgreeDoctor} ></Route>
        <Route exact path='/nav/createproject/:pid' component={CreateProject} ></Route>
        <Route exact path='/nav/createprojectstatus/' component={CreateProjectStatus} ></Route>
        <Route exact path='/nav/projectinfo/:pid/:proid/' component={ProjectInfo} ></Route>
        <Route exact path='/nav/upcaseuserinfo/:id/' component={UpCaseUserInfo} ></Route>
      </div>
    )
  }
}
module.exports = Comp
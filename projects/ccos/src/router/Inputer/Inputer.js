let React = require('react')
let { Route, Redirect } = require('react-router-dom')

let InputerAdd =require('./InputerAdd')
let InputerLearn =require('./InputerLearn')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Route path='/nav/inputer/' render={(props) => {
          return <Redirect to='/nav/inputer/add/' />
        }} ></Route>
        <Route path='/nav/inputer/add/' component={InputerAdd} ></Route>
        <Route path='/nav/inputer/learn/' component={InputerLearn} ></Route>
      </div>
    )
  }
  renderList = () => {
    let {tel} = this.state
    return (
      <div>
      </div>
    )
  }
}
module.exports = Comp

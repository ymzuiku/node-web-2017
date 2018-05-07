let React = require('react')
let { Link } = require('react-router-dom')
let {ac, so} = require('../models/store')

// const state = reducer(1, addTodo('20'))

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      num:so.getState().num
    }
    so.dispatch(ac.addTodo(30))
    
    this.timer = setInterval(() => {
      so.dispatch(ac.addTodo(30))
    },150)
    so.subscribe(() => {
      this.setState({
        num:so.getState().num
      })
    })
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  
  render() {
    return (
      <div>
        home:{this.state.num}
        <Link to='/' >go home</Link>
      </div>
    )
  }
}
module.exports = Comp
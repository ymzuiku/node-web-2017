let React = require('react')
let { ac, so } = require('../../model/api')
let CpBanner = require('./CpBanner')
let QuickEnters = require('./QuickEnters')
let Producks = require('./Producks')
let News = require('./News')
let Number9Video = require('./Number9Video')
let Features = require('./Features')
let Footer = require('./Footer')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc()
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0)
    this.unso = window.q.vmpc(this)
  }
  componentWillMount() {
    so.dispatch(ac.href(window.location.href))
  }
  componentWillUnmount() {
    this.unso()
  }
  render() {
    return (
      <div style={{ height: 80,alignItems: 'center' }}>
        <CpBanner></CpBanner>
        <QuickEnters></QuickEnters>
        <Producks></Producks>
        <News></News>
        <Number9Video></Number9Video>
        <Features></Features>
        <Footer></Footer>
      </div>
    )
  }
}
module.exports = Comp

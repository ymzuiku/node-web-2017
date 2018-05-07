let React = require('react')
let LhSubBanner = require('../comps/LhBasic/LhSubBanner')
let serves = require('../models/serves')
let LhPages = require('../comps/LhBasic/LhPages')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    window.scrollTo(0,0)
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <div className='gf' >
        <LhSubBanner img='./pic/jishuservie-Banner.jpg' >技术服务</LhSubBanner>
        <LhPages data={serves} ></LhPages>
      </div>
    )
  }
}
module.exports = Comp
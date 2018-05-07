let React = require('react')
let LhSubBanner = require('../comps/LhBasic/LhSubBanner')
let prods = require('../models/prods')
let LhPages = require('../comps/LhBasic/LhPages')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    window.scrollTo(0,0)
  }
  render() {
    return (
      <div className='gf' >
        <LhSubBanner img='./pic/jishuservie-Banner.jpg' >产品中心</LhSubBanner>
        <LhPages data={prods} ></LhPages>
      </div>
    )
  }
}
module.exports = Comp
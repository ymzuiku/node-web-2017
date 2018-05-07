let React = require('react')
let LhBanner =require('../comps/LhBasic/LhBanner')
let LhNotice =require('../comps/LhBasic/LhNotice')
let LhSkill =require('../comps/LhBasic/LhSkill')
let LhProduck =require('../comps/LhBasic/LhProduck')
let LhFooter =require('../comps/LhBasic/LhFooter')
let LhFloatBox =require('../comps/LhBasic/LhFloatBox')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    window.scrollTo(0,0)
    window.href('#/t/home/')
  }
  render() {
    return (
      <div className='h20 h-100'  >
        <LhBanner></LhBanner>
        <LhNotice></LhNotice>
        <LhSkill></LhSkill>
        <LhProduck></LhProduck>
        <LhFooter></LhFooter>
        <LhFloatBox></LhFloatBox>
      </div>
    )
  }
}
module.exports = Comp
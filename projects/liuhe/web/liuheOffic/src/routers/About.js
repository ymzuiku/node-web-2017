let React = require('react')
let LhSubBanner = require('../comps/LhBasic/LhSubBanner')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    window.scrollTo(0,0)
  }
  render() {
    return (
      <div className='h20 ' >
        <LhSubBanner img='./pic/jishuservie-Banner.jpg' >企业简介</LhSubBanner>
      </div>
    )
  }
}
module.exports = Comp
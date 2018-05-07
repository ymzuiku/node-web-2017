let React = require('react')
let LhSubBanner = require('../comps/LhBasic/LhSubBanner')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    window.scrollTo(0,0)
  }
  render() {
    return (
      <div>
        <LhSubBanner img='./pic/jishuservie-Banner.jpg' >联系我们</LhSubBanner>
      </div>
    )
  }
}
module.exports = Comp
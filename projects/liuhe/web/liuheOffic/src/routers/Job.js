let React = require('react')
let LhSubBanner = require('../comps/LhBasic/LhSubBanner')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <LhSubBanner img='./pic/jishuservie-Banner.jpg' >招聘信息</LhSubBanner>
      </div>
    )
  }
}
module.exports = Comp
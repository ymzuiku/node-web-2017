import React from 'react'
import SubPage from '../../comps/SubPage'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'


let titles = [
  { title: '项目介绍', info:'introduction' },
  {
    label: 'GDP简介',
    to: '/introduce/page1/',
    comp: Page1,
  },
  {
    label: 'GDP规划',
    to: '/introduce/page2/',
    comp: Page2,
  },
  {
    label: 'GDP签约量',
    to: '/introduce/page3/',
    comp: Page3,
  }
]

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
        <SubPage banner='./icon/banner2.jpg' data={titles} ></SubPage>
    )
  }
}
export default Comp
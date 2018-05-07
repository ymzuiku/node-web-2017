import React from 'react'
import SubPage from '../../comps/SubPage'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'


let titles = [
  { title: '项目看点', info:'Main Points' },
  {
    label: '高质量',
    to: '/look/page1/',
    comp: Page1,
  },
  {
    label: '低价格',
    to: '/look/page2/',
    comp: Page2,
  },
  {
    label: '快交付',
    to: '/look/page3/',
    comp: Page3,
  }
]

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
        <SubPage banner='./icon/banner3.jpg' data={titles} ></SubPage>
    )
  }
}
export default Comp
import React from 'react'
import SubPage from '../../comps/SubPage'
import Page1 from './Page1'
import Page2 from './Page2'


let titles = [
  { title: '平台介绍', info:'Platform' },
  {
    label: '测序平台',
    to: '/platform/page1/',
    comp: Page1,
  },
  {
    label: '分析平台',
    to: '/platform/page2/',
    comp: Page2,
  },
]

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
        <SubPage banner='./icon/banner4.jpg' data={titles} ></SubPage>
    )
  }
}
export default Comp
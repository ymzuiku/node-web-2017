let React = require('react')
let _ = require('ym-react-cli')

let Comp = ({ style }) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    window.scrollTo(0,0)
  }
  render() {
    return (
      <div className='box v' >
        <div className='box h w100' style={{
        height: '7rem',
        backgroundImage: 'linear-gradient(180deg,#fff,#E9F6FF)'
      }}> 
        <div className='c4 box'>
        <div
          style={{
              width: 4.95 * 1.2 + 'rem',
              height: 2.55 * 1.2 + 'rem',
              backgroundImage: `url(./logo/logo.png)`,
              backgroundSize: `cover`,
              backgroundPosition: `50% 50%`
            }}
        /></div>
        <div className='c8 ff fw400 col-8 justify-content-center align-items-center' >
            请联系:400-706-6615
          </div>
        </div>
        <div style={{
          width: '100%', height: 20+'rem',
          backgroundImage: `url(./pic/banner_test1.jpg)`,
          backgroundSize: `cover`,
          backgroundPosition: `50% 50%`
        }} ></div>
        <div style={{
          marginTop: '5rem',
          marginBottom:'5rem',
          width: '100%', height: 18+'rem',
          backgroundImage: `url(./pic/banner_test2.jpg)`,
          backgroundSize: `cover`,
          backgroundPosition: `50% 50%`
        }} ></div> 
        <div style={{
          width: '100%', height: 10+'rem',
          backgroundImage: `url(./pic/banner_test3.jpg)`,
          backgroundSize: `cover`,
          backgroundPosition: `50% 50%`
        }} ></div> 
        <div className='ff fw400 box w100' style={{ height: '3rem' }} >
        2017华大六合版权所有 ICP备 等待备号.  
        </div>
      </div>
    )
  }
}
module.exports = Comp

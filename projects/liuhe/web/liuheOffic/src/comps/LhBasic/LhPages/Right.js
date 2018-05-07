let React = require('react')
let RightItem = require('./RightItem')
let _ = require('ym-react-cli')
class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      info: ''
    }
    _.looker.listen('serveRightChangeTab', info => {
      this.setState({
        info: info
      })
    })
  }
  
  render() {
    let { data } = this.props
    if (!data || !data.data) {
      return (
        <div
          style={{
            minHeight: '50rem',
            padding: '2rem',
            width: '100%',
            boxShadow: '-1px 0rem 0rem rgba(0, 0, 0, 0.11)'
          }}
        />
      )
    } else
      return (
        <div
          style={{
            minHeight: '50rem',
            padding: '2rem',
            width: '100%',
            boxShadow: '-1px 0rem 0rem rgba(0, 0, 0, 0.11)'
          }}>
          <div style={{ fontWeight: 500, fontSize: '1.6rem' }}>{data.title}</div>
          <div
            className="h js"
            style={{
              height: '3rem',
              width: '100%',
              marginTop: '2rem',
              borderLeft: '1px solid #F1F1F1',
              borderRight: '1px solid #F1F1F1',              
              backgroundColor: '#f1f1f1'
            }}>
            {data.data.map((v, i) => {
              return (
                <RightItem now={i === 0} data={v}>
                  {v.title}
                </RightItem>
              )
            })}
          </div>
          <div
            className=""
            style={{
              marginTop: 0,
              width:'100%',
              borderLeft: '1px solid #F1F1F1',
              borderRight: '1px solid #F1F1F1',
              borderBottom: '1px solid #F1F1F1'
            }}>
            <div style={{height:'1px'}} ></div>
            <div className='book' >
            {this.state.info}
            </div>
          </div>
        </div>
      )
  }
}
module.exports = Comp

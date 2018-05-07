import React from 'react'
import Input from '../../comps/Input'
import api from '../../model/api'

let vmInput = function(self, key, e, num) {
  if (e && self && key) {
    num = num === undefined ? 999 : num
    var value = e.target.value
    if (value.length > num) {
      value = value.slice(0, num)
    }
    self.setState(function(state) {
      state[key] = value
    })
  }
}

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      btnVin: false,
      name: '',
      danwei: '',
      zhiwei: '',
      ketizhu: '',
      mail: '',
      phone: '',
      address: '',
      server: '',
      simple: '',
      question: '',
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-md-12"
            style={{
              textAlign: 'center',
              height: 80,
              marginTop: 10,
              lineHeight: '80px',
              color: '#35B69E',
              fontSize: 22,
              fontWeight: 400
            }}>
            信息提交成功
          </div>
        </div>
        <div
          className="row"
          style={{
            color: '#6E6E6E',
            marginTop: 10,
            fontSize: 13
          }}>
          <div className="col-md-1" />
          <div className="col-md-10">
            <div
              className="row"
              style={{
                marginTop: 10,
                textIndent: '2em'
              }}>
              <p>
                您好！非常感谢您关注华大基因的基因组解码计划（简称GDP）。我们已经收到您提供的信息，华大基因的科技代表会第一时间联系您，以便给您提供更加优质的服务。
              </p>
            </div>
          </div>
          <div className="col-md-1" />
        </div>
        <div className='row' style={{ textAlign: 'center', height:170 }} >
          <div onClick={this.send} className='mbtn' onMouseEnter={this.btnVin} onMouseLeave={this.btnVout} style={{
            margin: '55px auto',
            height: 50, width: 200, background:this.state.btnVin?'#21927D': '#35B69E', color: '#fff',
            lineHeight: '50px',
          }}  >好的</div>  
        </div>
      </div>
    )
  }
  send = () => {
    window.location.href = '#/join/'
  }
}
export default Comp

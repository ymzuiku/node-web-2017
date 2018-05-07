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

let regPhone = function(str) {
  var reg = /1[3,4,5,6,7,8,9]\d{9}/
  if (str.match(reg) === null) {
    return false
  } else {
    return true
  }
}

let regCode = function(str) {
  var reg = /\d{4}/
  if (str.match(reg) === null) {
    return false
  } else {
    return true
  }
}

let regFont = function(str) {
  var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
    regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
  if (regEn.test(str) || regCn.test(str)) {
    return '名字不能包含特殊字符'
  } else {
    return true
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
            如何参与GDP
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
            <div className="row">尊敬的老师,</div>
            <div
              className="row"
              style={{
                marginTop: 10,
                textIndent: '2em'
              }}>
              <p>
                您好！非常感谢您关注华大基因的基因组解码计划（简称GDP）。如果您希望更加深入地了解此计划并参与其中，烦请您先填写如下信息。华大基因的科技代表会第一时间联系您，以便给您提供更加优质的服务。
              </p>
            </div>
          </div>
          <div className="col-md-1" />
        </div>
        <div className="row" style={{marginTop:40, marginLeft:0}}>
            <div className="col-md-6" style={{textAlign:'center'}} >
            <Input onChange={(e) => { vmInput(this, 'name', e)}} title="姓名：" def="请输入您的真实姓名" />
            </div>
            <div className="col-md-6" style={{textAlign:'center'}} >
              <Input  onChange={(e)=>{vmInput(this, 'danwei', e)}} title="单位：" def="请输入您现在的工作单位" />
            </div>
          </div>
          <div className="row" style={{marginTop:15, marginLeft:0}} >
            <div className="col-md-6" style={{textAlign:'center'}} >
              <Input  onChange={(e)=>{vmInput(this, 'zhiwei', e)}} title="职位：" def="请输入您现在的工作职位" />
            </div>
            <div className="col-md-6" style={{textAlign:'center'}} >
              <Input onChange={(e)=>{vmInput(this, 'ketizhu', e)}} title="课题组:" def="请输入您现在的课题组名" />
            </div>
          </div>
          <div className="row" style={{marginTop:15, marginLeft:0}}>
            <div className="col-md-6" style={{textAlign:'center'}} >
              <Input onChange={(e)=>{vmInput(this, 'mail', e)}} title="邮箱：" def="请正确输入您的邮箱地址" />
            </div>
            <div className="col-md-6" style={{textAlign:'center'}} >
              <Input onChange={(e)=>{vmInput(this, 'phone', e)}} title="手机：" def="请输入您的手机号" />
            </div>
          </div>
          <div className='row' style={{ marginTop: 15,marginLeft:16 }} >
            <Input onChange={(e)=>{vmInput(this, 'address', e)}} className='col-md-12' long title="联系地址:" def="请正确填写您的真实地址" />
        </div>
        <div className='row' style={{ marginTop: 15, marginLeft:16}} >
            <Input onChange={(e)=>{vmInput(this, 'server', e)}} className='col-md-12' long title="感兴趣的服务:" def="可以描述问题" />
        </div>
        <div className='row' style={{ marginTop: 15,marginLeft:16 }} >
            <Input onChange={(e)=>{vmInput(this, 'simple', e)}} className='col-md-12' long title="预计样品数量和样品类型:" def="" />
        </div>
        <div className='row' style={{ marginTop: 15,marginLeft:16 }} >
            <Input onChange={(e)=>{vmInput(this, 'question', e)}} className='col-md-12' long title="拟解决的科学问题:" def="" />
        </div>
        <div className='row' style={{ textAlign: 'center', height:170 }} >
          <div onClick={this.send} className='mbtn' onMouseEnter={this.btnVin} onMouseLeave={this.btnVout} style={{
            margin: '55px auto',
            height: 50, width: 200, background:this.state.btnVin?'#21927D': '#35B69E', color: '#fff',
            lineHeight: '50px',
          }}  >提交</div>  
        </div>
      </div>
    )
  }
  btnVin = () => {
    this.setState({
      btnVin:true
    })
  }
  btnVout = () => {
    this.setState({
      btnVin:false
    })
  }
  send = () => {
    let { name, danwei, zhiwei, ketizhu, mail, phone, address, server, simple, question } = this.state
    if (name === '') {
      window.msginfo('请输入您的真实姓名')
    } else if (danwei === '') {
      window.msginfo('请输入您现在的工作单位')
    } else if (zhiwei === '') {
      window.msginfo('请输入您现在的工作职位')
    } else if (ketizhu === '') {
      window.msginfo('请输入您现在的课题组名')
    } else if (mail === '') {
      window.msginfo('请正确输入您的邮箱地址')
    } else if (phone === '' || !regPhone(phone)) {
      window.msginfo('请输入正确的手机号')
    } else if (address === '') {
      window.msginfo('请输入您的联系地址')
    } else if (server === '') {
      window.msginfo('请输入您感兴趣的服务')
    } else if (simple === '') {
      window.msginfo('请输入预计样品数量和样品类型')
    } else {
      api.senduser({ name: name, danwei: danwei, zhiwei: zhiwei, ketizhu: ketizhu, mail: mail, phone: phone, address: address, server: server, simple: simple, question: question }, (res) => {
        window.msgtip(res.Msg)
        window.location.hash = '#/join/succeed/'
      })
    }
  }
}
export default Comp

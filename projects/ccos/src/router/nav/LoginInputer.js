let React = require('react')
let {so,ac, api} = require('../../model/api')
let CpPlan = require('../../CpComp/CpPlan')
let Button = require('../../comp/Button')
let Loading = require('../../comp/Loading')
let colors = require('../../model/colors')
let { Motion, spring } = require('react-motion')
// if (window.low) { spring = function (v, d) { return v } }

class Comp extends React.PureComponent {
  constructor(props) {
    window.scrollTo(0, 0)
    super(props)
    this.state = {
      pc: window.pc(),
      input_code: '',
      input_phone: '',
      phoneFocus: false,
      codeFocus: false,
      sendCode: false,
      sendCodeTimeOut: false,
      sending:false,
      codeButtonTitle:'获取短信验证码',
    }
  }
  componentDidMount() { 
    so.dispatch(ac.ui({ navTitle: '筛查录入系统' }))
    this.unso =  so.subscribe(() => {
      this.setState({
        pc:so.getState().ui.pc
      })
    })
  }
  componentWillUnmount() {
    this.unso()
    clearInterval(this.timer)
  }
  send = () => {
    setTimeout(() => {
      let { input_phone, input_code } = this.state
      if (window.q.regPhone(input_phone)) {
        if (window.q.regCode(input_code)) {
          this.setState({
            sending:true
          }, () => {
            api.luruyuan_login({ tel: input_phone, code: input_code }, res => {
              if (res.status !== '200') {
                window.msg({ type: 'err', info: res.msg })
                this.setState({
                  sending:false,
                })
              } else {
                let match = this.props.match
                if (match.params.to) {
                  let to = match.params.to.replace(/\_/g, '/')
                  window.location.href = '#'+to
                } else {
                  window.location.href = '#/'
                }
              }
            }, () => {
              console.log('aaa')
              this.setState({
                sending:false,
              })
            })
          })
        } else {
          window.msg({ info: '请输入正确的验证码' })
        }
      } else {
        window.msg({ info: '请输入正确的手机号' })
      }  
    },340)
    
  }
  
  getCode = () => {
    let { input_phone, sendCodeTimeOut } = this.state
    if (sendCodeTimeOut) {

    }
    else if (window.q.regPhone(input_phone)) {
      this.timeOut = 30
      this.setState({
        codeButtonTitle: `重新获取(${this.timeOut})`,
        sendCode: true,
        sendCodeTimeOut: true,
      }, () => {
        let obj = document.getElementById('codeinput')
        if(obj) obj.focus()
      })  
      this.timer =  setInterval(() => {
        this.timeOut -= 1
        if (this.timeOut > 1) {
          this.setState({
            codeButtonTitle: `重新获取(${this.timeOut})`,
            sendCodeTimeOut:true,
          })
        } else {
          this.setState({
            codeButtonTitle: `重新获取`,
            sendCodeTimeOut:false,
          }, () => {
            clearInterval(this.timer)
          })  
        }
      },1000)
      api.getTelCode({ tel: input_phone }, res => {
        window.msg({ info: res.msg })
      })
    } else {
      window.msg({ info: '您输入的手机号有误' })
    }
  }
  render() {
    let { pc, phoneFocus, codeFocus, input_code, input_phone,codeButtonTitle,sendCode,sendCodeTimeOut,sending } = this.state
    let w = 25
    let codeButtonCanTouch = input_phone.length > 10 && !sendCodeTimeOut
    if (sending) {
      return <div style={{
        height:'90vh'
      }} ><Loading title='登录中...' ></Loading></div>
    }
    return (
      <div
        style={{
          minHeight: '90vh',
          backgroundColor: colors.white2
        }}>
        <div style={{ height: 20 }} />
        <Motion
          style={{
            phoneLine: spring(phoneFocus ? 1 : 0.82),
            codeLine: spring(codeFocus ? 1 : 0.82),
            codeSize: spring(codeButtonCanTouch ? 1 : 0.7),
            codeInputOpa: spring(sendCode ? 1 : 0),
            codeButtonX:spring(sendCode ? 126 : 0),
          }}>
          {mot => (
            <CpPlan style={{ justifyContent:'center',alignItems:'center'}}>
              <div style={{ height: 20, }} />
               <div
                style={{
                  width: 90,
                  height: 90,
                  backgroundImage: `url(./icon/signface.png)`,
                }}
              /> 
              <div style={{ height: 20 }} />
              <div style={{ justifyContent:'center', alignItems:'center', width:'100%'}}>
                <input
                  id='phoneinput'  
                  onChange={e => {
                    window.q.vm(this, 'input_phone', e, 11)
                    if (e.target.value.length > 10) {
                      e.target.blur()
                    }
                  }}
                  value={this.state.input_phone}
                  onFocus={() => {
                    this.setState({
                      phoneFocus: true
                    })
                  }}
                  onBlur={() => {
                    this.setState({
                      phoneFocus: false
                    })
                  }}
                  maxLength={11}
                  placeholder="录入员手机号"
                  type="tel"
                  style={{
                    textAlign: 'center',
                    padding: 10,
                    width: '90%',
                    border: '0px solid rgba(0,0,0,0)',
                    backgroundColor: 'rgba(0,0,0,0)',
                    fontSize: 22,
                    fontWeight: 300,
                  }}
                />
                <div
                  style={{
                    width: '90%',
                    height: '1px',
                    maxWidth:'40rem',
                    backgroundColor: colors.blue1,
                    opacity: phoneFocus ? 1 : 0.5,
                    transform: `scale(${mot.phoneLine}, 1)`,
                  }}
                />
              </div>
              <div style={{ height: '1.5rem' }} />
              <div style={{justifyContent:'center', alignItems:'center', opacity:mot.codeInputOpa, width: '100%', height:'100%'}}>
                <input
                  id='codeinput'  
                  onChange={e => {
                    window.q.vm(this, 'input_code', e, 4)
                    if (e.target.value.length > 3) {
                      e.target.blur()
                      setTimeout(() => {
                        this.send()
                    },100) 
                    }
                  }}
                  onFocus={() => {
                    this.setState({
                      codeFocus: true
                    })
                  }}
                  onBlur={() => {
                    this.setState({
                      codeFocus: false
                    })
                  }}
                  maxLength={11}
                  placeholder="请输入验证码"
                  type="tel"
                  style={{
                    textAlign: 'center',
                    padding: 10,
                    width: '90%',
                    border: '0px solid rgba(0,0,0,0)',
                    backgroundColor: 'rgba(0,0,0,0)',
                    fontSize: 22,
                    fontWeight: 300,
                  }}
                />
                <div
                  style={{
                    width: '90%',
                    height: '1px',
                    maxWidth:'40rem',
                    backgroundColor: colors.blue1,
                    opacity: codeFocus ? 1 : 0.5,
                    transform: `scale(${mot.codeLine}, 1)`,
                  }}
                />
              </div>
              <Button onClick={this.getCode} style={{
                color: codeButtonCanTouch ? colors.blue1 : colors.black3,
                fontSize: 20,
                transform:`translate(${mot.codeButtonX}px, -34px) scale(${mot.codeSize}, ${mot.codeSize})`,
              }}>
                {codeButtonTitle}
              </Button>
              <div style={{ height: '2rem' }} />
            </CpPlan>
          )}
        </Motion>
      </div>
    )
  }
}
module.exports = Comp

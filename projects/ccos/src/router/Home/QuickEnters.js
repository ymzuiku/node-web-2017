let React = require('react')
let Button = require('../../comp/Button')
let Icon = require('../../comp/Icon')
let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }

let {ac, so, api} = require('../../model/api')
let colors = require('../../model/colors')

class Item extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc(),
      vin:false,
    }
  }
  componentDidMount() {
    this.unso = window.q.vmpc(this)
  }
  componentWillUnmount() {
    this.unso()
  }
  vin = () => { 
    this.setState({
      vin:true
    })
  }
  vout = () => {
    this.setState({
      vin:false
    })
  }
  render() {
    let { label, imgs=[], to,  } = this.props
    let { pc,vin } = this.state
    let ih = pc ? 80 : 60
    return (
      <div style={{width:ih, height:ih*2.4, justifyContent:'center'}} >
        <Motion style={{ s: vin ? spring(1.1) : spring(1) }} >  
          {mot=><Button  to={'#'+to} vin={this.vin} vout={this.vout} style={{transform:`scale(${mot.s}, ${mot.s})`}} >
          <Icon imgs={imgs} num={vin?1:0} style={{width:ih, height:ih}} ></Icon>
        </Button>}
        </Motion>
        <p style={{marginTop:'1rem',textAlign:'center',width:'100%', fontSize:15, fontWeight:400, color:colors.black2}} >{label}</p>
      </div>
    )
  }
}

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      token: null,
      pc:window.pc(),
      sid:null
    }
    api.order_service((res)=>{
      let sid = null
      try {
        sid = res.data[0].id
      } catch (error) {
        
      }
      if(sid){
        this.setState({
          sid:sid
        })
      }
    })
  }
  componentDidMount() {
    this.unso = so.subscribe(() => {
      this.setState({
        token: so.getState().user.token,
        pc:so.getState().ui.pc
      })
    })
    let sid = null
    api.order_service = (res)=>{
      try {
        sid = res.data[0].id
      } catch (error) {
        
      }
    }
  }
  componentWillUnmount() {
    this.unso()
  }

  render() {
    let {token,pc,sid} = this.state
    let sos = so.getState()
    let data = [
      {
        label: '用户中心',
        to: sos.user.status_com?'/user/project/':(sos.user.status_pro?'/user/upcase/': (so.getState().user.idcard?'/user/serve/':'/user/userinfo/')),
        imgs: ['./icon/quick-user.png', './icon/quick-user-l.png'],
      },
      {
        label: '绑定样本',
        to: sid?`/nav/serve/${sid}/`: '/user/serve/',
        imgs: ['./icon/quick-bind.png', './icon/quick-bind-l.png']
      },
      {
        label: '查询报告',
        to: sid?`/nav/serve/${sid}/`: '/user/serve/',
        imgs: ['./icon/quick-cloud.png', './icon/quick-cloud-l.png']
      },
      {
        label: '录入数据',
        to: '/nav/inputer/',
        imgs: ['./icon/quick-look.png', './icon/quick-look-l.png']
      },
    ]
    if (pc) {
      return this.renderPc(data)
    } else {
      return this.renderPhone(data)
    }
  }
  renderPc = (data) => { 
    return (
      <div style={{ backgroundImage: colors.gradient1, flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }} >
        <div></div>  
        {data.map((v, i) => {
          return <Item key={'quickEnter'+i} {...v}></Item>
        })}
        <div></div>  
      </div>
    )
  }
  renderPhone = (data) => {
    return (
      <div style={{ backgroundImage: colors.gradient1,width:'100%', }} >
        <div style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }} >
        <div></div>  
        {data.map((v, i) => {
          if (i < 2) {
            return <Item key={'quickEnter'+i} {...v}></Item> 
          }
        })}
        <div></div>  
        </div>  
        <div style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }} >
        <div></div>  
        {data.map((v, i) => {
          if (i >=2 && i<4) {
            return <Item key={'quickEnter'+i} {...v}></Item> 
          }
        })}
        <div></div>  
        </div>  
      </div>
    )
  }
}
module.exports = Comp
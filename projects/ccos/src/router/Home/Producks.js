let React = require('react')
let { ac, api, so } = require('../../model/api')
let colors = require('../../model/colors')
let Loading = require('../../comp/Loading')
let Button = require('../../comp/Button')
let CpButton = require('../../CpComp/CpButton')
let Selector = require('../../comp/Selector')
let { Motion, spring } = require('react-motion')

if (window.low) {
  spring = function(v, d) {
    return v
  }
}

class Producks extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc(),
      data: []
    }
  }
  componentDidMount() {
    this.unso = so.subscribe(() => {
      this.setState({
        pc: so.getState().ui.pc
      })
    })
    api.produckList(res => {
      res.data.map((v, i) => {
        let ele = v
        ele.tip = ele.tip.split('|')
        ele.age = Number(ele.age)
        ele.id = Number(ele.id)
        ele.moneys = ele.money.split('|')
        if (ele.moneys.length > 1) {
          ele.yearButton = '¥选择年龄'
        }
        if (ele.id === 1) {
          ele = {
            ...ele,
            to: `/nav/buyuserorder/1/0/self/0/`,
            color: colors.produck2,
            img: './icon/product_1.png',
            moneyTip: '¥'
          }
        } else if (ele.id === 2) {
          ele = {
            ...ele,
            to: `/nav/buyuserorder/2/0/self/0/`,
            color: colors.produck2,
            img: './icon/product_2.png',
            moneyTip: '¥'
          }
        } else if (ele.id === 3) {
          ele = {
            ...ele,
            to: `/nav/buycomorder/3/0/0/`,
            color: colors.produck3,
            img: './icon/product_3.png',
            moneyTip: '每例¥'
          }
        } else if (ele.id === 4) {
          ele = {
            ...ele,
            to: `/nav/buycomorder/4/0/0/`,
            color: colors.produck3,
            img: './icon/product_4.png',
            moneyTip: '每例¥'
          }
        }
        res.data[i] = ele
      })
      this.setState({
        data: res.data
      })
    })
  }
  componentWillUnmount() {
    this.unso()
  }
  render() {
    let { data, pc } = this.state
    if (data.length === 0) {
      return (
        <div style={{ width: '100%', minHeight: 400, height: '100%', overflowX:'hidden' }}>
          <Loading icon="./icon/loading-gay.png" />
        </div>
      )
    }
    if (pc > 1) {
      return (
        <div style={{ flexDirection: 'column', alignItems: 'center', overflowX: 'hidden' }}>
          <div style={{ marginTop: 50,marginBottom: 30, fontSize:pc?46:36,fontWeight:300, flexDirection:'row', justifyContent:'center'}}>
          组织用户请选择
        </div>  
          <div style={{ width: '47%',flexDirection:'row',  justifyContent:'center', }}>
            {data.map((v, i) => {
              if (i >= 2) {
                return <Item key={'produckItem'+i} {...v} />
              }
            })}
          </div>
          <div style={{ marginTop: 50,marginBottom: 30, fontSize:pc?46:36,fontWeight:300, flexDirection:'row', justifyContent:'center'}}>
          个人用户请选择
        </div>  
          <div style={{ width: '47%',flexDirection:'row', justifyContent:'center',marginTop:20,marginBottom:40, }}>
            {data.map((v, i) => {
              if (i < 2) {
                return <Item key={'produckItem'+i} {...v} />
              }
            })}
          </div>
        </div>
      )
    } else {
      return (
        <div style={{ width: '100%', alignItems: 'center', marginTop: 20, overflowX: 'hidden' }}>
         <div style={{ marginTop: 50,marginBottom: 30, fontSize:pc?46:36,fontWeight:300, flexDirection:'row', justifyContent:'center'}}>
         组织用户请选择
        </div>  
        {data.map((v, i) => {
          if(i>=2){
            return <Item key={'produckItem'+i} {...v} />
          }
        })}
          <div style={{ marginTop: 50,marginBottom: 30, fontSize:pc?46:36,fontWeight:300, flexDirection:'row', justifyContent:'center'}}>
          个人用户请选择
        </div>  
        {data.map((v, i) => {
          if(i<2){
            return <Item key={'produckItem'+i} {...v} />
          }
        })}
        
          <div style={{height:40}} ></div>
        </div>
      )
    }
  }
}

class Item extends React.PureComponent {
  yearData = []
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc(),
      mouseIn: false,
      money: this.props.money,
      moneyTip: this.props.moneyTip
    }
  }
  componentDidMount() {
    this.unso = so.subscribe(() => {
      this.setState({
        pc: so.getState().ui.pc
      })
    })
  }
  componentWillUnmount() {
    this.unso()
  }
  mouseIn = () => {
    this.setState({
      mouseIn: true
    })
  }
  mouseOut = () => {
    this.setState({
      mouseIn: false
    })
  }
  renderTip = tip => {
    if (!tip) return
    let arr = []
    for (let i = 0, len = tip.length; i < len; i++) {
      arr.push(<li  key={'produck'+tip[i]+i} style={{marginBottom: '1rem' }}>{tip[i]}</li>)
    }
    return arr
  }
  changeYearn = ({ ...rest }) => {
    this.setState({
      moneyTip: '¥ ',
      money: rest.data.code
    })
  }
  render() {
    let { pc, mouseIn, money, moneyTip } = this.state
    let { to, color, img, title, info, tip, yearButton, button, age } = this.props
    if (this.props.money) {
      if (this.props.money.length > 0) {
        let moneys = this.props.money.split('|')
        this.yearData = []
        for (let i = 0, len = moneys.length; i < len; i++) {
          this.yearData.push({
            title: `从${age + i}岁开始保障计划`,
            code: moneys[i]
          })
        }
      }
    }
    return (
      <Motion style={{ shadow: spring(mouseIn ? 1 : 0) }}>
        {mot => (
          <Button
            vin={this.mouseIn}
            vout={this.mouseOut}
            style={{
              margin: '15px 20px',
              borderRadius: '0.3rem',
              border: '1px solid rgba(0,0,0,0.065)',
              backgroundColor: colors.white1,
              maxWidth: 700,
              width: '90%',
              height: '100%',
              boxShadow: `0 1.5rem 3.5rem rgba(0, 0, 0, ${0.08 * mot.shadow})`
            }}>
            <div
              style={{
                opacity: 0,
                borderRadius: '0.4rem 0.4rem 0rem 0rem',
                width: '100%',
                height: '0.3rem',
                backgroundColor: color
              }}
            />
            <div
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                marginLeft: 15,
                marginTop: 10
              }}>
              <div
                style={{
                  width: pc ? 95 : 50,
                  height: pc ? 95 : 50,
                  backgroundImage: `url(${img})`
                }}
              />
              <div
                style={{
                  marginLeft: pc?20:8,
                  fontSize: pc ? 24 : 17,
                  textAlign: 'left',
                  flexGrow: 1
                }}>
                {title}
              </div>
              {yearButton ? (
                <Selector onChange={this.changeYearn} title="您的年龄：" data={this.yearData}>
                  {moneyTip === '¥ ' ? (
                    <div
                      style={{
                        color: color,
                        width: 100,
                        textAlign: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <div style={{ fontSize: 12, textDecoration: 'none' }}>
                        {moneyTip}
                      </div>
                      <span
                        style={{
                          textDecoration: 'underline',
                          fontSize: pc?20:16,
                          fontWeight: 400,
                          paddingLeft: 10,
                          paddingRight: 20
                        }}>
                        {money}
                      </span>
                    </div>
                  ) : (
                    <CpButton
                      bgColor={color}
                      style={{
                        height: 38,
                        lineHeight: '50px',
                        opacity: 1,
                        width: 80,
                        fontSize:13,
                        marginRight: 20
                      }}>
                      {yearButton}
                    </CpButton>
                  )}
                </Selector>
              ) : (
                <div
                  onClick={this.changeYearn}
                  style={{
                    color: color,
                    flexGrow: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end'
                  }}>
                  <p style={{fontSize:13,marginTop:4, textAlign: 'right', alignSelf: 'center' }}>{moneyTip}</p>
                  <span
                    style={{
                      fontSize: pc?30:18,
                      fontWeight: 400,
                      paddingRight: 20,
                      paddingLeft: pc?10:3,
                      alignSelf: 'center',
                    }}>
                    {money}
                  </span>
                </div>
              )}
            </div>
            <div
              style={{
                maxWidth: '90%',
                marginLeft: 20,
                marginTop: 20,
                fontSize:pc?18:15
              }}>
              {info}
            </div>
            <ul className='ul' style={{fontSize:pc?18:14}}>{this.renderTip(tip)}</ul>
            <div
              style={{
                marginTop: 20,
                marginBottom: 20,
                alignItems: 'center'
              }}>
              <CpButton
                icon="./icon/pay-white.png"
                style={{ maxWidth: '90%' }}
                bgColor={color}
                to={'#'+to}
                type="simple">
                购买
              </CpButton>
            </div>
          </Button>
        )}
      </Motion>
    )
  }
}
module.exports = Producks

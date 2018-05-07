let React = require('react')
let colors = require('../../model/colors')
let { so, ac } = require('../../model/api')
let Icon = require('../../comp/Icon')
let Button = require('../../comp/Button')
let CpArrowButton = require('./CpBanner/CpArrowButton')
let { Motion, spring } = require('react-motion')
if (window.low) { spring = function (v, d) { return v } }

let data = [
  {
    img: './pic/learn1.jpg',
    head: '',
    title: '宫颈癌的发病原理',
    info: '了解宫颈癌的发病原理，可以有效提高自身预防宫颈癌意识，并且了解筛查的必要性',
    btnText: '详情',
    to: '#/nav/news1/'
  },
  {
    img: './pic/learn2.jpg',
    head: '',
    title: '如何预防宫颈癌',
    info: '预防宫颈癌的途径包括参加规范的宫颈癌筛查计划和注射HPV疫苗，如何选择，因人而异',
    btnText: '详情',
    to: '#/nav/news2/'
  },
  {
    img: './pic/learn3.jpg',
    head: '',
    title: '筛查结果异常的意义和处理',
    info: '筛查结果异常并不代表一定有癌前病变货宫颈癌，选择合格的医疗单位进行正确的诊断至关重要',
    btnText: '详情',
    to: '#/nav/news3/'
  }
]

let Comp = ({ style }) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc()
    }
  }
  componentDidMount() {
    this.unso = so.subscribe(() => {
      this.setState({
        pc:so.getState().ui.pc
      })
    })
  }
  componentWillUnmount() {
    this.unso()
  }
  render() {
    let { pc } = this.state
    return (
      <div
        style={{
          backgroundImage: colors.gradient1,
          width:'100%',
        }}>
        <div style={{ marginTop: 50,marginBottom: 30, fontSize:pc?46:36,fontWeight:300, flexDirection:'row', justifyContent:'center'}}>
          <span style={{ color: colors.black2 }}>宫颈癌</span><span>相关知识</span>
        </div>
        <div
          style={{
            flexDirection: pc ? 'row' : 'column',
            justifyContent: 'center',
            marginLeft: pc?40:10,
            marginRight:pc?40:10,
            marginTop: 20,
            marginBottom: 50,
          }}>
          {data.map((v, i) => {
           return <Box key={'newbox'+i} {...v} />  
          })}
        </div>
      </div>
    )
  }
}

class Box extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc(),
      full: false
    }
  }
  componentDidMount = () => {
    this.unso = so.subscribe(() => {
      this.setState({
        pc: so.getState().ui.pc
      })
    })
  }
  componentWillUnmount() {
    this.unso()
  }
  click = () => {
    if (!this.state.pc) {
      this.setState({
        full:!this.state.full
      })  
    }
  }
  mouseIn = () => {
    if (this.state.pc) {
      this.setState({
        full: true
      }) 
    }
  }
  mouseOut = () => {
    if (this.state.pc) {
      this.setState({
        full: false
      }) 
    }
  }
  render() {
    let { pc, full } = this.state
    let { img, head, title, info, btnText,to } = this.props
    let h = pc ? 360 : 280
    return (
      <div style={{
        margin: 10,
        backgroundColor: '#000',
        flexGrow:1,
        height: h,
        overflow: 'hidden'
      }} >
        <Button
        onClick={this.click}  
        vin={this.mouseIn}
        vout={this.mouseOut}
        style={{
          height: '100%',
          overflow: 'hidden'
        }}  
        >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${img})`,
            backgroundSize: `cover`,
            backgroundPosition: `50% 50%`
          }}
        />
        <Motion style={{
          full: spring(full ? -100 : pc ? -30 : -36),
          buttonY: spring(full? 0:10, {stiffness:140}),
          opaShow: spring(full ? 1 : 0, {stiffness:110}),
          opaHidden:spring(full?0:1),
        }}>
          {mot => <div
            style={{
              width: '100%',
              height: '100%',
              flexGrow:1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              transform: `translate(0%, ${mot.full}%)`
            }}>
              <div style={{
                flexDirection:'row',
              alignItems:'flex-start'  
            }} >
              <div style={{ marginLeft: 20, flexGrow:3, height: '100%' }}>
                <div
                    style={{
                    marginTop:pc?20:10,  
                    opacity: 0.7,
                    color: colors.white1,
                    fontSize: pc?16:12,
                    fontWeight: 400
                  }}>
                  {head}
                </div>
                <div
                  style={{
                    marginTop: 10,
                    color: colors.white1,
                    fontSize: pc?20:15,
                    fontWeight: 400
                  }}>
                  {title}
                </div>
              </div>
              <div
                  style={{justifyContent:'flex-end', flexGrow:1, height: '100%', alignItems:'center', alignSelf:'center',opacity:mot.opaHidden }}>
                  <Icon imgs={['./icon/arrow-right-white.png']} style={{
                    width: 50,height:50,  
                }} />
                </div>  
              </div>
              <div style={{ transform: `translate(0rem, ${mot.buttonY}rem`, margin: '0px 15px' }} >
              <div style={{opacity:mot.opaShow,marginTop: '2rem',height:'2px', backgroundColor:colors.white1, }} ></div>
                <div
                  style={{
                    marginTop: 20,
                    color: colors.white1,
                    fontSize: 15,
                    maxWidth:240,
                    fontWeight: 300,
                  }}>
                  {info}
                </div>  
                <CpArrowButton to={to} style={{marginTop:'2rem',height:'4rem'}}>{btnText}</CpArrowButton>
                </div>  
          </div>}
        </Motion>
      </Button>
      </div>
    )
  }
}
module.exports = Comp


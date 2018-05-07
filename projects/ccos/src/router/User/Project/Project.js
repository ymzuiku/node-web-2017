let React = require('react')
let CpButton = require('../../../CpComp/CpButton')
let colors = require('../../../model/colors')
let { ac, api, so } = require('../../../model/api')
let CpSwitchGroup = require('../../../CpComp/CpSwitchGroup')
let ProjectNow = require('./ProjectNow')
let ProjectEnd = require('./ProjectEnd')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    let sos = so.getState()
    this.state = {
      pc: sos.ui.pc,
      order_total3: 0,
      order_total4:0,
    }
  }
  componentDidMount() {
    this.unso = so.subscribe(() => {
      let sos = so.getState()
      this.setState({
        pc: sos.ui.pc
      })
    })
    api.order_balance((res) => {
      this.setState({
        order_total3:Number(res.data[0].order_total),
        order_total4:Number(res.data[1].order_total),
      })
    })
  }
  componentWillUnmount() {
    this.unso()
  }
  render() {
    let { pc,order_total3,order_total4 } = this.state
    return (
      <div style={{ alignItems: 'center', margin: '0px 10px' }}>
        <div style={{ alignItems: 'flex-start' }}>
          {/* title */}
          <div style={{ flexDirection: 'row', marginTop: 30 }}>
            <div
              style={{
                width: 90,
                height: 90,
                backgroundImage: `url(./pic/project.png)`
              }}
            />
            <div
              style={{ justifyContent: 'center', margin: '0px 10px', maxWidth: '70%' }}>
              <div style={{ color: colors.green2, fontSize: 20, }}>以项目为单位作为筛查的管理和统计</div>
              <div style={{ color: colors.black4, fontSize: 16, marginTop: 12 }}>
                进行大规模人群筛查，有效获取区域的HPV数据和控制区域宫颈癌发病率
              </div>
            </div>
          </div>
          {/* cell 1 */}
          <div
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 60,
              width: '100%'
            }}>
            <div
              style={{
                width: pc?70:60,
                height: pc?70:60,
                backgroundImage: `url(./icon/product_3.png)`
              }}
            />
            <div style={{ marginLeft: 10, flexGrow: 1 }}>
              <div
              style={{ color: colors.black2, fontSize: pc?18:15, width: pc ? 'auto' : 150 }}>
                团体HPV筛查
              </div>
              <div style={{ color: colors.black4, fontSize: pc?16:14, marginTop: pc?10:0 }}>
                订单剩余: {order_total3}份
              </div>
            </div>
            <CpButton
              to='#/nav/buycomorder/3/0/com/'  
              icon="./icon/buy-white.png"
              style={{ height: 44, width: '25%', minWidth: 140, fontSize: 16 }}>
              购买服务
            </CpButton>
          </div>
          {/* cell 2 */}
          <div
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 30,
              width: '100%'
            }}>
            <div
              style={{
                width: pc?70:60,
                height: pc?70:60,
                backgroundImage: `url(./icon/product_4.png)`
              }}
            />
            <div style={{ marginLeft: 10, flexGrow: 1 }}>
              <div
                style={{ color: colors.black2, fontSize: pc?18:15, width: pc ? 'auto' : 150 }}>
                团体HPV筛查及阳性管理
              </div>
              <div style={{ color: colors.black4, fontSize: pc?16:14, marginTop: pc?10:0 }}>
                订单剩余: {order_total4}份
              </div>
            </div>
            <CpButton
              icon="./icon/buy-white.png"
              to='#/nav/buycomorder/4/0/com/'
              style={{ height: 44, width: '25%', minWidth: 140, fontSize: 16 }}>
              购买服务
            </CpButton>
          </div>
          {/* 列表 */}
          <div style={{ width:'100%', margin: '80px 0px' }}>
          <CpSwitchGroup
            count={2}
            data={[{ title: '正在执行的项目' }, { title: '已关闭的项目' }]}
            num={0}>
            <ProjectNow></ProjectNow>  
            <ProjectEnd></ProjectEnd>
          </CpSwitchGroup>
        </div>
        </div>
      </div>
    )
  }
}
module.exports = Comp

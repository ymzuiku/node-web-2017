let React = require('react')
let { ac, api, so } = require('../../model/api')
let CpInput = require('../../CpComp/CpInput')
let CpIAgree = require('../../CpComp/CpIAgree')
let CpButton = require('../../CpComp/CpButton')
let Selector = require('../../comp/Selector')
let colors = require('../../model/colors')
let Loading = require('../../comp/Loading')
let { BarChart,ComposedChart, RadialBarChart, RadialBar, AreaChart, Area, LineChart, Legend, Tooltip, Bar, Line, CartesianGrid, XAxis, YAxis, ZAxis } = require('recharts')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pc: window.pc(),
    }
  }
  componentDidMount() {
    if (so.getState().user.idcard) {
      this.setState({
      })
    }
  }
  render() {
    let { pc, input_idcard, input_name, input_phone } = this.state
    let sos = so.getState()
    let isOpen = sos.user.status_com === 2 || sos.user.status_pro === 2
    return (
      <div
        style={{
          alignItems: 'center',
          margin: '0px 20px',
          flexGrow: 1
        }}>
        <div style={{ height: 40 }} />
        <div style={{ fontSize: 24, fontWeight: 400, color: colors.green3 }}>{isOpen ? '数据统计' : '开启数据统计功能'}</div>
        <div style={{ height: 20 }} />
        <div
          style={{ maxWidth: 440, color: colors.black3, fontSize: 17, fontWeight: 300 }}>
          多维度呈现您拥有的数据信息
        </div>
        <div style={{ height: 20 }} />
        {this.renderUnOpen(isOpen)}
        {this.renderOpen(isOpen)}
      </div>
    )
  }
  renderUnOpen = (isOpen) => {
    if (isOpen) return <div></div>
    return <div style={{ alignItems: 'center', width: '100%', maxWidth: 440, }} >
      <div
        style={{
          width: 150,
          height: 150,
          backgroundImage: `url(./pic/project.png)`
        }}
      />
      <CpButton
        to="#/user/com/"
        style={{
          maxWidth: 440,
          height: 45,
          marginTop: 20
        }}
        fontStyle={{ fontWeight: 300 }}
        icon="./icon/edit-white.png">
        成为组织用户
    </CpButton>
      <div style={{ marginTop: 20, fontSize: 13, color: colors.black3 }}>或者</div>
      <CpButton
        to="#/user/doctor/"
        style={{
          maxWidth: 440,
          height: 45,
          marginTop: 20
        }}
        fontStyle={{ fontWeight: 300 }}
        icon="./icon/edit-white.png">
        成为专业用户
    </CpButton>
    </div>
  }
  renderOpen = (isOpen) => {
    if (!isOpen) return <div></div>
    let { pc } = this.state
    const data = [
      { name: '沙头角街道', 阴性: 30, 阳性: 36, 总人数: 123, time: 1, color: '#D0021B' },
      { name: '海山街道', 阴性: 34, 阳性: 40, 总人数: 3214, time: 3, color: '#F5A623' },
      { name: '梅沙街道', 阴性: 38, 阳性: 47, 总人数: 1235, time: 9, color: '#F8E71C' },
      { name: '盐田街道', 阴性: 55, 阳性: 43, 总人数: 500, time: 10, color: '#7ED321' },
      { name: '罗湖医院', 阴性: 49, 阳性: 46, 总人数: 2003, time: 12, color: '#BD10E0' },
      { name: '盐田医院', 阴性: 34, 阳性: 42, 总人数: 1367, time: 12, color: '#50E3C2' },
    ];
    const data2 = [
      { name: '沙头角街道', 阴性: 30, 阳性: 36, 总人数: 123, time: 1, color: '#D0021B' },
      { name: '海山街道', 阴性: 340, 阳性: 400, 总人数: 3214, time: 3, color: '#F5A623' },
      { name: '梅沙街道', 阴性: 900, 阳性: 123, 总人数: 1235, time: 9, color: '#F8E71C' },
      { name: '盐田街道', 阴性: 340, 阳性: 140, 总人数: 500, time: 10, color: '#7ED321' },
      { name: '罗湖医院', 阴性: 180, 阳性: 200, 总人数: 2003, time: 12, color: '#BD10E0' },
      { name: '盐田医院', 阴性: 1003, 阳性: 139, 总人数: 1367, time: 12, color: '#50E3C2' },
    ];
    const data3 = [
      { name: '阳性数', 检测:9321, 诊断: 8321, time: 1 },
      { name: '16型阳性',检测:3214,诊断: 3014, time: 3 },
      { name: '18型阳性',检测:2335, 诊断: 2135, time: 9 },
      { name: '52型阳性',检测:835, 诊断: 635, time: 10 },
      { name: '58型阳性',检测:1136, 诊断: 1036, time: 12 },
      { name: '其他型阳性',检测:1267, 诊断: 1067, time: 12 },
    ];
    const data4 = [
      { name: '正常', 诊断: 30, 术后: 36, 总人数: 123, time: 1 },
      { name: '炎症', 诊断: 34, 术后: 40, 总人数: 3214, time: 3 },
      { name: 'CIN-1', 诊断: 45, 术后: 47, 总人数: 1235, time: 9 },
      { name: 'CIN-2', 诊断: 55, 术后: 51, 总人数: 1235, time: 10 },
      { name: 'CIN-3', 诊断: 42, 术后: 46, 总人数: 1236, time: 12 },
      { name: '原位癌', 诊断: 32, 术后: 39, 总人数: 1367, time: 12 },
      { name: '浸润癌', 诊断: 32, 术后: 39, 总人数: 1367, time: 12 },
    ];
    return <div style={{ width: '100%', maxWidth: 700 }} >
      <div style={{ alignItems: 'left' }} >
        <p style={{ margin: 10, fontSize: 17, fontWeight: "bold" }} >
        覆盖人口年龄结构图</p>
      </div>
      <BarChart width={pc ? 730 : 350} height={320} data={data} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="阴性" name="阴性平均年龄" fill="#413EA0" />
        <Bar dataKey="阳性" name="阳性平均年龄" fill="#CFB14B" />
      </BarChart>
      <div style={{ height: 30 }} ></div>
      <div style={{ alignItems: 'left' }} >
        <p style={{ margin: 10, fontSize: 17, fontWeight: "bold" }} >
        地区筛查人数及阳性比例总览</p>
      </div>
      <ComposedChart width={pc ? 700 : 350} height={320} data={data2}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="总人数" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="阳性" stroke="#ff7300" />
      </ComposedChart>
      <div style={{ height: 30 }} ></div>
      <div style={{ alignItems: 'left' }} >
        <p style={{ margin: 10, fontSize: 17, fontWeight: "bold" }} >
        阳性型人数、检测和诊断对比</p>
      </div>
      <ComposedChart width={pc ? 700 : 350} height={320} data={data3} >
        <Tooltip />        
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <Bar dataKey="检测" barSize={20} fill="#413ea0" />
        <Bar dataKey="诊断" barSize={20} fill="#ff7300" />  
        <YAxis />
      </ComposedChart>
      <div style={{ height: 30 }} ></div>
      <div style={{ alignItems: 'left' }} >
        <p style={{ margin: 10, fontSize: 17, fontWeight: "bold" }} >随访临床诊断结果总览</p>
      </div>
      <AreaChart width={pc ? 700 : 350} height={320} data={data4}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6699FF" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#6699FF" stopOpacity={0.3} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#FFD700" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="诊断" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="术后" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
      <div style={{ height: 40 }} ></div>
    </div>
  }
}
module.exports = Comp

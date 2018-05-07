let React = require('react')
let SelectorCell = require('./SelectorCell')
let SelectorTip = require('./SelectorTip')
let getAddress = require('./getAddress.js')
let { Motion, spring } = require('react-motion')

let Comp = ({
  type,
  tip,
  data,
  color,
  onChange,
  nowDatas,
  selecteds,
  selectedNames,
  editNum,
  style
}) => <div />

let defaultTip = '请选择'
let defaultColor = '#3C84EB'

Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    let { selecteds, selectedNames, editNum, nowDatas } = this.props
    this.state = {
      loading: true,
      nowDatas: nowDatas || [],
      editNum: editNum || 0,
      selecteds: selecteds || [-1, -1, -1, -1],
      selectedNames: selectedNames || [defaultTip, '', '', '']
    }
  }
  componentDidMount() {
    // 如果类型是地址，解析json地址
    if (this.props.type === 'address') {
      // 如果window没有地址信息
      if (!window.address) {
        getAddress(address => {
          this.data = address
          this.getDataLevel()
          this.setState({
            loading: false
          })
        })
      } else {
        // 如果曾经解析过地址信息
        this.data = window.address
        this.getDataLevel()
        this.setState({
          loading: false
        })
      }
    } else {
      // 如果没有指定类型，使用外部数据
      this.data = this.props.data
      this.getDataLevel()
      this.setState({
        loading: false
      })
    }
  }
  getDataLevel = () => {
    // 计算data的层级
    this.level = 1
    let getLevel = data => {
      for (let i = 0, len = data.length; i < len; i++) {
        let ele = data[i]
        try {
          if (ele.data.length > 0) {
            this.level += 1
            getLevel(ele.data)
            break
          }
        } catch (error) {
          break
        }
      }
    }
    getLevel(this.data) //递归数据
  }
  // 渲染loading
  renderLoading = () => {
    if (!this.state.loading) return
    return (
      <div className="box" style={{ width: '100%', height: '100%', color: '#666' }}>
        loading...
      </div>
    )
  }
  // 渲染选择器
  renderSelector = () => {
    if (this.state.loading) return
    let { editNum } = this.state
    let { color = defaultColor, title } = this.props
    if (editNum > this.level - 2) {
      editNum = this.level - 2
    }
    return (
      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <div
          className="box h js"
          style={{ width: '100%', height: '12%', backgroundColor: '#fff' }}>
          {/* <div
            style={{
              backgroundColor: color,
              height: '35%',
              width: '0.7rem',
              borderRadius: '2rem',
              marginLeft: '1rem'
            }}
          /> */}
          {title ? <div style={{ marginLeft: '1rem',marginRight:'-1.1rem' }}>{title}</div> : null}
          {this.renderHeader()}
        </div>
        <div style={{ height: '1px', width: '100%', backgroundColor: '#e9e9e9' }} />
        <Motion style={{ x: spring(editNum / 2) }}>
          {mot => (
            <div
              className="box h"
              style={{
                width: this.level===1?'100%':100 * this.level / 2 + '%',
                height: '88%',
                transform: this.level === 1?`translate(0%, 0%)`:`translate(${-50 * mot.x}%, 0%)`
              }}>
              {this.renderBlock(this.data)}
            </div>
          )}
        </Motion>
      </div>
    )
  }
  // 渲染顶部栏目
  renderHeader = () => {
    let arr = []
    let { selectedNames, editNum } = this.state
    let { tip = defaultTip, color = defaultColor } = this.props
    for (let i = 0, len = selectedNames.length; i < len; i++) {
      let ele = selectedNames[i]
      // 当文字等于tip默认文字时，显示选中
      let isTip = ele === tip
      // 当列表为长度最后一个时，显示选中
      if (editNum === this.level - 1) {
        if (editNum === i) {
          isTip = true 
        } else {
          isTip = false
        }
      }
      arr.push(
        <SelectorTip level={i} color={color} selected={isTip} onClick={this.changeHeader}>
          {ele}
        </SelectorTip>
      )
    }
    return arr
  }
  // 当点击header的按钮时
  changeHeader = level => {
    let { selecteds, selectedNames } = this.state
    let { tip = defaultTip } = this.props

    let newSeles = []
    let newSeleNames = []
    for (let i = 0, len = selecteds.length; i < len; i++) {
      if (i > level) {
        newSeles.push(-1)
        newSeleNames.push('')
      } else if (i === level) {
        newSeles.push(-1)
        newSeleNames.push(tip)
      } else {
        newSeles.push(selecteds[i])
        newSeleNames.push(selectedNames[i])
      }
    }
    this.setState({
      editNum: level,
      selecteds: newSeles,
      selectedNames: newSeleNames
    })
  }
  //渲染中间的模块
  renderBlock = data => {
    let arr = []
    for (let i = 0, len = this.level; i < len; i++) {
      arr.push(
        <div className="box v" style={{ width: '100%', height: '100%' }}>
          <div
            style={{
              overflowY: 'scroll',
              WebkitOverflowScrolling: 'touch',
              width: '100%',
              height: '100%',
              textAlign: 'center',
              backgroundColor: i % 2 === 0 ? '#f9f9f9' : '#f3f3f3'
            }}>
            <div style={{ width: '100%', height: '0.5rem' }} />
            {this.renderCells(data, i)}
            <div style={{ width: '100%', height: '1rem' }} />
          </div>
        </div>
      )
    }
    return arr
  }
  // 渲染每个模块的cell
  renderCells = (data, num) => {
    let arr = []
    let { type, color = defaultColor } = this.props
    let { selecteds, nowDatas } = this.state
    // 根据层级渲染
    let level = 0 //数据当前层级
    // 递归数据，渲染当前层级的数据
    let reAdd = data => {
      if (!data) return
      for (let i = 0, len = data.length; i < len; i++) {
        let ele = data[i]
        if (ele) {
          // 如果 num > 当前层级, 显示把selecteNum中的编号读取data层级1的内容，进行下一集遍历
          if (num > level) {
            if (i === selecteds[level] && selecteds[level] > -1) {
              let next = ele.data
              level += 1
              reAdd(next)
              break
            }
          } else if (num === level) {
            // 如果 num === level 当前层级, 显示所有列表
            // 插入一个数据div
            let isSelected = false
            if (nowDatas[num]) {
              isSelected = nowDatas[num].title === ele.title ? true : false
            }

            arr.push(
              <SelectorCell
                color={color}
                selected={isSelected}
                level={level}
                num={i}
                data={ele}
                onClick={this.changeCell}>
                {ele.title}
              </SelectorCell>
            )
          }
        }
      }
    }
    reAdd(data) //递归数据
    return arr
  }
  //当某个cell被点击时
  changeCell = (level, num, data) => {
    let { selecteds, selectedNames, nowDatas } = this.state
    let { tip = defaultTip, onChange } = this.props
    let newSeles = []
    let newSeleNames = []
    let newDatas = []
    try {
      for (let i = 0, len = selecteds.length; i < len; i++) {
        if (i > level) {
          newSeles.push(-1)
          // 当上一个顶部名称不等于tip时，把一个tip加入数组
          if (newSeleNames[newSeleNames.length - 1] !== tip) {
            newSeleNames.push(tip)
          }
        } else if (i === level) {
          newSeles.push(num)
          newSeleNames.push(data.title)
          newDatas.push({ title: data.title, code: data.code, level: level, num: num })
        } else {
          newSeles.push(selecteds[i])
          newSeleNames.push(selectedNames[i])
          newDatas.push(nowDatas[i])
        }
      }
    } catch (err) {}
    this.setState(
      {
        nowDatas: newDatas,
        editNum: level,
        selecteds: newSeles,
        selectedNames: newSeleNames
      },
      () => {
        let { nowDatas, selecteds, selectedNames, editNum } = this.state
        let str = ''
        try {
          var isLast = data.data.length === 0 ? true : false
        } catch (error) {
          var isLast = true
        }

        for (let i = 0, len = nowDatas.length; i < len; i++) {
          try {
            let ele = nowDatas[i].title
            data = nowDatas[i]
            str += ele + ' '
          } catch (err) {}
        }
        if (onChange) {
          onChange({ str, data, nowDatas, selecteds, selectedNames, editNum, isLast })
        }
      }
    )
  }

  // 默认渲染
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {this.renderLoading()}
        {this.renderSelector()}
      </div>
    )
  }
}
module.exports = Comp

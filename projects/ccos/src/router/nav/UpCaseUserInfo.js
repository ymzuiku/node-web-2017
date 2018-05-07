let React = require('react')
let { ac, so, api } = require('../../model/api')
let CpPlan = require('../../CpComp/CpPlan')
let CpButton = require('../../CpComp/CpButton')
let colors = require('../../model/colors')
let upCaseData = require('../../model/upCaseData')



module.exports = class UpCaseUserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.params = this.props.match.params
    this.id = this.params.id
    let pc = window.pc()
    let data = this.changeDoctor(upCaseData)
    this.state = {
      data: data,
      pc: pc,
      data_pre:{check_data:'- -', check_result_yang:'- - '},
      name:null,
      age:null,
    }
  }
  componentDidMount() {
    so.dispatch(ac.ui({ navTitle: '录入阳性数据' }))
    document.body.style.backgroundColor = colors.white2
    api.get_patient_detail({ id: this.id }, res => {
      if(res.data && res.data.length > 0) {
        this.setState({
          // data:res.data[0].data,
          data_pre:res.data_pre[0],
          name:res.data[0].name,
          age:window.q.regIdcardInfo(res.data[0].idcard).age,
        })
      }
    })
  }
  componentWillUnmount() {
    document.body.style.backgroundColor = colors.white1
  }
  send = (num) => {
    let { data } = this.state
    if(num < data.length) {
      data[num].type = 'edited'
    }
    // 细胞学 跳转
    if (num === 0) {
      data[1].type = 'open'
    }
    // 临床操作记录-阴道镜检查 跳转
    if (num === 1) {
       if ((data[1].data[2].value === '未取样' && data[1].data[3].value === '已取样') || data[1].data[2].value === '单点活检') {
        data[2].type = 'open'
        data[3].type = 'hidden'
        if(data[1].data[2].value === '未取样'){
          data[2].data[0].hidden = true 
          data[2].data[0].value = '无' 
        } else {
          data[2].data[0].hidden = false 
        }
        if(data[1].data[3].value === '未取样'){
          data[2].data[1].hidden = true 
          data[2].data[1].value = '无' 
        } else {
          data[2].data[1].hidden = false 
        }
      } else if (data[1].data[2].value === '多点活检') {
        data[2].type = 'hidden'
        data[3].type = 'open'
        if(data[1].data[3].value === '未取样'){
          data[2].data[1].hidden = true 
          data[2].data[1].value = '无' 
        } else {
          data[2].data[1].hidden = false           
        }
      } else {
        data[2].type = 'hidden'
        data[3].type = 'hidden'
        data[4].type = 'open'
      }
    }
    else if (num === 2 || num === 3) {
      data[4].type = 'open'
    }
    else if (num === 4) {
      data[5].type = 'open'
    }
    data = this.changeDoctor(data)
    this.setState({
      data: data
    })
    api.update_patient({ id: this.id, data: JSON.stringify(data) }, (res) => {
      // window.msgtip(res.msg)
    })
  }
  changeDoctor = (data)=>{
    data.map((v, i) => {
      if (v.doctor === '' && v.type === 'open') {
        v.doctor = so.getState().user.name
        v.time = window.q.now(1)
        v.longTime = window.q.now()
      }
    })
    return data
  }
  render() {
    let { data, pc, } = this.state
    return (
      <div>
        <div style={{ height: 20, }} />
        <CpPlan style={{padding:20}} >
          <div style={{flexDirection:'row'}} >
          <div style={{flexDirection:'row', minWidth:220}} >
            <div >患者名字:</div>
            <div style={{marginLeft:10, color:colors.black1}} >{this.state.name}</div>
          </div>
          <div style={{flexDirection:'row', minWidth:220}} >
            <div >患者年龄:</div>
            <div style={{marginLeft:10, color:colors.black1}}>{this.state.age}</div>
          </div>
          </div>
          <div style={{flexDirection:'row',}} >
          <div style={{flexDirection:'row', minWidth:220}} >
            <div>上次HPV检测时间:</div>
            <div style={{marginLeft:10, color:colors.black1}}>{this.state.data_pre.check_date}</div>
          </div>
          <div style={{flexDirection:'row', minWidth:220}} >
            <div>阳性结果:</div>
            <div style={{marginLeft:10, color:colors.black1}}>{this.state.data_pre.check_result_yang}</div>
          </div>
          </div>
          <div></div>
        </CpPlan>
        {data.map((v, cardNum) => {
          let isOpen = v.type === 'open' || v.type === 'read'
          if (v.type === 'hidden') {
            return <div key={v.title} ></div>
          }
          return (
            <CpPlan key={v.title} style={{ padding: pc ? 20 : 10 }} >
              <div style={{ flexDirection: 'row', justifyContent: 'space-between', fontSize: 15 }} >
                <div style={{ marginRight: 10, fontSize: 18, fontWeight: isOpen ? 600 : 400, color: isOpen ? colors.black1 : colors.black3 }} >{v.title}</div>
                <div style={{ flexDirection: 'row', alignItems: 'center' }} >
                  <div style={{ fontSize: 13, color: colors.black3, marginRight: 7 }} >医师: </div>
                  <div style={{ marginRight: 15, }} >{v.type==='open'?so.getState().user.name:v.doctor}</div>
                  <div style={{ fontSize: 13, color: colors.black3, marginRight: 7 }} >编辑时间: </div>
                  <div  >{v.time}</div>
                </div>
              </div>
              <div style={{ height: 10 }} ></div>
              <div style={{ height: 1, width: '100%', background: '#f1f1f1' }} ></div>
              {/* 还未编辑的box */}
              {v.type === 'willopen' ? <div></div> : null}
              {/* 打开的box */}
              {v.type === 'open' ? <div>
                {/* 解析行 */}
                {v.data.map((cell, cellNum) => {
                  if (cell.hidden) {
                    return <div key={cell.key} ></div>
                  }
                  return <div key={cell.key} style={{ marginTop: 20 }} >
                    <div style={{ fontSize: 16, color: colors.black1 }} >{cell.key}</div>
                    <div style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }} >
                      {/* 解析选项 */}
                      {cell.read ? <div>{cell.value}</div> : cell.data.map((pick, i) => {
                        let name = cell.radio
                        return <div key={pick} style={{ flexDirection: 'row', alignItems: 'center' }} >
                          <input className='radio' type="radio" onClick={() => {
                            cell.value = pick

                            //细胞学是否取样逻辑判断
                            if (v.title === '细胞学' && cellNum === 0) {
                              if (pick === '已取样') {
                                v.data[1].hidden = false
                                v.data[1].value = ''
                              } else {
                                v.data[1].hidden = true
                                v.data[1].value = pick
                              }
                            }

                            //VIA\VILI 逻辑判断
                            if (v.title === '临床操作记录-阴道镜检查') {
                              if (cell.key === 'VIA:') {
                                v.data[1].value = pick
                                v.data[0].value = '无'
                              } else if (cell.key === 'VILI:') {
                                v.data[0].value = pick
                                v.data[1].value = '无'
                              }

                              //活体组织检查 ECC 逻辑判断
                              if (cell.key === '活体组织检查:') {
                                cell.value = pick
                              } 
                              if (cell.key === 'ECC:') {
                                cell.value = pick
                              }
                            }
                            if (v.title === '组织学诊断结果' || v.title === '活检病理诊断') {
                              let maxString = ''
                              // 计算最大值最终病理诊断：
                              let maxNum = 0
                              v.data.map((_v, _i) => {
                                if (_v && !_v.read && _v.data) {
                                  _v.data.map((arrString, arrNum) => {
                                    if (arrString === _v.value) {
                                      if (arrNum >= maxNum) {
                                        maxNum = arrNum
                                        maxString = arrString
                                      }
                                    }
                                  })
                                }
                              })
                              v.data[v.data.length - 1].value = maxString

                              // 统一设置state
                              this.setState({
                                data: data
                              })
                            }
                            // if (v.title === '临床操作记录-治疗') {
                            //   v.data.map((_v, _i) => {
                            //     if (_v && !_v.read && _v.data) {
                            //       _v.data.map((arrString, arrNum) => {
                            //         if (arrString === _v.value) {

                            //           if(arrString === '未做' || arrString === '热凝' || arrString === '冷冻'){
                            //             data[5].data[0].data = ['NA']
                            //           } else {
                            //             data[5].data[0].data = upCaseData[5].data[0].data
                            //           }
                            //         }
                            //       })
                            //     }
                            //   })
                            // }
                            this.setState({
                              data: [...data]
                            })
                          }} id="wechat" style={{
                            transform: `translate(0px,-2px) scale(1.4, 1.4)`, marginRight: 10
                          }} name={name} />
                          <div style={{ marginRight: 20 }} >{pick}</div>
                        </div>
                      })}
                    </div>
                  </div>
                })}
                <div style={{ alignItems: 'center' }} >
                  <textarea name="msg" id="msg" cols="30" rows="10" onChange={(e) => {
                    v.msg = e.target.value
                    this.setState({
                      data: data
                    })
                  }} defaultValue={data[cardNum].msg} placeholder="医师意见" style={{
                    borderColor: '#d8d8d8', width: '100%', height: 85, marginTop: 25, padding: 8
                  }} >
                  </textarea>
                  <CpButton onClick={() => {
                    let canSend = true
                    v.data.map((_v, _i) => {
                      if (_v.value === '') {
                        canSend = false
                      }
                    })
                    if (!canSend) {
                      window.msgtip(`请完整填写${v.title}中的选项`)
                    } else {
                      this.send(cardNum)
                    }
                  }} icon='./icon/right-white.png' style={{ maxWidth: 440, height: 45, marginTop: 20 }} >提交</CpButton>
                </div>
              </div> : null}
              {/* 可再编辑 */}
              {v.type === 'edited'||v.type === 'read' ? <div>
                {v.data.map((cell, cellNum) => {
                  
                  if (cell.hidden) {
                    return <div key={cell.key} ></div>
                  }
                  return <div key={cell.key} style={{ flexDirection: 'row', marginTop: 10 }} >
                    <div style={{ fontSize: 16, color: colors.black1 }} >{cell.key}</div>
                    <div style={{ flexDirection: 'row', marginLeft: 10 }} >
                      <div>{cell.value}</div>
                    </div></div>
                })}
                <div style={{ flexDirection: 'row', marginTop: 10 }} >
                  <div style={{ fontSize: 16, color: colors.black1 }}>医师意见:</div>
                  <div style={{ flexDirection: 'row', marginLeft: 10 }}>{data[cardNum].msg}</div>
                </div>
                <div style={{ alignItems: 'center' }} >
                  {v.type === 'edited'?<CpButton onClick={() => {
                    v.type = 'open'
                    v.doctor = so.getState().user.name
                    this.setState({
                      data: data,
                    })
                  }} icon='./icon/edit-white.png' style={{ maxWidth: 250, height: 45, marginTop: 20 }} >编辑</CpButton>:null}
                </div>
              </div> : null}
            </CpPlan>
          )
        })}
        <CpPlan>
          <div style={{ alignItems: 'center' }} >
            <div style={{ fontSize: 18, color: colors.black1, marginTop: 10 }}>{data[5].type==='read'?'已归档':'归档'}</div>
            <div>结束流程后数据不可更改。请仔细检查输入项，确认无误后再结束流程。</div>
            {data[5].type==='read'?null:<CpButton onClick={() => {
              data.map((v)=>{
                v.type = 'read'
              })
              this.setState({
                data:data
              })
              this.send(99)
            }} icon='./icon/right-white.png' style={{ maxWidth: 440, height: 45, marginTop: 20 }} >流程结束</CpButton>}
            <div style={{ height: 10 }} ></div>
          </div>
        </CpPlan>
        <div style={{height:24}} ></div>
      </div>
    )
  }
}












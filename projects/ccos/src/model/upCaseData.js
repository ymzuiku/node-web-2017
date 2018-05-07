let _type = ['willopen', 'open', 'edited', 'read', 'hidden']

let upCaseData = [
  {
    key:0,
    type: _type[1],
    title: '细胞学',
    doctor: '',
    time: '',
    longTime:'',
    msg: '',
    data: [
      {radio:'是否需要取样', key: '是否需要取样:', data: ['未取样', '已取样', '不需要取样'], value: '',hidden:false, },
      {
        radio:'结果',
        key: '结果:',
        data: ['正常', 'ASCUS', 'ASC-H', 'LSIL', 'HSIL', 'CSS', 'AGC'],
        value: '',
        hidden:true,
      }
    ]
  },
  {
    key:1,
    type: _type[0],
    title: '临床操作记录-阴道镜检查',
    doctor: '',
    time: '',
    longTime:'',
    msg: '',
    data: [
      {radio:'VIA', key: 'VIA:', data: ['未做','阴性', '阳性', ], value: '' },
      {radio:'VIA', key: 'VILI:', data: ['未做','阴性', '阳性', ], value: '' },
      {radio:'活体组织检查', key: '活体组织检查:', data: ['未取样', '单点活检', '多点活检'], value: '' },
      {radio:'ECC', key: 'ECC:', data: ['未取样', '已取样'], value: '' },
      {radio:'阴道镜印象', key: '阴道镜印象:', data: ['正常宫颈','低度病变','高度病变', '可疑癌', '其他', ], value: '' }
    ]
  },
  {
    key:2,
    type: _type[0],
    title: '组织学诊断结果',
    doctor: '',
    time: '',
    longTime:'',
    msg: '',
    data: [
      {
        radio:'活检病理诊断',
        key: '活检病理诊断:',
        data: ['未见病变', 'HPV感染', 'CIN1', 'CIN2', 'CIN3', '原位癌', '浸润癌'],
        hidden:false,
        value: ''
      },
      {
        radio:'ECC病理诊断',
        key: 'ECC病理诊断:',
        data: ['未见病变', 'HPV感染', 'CIN1', 'CIN2', 'CIN3', '原位腺癌', '浸润腺癌'],
        hidden:false,
        value: ''
      },
      { key: '最终病理诊断:', data:[], value: '--', read: true }
    ]
  },
  {
    key:3,
    type: _type[0],
    title: '活检病理诊断',
    doctor: '',
    time: '',
    longTime:'',
    msg: '',
    data: [
      {
        radio:'象限I',
        key: '象限I:',
        data: ['未见病变', 'HPV感染', 'CIN1', 'CIN2', 'CIN3', '原位癌', '浸润癌'],
        hidden:false,
        value: ''
      },
      {
        radio:'象限II',
        key: '象限II:',
        data: ['未见病变', 'HPV感染', 'CIN1', 'CIN2', 'CIN3', '原位癌', '浸润癌'],
        hidden:false,
        value: ''
      },
      {
        radio:'象限III',
        key: '象限III:',
        data: ['未见病变', 'HPV感染', 'CIN1', 'CIN2', 'CIN3', '原位癌', '浸润癌'],
        hidden:false,
        value: ''
      },
      {
        radio:'象限IV',
        key: '象限IV:',
        data: ['未见病变', 'HPV感染', 'CIN1', 'CIN2', 'CIN3', '原位癌', '浸润癌'],
        hidden:false,
        value: ''
      },
      {
        radio:'ECC病理诊断',
        key: 'ECC病理诊断:',
        data: ['未见病变', 'HPV感染', 'CIN1', 'CIN2', 'CIN3', '原位癌', '浸润癌'],
        hidden:false,
        value: ''
      },
      { key: '最终病理诊断:',data:[],  value: '--', read: true }
    ]
  },
  {
    key:4,
    type: _type[0],
    title: '临床操作记录-治疗',
    doctor: '',
    time: '',
    longTime:'',
    msg: '',
    data: [
      {radio:'治疗', key: '治疗:', data: ['未做', '热凝', '冷冻', 'LEEP', '子宫次全切', '子宫全切', '其它'], value: '' },
      {
        radio:'随访',
        key: '随访:',
        data: ['无', '6个月', '12个月', '18个月', '24个月', '30个月', '36个月'],
        value: ''
      }
    ]
  },
  {
    key:5,
    type: _type[0],
    title: '手术后病理诊断',
    doctor: '',
    time: '尚无',
    msg: '',
    data: [
      {
        radio:'诊断结果',
        key: '诊断结果:',
        data: ['NA', '未见病变', 'HPV感染', 'CIN1', 'CIN2', 'CIN3', '原位癌', '浸润癌'],
        value: ''
      }
    ]
  },
]

module.exports = upCaseData




// let _shiFouXuYaoQuYang = ['已取样', '未取样', '不需要取样']
// let _xibaoxueResult = ['正常', 'ASCUS', 'ASC-H', 'LSIL', 'HSIL', 'CSS', 'AGC']
// let _VIA = ['未做', '阳性', '阴性']
// let _VILI = ['未做', '阳性', '阴性']
// let _huoTiZhuZhiJianCha = ['未取样', '单点活检', '多点活检']
// let _ECC = ['未取样', '已取样']
// let _yingDaoJingYingXiang = ['可疑癌', '高度病变', '低度病变', '其他', '正常宫颈']
// let _huoJianBingLiZhenDuan = ['未见病变', 'HPV感染', 'CIN1', 'CIN2', 'CIN3', '原位癌', '浸润癌']
// let _ECCBingLiZhenDuan = ['未见病变', 'HPV感染', 'CIN1', 'CIN2', 'CIN3', '浸润腺癌', '浸润腺癌']
// let _zhiLiao = ['未做', '热凝', '冷冻', 'LEEP', '子宫次全切', '子宫全切', '其它']
// let _suiFang = ['无', '6个月', '12个月', '18个月', '24个月', '30个月', '36个月']
// let _zengDuanJieGuo = ['NA', '未见病变', 'HPV感染', 'CIN1', 'CIN2', 'CIN3', '原位癌', '浸润癌']
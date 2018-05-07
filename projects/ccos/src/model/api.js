let { Get, Post } = require('./utils')
let uri = 'http://csccponline.cn/admin'
let dev = window.location.href.indexOf(':30') > 0 || window.location.href.indexOf('workos.top') > 0
if (dev) {
  uri = 'http://csccponline.cn/admin'
}
let ac = require('./action')
let so = require('./store')
window.path = '/ccos'
if (dev) {
  window.path = ''
}

let check = function (res, event, err) {
  // if (dev) {
  //   console.log(res)
  // }
  if (typeof (res) === 'string') {
    res = JSON.parse(res)
  }
  if (res.status !== '200') {
    if (res.msg) {
      window.msgerr(res.msg)
    } else if (dev) {
      window.msgerr('接口访问错误')
    }
    if (err) {
      err(res)
    }
  } else {
    if (event) {
      event(res)
    }
  }
}

let api = {
  getTelCode: function (data = { tel: '' }, event) {
    Post(
      uri + '/?g=api&m=hd&a=send_tel_code',
      {
        tel: data.tel
      },
      res => {
        check(res, event)
      }
    )
  },
  // 手机号登录/注册接口
  sign: function (data = { tel: '', code: '' }, event) {
    Post(
      uri + '/?g=api&m=hd&a=tel_login',
      {
        tel: data.tel,
        code: data.code
      },
      res => {
        res = JSON.parse(res)
        if (res.status !== '200') {
          // window.msginfo(res.msg)
          event(res)
        } else {
          so.dispatch(ac.login({ token: res.token, cid: res.cid }))
          so.dispatch(ac.user({ tel: data.tel }))
          // 读取用户信息
          api.person(() => {
            event(res)
          })
        }
      }
    )
  },
  // 前端Token登录验证接口
  token: function (event) {
    Post(
      uri + '/?g=api&m=hd&a=token_login',
      {
        token: so.getState().user.token
      },
      res => {
        check(res, (res) => {
          so.dispatch(ac.login({ token: res.token, cid: res.cid }))
          event(res)
        })
      }
    )
  },
  // 产品信息接口
  produckList: function (event) {
    Get(uri + '/?g=api&m=hd&a=product', res => {
      check(res, event)
    })
  },
  //开通医院城市列表接口
  city: function (event) {
    Get(uri + '/?g=api&m=hd&a=city', res => {
      check(res, event)
    })
  },
  // 个人信息接口
  person: function (event = () => { }) {
    Post(
      uri + '/?g=api&m=hd&a=person',
      {
        token: so.getState().user.token
      },
      res => {
        res = JSON.parse(res)
        if (res.status !== '200') {
          window.msgerr(res.msg)
          so.dispatch(ac.clean())
        } else {
          var data = res.data[0]
          so.dispatch(
            ac.user({
              id: data.id,
              name: data.name,
              idcard: data.idcard,
              tel: data.tel,
              comname: data.comname,
              comcode: data.comcode,
              combossname: data.combossname,
              combossid: data.combossid,
              comauthority: data.comauthority,
              status_com: Number(data.status_com),
              doctorcode: data.doctorcode,
              doctorhospital: data.doctorhospital,
              status_pro: Number(data.status_pro),
              regtime: data.regtime,
              parent: data.parent
            })
          )
          event(res)
        }
      }
    )
  },
  // 个人订单信息接口
  userOrder: function (event) {
    Post(
      uri + '/?g=api&m=hd&a=order',
      {
        token: so.getState().user.token
      },
      res => {
        check(res, event)
      }
    )
  },
  // 企业用户升级申请接口
  apply_com: function (
    data = { name: '', code: '', bossid: '', authority: '' },
    event
  ) {
    Post(
      uri + '/?g=api&m=hd&a=apply_com',
      {
        token: so.getState().user.token,
        name: data.name,
        code: data.code,
        bossid: data.bossid,
        authority: data.authority
      },
      res => {
        check(res, (res) => {
          so.dispatch(
            ac.user({
              comname: data.name,
              comcode: data.code,
              combossid: data.bossid,
              comauthority: data.authority
            })
          )
          event(res)
        })
      }
    )
  },
  // 图片上传地址
  url_updateImage: uri + '/?g=api&m=hd&a=upload',
  // 专业用户升级申请接口
  updateDoctor: function (data = { code: '', hospital: '' }, event) {
    Post(
      uri + '/?g=api&m=hd&a=apply_pro',
      {
        token: so.getState().user.token,
        code: data.code,
        hospital: data.hospital
      },
      res => {
        check(res, (res) => {
          so.dispatch(ac.user({
            doctorcode: data.code, doctorhospital:
              data.hospital
          }))
          event(res)
        })
      }
    )
  },
  // 个人信息更新接口
  updateUserInfo: function (data = { name: '', idcard: '' }, event) {
    Post(
      uri + '/?g=api&m=hd&a=person_info',
      {
        token: so.getState().user.token,
        name: data.name,
        idcard: data.idcard
      },
      res => {
        // res = JSON.parse(res)
        // if (res.status !== '200') {
        //   window.msgerr(res.msg)
        // } else {
        //   so.dispatch(ac.user({ name: data.name, idcard: data.idcard }))
        //   event(res)
        // }
        check(res, (res) => {
          so.dispatch(ac.user({ name: data.name, idcard: data.idcard }))
          event(res)
        })
      }
    )
  },
  //城市关联医院列表
  hospital: function (data = { city: '' }, event) {
    Post(
      uri + '/?g=api&m=hd&a=hospital',
      { city: data.city },
      res => {
        check(res, event)
      }
    )
  },
  save_order: function (
    req = {
      type: '',
      proid: '',
      amount: false,
      oid: 0,
      money: '',
      data: [{ tel: '', name: '', idcard: '', pcd: '', addr: '', ship: '' }]
    },
    event,
  ) {
    Post(
      uri + '/?g=api&m=hd&a=save_order',
      {
        token: so.getState().user.token,
        type: req.type,
        oid: req.oid,
        proid: req.proid,
        amount: req.amount || 1,
        money: req.money,
        data: JSON.stringify(req.data)
      },
      res => {
        check(res, event)
      }
    )
  },
  //订单服务列表接口
  load_orders: function (event) {
    Post(
      uri + '/?g=api&m=hd&a=order_detail',
      {
        token: so.getState().user.token
      },
      res => {
        check(res, event)
      }
    )
  },
  // 订单支付接口
  pay: function (data = { oid: '', payway: '', money: 999 }, event = () => { }) {
    Post(
      uri + '/?g=api&m=hd&a=pay',
      {
        token: so.getState().user.token,
        oid: data.oid,
        payway: data.payway,
        money: data.money
      },
      res => {
        check(res, event)
      }
    )
  },
  //订单支付完成回调接口
  payok: function (data = { oid: '', payway: '', payno: '' }, event = () => { }) {
    Post(
      uri + '/?g=api&m=hd&a=payok',
      {
        token: so.getState().user.token,
        oid: data.oid,
        payway: data.payway,
        money: data.money,
        payno: data.payno
      },
      res => {
        check(res, event)
      }
    )
  },
  //订单开通服务接口
  service_create: function (data = { oid: '' }, event = () => { }) {
    console.log('service_create')
    Post(
      uri + '/?g=api&m=hd&a=service_create',
      {
        token: so.getState().user.token,
        oid: data.oid
      },
      res => {
        check(res, event)
      }
    )
  },
  order_service2:(event = () => { }) =>{
    Post(
      uri + '/?g=api&m=hd&a=order_service',
      {
        token: so.getState().user.token
      },
      res => {
        check(res, event)
      }
    )
  },
  //订单服务列表接口
  order_service:(event = () => { }) =>{
    Post(
      uri + '/?g=api&m=hd&a=order_service',
      {
        token: so.getState().user.token
      },
      res => {
        check(res, event)
      }
    )
  },
  //订单服务退款申请接口
  order_service_refund: function (data = { sid: '' }, event = () => { }) {
    Post(
      uri + '/?g=api&m=hd&a=order_service_refund',
      {
        token: so.getState().user.token,
        sid: data.oid
      },
      res => {
        check(res, event)
      }
    )
  },
  // 服务详情接口
  order_service_detail: function (data = { sid: '' }, event = () => { }) {
    Post(
      uri + '/?g=api&m=hd&a=order_service_detail',
      {
        token: so.getState().user.token,
        sid: data.sid
      },
      res => {
        check(res, event)
      }
    )
  },
  // 绑定样本接口
  order_service_sample_code: function (data = { sid: '', code: '' }, event = () => { }) {
    Post(
      uri + '/?g=api&m=hd&a=order_service_sample_code',
      {
        token: so.getState().user.token,
        sid: data.sid,
        code: data.code
      },
      res => {
        check(res, event)
      }
    )
  },
  // 绑定上门取件地址接口
  order_service_sample_addr: function (
    data = { sid: '', pcd: '', addr: '' },
    event = () => { }
  ) {
    Post(
      uri + '/?g=api&m=hd&a=order_service_sample_addr',
      {
        token: so.getState().user.token,
        pcd: data.pcd,
        sid: data.sid,
        addr: data.addr
      },
      res => {
        check(res, event)

      }
    )
  },
  //企业订单余量接口
  order_balance: function (event = () => { }) {
    Post(
      uri + '/?g=api&m=hd&a=order_balance',
      {
        token: so.getState().user.token
      },
      res => {
        check(res, event)

      }
    )
  },
  // 企业项目列表接口
  get_project: function (event = () => { }) {
    Post(
      uri + '/?g=api&m=hd&a=get_project',
      {
        token: so.getState().user.token
      },
      res => {
        check(res, event)
      }
    )
  },
  project_save: function (
    data = {
      pid: 0,
      name: '',
      proid: '',
      amount: '',
      age: '',
      input: false,
      local: false,
      pcd: '',
      addr: '',
      remark: '',
      status: ''
    },
    event = () => { }
  ) {
    Post(
      uri + '/?g=api&m=hd&a=project_save',
      {
        token: so.getState().user.token,
        pid: data.pid,
        name: data.name,
        proid: data.proid,
        data: JSON.stringify([{
          amount: data.amount,
          age: data.age,
          input: data.input || false,
          local: data.local || false,
          pcd: data.pcd || false,
          addr: data.addr,
          remark: data.remark,
        }]),
        status: data.status || '进行中'
      },
      res => {
        check(res, event)
      }
    )
  },
  get_project_detail: function (data = { pid: '' }, event) {
    Post(uri + '/?g=api&m=hd&a=get_project_detail', {
      token: so.getState().user.token,
      pid: data.pid
    }, (res) => {
      check(res, event)
    })
  },
  project_user_list: function (data = { pid: '', page: 1 }, event) {
    Post(uri + '/?g=api&m=hd&a=project_user_list', {
      token: so.getState().user.token,
      pid: data.pid,
      page: data.page,
    }, (res) => {
      check(res, event)
    })
  },
  add_patient: function (v = { idcard: '患者身份证', hid: '合作医院id', hname: '合作医院名称' }, event) {
    Post(uri + '/?g=api&m=hd&a=add_patient', { ...v, token: so.getState().user.token }, (res) => {
      check(res, event)
    })
  },
  get_patient: function (event) {
    Post(uri + '/?g=api&m=hd&a=get_patient', {
      token: so.getState().user.token,
    }, (res) => {
      check(res, event)
    })
  },
  search_patient: function (v = { idcard: '' }, event) {
    Post(uri + '/?g=api&m=hd&a=search_patient', {
      ...v,
      token: so.getState().user.token,
    }, (res) => {
      check(res, event)
    })
  },
  get_patient_detail: function (v = { id: '' }, event) {
    Post(uri + '/?g=api&m=hd&a=get_patient_detail', {
      ...v,
      token: so.getState().user.token
    }, (res) => {
      check(res, event)
    })
  },
  update_patient: function (v = { id: '', data: [{ "项目a": "检测值", "项目b": "检测值" }] }, event) {
    Post(uri + '/?g=api&m=hd&a=update_patient', {
      ...v,
      token: so.getState().user.token
    }, (res) => {
      check(res, event)
    })
  },
  accept_service: function (v = { sid: '', tel: '', name: '', idcard: '', pcd: '', addr: '', ship: '' }, event) {
    Post(uri + '/?g=api&m=hd&a=accept_service', {
      ...v,
      token: so.getState().user.token,
    }, (res) => {
      check(res, event)
    })
  },
  accept_service_page: function (v = { sid: '' }, event) {
    Post(uri + '/?g=api&m=hd&a=accept_service_page', {
      ...v,
    }, (res) => {
      check(res, event)
    })
  },
  project_apply: function (v = { pid: '', proid: '', name: '', idcard: '', pcd: '', addr: '' }, event, err) {
    Post(uri + '/?g=api&m=hd&a=project_apply', {
      ...v,
      token: so.getState().user.token,
    }, (res) => {
      check(res, event, err)
    })
  },
  luruyuan_login: function (v = { tel: '', }, event, err) {
    Post(uri + '/?g=api&m=hd&a=luruyuan_login', {
      ...v,
    }, (res) => {
      res = JSON.parse(res)
      if (res.status === '200') {
        so.dispatch(ac.inputer({ token: res.token, projects: res.data }))
      }
      event(res)
    })
  },
  luruyuan_search: function (v = { pid: '', tel: '' }, event, err) {
    Post(uri + '/?g=api&m=hd&a=luruyuan_search', {
      ...v,
      token: so.getState().inputer.token,
    }, (res) => {
      //用户其实就三种状：已报名，已发放采样器，我们已收到您的样本
      res = JSON.parse(res)
      event(res)
      // check(res, event, err)
    })
  },
  luruyuan_fa: function (v = { pid: '', sid: '', }, event, err) {
    Post(uri + '/?g=api&m=hd&a=luruyuan_fa', {
      pid: v.pid,
      sid: v.sid,
      token: so.getState().inputer.token,
    }, (res) => {
      check(res, event, err)
    })
  },
  luruyuan_shou: function (v = { pid: '', sid: '', code: '' }, event, err) {
    Post(uri + '/?g=api&m=hd&a=luruyuan_shou', {
      pid: v.pid,
      sid: v.sid,
      code: v.code,
      token: so.getState().inputer.token,
    }, (res) => {
      check(res, event, err)
    })
  },
  luruyuan_fa_list: function (v = { pid: '' }, event, err) {
    Post(uri + '/?g=api&m=hd&a=luruyuan_fa_list', {
      ...v,
      token: so.getState().inputer.token,
    }, (res) => {
      check(res, event, err)
    })
  },
  luruyuan_baoming: function (v = {
    pid: '', tel: '', name: '', idcard: '', pcd: '', addr: ''
  }, event, err) {
    Post(uri + '/?g=api&m=hd&a=luruyuan_baoming', {
      ...v,
      token: so.getState().inputer.token,
    }, (res) => {
      check(res, event, err)
    })
  },
  get_project_act: function (v = {
    pid: ''
  }, event, err) {
    Post(uri + '/?g=api&m=hd&a=get_project_act', {
      ...v,
      token: so.getState().user.token,
    }, (res) => {
      check(res, event, err)
    })
  },
  tongji_com: function (v = {
    tel: '', name: '', idcard: '', sample_code: '', pid: '',
    aid: '', check_result: '', status: '', sample_date_start: '', sample_date_end: '',
    check_date_start: '', check_date_end: ''
  }, event, err) {
    Post(uri + '/?g=api&m=hd&a=tongji_com', {
      ...v,
      token: so.getState().user.token,
    }, (res) => {
      check(res, event, err)
    })
  },
  getArticle: function (v = { id: '' }, event, err) {
    Post(uri + '/index.php?g=api&m=hd&a=get_article', {
      ...v,
    }, (res) => {
      try {
        if (Object.prototype.toString.call(res) === '[object String]') {
          res = JSON.parse(res)
          
        }
        let data = String(res.data[0].content)
        res.data[0].content = data.replace(/<br>/g, '\r\n');
      } catch (error) {
        res = 'false'
      }
      check(res, event, err)
    })
  },
  getArticle2: function (v = { id: '' }, event, err) {
    Post(uri + '/index.php?g=api&m=hd&a=get_article', {
      ...v,
    }, (res) => {
      try {
        if (Object.prototype.toString.call(res) === '[object String]') {
          res = JSON.parse(res)
          
        }
        let data = String(res.data[0].content)
        res.data[0].content = data.replace(/<br>/g, '\r\n');
      } catch (error) {
        res = 'false'
      }
      check(res, event, err)
    })
  }
}

module.exports = {
  api: api,
  so: so,
  ac: ac,
  dev: dev,
}

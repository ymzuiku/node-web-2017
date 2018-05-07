var { mgo } = require('../exp/mgo')
let ServiceSampleData = require('./ServiceSampleData')
let makeLibraryData = {
  taskcode: String,
  func: String,
  taskstate: String,
  repianqu: String,
  shiyanyuan: String,
  musttime: String,
  comptime: Date,
  taskpusher: String,
  taskdowntime: String,
  taskchanger: String,
  tasklasttime: String,
  description: Array,
}

let makeLibraryTaskData = {
  bloodType: String,
  sampleCode: String,
  isFast: String,
  isCanStudy: String,
  productClass: String,
  sqlPlan: String,
  projectName: String,
  lineType: String,
  probeType: String,
  projectType: String,
  isAgain: String,
  firstGet: String,
  lastGet: String,
}


let Coll = mgo.model('makeLibrary', makeLibraryData)
let makeLibraryTaskColl = mgo.model('makeLibraryTask', makeLibraryTaskData)
// Coll.update({}, {taskcode:'17A12345678',comptime:new Date,func:'方法1'},{multi:true},(err, res)=>{})
let serve = {
  Coll: Coll,
  model: {
    makeLibraryData: makeLibraryData, makeLibraryTaskData: makeLibraryTaskData
  },
  createDatas: async (num = 50) => {
    let prod = ['产前', 'HPV', 'HLA']
    let prodName = ['Vietnam NIFTY-express-SCA+Y%', 'NIFTY-express-SCA+Y%', 'HLA-express-SCA+Y%']
    let testPlan = ['BGISEQ-100', 'BGISEQ-50', 'BGISEQ-500']
    let funcs = ['方法1', '特殊方法1', '方法2']
    let taskstate = ['开始', '未开始']
    let repianqu = ['武汉', '深圳', '', '', '']
    let shiyanyuan = ['小肖', '林戏雨', '王若若', '', '']
    let arr = []
    let description = [[1, 23, 32, 55, 7, 42, 53], [7, 42, 53], [1, 2, 3, 4, 45, 5, 6, 7, 8, 9]]
    ServiceSampleData.Coll.find((err, data) => {
      for (let i = 0; i < num; i++) {
        let samples = description[i % 3]
        let sampleIDs = []
        samples.map((v) => {
          sampleIDs.push(data[v])
        })
        let cell = new Coll({
          taskcode: '17T' + (10000) + i,
          func: funcs[i % 3],
          taskstate: taskstate[i % 2],
          repianqu: repianqu[i % 5],
          shiyanyuan: shiyanyuan[i % 5],
          musttime: new Date,
          comptime: new Date,
          taskpusher: shiyanyuan[(i + 123) % 5],
          taskdowntime: new Date,
          taskchanger: shiyanyuan[(i + 12) % 5],
          tasklasttime: new Date,
          description: sampleIDs,
        })
        arr.push(cell)
      }
      Coll.insertMany(arr, (err, data) => {
        console.log(data)
      })
    })
  },
  findData: (v = { start: 0, size: 50, ...makeLibraryData }, callback) => {
    Coll.find({}, (err, res) => {
      if (err) {
        console.error(err)
        res = false
      } else {
        if (callback) callback(res)
      }
    })
  },
  changeData: (v = { ...makeLibraryData }) => {
    var cell = new Coll(v)
    cell.save((err, product, mun) => {
      if (err) {
        console.error(err)
        res = false
      } else {
        if (callback) callback(res)
      }
    })
  },
  createTasks: async (num = 50) => {
    let prod = ['产前', 'HPV', 'HLA']
    let prodName = ['Vietnam NIFTY-express-SCA+Y%', 'NIFTY-express-SCA+Y%', 'HLA-express-SCA+Y%']
    let testPlan = ['BGISEQ-100', 'BGISEQ-50', 'BGISEQ-500']
    let funcs = ['方法1', '特殊方法1', '方法2']
    let taskstate = ['开始', '未开始']
    let boollll = ['是', '否']
    let repianqu = ['武汉', '深圳', '', '', '']
    let shiyanyuan = ['小肖', '林戏雨', '王若若', '', '']
    let arr = []
    for (let i = 0; i < num; i++) {
      let cell = new makeLibraryTaskColl({
        bloodType: testPlan[i % 3],
        sampleCode: '17T' + (10000) + i,
        isFast: boollll[i % 2],
        isCanStudy: boollll[i % 2],
        productClass: prod[i % 3],
        sqlPlan: testPlan[i % 3],
        projectName: prodName[i % 3],
        lineType: repianqu[i % 4],
        probeType: repianqu[i % 4],
        projectType: shiyanyuan[i % 5],
        isAgain: boollll[i % 2],
        firstGet: repianqu[i % 5],
        lastGet: repianqu[i % 5],
      })
      arr.push(cell)
    }
    makeLibraryTaskColl.insertMany(arr, (err, data) => {
      console.log(data)
    })
  },
  findTask: async (v = { ...makeLibraryTaskData }, callback) => {
    makeLibraryTaskColl.find({}, (err, res) => {
      if (err) {
        console.error(err)
        res = false
      } else {
        if (callback) callback(res)
      }
    })
  }
}
// funcs.createDatas(300)
// serve.createTasks(50)

module.exports = serve

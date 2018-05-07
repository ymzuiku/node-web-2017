var { mgo } = require('../exp/mgo')
let sampleData = {
  sampleCode: String,
  prodCode: String,
  prodClass: String,
  prodName: String,
  seqPlan: String,
  projectName: String,
  clientName: Date,
  seqType: String,
}

let Coll = mgo.model('sampleData', sampleData)
let funcs = {
  Coll:Coll,
  model: {data: sampleData },
  createDatas: (num=50) => {
    let prod = ['产前', 'HPV', 'HLA']
    let prodName = ['Vietnam NIFTY-express-SCA+Y%', 'NIFTY-express-SCA+Y%', 'HLA-express-SCA+Y%']
    let testPlan = ['BGISEQ-100', 'BGISEQ-50', 'BGISEQ-500']

    let arr = []
    for (let i=0; i < num; i++) {
      let cell = new Coll({
        sampleCode: '17T' + (10000 + i),
        prodCode: '18T' + (10000 + i),
        prodClass: prod[i % 3],
        prodName: prodName[i % 3],
        seqPlan: testPlan[i % 3],
        projectName: '某项目',
        clientName: '某医院',
        seqType: testPlan[i % 3],
      })
      arr.push(cell)
    }
    Coll.insertMany(arr, (err, data)=>{
      console.log(data)
    })
  },
  findData: (start = 0, size = 50, v = { ...sampleData }, callback = () => { }) => {
    Coll.find({}, (err, res) => {
      if (err) {
        console.error(err)
      } else {
        callback(res)
      }
    })
  },
  addData: (v = { ...sampleData }) => {
    var cell = new Coll(v)
    cell.save((err, product, mun) => {
      if (err) {
        console.error(err)
      } else {
        return (product)
      }
    })
  }
}

// funcs.createDatas(200)

module.exports = funcs
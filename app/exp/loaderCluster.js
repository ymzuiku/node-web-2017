const cluster = require('cluster');
const os = require('os')
const numCPUs = os.cpus().length

global.dev = process.env.dev === '1'
let platform = os.platform()
/**
 * 
 * @param {(process:string, dev:bool, platform:string)=>{}} event 
 */
let cpus = (event = (process, dev, platform) => { }, num=4) => {
  if(num===1){
    event(process.pid, dev, platform)
    return
  }
  if (cluster.isMaster) {
    // 线上开满进程
    if (!dev) {
      num = numCPUs
    }
    // fork进程
    for (let i = 0; i < num; i++) {
      cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
      log.l(`worker ${worker.process.pid} 退出`)
      log.l(`worker ${worker.process.pid} 退出`)
      if (!dev) {
        // 非开发模式 自动fork新进程
        console.log(`已自动fork一个worker`);
        cluster.fork()
      }
    });
  } else if (cluster.isWorker) {
    // 回调每个进程
    if (event) {
      event(dev, process.pid, platform)
    }
  }
}

module.exports = cpus
var cluster = require('cluster');
const os = require('os')
const numCPUs = os.cpus().length

// 斐波那契数
function fibo(n) {
  return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
}

// 用于测试
function singleRun() {
  var n = 8
  function back() {
    if (!--n) return console.timeEnd('no thread');
  }
  console.time('no thread');

  process.nextTick(function () {
    console.log(fibo(40));
    back();
  })
  process.nextTick(function () {
    console.log(fibo(40));
    back();
  })
  process.nextTick(function () {
    console.log(fibo(40));
    back();
  })
  process.nextTick(function () {
    console.log(fibo(40));
    back();
  })

  process.nextTick(function () {
    console.log(fibo(40));
    back();
  })

  process.nextTick(function () {
    console.log(fibo(40));
    back();
  })
  process.nextTick(function () {
    console.log(fibo(40));
    back();
  })
  process.nextTick(function () {
    console.log(fibo(40));
    back();
  })
}

//用于测试
//创建线程池，最大数为8
function testMaxRun() {
  var nowCpus = numCPUs - 1
  console.time(nowCpus + ' cluster');
  if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < nowCpus; i++) {
      cluster.fork();
    }
    var i = nowCpus;
    cluster.on('exit', function (worker, code, signal) {
      if (!--i) {
        console.timeEnd(nowCpus + ' cluster');
        process.exit(0);
      }
    });
  } else {
    console.log(fibo(40));
    process.exit(0);
    console.log('bb')
  }
}

function maxRun(fn, callback) {
  var nowCpus = numCPUs - 1
  console.time(nowCpus + ' cluster');
  if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < nowCpus; i++) {
      cluster.fork();
    }
    var i = nowCpus;
    cluster.on('exit', function (worker, code, signal) {
      if (!--i) {
        console.timeEnd(nowCpus + ' cluster');
        if (callback) callback()
        process.exit(0);
      }
    });
  } else {
    fn;
    process.exit(0);
  }
}

Object.defineProperty(global, '__maxRun',{
  get:function(){
    return maxRun
  }
})

Object.defineProperty(global, '__fibo',{
  get:function(){
    return fibo
  }
})

module.exports = maxRun

// 单线程
// singleRun()

// // 多线程
// __maxRun(__fibo(40), ()=>{
//   console.log('end')
// })
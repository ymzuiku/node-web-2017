var path = require('path')
var filePath = path.join(__dirname, '/../..', '/logs')

const log4js = require('log4js')
log4js.configure({
  appenders: { error: { type: 'file', filename: filePath+'/error.log',maxLogSize:1024*50,backups:999, pattern: "-yyyy-MM-dd-hh.log" } },
  categories: { default: { appenders: ['error'], level: 'error' } }
})
const logger = log4js.getLogger('l')

Object.defineProperty(global, '__stack', {
  get: function(){
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});

Object.defineProperty(global, '__line', {
  get: function(){
    return __stack[1].getLineNumber();
  }
})

Object.defineProperty(global, 'log',{
  get:function(){
    return logger
  }
})

//配置打印
log.l = console.log
log.i = (msg, ...args)=>{
  if(__conf.dev){
    console.log(msg, ...args)
  }
  log.info(msg, ...args)
}
log.f = (msg, ...args)=>{
  if(__conf.dev){
    console.log(msg, ...args)
  }
  log.fatal(msg, ...args)
}
log.e  = (msg, ...args)=>{
  if(__conf.dev){
    console.log(msg, ...args)
  }
  log.error(msg, ...args)
}
log.w = (msg, ...args)=>{
  if(__conf.dev){
    console.log(msg, ...args)
  }
  log.warn(msg, ...args)
}

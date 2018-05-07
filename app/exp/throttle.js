
let throttle = function(fn, longtime, self){
  longtime = longtime || 350
  var last, timer;
  return function(){
    var context = self || this
    var now = new Date()
    var args = arguments
    if(last && now - last<longtime){
      clearTimeout(timer);
      timer = setTimeout(function(){
        last = now;
        fn.apply(context, args)
      }, longtime)
    } else {
      last = now;
      fn.apply(context, args)
    }
  }
}
global.thr = throttle
module.exports = throttle
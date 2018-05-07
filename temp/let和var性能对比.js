console.time('var time')
for (var i = 0; i < 100000000; i++) {
  var num = 0
  var str = ''
  var obj = { a: 'a' }
  var arr = []
}
console.timeEnd('var time')
// timer1: 298.765ms
console.time('let time')
for (let i = 0; i < 100000000; i++) {
  let num = 0
  let str = ''
  let obj = { a: 'a' }
  let arr = []
}
console.timeEnd('let time')

// timer2: 3499.564ms
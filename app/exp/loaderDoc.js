let apidoc_list = []
let docType = {
  title:'',
  type:'normal',
  method:'GET',
  info:'',
  url:'',
  param:'',
  back:'',
}

Object.defineProperty(global, '__apidoc',{
  set:function(v=docType){
    var list = {
      num:apidoc_list.length+1,
      ...docType,
      ...v
    }
    apidoc_list.push(list)
  },
  get:function(){
    return apidoc_list
  }
})
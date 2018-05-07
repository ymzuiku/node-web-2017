var actions = {
  save: function () {
    return {
      type: 'save',
    }
  },
  load: function () {
    return {
      type:'load'
    }
  },
  clear: function () {
    return {
      type:'clear'
    }
  },
  login:function(token){
    return {
      type: 'login',
      token:token
    }
  },
  addTodo:function(num){
    return {
      type: 'add_todu',
      num:num
    }
  },
  removeTodo: function (num) {
    return {
      type: 'remove_todu',
      num:num
    }
  }
}

module.exports = actions
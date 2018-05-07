var $ = window.$

var Get = function (url, event, islog) {
  $.ajax({
    type: "GET",
    url: url,
    timeout:3000,
    contentType: "application/x-www-form-urlencoded",
    error: function (err) {
      console.log(err)
      event(false)
    },
    success: function (req) {
      event(req)
    },
    complete: function (req) {
      if (islog) {
        console.log(req) 
      }
    },
  })
}

var Post = function(url, data, event,islog) {
  $.ajax({
    type: "POST",
    url: url,
    data: data,
    timeout:3000,
    contentType: "application/x-www-form-urlencoded",
    error: function (err) {
      console.log(err)
      event(false)
    },
    success: function (req) {
      event(req)
    },
    complete: function (req) {
      if (islog) {
        console.log(req) 
      }
    },
  })
}

module.exports = {
  Get: Get,
  Post: Post
}



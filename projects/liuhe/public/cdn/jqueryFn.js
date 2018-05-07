; (function ($, window, document, undefined) {
  //双向绑定
  $.fn.vm = function (event) {
    $(this).on('input propertychange', function () {
      event(this)
    })
  }
  // button
  $.fn.vin = function (event) {
    $(this).on('mouseenter', function () {
      event(this)
    })
    $(this).on('touchstart', function(){
      event(this)
    })
  }
  $.fn.vout = function(event){
    $(this).on('mouseleave', function(){
      event(this)
    })
    $(this).on('touchcancel', function(){
      event(this)
    })
    $(this).on('touchend', function(){
      event(this)
    })
  }
})(jQuery, window, document);
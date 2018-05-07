;(function ($,window,document,undefined) {
  $.fn.vm = function (event) {
    $(this).on('input propertychange', function () {
      event(this)
    })
  }
})(jQuery, window, document);
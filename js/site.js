/**
 * @name Site
 * @description Global variables and functions
 * @version 1.0
 */

var Site = (function($, window, undefined) {
  'use strict';
  undefined;
  var privateVar = null,
      material,
      backToTop;
  material= {
    init: function() {
      return this.bind_events();
    },
    bind_events: function() {
      return $(document).on('click', '.btn-animate', function(e) {
        var circle, size, x, y;
        e.preventDefault();
        circle = $('<div class="circle"></div>');
        $(this).append(circle);
        x = e.pageX - $(this).offset().left - circle.width() / 2;
        y = e.pageY - $(this).offset().top - circle.height() / 2;
        size = $(this).width();
        circle.css({
            top: y + 'px',
            left: x + 'px',
            width: size + 'px',
            height: size + 'px'
        }).addClass('animate');
        return setTimeout(function() {
            return circle.remove();
        }, 500);
      });
    }
  };
  backToTop = {
    init:  function() {
      return this.handleEvent();
    },
    handleEvent: function() {
      var ele = $('body').find('[data-gotop]'),
          timer = 500;
      $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
          ele.fadeIn();
        } else {
          ele.fadeOut();
        }
      });
      ele.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, timer);
      });
    }
  };
  var privateMethod = function() {
    //focus input form
    $('.form-control').on('focus', function() {
        $(this).parents('.input-group').addClass('input-group-focus');
    }).on('blur', function() {
        $(this).parents('.input-group').removeClass('input-group-focus');
    });
    //Activate bootstrap-select
    $('[data-select]').selectpicker({
        tickIcon: ''
    });
    material.init();
    backToTop.init();
  };
  return {
      publicVar: privateVar,
      publicMethod: privateMethod
  };
})(window.jQuery, window);

window.jQuery(function() {
    Site.publicMethod();
});

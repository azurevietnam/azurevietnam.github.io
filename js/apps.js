// (function($, window, undefined) {
//     'use strict';
//     undefined;
//     var pluginName = 'gotop';

//     function Plugin(element, options) {
//       this.element = $(element);
//       this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
//       this.init();
//     }

//     Plugin.prototype = {
//       init: function() {
//         var that = this;
//         that.backToTop();
//       },

//       backToTop: function () {
//         var that = this,
//             timer = 500,
//             ele = that.element,
//         $(window).scroll(function() {
//           if ($(this).scrollTop() > 100) {
//             ele.fadeIn();
//           } else {
//             ele.fadeOut();
//           }
//         });

//         ele.on('click', function(e) {
//           e.preventDefault();
//           $('html, body').animate({
//             scrollTop: 0
//           }, timer);
//         });
//       },

//       destroy: function() {
//         $.removeData(this.element[0], pluginName);
//       }
//     };

//     $.fn[pluginName] = function(options, params) {
//       return this.each(function() {
//         var instance = $.data(this, pluginName);
//         if (!instance) {
//           $.data(this, pluginName, new Plugin(this, options));
//         } else if (instance[options]) {
//           instance[options](params);
//         }
//       });
//     };

//     $.fn[pluginName].defaults = {
//       key: 'value',
//       onCallback: null
//     };

//     $(function() {
//       $('[data-' + pluginName + ']')[pluginName]();
//     });

//   }(window.jQuery, window));

(function($, window, undefined) {
  undefined;
  'use strict';
  var pluginName = 'navigation',
      outWindowWidth = window.outerWidth,
      isDesktop = 1024;

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }
  Plugin.prototype = {
    init: function() {
      var that = this;
      that.activeMask();
      that.equalHeight();
    },

    activeMask: function() {
      var that = this,
          elm = that.element,
          items = elm.find('[data-cate-height] > li');
      if (outWindowWidth >= isDesktop) {
        items.mouseover(function() {
          $(this).parents('[data-navigation]').addClass('active');
          $(this).parents('[data-navigation]').siblings('.overlay').addClass('overlay__active');
        })
        .mouseout(function() {
          $(this).parents('[data-navigation]').removeClass('active');
          $(this).parents('[data-navigation]').siblings('.overlay').removeClass('overlay__active');
        });
      }
    },

    equalHeight: function() {
      var that = this,
          elm = that.element,
          optHeight = that.options.cate_height,
          optCate = that.options.cate_sub,
          setHeight = elm.find(optHeight).outerHeight();
      if (outWindowWidth >= isDesktop) {
        elm.find(optCate).css({
            height: setHeight
        });
      }
    },

    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
          $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
          instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
      cate_height: '[data-cate-height]',
      cate_sub: '[data-cate-sub]'
  };

  $(function() {
      $('[data-' + pluginName + ']').on('customEvent', function() {
          // to do
      });

      $('[data-' + pluginName + ']')[pluginName]({
          key: 'custom'
      });
  });

}(window.jQuery, window));

(function($, window, undefined) {
  undefined;
  'use strict';
  var pluginName = 'lazy';

  function Plugin(element, options) {
      this.element = $(element);
      this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
      this.init();
  }

  Plugin.prototype = {
    init: function() {
      this.element.lazyload();
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    key: 'value',
    onCallback: null
  };

  $(function() {
    $('[data-' + pluginName + ']').on('customEvent', function() {
      // to do
    });

    $('[data-' + pluginName + ']')[pluginName]({
      key: 'custom'
    });
  });
}(window.jQuery, window));

(function($, window, undefined) {
  undefined;
  'use strict';
  var pluginName = 'menu-mobile',
      outWindowWidth = window.outerWidth,
      isMobile = 1024;

  function Plugin(element, options) {
      this.element = $(element);
      this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
      this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          elm = that.element;
      if (outWindowWidth <= isMobile) {
          elm.on('click. touchstart', '[data-menu-button]', function() {
              $(this).parents('body').toggleClass('open-menu');
          });
      }
    },
    destroy: function() {
        $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    key: 'value',
    onCallback: null
  };

  $(function() {
    $('[data-' + pluginName + ']').on('customEvent', function() {
      // to do
    });

    $('[data-' + pluginName + ']')[pluginName]({
      key: 'custom'
    });
  });
}(window.jQuery, window));

(function($, window, undefined) {
  undefined;
  'use strict';
  var pluginName = 'slider';

  function Plugin(element, options) {
      this.element = $(element);
      this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
      this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      that.centerMode();
    },
    centerMode: function() {
      var that = this,
          selt = that.element;
      selt.slick({
        nextArrow: '<button class="btn btn-circle btn-animate arrow-right" type="button"><i class="icon-ui icon-arrows-1"></i></button>',
        prevArrow: '<button class="btn btn-circle btn-animate arrow-left" type="button"><i class="icon-ui icon-arrows"></i></button>'
      });
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    key: 'value',
    onCallback: null
  };

  $(function() {
    $('[data-' + pluginName + ']').on('customEvent', function() {
      // to do
    });

    $('[data-' + pluginName + ']')[pluginName]({

    });
  });
}(window.jQuery, window));

// (function($, window, undefined) {
//   undefined;
//   'use strict';
//   var pluginName = 'plugin-name';

//   function Plugin(element, options) {
//       this.element = $(element);
//       this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
//       this.init();
//   }

//   Plugin.prototype = {
//     init: function() {

//     },
//     destroy: function() {
//       $.removeData(this.element[0], pluginName);
//     }
//   };

//   $.fn[pluginName] = function(options, params) {
//     return this.each(function() {
//       var instance = $.data(this, pluginName);
//       if (!instance) {
//         $.data(this, pluginName, new Plugin(this, options));
//       } else if (instance[options]) {
//         instance[options](params);
//       }
//     });
//   };

//   $.fn[pluginName].defaults = {
//     key: 'value',
//     onCallback: null
//   };

//   $(function() {
//     $('[data-' + pluginName + ']').on('customEvent', function() {
//       // to do
//     });

//     $('[data-' + pluginName + ']')[pluginName]({
//       key: 'custom'
//     });
//   });
// }(window.jQuery, window));

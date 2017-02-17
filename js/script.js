;(function($, window, undefined) {
  'use strict';
  var body = $('body');
  $('.nav-icon').click(function(){
    var nav = $('.header-wrap');
    nav.parents("body").toggleClass('overflow');
    $('.nav-icon').toggleClass('open');
    $('.menu-wrapper').toggleClass('active');
  });
  $('[data-scroll-up]').click(function () {
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
  });
  $('[data-toggle="modal"]').click(function() {
    var target = $(this).data('target');
    if($(target).not(':visible')) {
      $(target).css('display', 'block');
    }
  });
}(jQuery, window));


;(function($, window, undefined) {
  'use strict';
  var pluginName = 'show';
  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var selt = this.element,
          title = selt.find('.item-title').text(),
          desc = selt.find('.item-description').html(),
          img = selt.find('.item-photo').html(),
          price = selt.find('.item-price').text();
      selt.find('[data-popup]').click(function(){
        $(this).magnificPopup({
          items: {
            src: '<div class="popup-content">'+
                      '<div class="wrapper-skin">'+
                        '<div class="item-images">'+ img +'</div>'+
                          '<div class="wrapper-content">'+
                            '<h4 class="item-title"> '+ title +' </h4>'+
                            '<div class="item-price">'+ price +'</div>'+
                            '<div class="item-desc">'+ desc +'</div>'+
                          '</div>'+
                      '</div>'+
                    '</div>',
          }
        });
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
      key: 'custom'
    });
  });

}(jQuery, window));


;(function($, window, undefined) {
  'use strict';

  var pluginName = 'maps';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.getScript();
  }

  Plugin.prototype = {
    getScript: function () {
      var self = this;
      $.ajax({
        url: 'https://maps.googleapis.com/maps/api/js',
        dataType: 'script',
        data: {
          key: 'AIzaSyANssOu9Unjh2ug2duVwwM4IUzgvaGsytI'
        }
      })
        .done(function () {
          self.init();
        })
        .fail(function (err) {
          console.log(err);
        });
    },

    init: function() {
      this.initMap();
      this.loadInfo();
    },
    initMap: function () {
      this.map = new window.google.maps.Map(this.element[0], {
        center: {lat: 10.773638, lng: 106.7054409},
        zoom: 15,
        zoomControl: true,
        scaleControl: true,
      });
    },
    bindInfoWindow: function (marker, map, infowindow, contentString) {
      marker.addListener('click', function() {
          infowindow.setContent(contentString);
          infowindow.open(map, this);
      });
    },
    loadInfo: function () {
      var self = this;
      $.ajax({
        url: 'data/data.json',
        type: 'GET',
        dataType: 'json'
      })
        .done(function(res) {
          self.mapInfo(res);
        })
        .fail(function() {
          console.log('error');
        });
    },
    mapInfo: function(results) {
      this.infowindow = new window.google.maps.InfoWindow({
        content: '',
        maxWidth: 300
      });
      for (var i = 0; i < results.data.length; i++) {
        var latitude = results.data[i].lat;
        var longtitude = results.data[i].lng;
        var name = results.data[i].name;
        var address = results.data[i].address;
        var city = results.data[i].city;
        var phone = results.data[i].phone;
        var web = results.data[i].web;
        var hours = results.data[i].hours1;
        var latLng = new window.google.maps.LatLng(latitude, longtitude);

        var contentString = '<div class="content">'+
            '<h4 class="store-marker"> '+ name + '</h1>'+
              '<div class="description">'+
                '<span class="address">'+'<b>Address:</b>&nbsp;'+ address + ', &nbsp;' + city +'</span>'+
                '<span class="phone">'+'<b>Phone:</b>&nbsp;'+ phone +'</span>'+
                '<span class="website">'+'<b>Website:</b>&nbsp;'+ web +'</span>'+
                '<span class="time">'+'<b>Time:</b>&nbsp;'+ hours +'</span>'+
              '</div>' +
             '</div>';
        var icons = {
          url: '../images/upload/logo-ico.jpg',
          scaledSize: new window.google.maps.Size(100, 17)
        };
        var marker = new window.google.maps.Marker({
          position: latLng,
          map: this.map,
          icon: icons
        });
        this.bindInfoWindow(marker, this.map, this.infowindow, contentString);
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

  $.fn[pluginName].defaults = {};

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({
      key: 'custom'
    });
  });

}(jQuery, window));

/**
 *  @name quantity
 *  @description init quantity input
 *  @version 1.0
 *  @options
 *    max
      min
 *  @methods
 *    init
 *    destroy
 */

;(function($, window, undefined) {
  'use strict';

  var pluginName = 'quantity';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          el = that.element,
          opt = that.options;
      // add attribute data-dec to decrease button
      var btnDec = el.find('[data-dec]');
      // add attribute data-dec to increase button
      var btnInc = el.find('[data-inc]');
      // add attribute data-dec to input
      var output = el.find('[data-val]');
      // set min value as default value of input
      output.val(opt.min);

      function checkLimit() {
        if (parseInt(output.val(), 10) === opt.min) {
          // check if value of input is equal to min value to disable decrease button
          btnDec.attr('disabled', true);
        } else if (parseInt(output.val(), 10) === opt.max) {
          // check if value of input is equal to max value to disable increase button
          btnInc.attr('disabled', true);
        } else {
          btnInc.add(btnDec).attr('disabled', false);
        }
      }

      checkLimit();

      btnDec.off('click.' + pluginName).on('click.' + pluginName, function() {
        var val = output.val();
        output.val(val - 1).change();
      });

      btnInc.off('click.' + pluginName).on('click.' + pluginName, function() {
        var val = parseInt(output.val(), 10);
        output.val(val + 1).change();
      });

      output.on('change.' + pluginName, function() {
        checkLimit();
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
    max: Number.POSITIVE_INFINITY,
    min: 1
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({});
  });

}(jQuery, window));

/**
 *  @name owl
 *  @description init owl carousel
 *  @version 1.0
 *  @options
 *    owl carousel settings
 *  @methods
 *    init
 *    tabSlide
 *    initSlider
 *    setDataOptions
 *    destroy
 */

;(function($, window, undefined) {
  'use strict';

  var pluginName = 'owl';
  var body = $('body');
  var win = $(window);
  var vars = {};
  var initSlim = function() {
    // var $thumb = $('.thumbnail-container'),
    //     $parent = $('.thumbnail-container').parent(),
    //     children = $thumb.find('img').clone(),
    //     html = [];
    // $thumb.remove();
    // children.each(function (i, el) {
    //   var li = $('<li class="thumbnail-image" />');
    //   li.append(el);
    //   html.push(li);
    // });
    // var ul = $('<ul class="thumbnail-container slidee" />');
    // ul.append(html);
    // $parent.append(ul);
    // wrapper.sly({
    //   horizontal: 1,
    //   itemNav: 'basic',
    //   // itemSelector: '.show',
    //   // smart: 1,
    //   // activateOn: 'click',
    //   // mouseDragging: 1,
    //   // touchDragging: 1,
    //   // releaseSwing: 1,
    //   // startAt: 0,
    //   // scrollBy: 1,
    //   // activatePageOn: 'click',
    //   // speed: 300,
    //   // elasticBounds: 1,
    //   // easing: 'easeOutExpo',
    //   // dragHandle: 1,
    //   // dynamicHandle: 1,
    //   // clickBar: 1
    // });
    // var sly = new Sly('.slide-wrapper', {
    //   horizontal: true,
    // });
    var wrapper = $('<div class="slide-wrapper" />');
    $('.thumbnail-container').wrap(wrapper);
    $('.gallery-slider').append($('.nav-control'));
    $('.slide-wrapper').sly({
      horizontal: 1,
      itemNav: 'basic',
      smart: 1,
      activateOn: 'click',
      activatePageOn: 'click',
      elasticBounds: 1,
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: 1,
      scrollBy: 1,
      easing: 'linear',
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1,
      prev: $('.gallery-slider').find('.btn-prev'),
      next: $('.gallery-slider').find('.btn-next')
      // horizontal: 1,
      // itemNav: 'basic',
      // smart: 1,
      // activateOn: 'click',
      // mouseDragging: 1,
      // touchDragging: 1,
      // releaseSwing: 1,
      // startAt: 3,
      // // scrollBar: $wrap.find('.scrollbar'),
      // scrollBy: 1,
      // // pagesBar: $wrap.find('.pages'),
      // activatePageOn: 'click',
      // speed: 300,
      // elasticBounds: 1,
      // easing: 'easeOutExpo',
      // dragHandle: 1,
      // dynamicHandle: 1,
      // clickBar: 1,

      // // Buttons
      // prev: $('.gallery-slider').parent().find('.prev'),
      // next: $('.gallery-slider').parent().find('.next')
    });
  };
  var options = {
    menuSlider: {
      dots: false,
    },
    brandSlider: {
      items: 7,
      autoWidth:true,
      dots: false,
      margin: 30,
      loop: true,
      responsive : {
        0 : {
            items : 1,
            nav:true,
        },
        // breakpoint from 480 up
        480 : {
            items : 1,
            nav:true,
        },
        // breakpoint from 768 up
        768 : {
            items : 7,
            nav:true,
        }
      }
    },
    gallerySlider: {
      dots: false,
      thumbContainerClass: 'thumbnail-container',
      thumbImage: true,
      thumbItemClass: 'thumbnail-image',
      thumbs: true,
      onInitialized: initSlim,
    }
  };


  var tabSlide = function() {
    var self = this.element;
    var opt = this.options;
    var ctrl = $('#' + vars.ctrl);
    var dwn = $('#' + vars.dwn);
    var child = $(self.children('.active'));

    child.addClass('owl-carousel').owlCarousel(opt);

    if(win.width() < 992) {
      dwn.html(ctrl.children('.active').children().html());
    }

    ctrl.on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
      var current = $(e.target).attr('href');
      var txt = $(e.target).text();
      var prev = $(e.relatedTarget).attr('href');
      self.find(current).addClass('owl-carousel').owlCarousel(opt);
      dwn.html(txt);
      self.find(prev).removeClass('owl-carousel').trigger('destroy.owl.carousel');
    });

    win.on('resize.' + pluginName, function() {
      if(win.width() < 992) {
        dwn.html(ctrl.children('.active').children().html());
      }
    });

    body.off('click.' + pluginName).on('click.' + pluginName, function(e) {
      if (e.target.id === vars.dwn) {
        dwn.parent().addClass('active');
      } else {
        dwn.parent().removeClass('active');
      }
    });
  };
  var setDataOptions = function() {
    this.options = $.extend({}, this.options, this.element.data(pluginName));
    if (typeof this.options.typeSlide !== 'undefined') {
      this.options = $.extend({}, this.options, options[this.options.typeSlide]);
    }
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      setDataOptions.call(this);
      this.initSlider();
    },
    initSlider: function() {
      var self = this.element,
          opt  = this.options;
      if (!self.hasClass('tab-content') && !self.hasClass('owl-loaded')) {
        self.addClass('owl-carousel').owlCarousel(opt);
      } else {
        vars.ctrl = opt.control;
        vars.dwn = opt.dropdown;
        tabSlide.call(this);
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
    items: 1,
    nav: true,
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    navClass: ['owl-prev owl-nav-btn','owl-next owl-nav-btn']
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({
    });
  });

}(jQuery, window));

/**
 *  @name owl
 *  @description init owl carousel
 *  @version 1.0
 *  @options
 *    owl carousel settings
 *  @methods
 *    init
 *    tabSlide
 *    initSlider
 *    setDataOptions
 *    destroy
 */

;(function($, window, undefined) {
  'use strict';

  var pluginName = 'tooltip';
  var vars = {};

  var options = {
    menu: {

    }
  };

  var setDataOptions = function() {
    this.options = $.extend({}, this.options, this.element.data(pluginName));
    if (typeof this.options.typeSlide !== 'undefined') {
      this.options = $.extend({}, this.options, options[this.options.typeSlide]);
    }
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      var $el = this.element;
      var opt = this.options;
      that.var = vars;

      setDataOptions.call(this);

      var tooltipEle = document.createElement(opt.contentElement);
      var content = document.createTextNode(opt.contentTooltip);

      tooltipEle.setAttribute('class', opt.contentClass);
      tooltipEle.appendChild(content);
      vars.tooltip = tooltipEle;
      document.body.appendChild(tooltipEle);

      $el.on('mousemove.' + pluginName, function(e) {
        $(that.var.tooltip).css({
          top: e.pageY - 20,
          left: e.pageX + 30,
          opacity: 1
        });
      }).on('mouseleave.' + pluginName, function() {
        $(that.var.tooltip).attr('style', '');
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
    contentClass: 'tooltip-content',
    contentElement: 'span',
    contentTooltip: 'We don\'t serve it for delivery.'
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({
    });
  });

}(jQuery, window));

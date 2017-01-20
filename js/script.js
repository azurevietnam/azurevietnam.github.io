

// ;(function($, window, undefined) {
//   'use strict';

//   var pluginName = 'countdown';

//   var calcTime = function(endtime) {
//     var t = Date.parse(endtime) - Date.parse(new Date());
//     var sec = Math.floor((t / 1000) % 60);
//     var min = Math.floor((t / 1000 / 60) % 60);
//     var hour = Math.floor((t / (1000 * 60 * 60)) % 24);
//     var day = Math.floor(t / (1000 * 60 * 60 * 24));
//     return {
//       'total': t,
//       'day': day,
//       'hour': hour,
//       'min': min,
//       'sec': sec
//     };
//   };

//   function Plugin(element, options) {
//     this.element = $(element);
//     this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
//     this.init();
//   }

//   Plugin.prototype = {
//     init: function() {
//       var that = this,
//           ele = that.element,
//           opt = that.options;

//       var dayHolder = ele.find('[data-day]');
//       var hourHolder = ele.find('[data-hour]');
//       var minHolder = ele.find('[data-min]');
//       var secHolder = ele.find('[data-sec]');
//       var time = opt.deadline;
//       var countdownloop;
//       function updateTimer() {
//         var t = calcTime(time);

//         dayHolder.html(t.day);
//         hourHolder.html(('0' + t.hour).slice(-2));
//         minHolder.html(('0' + t.min).slice(-2));
//         secHolder.html(('0' + t.sec).slice(-2));

//         if (t.total <= 0) {
//           clearInterval(countdownloop);
//         }
//       }
//       updateTimer();
//       countdownloop = setInterval(updateTimer, 1000);
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

//   $(function() {
//     $('[data-' + pluginName + ']')[pluginName]({
//     });
//   });

// }(jQuery, window));

;(function($, window, undefined) {
  'use strict';

  var pluginName = 'deals';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.runMenu();
  }


  Plugin.prototype = {
    //used to contain all the end dates of the correlating valid elements with the same index.
    endDate : [],
    validElements : [],

    //used to contain the last and next time.
    display : [],

    initialHeight : undefined,
    initialInnerDivMarginTop : undefined,
    originalBorderTopStyle : undefined,

    runMenu: function () {
      var self = this;

      self.init();

      //function to be called every whole second.
      setInterval(function(){

        //go through all the valid elements
        for (var i=0;i<self.validElements.length;i++) {

          //change this elements time
          self.changeTime(self.validElements[i], self.endDate[i]);

        }

      }, 1000);
    },

    init : function() {
      var self = this;

      //regular expression match for ' 00/00/0000 00:00:00 '
      var regex_match = self.element.text().match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4}) ([0-9]{2}):([0-9]{2}):([0-9]{2})/);

      //if the the date format inside the element is invalid
      if(!regex_match){

        //create a message for people in staging
        self.element
          .text('Please ensure your count down date is in the correct format of 00/00/0000 00:00:00')
          .css({

            'color' : 'red',
            'font-size' : 24,
            'font-weight' : 'bold',
            'text-transform' : 'uppercase',
            'text-decoration' : 'underline',
            'line-height' : '30px'

          });

      } else {

        //push the current element into the validElements array
        self.validElements.push(self.element);

        //use the date to create a Date object
        var end = new Date(regex_match[3], regex_match[2] - 1, regex_match[1], regex_match[4], regex_match[5], regex_match[6]);

        if (end > new Date()) {

          //push self new date object of "end" into the endDate array
          self.endDate.push(end);

          //change the element to show the time rather than the date thats currently in it.
          self.changeTime(self.element, end);

          self.element.html('');

          var length = self.display.next.length;

          for (var i = 0; i < length; i++) {
            var html = [
              '<div class="col-number">',
                '<div class="number-1">',
                  '<span>' + self.display.next[i] + '</span>',
                '</div>',
                '<div class="number-2">' + self.display.last[i] + '</div>',
              '</div>'
            ];

            i < length - 1 &&
              html.push('<div class="separator"></div>');

            self.element.append(html.join(''));
          }
          var divA = self.element.find('div.col-number div.number-1');
          divA.css('display', 'none');
          // var divA = self.element.find('div.col-number div.number-1');
          //     // divB = self.element.find('div.col-number div.number-2');

          // //place element2 under element 1 with minus margin
          // // divB.css('margin-top', -divB.height());

          // //grab initial properties for reversions
          // self.initialHeight = divA.height();
          // self.initialInnerDivMarginTop = parseInt(divA.find('div').css('margin-top'));
          // self.originalBorderTopStyle = divA.css('border-top');

        } else {

          self.element.html([
            '<div class="countdown"><div class="col-number"><div class="number-1"><span>00</span></div></div><div class="separator"></div><div class="col-number"><div class="number-1"><span>00</span></div></div><div class="separator"></div><div class="col-number" style=""><div class="number-1"><span>00</span></div></div><div class="separator"></div><div class="col-number"><div class="number-1"><span>00</span></div></div></div>'
          ]);
        }
      }

    },

    doFlip : function(element, lastNumber) {
      var element1 = $(element).find('div.number-1 span');

      //change elements to have the last and next number in.
      element1.text(lastNumber)
              .removeClass('not-lightened')
              .addClass('lighten');

      setTimeout(function(){

        element1.removeClass('lighten')
                .addClass('not-lightened');

      },500);

    },

    changeTime : function(element, endTime) {
      element = $(element);

      var self = this,
          today = new Date();


      if (today.getTime() > endTime.getTime()) { return element.text('Happy new year'); }


      // today = new Date();

      //object for the display
      self.display = {
        'last' : [],
        'next' : []
      };

      //find the difference in seconds from the end time and the time now
      var seconds = Math.floor((endTime.getTime() - today.getTime()) / 1000) + 1;

      //work out the time with the difference and push into its passed in array
      self.display.last = self.calcTime(seconds);

      //reset the variable to the difference in seconds from the end time and the time now
      seconds = Math.floor((endTime.getTime() - today.getTime()) / 1000);

      //work out the time with the difference and push into its passed in array
      self.display.next = self.calcTime(seconds);

      //go through and recreate the col-numbers and layering divs
      for (var i = 0; i < self.display.next.length; i++) {


        //if it consists of only 1 character
        if(self.display.next[i].toString().length === 1){

          //prepend a "0" to this display (turns "1" into "01")
          self.display.next[i] = '0' + self.display.next[i];

        }

        //if it consists of only 1 character
        if(self.display.last[i].toString().length === 1) {

          //prepend a "0" to this display (turns "1" into "01")
          self.display.last[i] = '0' + self.display.last[i];

        }

        // $(element.find('div.col-number')).css('margin-top','5px');
        $(element.find('div.col-number div.number-1 span')[i]).text(self.display.last[i]);
        $(element.find('div.col-number div.number-2')[i]).text(self.display.next[i]);

        // if the number is about to change.
        self.display.next[i] !== self.display.last[i] &&
          self.doFlip(element.find('div.col-number')[i], self.display.last[i]);

      }

    },

    calcTime : function(seconds) {
      var array = [];
        //find amount of days in the amount of seconds
      array[0] = Math.floor(seconds / 86400);
        //minus that from the seconds variable
      seconds -= array[0] * 86400; //seconds in a day
        //find amount of hours in the amount of seconds left after days has been taken away
      array[1] = Math.floor(seconds / 3600);
        //minus that from the seconds variable
      seconds -= array[1] * 3600; //seconds in an hour
        //find amount of minutes in the amount of seconds left after days and hours has been taken away
      array[2] = Math.floor(seconds / 60);
        //minus that from the seconds variable
      seconds -= array[2] * 60;
        //put the seconds variable into the array
      array[3] = seconds;

      return [array[0],array[1],array[2],array[3]];
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

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

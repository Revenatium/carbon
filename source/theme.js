// JS Goes here - ES6 supported
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/tab';
import 'jquery-countdown';
import 'sticky-sidebar';
import moment from 'moment-timezone';
import './addons/jquery.sticky';
import './addons/jquery.magnific-popup';
import './addons/jquery.validate';

$(document).ready(function ($) {
   $.extend(true, $.magnificPopup.defaults, {
      gallery: {
         tCounter: '%curr%/%total%' // Markup for "1 of 7" counter
      }
   });
   let stickySidebar = null;
   window.applyStickyHeader = function () {
      $('.itm-widget-container').removeAttr('style');
      if (window.innerWidth >= 768) {
         $('.navbar-sticky').sticky({ topSpacing: 0 });
         $('.widget-sticky').sticky({ topSpacing:0, zIndex: 100 });
      }

      let sidebarWidget = document.getElementById('sidebar-widget');
      if (window.innerWidth >= 992 && sidebarWidget) {
         let height = ($('.navbar-sticky').outerHeight() | 0) + 32;
         let options = { topSpacing: height };
         stickySidebar = new StickySidebar(sidebarWidget, options);
      }
   }

   $(".navbar-toggler").click(function () {
      $('#sticky-wrapper').css("height", "auto");
   });

   $('.photo-gallery').each(function () {
      $(this).magnificPopup({
         delegate: 'a',
         type: 'image',
         gallery: { enabled: true }
      });
   });
   $('.itm-photo-gallery').each(function () {
      $(this).magnificPopup({
         delegate: 'a',
         type: 'image',
         gallery: { enabled: true }
      });
   });

   $('.video-link').each(function () {
      $(this).magnificPopup({
         disableOn: 700,
         type: 'iframe',
         mainClass: 'mfp-fade',
         removalDelay: 160,
         preloader: false,
         fixedContentPos: false
      });
   });

   $('.go-to-booker').click(function(){
      var bookerTop = $('.itm-widget-card').offset().top - $('.navbar-sticky').outerHeight() - 15;
      $('html, body').animate({scrollTop: bookerTop }, 500);
   });

   $('.carousel').carousel({ interval: 4000 });

   $('.contact-form').validate({
      messages: window.formMessages
   });

   $('[data-countdown]').each(function () {
      var $this = $(this);
      var finalDate = $(this).data('countdown');
      var includeLastDay = $(this).data('includelastday');
      var date = moment.tz(finalDate, 'Mexico/General');
      
      if(includeLastDay){
         date.add(1, 'days');
      }
      $this.countdown(date.toDate(), function (event) {
         var totalHours = event.offset.totalDays * 24 + event.offset.hours;
         if (!event.elapsed && totalHours <= 72) {
            $this.html(event.strftime(totalHours + 'h %Mm %Ss'));
            $this.parent().removeClass('d-none');
         }
      });
   });


   $('[data-schedule-start]').each(function () {
      var $this = $(this);
      var startDate = $(this).data('start-date');
      var endDate = $(this).data('end-date');
      var start = $(this).data('schedule-start');
      var end = $(this).data('schedule-end');
      var timezone = $(this).data('timezone');

      const startCountdown = ($el, today) => {
         if(today.isBetween(moment.tz(startDate, timezone), moment.tz(endDate, timezone))){
            var date = moment.tz(`${today.format('YYYY-MM-DD')} ${start}`, 'YYYY-MM-DD hh:mm a', timezone);
            var isEndHour = false;
            if(!today.isSameOrBefore(date)){
               date = moment.tz(`${today.format('YYYY-MM-DD')} ${end}`, 'YYYY-MM-DD hh:mm a', timezone);
               $el.parent().find('.itm-time-badge-end').removeClass('d-none');
               $el.parent().find('.itm-time-badge-start').addClass('d-none');
               isEndHour = true;
            }else{
               $el.parent().find('.itm-time-badge-start').removeClass('d-none');
               $el.parent().find('.itm-time-badge-end').addClass('d-none');
            }
            $el.countdown(date.toDate(), function (event) {
               var totalHours = event.offset.totalDays * 24 + event.offset.hours;
               if (!event.elapsed && totalHours <= 72) {
                  $el.html(event.strftime(totalHours + 'h %Mm %Ss'));
                  $el.parent().removeClass('d-none');
               }else if(event.elapsed && !isEndHour){
                  var $parent = $el.parent();
                  $el.remove();
                  var $newEl = $(`<span class="font-weight-bold" data-schedule-start="${start}" data-schedule-end="${end}" data-start-date="${startDate}" data-end-date="${endDate}" data-timezone="${timezone}"></span>`);
                  $parent.append($newEl);
                  startCountdown($newEl, moment().tz(timezone));
               }
            });
         }
      }
      startCountdown($this, moment().tz(timezone));
   });


   $(window).resize(function () {
      $('.navbar-sticky').unstick();
      $('.widget-sticky').unstick();

      if (stickySidebar) {
         stickySidebar.destroy();
      }
      setTimeout(function(){
         window.applyStickyHeader();
      }, 0)
   });

   $(document).on('scroll', function() { 
      if($('.itm-widget-card').length > 0){
         let cardBottom = $('.itm-widget-card').offset().top + $('.itm-widget-card').outerHeight();
         if(cardBottom < $(document).scrollTop()){ 
            $('.sticky-bottom').css('maxHeight', 200);
         }else{
            $('.sticky-bottom').css('maxHeight', 0); 
         } 
      }
   });

   window.applyStickyHeader();

});
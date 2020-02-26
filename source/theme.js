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
      var date = moment.tz(finalDate, 'Mexico/General').add(1, 'days');
      $this.countdown(date.toDate(), function (event) {
         var totalHours = event.offset.totalDays * 24 + event.offset.hours;
         if (!event.elapsed && totalHours <= 72) {
            $this.html(event.strftime(totalHours + 'h %Mm %Ss'));
            $this.parent().removeClass('d-none');
         }
      });
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
// JS Goes here - ES6 supported
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/tab';
import 'jquery-countdown';
import 'sticky-sidebar';
import './addons/jquery.sticky';
import './addons/jquery.magnific-popup';
import './addons/jquery.validate';

$(document).ready(function($){
   let stickySidebar = null;
   window.applyStickyHeader = function(){
      if(window.innerWidth >= 768){
         $('.navbar-sticky').sticky({topSpacing:0});
      }
      let sidebarWidget = document.getElementById('sidebar-widget');
      if(window.innerWidth >= 992 && sidebarWidget) {
         let height = ($('.navbar-sticky').outerHeight() | 0) + 32;
         let options = { topSpacing: height };
         stickySidebar = new StickySidebar(sidebarWidget, options);
      }
   }

   $(".navbar-toggler").click(function(){
      $('#sticky-wrapper').css( "height", "auto");
   });

   $('.photo-gallery').each(function(){
      $(this).magnificPopup({
         delegate: 'a',
         type: 'image',
         gallery: {enabled:true}
      });
   });

   $('.video-link').each(function(){
      $(this).magnificPopup({
         disableOn: 700,
         type: 'iframe',
         mainClass: 'mfp-fade',
         removalDelay: 160,
         preloader: false,
         fixedContentPos: false
      });
   });

   $('.carousel').carousel({interval: 4000});

   $('.contact-form').validate({
      messages: window.formMessages
   });

   $('[data-countdown]').each(function () {
      var $this = $(this); 
      var finalDate = $(this).data('countdown');
      $this.countdown(finalDate, function (event) {
         var totalHours = event.offset.totalDays * 24 + event.offset.hours;
         if(!event.elapsed && totalHours<=72){
            $this.html(event.strftime(totalHours + 'h %Mm %Ss'));
            $this.parent().removeClass('d-none');
         }
      });
   });

   $(window).resize(function() {
      $('.navbar-sticky').unstick();
      if(stickySidebar){
         stickySidebar.destroy();
      }
      window.applyStickyHeader();
   });

   window.applyStickyHeader();

});
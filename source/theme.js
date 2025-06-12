/* eslint-disable max-len */
/* eslint-disable no-undef */
// JS Goes here - ES6 supported
import "bootstrap/js/dist/util";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/carousel";
import "bootstrap/js/dist/tab";
import "bootstrap/js/dist/tooltip";
import "bootstrap/js/dist/popover";
import "bootstrap/js/dist/modal";
import "jquery-countdown";
import "sticky-sidebar";
import moment from "moment-timezone";
import "./addons/jquery.sticky";
import "./addons/jquery.validate";

import Swiper from "swiper";
import { Navigation, Pagination, Scrollbar, Thumbs, Mousewheel } from "swiper/modules";
// import "swiper/swiper-bundle.css";

import { showMagnificGallery } from "./magnific";

$(document).ready(function ($) {
   $.extend(true, $.magnificPopup.defaults, {
      gallery: {
         tCounter: "%curr%/%total%" // Markup for "1 of 7" counter
      }
   });
   let stickySidebar = null;
   window.applyStickyHeader = function () {
      $(".itm-widget-container").removeAttr("style");
      if (window.innerWidth >= 768) {
         $(".navbar-sticky").sticky({ topSpacing: 0 });
         $(".widget-sticky").sticky({ topSpacing: 0, zIndex: 100 });
      }

      const sidebarWidget = document.getElementById("sidebar-widget");
      if (window.innerWidth >= 992 && sidebarWidget) {
         const height = ($(".navbar-sticky").outerHeight() | 0) + 32;
         const options = { topSpacing: height };
         stickySidebar = new StickySidebar(sidebarWidget, options);
      }
   };

   $(".navbar-toggler").click(function () {
      $("#sticky-wrapper").css("height", "auto");
   });

   $(".photo-gallery").each(function () {
      showMagnificGallery($(this), {
         delegate: "a",
         type: "image",
         gallery: { enabled: true }
      });
   });
   $(".itm-photo-gallery").each(function () {
      showMagnificGallery($(this), {
         delegate: "a",
         type: "image",
         gallery: { enabled: true }
      });
   });

   $(".grid-gallery").each(function () {
      showMagnificGallery($(this), {
         delegate: "a",
         type: "image",
         gallery: { enabled: true }
      });
   });

   $(".video-link").each(function () {
      showMagnificGallery($(this), {
         disableOn: 700,
         type: "iframe",
         mainClass: "mfp-fade",
         removalDelay: 160,
         preloader: false,
         fixedContentPos: false
      });
   });

   $(".go-to-booker").click(function () {
      var bookerTop = $(".itm-widget-card").offset().top - $(".navbar-sticky").outerHeight() - 15;
      $("html, body").animate({ scrollTop: bookerTop }, 500);
   });

   $(".carousel").carousel({ interval: 4000, pause: "false" });
   $(".itm-carousel-controls-button", ".carousel").on("click", function () {
      var action = $(this).data("action");
      switch (action) {
         case "pause":
            if ($(".carousel").carousel("pause")) {
               $(this).data("action", "play");
               $('i.fas', this).toggleClass("fax-play fax-pause");
            }
            break;
         case "play":
            if ($(".carousel").carousel("cycle")) {
               $(this).data("action", "pause");
               $('i.fas', this).toggleClass("fax-pause fax-play");
            }
            break;
      }
   });

   $(".contact-form").validate({
      messages: window.formMessages
   });

   $("[data-countdown]").each(function () {
      var $this = $(this);
      var finalDate = $(this).data("countdown");
      var includeLastDay = $(this).data("includelastday");
      var date = moment.tz(finalDate, "Mexico/General");

      if (includeLastDay) {
         date.add(1, "days");
      }
      $this.countdown(date.toDate(), function (event) {
         var totalHours = event.offset.totalDays * 24 + event.offset.hours;
         if (!event.elapsed && totalHours <= 72) {
            $this.html(event.strftime(totalHours + "h %Mm %Ss"));
            $this.parent().removeClass("d-none");
         }
      });
   });


   $("[data-schedule-start]").each(function () {
      var $this = $(this);
      var startDate = $(this).data("start-date");
      var endDate = $(this).data("end-date");
      var start = $(this).data("schedule-start");
      var end = $(this).data("schedule-end");
      var timezone = $(this).data("timezone");

      const startCountdown = ($el, today) => {
         if (today.isBetween(moment.tz(startDate, timezone), moment.tz(endDate, timezone))) {
            var date = moment.tz(`${today.format("YYYY-MM-DD")} ${start}`, "YYYY-MM-DD hh:mm a", timezone);
            var isEndHour = false;
            if (!today.isSameOrBefore(date)) {
               date = moment.tz(`${today.format("YYYY-MM-DD")} ${end}`, "YYYY-MM-DD hh:mm a", timezone);
               $el.parent().find(".itm-time-badge-end").removeClass("d-none");
               $el.parent().find(".itm-time-badge-start").addClass("d-none");
               isEndHour = true;
            } else {
               $el.parent().find(".itm-time-badge-start").removeClass("d-none");
               $el.parent().find(".itm-time-badge-end").addClass("d-none");
            }
            $el.countdown(date.toDate(), function (event) {
               var totalHours = event.offset.totalDays * 24 + event.offset.hours;
               if (!event.elapsed && totalHours <= 72) {
                  $el.html(event.strftime(totalHours + "h %Mm %Ss"));
                  $el.parent().removeClass("d-none");
               } else if (event.elapsed && !isEndHour) {
                  var $parent = $el.parent();
                  $el.remove();
                  var $newEl = $(`<span class="font-weight-bold" data-schedule-start="${start}" data-schedule-end="${end}" data-start-date="${startDate}" data-end-date="${endDate}" data-timezone="${timezone}"></span>`);
                  $parent.append($newEl);
                  startCountdown($newEl, moment().tz(timezone));
               }
            });
         }
      };
      startCountdown($this, moment().tz(timezone));
   });


   $(window).resize(function () {
      $(".navbar-sticky").unstick();
      $(".widget-sticky").unstick();

      if (stickySidebar) {
         stickySidebar.destroy();
      }
      setTimeout(function () {
         window.applyStickyHeader();
      }, 0);
   });

   $(document).on("scroll", function () {
      if ($(".itm-widget-card").length > 0) {
         const cardBottom = $(".itm-widget-card").offset().top + $(".itm-widget-card").outerHeight();
         if (cardBottom < $(document).scrollTop()) {
            $(".sticky-bottom").css("maxHeight", 200);
         } else {
            $(".sticky-bottom").css("maxHeight", 0);
         }
      }
   });


   $("[data-toggle=popover]").popover({
      html: true,
      content: function () {
         var content = $(this).attr("data-popover-content");
         return $(content).children(".popover-body").html();
      }
   });

   function filterBy(categoryId, hotelId) {
      $(".listItem-deal").each(function () {
         let isHidden = false;
         if (categoryId) {
            const myCategories = $(this).attr("data-categories").split(",");
            if (myCategories && myCategories.indexOf(categoryId) >= 0) {
               $(this).show();
            } else {
               $(this).hide();
               isHidden = true;
            }
         } else {
            $(this).show();
         }
         if (!isHidden) {
            if (hotelId) {
               const myHotelId = $(this).attr("data-hotelId");
               if (myHotelId && myHotelId === hotelId) {
                  $(this).show();
               } else {
                  $(this).hide();
               }
            } else {
               $(this).show();
            }
         }
      });
   }

   $(document).on("click", ".itm-cat-nav", function () {
      $(".itm-cat-nav").removeClass("active");
      $(this).addClass("active");
      const categoryId = $(this).attr("data-categoryId");
      const hotelId = $("#itm-promotions-hotel-selector").attr("data-hotelId");
      filterBy(categoryId, hotelId);
   });

   $(document).on("click", ".itm-promotions-dropdown-item", function () {
      const hotelId = $(this).attr("data-hotelId");
      const categoryId = $(".itm-cat-nav.active").attr("data-categoryId");
      filterBy(categoryId, hotelId);
      if (hotelId) {
         $("#itm-promotions-hotel-selector").attr("data-hotelId", hotelId);
      } else {
         $("#itm-promotions-hotel-selector").removeAttr("data-hotelId");
      }
      $("#hotel-filter-name").text($(this).text());
   });

   $('[data-toggle="tooltip"]').tooltip();

   window.applyStickyHeader();

   window.getSwiperInstance = function getSwiperInstance(id, options) {
      const swiper = new Swiper(id, {
         ...options,
         modules: [Navigation, Pagination, Scrollbar, Thumbs, Mousewheel],
      });
      return swiper;
   };

   window.showMagnificGallery = showMagnificGallery;



   /* Navbar v2 functions */

   window.applyNavBar2HeaderStyles = function() {
      if (window.innerWidth >= 769) {
         $(".navbarv2").sticky({ topSpacing: 0, zIndex: 200 });
      }
   };

   const classSticky = "is-sticky";

   window.applyStickyStyles = function() {
      if ($(".itm-widget-card").length > 0 && window.innerWidth >= 769) {
         const cardBottom = $(".itm-widget-card").offset().top + $(".itm-widget-card").outerHeight();
         if (cardBottom < $(document).scrollTop()) {
            $(".navbarv2").addClass(classSticky);
            $(".navbarv2-menu").addClass(classSticky);
            $(".navbarv2-book-btn").addClass(classSticky);
            $(".navbarv2-menu-items").addClass(classSticky);
         } else {
            $(".navbarv2").removeClass(classSticky);
            $(".navbarv2-menu").removeClass(classSticky);
            $(".navbarv2-book-btn").removeClass(classSticky);
            $(".navbarv2-menu-items").removeClass(classSticky);
         }
      }
   }

   $(window).resize(function () {
      $(".navbarv2").unstick();
      $(".menu-background").removeClass("show");
      $(".menu-panel").removeClass("show");
      $("body").removeClass("overflow-hidden");
      r$(".navbarv2-booker").css("display", "none");


      if (window.innerWidth < 769) {
         $(".navbarv2").removeClass(classSticky);
         $(".navbarv2-menu").removeClass(classSticky);
         $(".navbarv2-book-btn").removeClass(classSticky);
         $(".navbarv2-menu-items").removeClass(classSticky);
      }

      setTimeout(function () {
         window.applyNavBar2HeaderStyles();
         window.applyStickyStyles();
      }, 0);
   });

   $(document).on("scroll", function () {
      window.applyStickyStyles();
   });

   $(document).on("click", ".navbarv2-menu", function () {
      $(".menu-background").addClass("show");
      $(".menu-panel").addClass("show");
      $("body").addClass("overflow-hidden");
   });

    $(document).on("click", ".menu-background, .navbarv2-menu-close-button", function () {
      $(".menu-background").removeClass("show");
      $(".menu-panel").removeClass("show");
      $("body").removeClass("overflow-hidden");
   });

   $(document).on("click", ".navbarv2-book-btn", function () {
      if ($(".navbarv2-booker").css("display") === "none") {
         $("body").addClass("overflow-hidden");
         $(".navbarv2-booker").css("display", "block");
      } else {
         $("body").removeClass("overflow-hidden");
         $(".navbarv2-booker").css("display", "none");
      }
   });

   window.applyNavBar2HeaderStyles();
   window.applyStickyStyles();
   /* end Navbar v2 functions */
});

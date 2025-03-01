/* =====================================
Template Name: Furniture E-Commerce
Author Name: Webby Crown
Author URI: 
Description: Furniture - eCommerce HTML5 Template.
Version:1.0
========================================*/

$(document).ready(function () {
  /*======================================
        01. Header JS
        ========================================*/
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $('header').addClass("manu-sticky");
    }
    else {
      $('header').removeClass("manu-sticky");
    }
  });

  if ($(window).width() <= 991) {
    $(".header-menu ul > li").each(function (i) {
      if ($(this).has("ul").length) {
        $(this).find("ul").addClass("main-sub-menu");
        $(this).find("> a").after('<span class="caret-arrow"></span>');
        $(this).find("> .sub-menu").css("display", "none");
      }
    });
    $(".header-menu ul li .caret-arrow").click(function () {
      var catSubUl = $(this).next(".main-sub-menu");
      var catSubli = $(this).closest("li");
      if (catSubUl.is(":hidden")) {
        catSubUl.slideDown();

        $(this).addClass("sub-active");
        catSubli.addClass("sub-active");
      } else {
        catSubUl.slideUp();
        $(this).removeClass("sub-active");
        catSubli.removeClass("sub-active");
      }
    });
  }

  /*======================================
        02. mini cart popup js
        ========================================*/
  $(document).on(
    "click",
    ".header-button .cart-icon, .mini-cart-close a, .overflow",
    function () {
      $(".mini-cart-dropdown").toggleClass("open");
      $("body").toggleClass("minicart-open");
    }
  );

  jQuery("body").on("click", ".toggle-btn a", function () {
    jQuery(".header-bottom").toggleClass("left-menu-open");
    jQuery(this).toggleClass("menu-active");
    jQuery("body").toggleClass("menu-open");
  });

  jQuery("body").on("click", ".search-icon, .search-close", function () {
    jQuery(".search-form").toggleClass("search-open");
  });

  /*======================================
        03. gallery box js
        ========================================*/
  $(document).ready(function () {
    $(".gallery-box").magnificPopup({
      delegate: "a",
      type: "image",
      closeOnContentClick: false,
      closeBtnInside: false,
      mainClass: "mfp-with-zoom mfp-img-mobile",
      image: {
        verticalFit: true,
        titleSrc: function (item) {
          return (
            item.el.attr("title") +
            ' · <a class="image-source-link" href="' +
            item.el.attr("data-source") +
            '" target="_blank">image source</a>'
          );
        },
      },
      gallery: {
        enabled: true,
      },
      zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
        opener: function (element) {
          return element.find("img");
        },
      },
    });
  });

  $(".grid").isotope({
    itemSelector: ".grid-item",
  });

  /*======================================
        04. Tabs js
        ========================================*/
  $(document).ready(function () {
    $(".tab-wrapper .tab-link").click(function () {
      var tab_id = $(this).attr("data-tab");

      $(".tab-wrapper .tab-link").removeClass("current");
      $(".tab-content").removeClass("current");

      $(this).addClass("current");
      $("#" + tab_id).addClass("current");
    });
  });

  jQuery(document).ready(function () {
    // For the plus button
    $('[data-quantity="plus"]').click(function (e) {
      e.preventDefault();

      // Get the closest input field to the clicked plus button
      let inputField = $(this)
        .closest(".plus-minus-input")
        .find('input[name="quantity"]');
      let currentVal = parseInt(inputField.val());

      if (!isNaN(currentVal)) {
        inputField.val(currentVal + 1);
      } else {
        inputField.val(0);
      }
    });

    // For the minus button
    $('[data-quantity="minus"]').click(function (e) {
      e.preventDefault();

      // Get the closest input field to the clicked minus button
      let inputField = $(this)
        .closest(".plus-minus-input")
        .find('input[name="quantity"]');
      let currentVal = parseInt(inputField.val());

      if (!isNaN(currentVal) && currentVal > 0) {
        inputField.val(currentVal - 1);
      } else {
        inputField.val(0);
      }
    });
  });

  $(".grid-view").on("click", function () {
    $(".shop-product-right").removeClass("list-view").addClass("grid-view");
  });
  $(".list-view").on("click", function () {
    $(".shop-product-right").removeClass("grid-view").addClass("list-view");
  });

  /*======================================
        05. Team slider js
        ========================================*/
  var swiper = new Swiper(".meet-our-team-slider .mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    speed: 600,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });

  /*======================================
        06. video js
        ========================================*/
  $(".play-icon").magnificPopup({
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false,
  });

  /*======================================
        07. countdwon js
        ========================================*/
  const animationDuration = 4000;

  const frameDuration = 1000 / 60;

  const totalFrames = Math.round(animationDuration / frameDuration);

  const easeOutQuad = (t) => t * (2 - t);

  const animateCountUp = (el) => {
    let frame = 0;
    const countTo = parseInt(el.innerHTML, 10);

    const counter = setInterval(() => {
      frame++;

      const progress = easeOutQuad(frame / totalFrames);

      const currentCount = Math.round(countTo * progress);

      if (parseInt(el.innerHTML, 10) !== currentCount) {
        el.innerHTML = currentCount;
      }

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
  };

  const countupEls = document.querySelectorAll(".timer");
  countupEls.forEach(animateCountUp);

  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
  /*======================================
        08. product slider js
        ========================================*/
  var swiper = new Swiper(".our-product-slider .mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    speed: 600,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });

  /*======================================
        09. testimonials slider js
        ========================================*/
  var swiper = new Swiper(".testimonials-right .mySwiper", {
    slidesPerView: 1,
    spaceBetween: 40,
    loop: true,
    speed: 600,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  /*======================================
        10. single product slider js
        ========================================*/
  var swiper = new Swiper(".single-product-left .mySwiper", {
    slidesPerView: 1,
    loop: true,
    speed: 600,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });

  /*======================================
    11. latest project slider js
    ========================================*/
  (function ($) {
    courses = {
      init: function () {
        this.Preloader_js();
      },
      Preloader_js: function () {
        //After 2s preloader is fadeOut
        $(".preloader").delay(2000).fadeOut("slow");
        setTimeout(function () {
          //After 2s, the no-scroll class of the body will be removed
          $("body").removeClass("no-scroll");
        }, 2000); //Here you can change preloader time
      },
    };
    courses.init();
  })(jQuery);

  AOS.init({
    once: true,
  });
});

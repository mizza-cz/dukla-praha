$(document).ready(function () {
  var $slider = $(".shop-slider__inner");
  var initialized = false;

  var sliderSettings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow:
      '<button class="shop-slider__btn shop-slider__btnprev"><img src="/dist/images/ico/slider.svg" loading="lazy" alt="" /></button>',
    nextArrow:
      '<button class="shop-slider__btn shop-slider__btnnext"><img src="/dist/images/ico/slider.svg" loading="lazy" alt="" /></button>',
    responsive: [
      {
        breakpoint: 1001,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 541,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  function checkAndInitializeSlider() {
    var elementCount = $slider.children(".shop-slider__col").length;

    if (
      !initialized &&
      (elementCount > 4 || (elementCount <= 4 && $(window).width() < 1001))
    ) {
      $slider.slick(sliderSettings);
      initialized = true;
    } else if (initialized && elementCount <= 4 && $(window).width() >= 1001) {
      $slider.slick("unslick");
      initialized = false;
    }
  }

  checkAndInitializeSlider();

  $(window).on("resize", function () {
    checkAndInitializeSlider();
  });
});

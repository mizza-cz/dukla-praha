$(document).ready(function () {
  if ($(".shop-slider__inner .shop-slider__col").length > 4) {
    $(".shop-slider__inner").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow:
        '<button class="shop-slider__btn shop-slider__btnprev"><img src="images/ico/slider.svg" loading="lazy" alt="" /></button>',
      nextArrow:
        '<button class="shop-slider__btn shop-slider__btnnext"><img src="images/ico/slider.svg" loading="lazy" alt="" /></button>',
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
    });
  }
});

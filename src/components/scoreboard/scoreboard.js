$(".scoreboard__inner").slick({
  slidesToShow: 2,
  slidesToScroll: 2,
  prevArrow:
    '<button class="shop-slider__btn shop-slider__btnprev"><img src="images/ico/slider.svg" loading="lazy" alt="" /></button> ',
  nextArrow:
    ' <button class="shop-slider__btn  shop-slider__btnnext"><img src="images/ico/slider.svg" loading="lazy" alt="" /></button>',
  responsive: [
    {
      breakpoint: 1313,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 541,
      settings: {
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        Autoplay: true,
      },
    },
  ],
});

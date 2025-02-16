$(".scoreboard__inner").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow:
    '<button class="shop-slider__btn shop-slider__btnprev"><img src="./images/ico/slider.svg" loading="lazy" alt="" /></button> ',
  nextArrow:
    ' <button class="shop-slider__btn  shop-slider__btnnext"><img src="./images/ico/slider.svg" loading="lazy" alt="" /></button>',
  responsive: [
    {
      breakpoint: 1313,
      settings: {},
    },
    {
      breakpoint: 541,
      settings: {
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
      },
    },
  ],
});

$("#loadMore").on("click", function (e) {
  if ($(".socialFeed__item:hidden").length == 0) {
    $("#loadMore").addClass("noContent");
    $(".socialFeed__items").addClass("active");
    $(".socialFeed__tabs").addClass("active");
  }
});
var containerEl = document.querySelector(".socialFeed__items");
if (containerEl) {
  var mixer = mixitup(containerEl, {
    animation: {
      effects: "fade translateZ(-200px)",
      effectsIn: "fade translateY(-200%)",
      easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    },
  });
}

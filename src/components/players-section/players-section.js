$(document).ready(function () {
  $('.header-section__nav a[href^="#"]').bind("click", function (e) {
    var anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor.attr("href")).offset().top - -10,
        },
        100
      );
    e.preventDefault();
  });
  return false;
});

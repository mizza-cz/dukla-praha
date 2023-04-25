 
$(function () {
  var hash = window.location.hash;
  hash && $('ul.nav a[href="' + hash + '"]').tab("show");

  $(".nav-tabs a").click(function (e) {
    $(this).tab("show");
  });
});

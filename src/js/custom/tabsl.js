$(".pane.active").css("display", "block");

// tabs switching
$(".tabs a").click(function () {
  if ($(this).hasClass("active")) return false;

  var $panes = $(this).parent().siblings(".panes");
  var i = $(this).index();

  if ($(this).hasClass("dropdown")) {
    i += $("select", this)[0].selectedIndex;
  }

  $(this).siblings("a.active").removeClass("active").find("select").val(null);
  $(this).addClass("active");

  $panes.css("min-height", $panes.height());
  $("> div.active", $panes)
    .removeClass("active")
    .fadeOut()
    .promise()
    .done(function () {
      $("> div:eq(" + i + ")", $panes)
        .addClass("active")
        .fadeIn();
      $panes.css("min-height", 0);
    });
  return false;
});

$(".tabs select").val(null);

$(".tabs select")
  .click(function (e) {
    e.stopPropagation();
    return false;
  })
  .change(function () {
    $(this).parent().removeClass("active").click();
  });

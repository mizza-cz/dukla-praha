$(".top-score .tab").on("click", function (event) {
   var id = $(this).attr("data-id");
   $(".top-score").find(".tab-wrap").removeClass("tab-active").hide();
   $(".top-score .top-score__tabs").find(".tab").removeClass("active");
   $(this).addClass("active");
   $("#" + id)
     .addClass("tab-active")
     .fadeIn();
   return false;
 });
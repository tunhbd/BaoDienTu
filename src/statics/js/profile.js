(function(x) {
  x("#edit").click(() => {
    x(".btn-control").each(function() {
      x(this).is(":hidden") ? x(this).fadeIn("slow") : x(this).hide();
    });
    x("input").removeAttr("disabled");
  });

  x("#cancel").click(() => {
    x(".btn-control").each(function() {
      x(this).is(":hidden") ? x(this).fadeIn("slow") : x(this).hide();
      x("input").attr("disabled", true);
    });
  });
})(jQuery);

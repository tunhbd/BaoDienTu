!(function(a) {
  "use strict";
  a("html, body");
  let frmCtrl = a(".pwdMask > .form-control");
  let tglPwd = a(".pwd-toggle");

  a(".lnk-toggler").on("click", function(event) {
    event.preventDefault();

    let dtPanel = a(this).data("panel");
    a(".w-panel.active").removeClass("active");
    a(dtPanel).addClass("active");
  });

  a(tglPwd).on("click", function(event) {
    event.preventDefault();

    a(this).toggleClass("fa-eye-slash fa-eye");
    a(this).hasClass("fa-eye")
      ? a(frmCtrl).attr("type", "text")
      : a(frmCtrl).attr("type", "password");
  });
})(jQuery);

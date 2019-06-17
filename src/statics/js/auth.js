!(function (a) {
  "use strict";
  a("html, body");
  let frmCtrl = a(".pwd-mask > .form-control");
  let tglPwd = a(".pwd-toggle");

  a(tglPwd).on("click", function (event) {
    event.preventDefault();
    a(this).toggleClass("fa-eye-slash fa-eye");
    a(this).hasClass("fa-eye")
      ? a(frmCtrl).attr("type", "text")
      : a(frmCtrl).attr("type", "password");
  });
})(jQuery);

$.validator.addMethod("pwcheck", function (value) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
    value
  );
});
!(function(a) {
  "use strict";
  a("html, body");
  let frmCtrl = a(".pwd-mask > .form-control");
  let tglPwd = a(".pwd-toggle");

  a(tglPwd).on("click", function(event) {
    event.preventDefault();
    a(this).toggleClass("fa-eye-slash fa-eye");
    a(this).hasClass("fa-eye")
      ? a(frmCtrl).attr("type", "text")
      : a(frmCtrl).attr("type", "password");
  });
})(jQuery);

$.validator.addMethod("pwcheck", function(value) {
  return (
    /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) && // consists of only these
    /[a-z]/.test(value) && // has a lowercase letter
    /\d/.test(value)
  ); // has a digit
});

$("#loginForm").validate({
  errorClass: "small text-danger d-flex",
  rules: {
    username: "required",
    password: {
      required: true,
      minlength: 6,
      pwcheck: true
    }
  },
  messages: {
    username: "Tài khoản phải được nhập",
    password: {
      required: "Mật khẩu phải được nhập",
      minlength: "Mật khẩu phải dài hơn 6 ký tự",
      pwcheck: "Mật khẩu gồm ký tự in hoa, in thường và số"
    }
  }
});

$("#forgetForm").validate({
  errorClass: "small text-danger d-flex",
  rules: {
    emailReset: "required"
  },
  messages: {
    emailReset: "Email phải được nhập"
  }
});

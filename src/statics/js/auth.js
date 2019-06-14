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
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
    value
  );
});

$("#loginForm").validate({
  errorClass: "small text-danger d-flex",
  rules: {
    username: "required",
    password: {
      required: true,
      minlength: 8,
      pwcheck: true
    }
  },
  messages: {
    username: "Tài khoản phải được nhập",
    password: {
      required: "Mật khẩu phải được nhập",
      minlength: "Mật khẩu phải dài hơn 8 ký tự",
      pwcheck: "Ký tự in hoa, in thường, số và có ký tự đặc biệt"
    }
  }
});

$("#changePwdForm").validate({
  errorClass: "small text-danger d-flex",
  rules: {
    oldPwd: {
      required: true,
      minlength: 8,
      pwcheck: true
    },
    newPwd: {
      required: true,
      minlength: 8,
      pwcheck: true
    },
    confirmNewPwd: {
      equalTo: "#newPwd"
    }
  },
  messages: {
    oldPwd: {
      required: "Mật khẩu phải được nhập",
      minlength: "Mật khẩu phải dài hơn 8 ký tự",
      pwcheck: "Ký tự in hoa, in thường, số và có ký tự đặc biệt"
    },
    newPwd: {
      required: "Mật khẩu phải được nhập",
      minlength: "Mật khẩu phải dài hơn 8 ký tự",
      pwcheck: "Ký tự in hoa, in thường, số và có ký tự đặc biệt"
    },
    confirmNewPwd: {
      equalTo: "Mật khẩu không khớp"
    }
  }
});

$("#resetForm").validate({
  errorClass: "small text-danger d-flex",
  rules: {
    newPwd: {
      required: true,
      minlength: 8,
      pwcheck: true
    },
    confirmNewPwd: {
      equalTo: "#newPwd"
    }
  },
  messages: {
    newPwd: {
      required: "Mật khẩu phải được nhập",
      minlength: "Mật khẩu phải dài hơn 8 ký tự",
      pwcheck: "Ký tự in hoa, in thường, số và có ký tự đặc biệt"
    },
    confirmNewPwd: {
      equalTo: "Mật khẩu không khớp"
    }
  }
});

$("#signupForm").validate({
  errorClass: "small text-danger d-flex",
  rules: {
    fullname: "required",
    birthday: "required",
    username: "required",
    email: { required: true, email: true },
    password: {
      required: true,
      minlength: 6,
      pwcheck: true
    }
  },
  messages: {
    fullname: "Chưa nhập họ tên",
    birthday: "Chưa nhập ngày sinh",
    username: "Tài khoản phải được nhập",
    email: {
      required: "Email phải được nhập",
      email: "Vui lòng nhập một email đúng định dạng"
    },
    password: {
      required: "Mật khẩu phải được nhập",
      minlength: "Mật khẩu phải dài hơn 6 ký tự",
      pwcheck: "Ký tự in hoa, in thường, số và có ký tự đặc biệt"
    }
  }
});

$('input[name="birthday"]').datepicker({
  defaultDate: new Date(),
  minDate: new Date("1900/01/01"),
  dateFormat: "d/mm/yy"
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

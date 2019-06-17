$("#changePwdForm").validate({
  // errorClass: "small text-danger d-flex",
  rules: {
    oldPwd: {
      required: true,
      minlength: 8,
      pwcheck: true,
      remote: {
        url: '/check-old-password'
      }
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
      pwcheck: "Ký tự in hoa, in thường, số và có ký tự đặc biệt",
      remote: "Mật khẩu cũ chưa đúng"
    },
    newPwd: {
      required: "Mật khẩu phải được nhập",
      minlength: "Mật khẩu phải dài hơn 8 ký tự",
      pwcheck: "Ký tự in hoa, in thường, số và có ký tự đặc biệt"
    },
    confirmNewPwd: {
      equalTo: "Mật khẩu không khớp"
    }
  },
  errorElement: 'small',
  errorClass: 'd-block help-block text-danger',
  highlight: function (e) {
    $(e).removeClass('is-valid').addClass('is-invalid');
  },
  unhighlight: function (e) {
    $(e).removeClass('is-invalid').addClass('is-valid');
  }
});
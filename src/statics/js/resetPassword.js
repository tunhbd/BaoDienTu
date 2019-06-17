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
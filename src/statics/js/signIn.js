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
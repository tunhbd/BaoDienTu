$("#signupForm").validate({
  errorClass: "small text-danger d-flex",
  rules: {
    fullname: "required",
    birthday: "required",
    username: {
      required: true,
      remote: {
        url: '/check-not-exists-user-account'
      }
    },
    email: {
      required: true,
      email: true,
      remote: {
        url: '/check-not-exists-email'
      }
    },
    password: {
      required: true,
      minlength: 6,
      pwcheck: true
    }
  },
  messages: {
    fullname: "Chưa nhập họ tên",
    birthday: "Chưa nhập ngày sinh",
    username: {
      required: "Tài khoản phải được nhập",
      remote: "Tên đăng nhập đã tồn tại"
    },
    email: {
      required: "Email phải được nhập",
      email: "Vui lòng nhập một email đúng định dạng",
      remote: "Email này đã được đăng ký trong hệ thống"
    },
    password: {
      required: "Mật khẩu phải được nhập",
      minlength: "Mật khẩu phải dài hơn 6 ký tự",
      pwcheck: "Mật khẩu gồm ký tự in hoa, in thường và số"
    }
  }
});

$('input[name="birthday"]').datepicker({
  defaultDate: new Date(),
  minDate: new Date('1900/01/01'),
  dateFormat: 'd/mm/yy'
});
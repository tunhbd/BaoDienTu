$("#forgetForm").validate({
  errorClass: "small text-danger d-flex",
  rules: {
    emailReset: "required"
  },
  messages: {
    emailReset: "Email phải được nhập"
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
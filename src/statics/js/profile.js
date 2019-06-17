$("#edit").click(() => {
  $(".btn-control").each(function () {
    $(this).is(":hidden") ? $(this).fadeIn("slow") : $(this).hide();
  });
  $("input").removeAttr("disabled");

  $('#profileForm').validate({
    rules: {
      fullname: 'required',
      email: {
        required: true,
        email: true,
        remote: {
          url: `/check-not-exists-email-expect/${user.email}`
        }
      },
      birthday: 'required',
    },
    messages: {
      fullname: 'Bạn chưa nhập họ và tên',
      email: {
        required: 'Bạn chưa nhập email',
        email: 'Email chưa đúng định dạng',
        remote: 'Email này đã được đăng ký'
      },
      birthday: 'Bạn chưa nhập ngày sinh',
    },
    errorElement: 'small',
    errorClass: 'd-block help-block text-danger',
    highlight: function (e) {
      $(e).removeClass('is-valid').addClass('is-invalid');
    },
    unhighlight: function (e) {
      $(e).removeClass('is-invalid').addClass('is-valid');
    }
  })

  $('input[name="birthday"]').datepicker({
    defaultDate: new Date(),
    minDate: new Date('1900/01/01'),
    dateFormat: 'd/mm/yy'
  });
});

$("#cancel").click(() => {
  $(".btn-control").each(function () {
    $(this).is(":hidden") ? $(this).fadeIn("slow") : $(this).hide();
    $("input").attr("disabled", true);
  });
});

function showUpdateAvatarForm() {
  let avatarUpload = new AvatarUpload('/update-avatar', '/media/images/users', $('#avatarUser'), user.avatar === null ? 'avatar_sample.png' : user.avatar)

  avatarUpload.init()
}
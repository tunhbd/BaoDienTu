function initPreview() {
  $('#publishedDateInput').hide()
  $('#whyRejectForm').hide()

  $('input[name="publishedDate"]').datepicker({
    defaultDate: new Date(),
    minDate: new Date(),
    dateFormat: 'd/mm/yy'
  });

  $('#isPublished').click(function () {
    $('#publishedDateInput').slideDown()
    $('#whyRejectForm').slideUp()
  })

  $('#isRejected').click(function () {
    $('#publishedDateInput').slideUp()
    $('#whyRejectForm').slideDown()
  })

  $('#browsePostForm').validate({
    rules: {
      checking: 'required',
      publishedDate: {
        required: true,
        // depends: function (element) {
        //   return $('#isPublished').is(":checked");
        // }
      },
      reasonReject: {
        required: true,
        // depends: function (element) {
        //   return $('#isRejected').is(":checked");
        // }
      }
    },
    messages: {
      checking: 'You have not browse this post',
      publishedDate: {
        required: 'You have not choose date for publishing'
      },
      reasonReject: {
        required: 'You should enter the reason you reject this post'
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
  })
}

initPreview()
var postData = {
  post_id: '',
  post_title: '',
  author: {
    name: '',
    pseudonym: '',
  },
  category: {
    category_id: '',
    category_name: '',
  },
  tags: [],
  youtube_url: '',
  post_avatar_image: '',
  created_date: '',
  published_date: '',
  post_summary: '',
  post_content: '',
}

var editor = null

function showEditingSpace(a, container) {
  "use strict";
  let titleInput = a(".title-input");
  let textHarsh = a(".title-harsh");
  // let tagInput = a(".tag-input");
  let smallHarsh = a(".tag-harsh");
  let summaryInput = a(".summary-input");
  let summaryHarsh = a(".summary-harsh");

  titleInput.on("focus", function () {
    titleInput.prop("placeholder", "");
  });
  titleInput.on("focusout", function () {
    titleInput.prop("placeholder", "Title...");
  });
  titleInput.on("keyup", function () {
    if (titleInput.val() !== "") {
      textHarsh.addClass("text-harsh-active");
      titleInput.addClass("title-input-focus");
    } else {
      textHarsh.removeClass("text-harsh-active");
      titleInput.removeClass("title-input-focus");
    }
  });
  let ret = $('#tags').tagInput('init', {
    labelClass: "badge badge-secondary",
    // processEachChange: function (text) {
    //   console.log($('.tag-hint').filter(tagHint => ($(tagHint).attr('hidden') !== '1' && $(tagHint).text().indexOf(text) < 0)))
    //   $('.tag-hint').filter(tagHint => ($(tagHint).attr('hidden') !== '1' && $(tagHint).text().indexOf(text) < 0)).hide()
    //   $('.tag-hint').filter(tagHint => ($(tagHint).attr('hidden') !== '1' && $(tagHint).text().indexOf(text) > -1)).show()
    // }
  });

  // tagInput.on("focus", function() {
  //   tagInput.prop("placeholder", "");
  //   tagInput.val() === "" && smallHarsh.show();
  // });
  // tagInput.on("focusout", function() {
  //   tagInput.prop("placeholder", "TAGS");
  //   tagInput.val() === "" && smallHarsh.hide();
  // });
  // tagInput.on("keyup", function() {
  //   if (tagInput.val() !== "") {
  //     tagInput.addClass("tag-input-focus");
  //   } else {
  //     tagInput.removeClass("tag-input-focus");
  //   }
  // });

  summaryInput.on("focus", function () {
    summaryInput.prop("placeholder", "");
    summaryHarsh.show();
  });
  summaryInput.on("focusout", function () {
    summaryInput.prop("placeholder", "Summary");
    summaryHarsh.hide();
  });
  summaryInput.on("keyup", function () {
    if (summaryInput.val() !== "") {
      summaryHarsh.show();
      // summaryInput.addClass("summary-input-focus");
    } else {
      // summaryInput.removeClass("summary-input-focus");
    }
  });

  // Set event for avatar image
  $('#avatarImageInput').change(function () {
    if (isEdit) {
      notChange = false
    }
    if (this.files.length > 0) {
      postData.post_avatar_image = this.files[0]
      showAvatarImagePreview(postData.post_avatar_image)
    } else {
      $('label[name="avatarImageName"]').text('Choose image')
      showPlaceholderImage()
      // $('.avatar-image-preview-container').fadeOut()
      $('.avatar-image-preview-container').removeClass('contain-image')
    }
  })

  $('.remove-avatar-image-button').click(() => {
    if (isEdit) {
      notChange = false
    }
    $('label[name="avatarImageName"]').text('Choose image')
    showPlaceholderImage()
    // $('.avatar-image-preview-container').fadeOut()
    $('.avatar-image-preview-container').removeClass('contain-image')
  })

  // CKEDITOR.replace(container);
  editor = tinymce.init({
    selector: 'textarea#create-post-editor',
    plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help',
    toolbar: 'formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter | link image media pageembed | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcomment',
    image_advtab: true,
    content_css: [
      '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
      '//www.tiny.cloud/css/codepen.min.css'
    ],
    link_list: [
      { title: 'My page 1', value: 'http://www.tinymce.com' },
      { title: 'My page 2', value: 'http://www.moxiecode.com' }
    ],
    image_list: [
      { title: 'My page 1', value: 'http://www.tinymce.com' },
      { title: 'My page 2', value: 'http://www.moxiecode.com' }
    ],
    image_class_list: [
      { title: 'None', value: '' },
      { title: 'Some class', value: 'class-name' }
    ],
    importcss_append: true,
    height: 400,
    // file_picker_callback: function (callback, value, meta) {
    //   /* Provide file and text for the link dialog */
    //   if (meta.filetype === 'file') {
    //     callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
    //   }

    //   /* Provide image and alt text for the image dialog */
    //   if (meta.filetype === 'image') {
    //     callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
    //   }

    //   /* Provide alternative source and posted for the media dialog */
    //   if (meta.filetype === 'media') {
    //     callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
    //   }
    // },
    templates: [
      { title: 'Some title 1', description: 'Some desc 1', content: 'My content' },
      { title: 'Some title 2', description: 'Some desc 2', content: '<div class="mceTmpl"><span class="cdate">cdate</span><span class="mdate">mdate</span>My content2</div>' }
    ],
    template_cdate_format: '[CDATE: %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[MDATE: %m/%d/%Y : %H:%M:%S]',
    image_caption: true,
    spellchecker_dialog: true,
    spellchecker_whitelist: ['Ephox', 'Moxiecode'],
    tinycomments_mode: 'embedded',
    content_style: '.mce-annotation { background: #fff0b7; } .tc-active-annotation {background: #ffe168; color: black; }',
    init_instance_callback: function (editor) {
      editor.selection.setContent(oldContent)
    }
  });
}

function showPlaceholderImage() {
  $('.avatar-image-preview').attr('src', '/media/images/posts/placeholder.png')
}

function showAvatarImagePreview(file, isUrl = false) {
  if (isUrl) {
    if (file !== null && file.trim() !== '') {
      $('label[name="avatarImageName"]').text(file)
      $('.avatar-image-preview').attr('src', `/media/images/posts/${file}`)
      $('.avatar-image-preview-container').fadeIn()
      $('.avatar-image-preview-container').addClass('contain-image')
    }
  } else {
    $('label[name="avatarImageName"]').text(file.name)
    let fileReader = new FileReader()

    fileReader.onload = function (e) {
      // postData.post_avatar_image = e.target.result
      $('.avatar-image-preview').attr('src', e.target.result)
      $('.avatar-image-preview-container').fadeIn()
      $('.avatar-image-preview-container').addClass('contain-image')
    }

    fileReader.readAsDataURL(file)
  }
}

// function createNewPost() {
//   postData.post_title = $('input[name="title"]').val()
//   postData.category = $('select[name="category"]').val()
//   postData.tags = $('input[name="tags"]').val().split(',')
//   postData.youtube_url = $('input[name="youtube_url"]').val()
//   postData.post_summary = $('input[name="summary"]').val()
//   postData.post_content = CKEDITOR.instances['create-post-editor'].getData()
//   let fdt = new FormData(document.querySelector('form'))
//   fdt.append("content", postData.post_content)
//   for (let key of fdt.entries()) {
//     console.log(key[0] + ', ' + key[1]);
//   }
//   $.ajax({
//       type: 'POST',
//       url: '/dashboard/create-post',
//       data: fdt.entries(),
//       success: function (data) {
//         console.log(data)
//       },
//       cache: false,
//       contentType: false,
//       processData: false
//         // dataType: 'json'
//     })
//     // $.post('/dashboard/create-post', fdt, function (data) {
//     //   console.log("response data", data)
//     // })
// }

function setValidation() {
  console.log('set validate')
  $('#postForm').validate({
    rules: {
      title: 'required',
      summary: 'required',
      avatarImage: {
        required: {
          depends: function (element) {
            return !isEdit || (isEdit && !notChange)
          }
        }
      },
    },
    messages: {
      title: 'You forget to fill post title',
      summary: 'Should fill summary of post',
      avatarImage: 'Do not forgot upload a image for post',
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

function resetPostForm() {
  mainContent.html(oldHtmlCode)
  showEditingSpace($, 'create-post-editor')
}

function createNewPost() {
  let loading = showLoading(document.getElementById('dashboard-main__right-sidebar'))
  $('textarea[name="create-post-editor"]').val(CKEDITOR.instances['create-post-editor'].getData())
  // let fdt = new FormData(document.getElementById('postForm'))
  // fdt.append('aaa', 'aaa')
  // $.ajax({
  //   type: 'POST',
  //   data: fdt,
  //   success: function (res) {
  //     if (!res.error && res.response) {
  //       hideLoading(loading)
  //       console.log('success')
  //       notifySuccess(message)
  //       resetPostForm()
  //     }
  //   }
  // })
  $('#postForm').ajaxSubmit({
    error: function (xhr) {
      console.log('error')
    },
    success: function (res) {
      if (!res.error && res.post) {
        hideLoading(loading)
        console.log('success: ', res.post)
        // notifySuccess(message)
        resetPostForm()
      }
    }
  })

  return false;
}

function setEventForTags() {
  $('.tag-hints .tag-hint').click(function (e) {
    let tag = {
      tagId: $(this).attr('tag-id'),
      tagName: $(this).text(),
    }
    $('#tags').tagInput('add', { tag })
  })
}

showEditingSpace($, 'create-post-editor')
setEventForTags()
setValidation()
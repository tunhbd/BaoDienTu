var postData = {
  id: '',
  title: '',
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
  avatar_image: '',
  created_date: '',
  published_date: '',
  summary: '',
  content: '',
}

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
  $('#tags').tagInput({
    labelClass: "badge badge-secondary"
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
    // console.log(this.files)
    if (this.files.length > 0) {
      postData.avatar_image = this.files[0]
      

      showAvatarImagePreview(this.files[0])
    }
    else {
      $('label[name="avatarImageName"]').text('Choose image')
      $('.avatar-image-preview-container').fadeOut()
      $('.avatar-image-preview-container').removeClass('contain-image')
    }
  })

  $('.remove-avatar-image-button').click(() => {
    $('label[name="avatarImageName"]').text('Choose image')
    $('.avatar-image-preview-container').fadeOut()
    $('.avatar-image-preview-container').removeClass('contain-image')
  })

  CKEDITOR.replace(container);
}

function showAvatarImagePreview(file, isUrl = false) {
  if (isUrl) {
    if (file !== null && file.trim() !== '') {
      $('label[name="avatarImageName"]').text(file)
      $('.avatar-image-preview').attr('src', `/media/images/posts/${file}`)
      $('.avatar-image-preview-container').fadeIn()
      $('.avatar-image-preview-container').addClass('contain-image')
    }
  }
  else {
    $('label[name="avatarImageName"]').text(this.files[0].name)
    let fileReader = new FileReader()

    fileReader.onload = function (e) {
      $('.avatar-image-preview').attr('src', e.target.result)
      $('.avatar-image-preview-container').fadeIn()
      $('.avatar-image-preview-container').addClass('contain-image')
    }

    fileReader.readAsDataURL(file)
  }
}

function AvatarUpload(url, pathToAvatarFolder, imgObj, avatar = null) {
  this.uploadUrl = url
  this.pathToAvatarFolder = pathToAvatarFolder
  this.imgObj = imgObj
  this.avatar = avatar
  this.container = $('<div id="avatarUploadContainer"></div>')
  this.avatarUploadComponent =
    $(`
      <div id="avatarUploadComponent">
        <div id="avatarUploadComponent__image">
          <img src="${this.avatar === null ? './avatar_mask.png' : `${this.pathToAvatarFolder}/${this.avatar}`}" />
        </div>
        <div id="avatarUploadComponent__controls">
          <input type="file" name="avatarInput" id="avatarInput" style="display: none;" />
          <label id="uploadNewAvatarButton" for="avatarInput">
            <i class="far fa-image"></i>
          </label>
        </div>
      </div> 
    `)
}

AvatarUpload.prototype.onChangeAvatar = function (uploadUrl, pathToAvatarFolder) {
  let formData = new FormData()
  let file = document.getElementById('avatarInput').files[0]

  if (file) {
    loading = showLoading($('#avatarUploadComponent'))

    formData.set('avatar', file, file.name)

    let request = new XMLHttpRequest()
    let imgObj = this.imgObj

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        hideLoading(loading)
        let res = JSON.parse(this.responseText)

        if (res.error) {
          swal.fire({
            type: 'error',
            title: 'Oops!',
            text: 'Hệ thống có sự cố, tạm thời chưa thể cập nhật ảnh đại diện. Bạn có thể thử lại lần sau.',
          })
        }
        else {
          let imgUrl = `${pathToAvatarFolder}/${res.data.avatar}`

          $('#avatarUploadComponent__image img').attr('src', imgUrl)
          $(imgObj).attr('src', imgUrl)
        }
      }
    }
    request.open('POST', uploadUrl)
    request.send(formData)
  }
}

AvatarUpload.prototype.init = function () {
  this.container.append(this.avatarUploadComponent)
  $('body').append(this.container)

  $('#avatarInput').change(() => {
    this.onChangeAvatar(this.uploadUrl, this.pathToAvatarFolder)
  })

  $('#avatarUploadComponent').click(function (e) {
    e.stopPropagation()
  })

  $('#avatarUploadContainer').click(function (e) {
    $(this).fadeOut(300)
    setTimeout(() => {
      $(this).remove()
    }, 300)
  })
}


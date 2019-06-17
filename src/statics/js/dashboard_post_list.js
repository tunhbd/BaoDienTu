function onMouseEnterMoreIcon(icon) {
  let controlTooltip = $(icon).next('.control-tooltip')
  controlTooltip.fadeIn(100)

  controlTooltip.mouseenter(function () {
    controlTooltip.fadeIn(100)
  })
  controlTooltip.mouseleave(function () {
    controlTooltip.fadeOut(0)
  })
}

function onMouseLeaveMoreIcon(icon) {
  $(icon).next('.control-tooltip').fadeOut(0)
}

function setEventForCheckboxs() {
  $('.post-list__cell-choose').each(function (index) {
    $(this).click(function (e) {
      e.stopPropagation()
    })
  })
}

function goToPreviewAndCheckPage(postAlias) {
  window.location = `/admin/dashboard/preview-post/${postAlias}`
}

function goToEditPostPage(postAlias) {
  window.location = `/admin/dashboard/edit-post/${postAlias}`
}

function goToPreviousPage() {
  if (currentPage > 1) {
    switchToPage(currentPage - 1)
  }
}

function goToNextPage() {
  if (currentPage < pageCount) {
    switchToPage(currentPage + 1)
  }
}

function goToPage(pageObj) {
  let page = parseInt($(pageObj).text())

  if (page !== currentPage) {
    switchToPage(page)
  }
}

function switchToPage(pageNum) {
  let category = $('#filterCategory').val()
  let filterBy = $('#filterSort').val()

  window.location = `${window.location.origin}${window.location.pathname}?category=${category}&filterBy=${filterBy}&page=${pageNum}`
}

function filterPostsByCategory() {
  switchToPage(1)
}

function filterPostsBySort() {
  switchToPage(1)
}

function updateDeleteButtonStatus() {
  if ($('.post-checkbox:checked').length > 0) {
    $('button.delete-button').removeAttr('disabled')
  }
  else {
    $('button.delete-button').attr('disabled', 'disabled')
  }
}

function deletePosts() {
  let postIds = []
  let postCountOfPage = $('.post-checkbox').length

  $('.post-checkbox:checked').each(function (index) {
    postIds.push($(this).attr('post-id'))
  })
  console.log(postIds)

  $.ajax({
    type: 'POST',
    url: '/admin/dashboard/delete-posts',
    data: {
      postIds
    },
    success: function (res) {
      if (res.error) {

      }
      else {
        console.log('res', res)
        if (res.data.deletedPostCount === postCountOfPage) {
          if (currentPage === pageCount && pageCount > 1) {
            switchToPage(currentPage - 1)
          }
          else {
            switchToPage(currentPage)
          }
        }
        else {
          switchToPage(currentPage)
        }
      }
    }
  })
}

setEventForCheckboxs()
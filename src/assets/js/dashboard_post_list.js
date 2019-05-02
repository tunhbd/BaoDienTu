/**
 * GLOBAL VARIABLES
 */
// var postList = []
// var currentPage = 1
// var pageCount = 5
// var postCountPerPage = 10

const FILTERS = {
  FILTER_SORT: {
    INCREASING_CREATED_DATE: 1,
    DECREASING_CREATED_DATE: 2,
    INCREASING_PUBLISHED_DATE: 3,
    DECREASING_PUBLISHED_DATE: 4,
  }
}

/**
 * FUNCTIONS
 */
// function setEventForPagination(showStatus = false) {
//   $('.pagination__item:not(.pagination__item-control)').click(function () {
//     let chosenPage = parseInt($(this).attr('page'))
//     if (chosenPage != currentPage) {
//       choosePage(chosenPage, showStatus)
//     }
//   })
//   $('.pagination__item-previous-button').click(function () {
//     showPreviousPage(showStatus)
//   })
//   $('.pagination__item-next-button').click(function () {
//     showNextPage(showStatus)
//   })
// }

function initPostListUI() {
  $('.post-list__content').html('')
}

function choosePage(pageNum, choosePageAction, initForPageCountZero) {
  if (pageNum > 0 && pageNum <= pageCount) {
    currentPage = pageNum
    $('.pagination__item-active').removeClass('pagination__item-active');
    $(`.pagination__item[page="${pageNum}"]`).addClass('pagination__item-active')
    choosePageAction(pageNum)
  }
  else {
    initForPageCountZero()
  }
}

function showPreviousPage(choosePageAction, initForPageCountZero) {
  if (currentPage > 1) {
    choosePage(currentPage - 1, choosePageAction, initForPageCountZero)
  }
}

function showNextPage(choosePageAction, initForPageCountZero) {
  if (currentPage < pageCount) {
    choosePage(currentPage + 1, choosePageAction, initForPageCountZero)
  }
}

function showExistsPostDataToForm(post) {
  $('input[name="titlePost"]').val(post.title)
  $('select#categorySelection').val(post.category.category_id)
  $('input[name="tags"]').val(post.tags.join(','))
  $('input[name="summary"]').val(post.summary)
  $('textarea[name="edit-post-editor"]').val(post.content)
}

function renderControlTooltip(postId, post, container) {
  let control = document.createElement('td')
  $(control).addClass('post-list__cell control-icon-container')

  // edit button and delete button
  if (
    // (currentDashboardPage === PAGES.DRAFT.id || currentDashboardPage === PAGES.REJECT.id)
    // &&
    (userRule === USERS.WRITER || userRule === USERS.ADMIN)
  ) {
    // buttons container
    let controlTooltip = document.createElement('div')
    $(controlTooltip).addClass('control-tooltip')

    let controlButtons = document.createElement('div')
    $(controlButtons).addClass('control-buttons')

    if (currentDashboardPage === PAGES.DRAFT.id || currentDashboardPage === PAGES.REJECT.id) {
      // edit button
      let editControl = $(
        `<button type="button" class="btn btn-raised btn-info edit-btn">
        <i class="fas fa-pen"></i>
      </button>`
      )
      editControl.click(function (e) {
        e.stopPropagation()
        showBaoDienTuDialog(
          $('body'),
          'big',
          'Edit Post',
          EDIT_POST_UI,
          [
            {
              title: 'Save',
              callback: () => {
                // showEditingSpace($, 'edit-post-editor')
              }
            }
          ],
          () => {
            showEditingSpace($, 'edit-post-editor')
            showExistsPostDataToForm(post)
          }
        )
      })
      $(controlButtons).append(editControl)
    }

    // delete button
    let deleteControl = $(
      `<button type="button" class="btn btn-raised btn-danger delete-btn">
        <i class="fas fa-times"></i>
      </button>`
    )
    deleteControl.click(function (e) {
      //delete post
      e.stopPropagation()
      showBaoDienTuDialog($('body'), 'small', 'Deleting post confirmation', 'Do you want to delete this post?', [
        {
          title: 'Yes, I want',
          callback: () => {
            postsList = postsList.filter(post => post.id !== postId)

            originPostsList = originPostsList.filter(post => post.id !== postId)
            let selectedPageNum = paginationObj.pagination('getSelectedPageNum')
            showDataListWithPagination(postCountPerPage, $('.pagination'), postsList, $('.post-list__content'), generatePostList)
            selectedPageNum = selectedPageNum > Math.ceil(postsList.length / postCountPerPage) ? selectedPageNum - 1 : selectedPageNum
            paginationObj.pagination('go', selectedPageNum)
          }
        }
      ])
    })
    $(controlButtons).append(deleteControl)

    $(controlTooltip).append(controlButtons)
    $(control).append(controlTooltip)

    // trigger icon for tooltip
    let controlIcon = document.createElement('img')
    $(controlIcon).addClass('control-icon')
    controlIcon.src = '../../media/statics/images/ic_more.png'

    $(controlIcon).mouseenter(function () {
      $(controlTooltip).fadeIn(100)

      $(controlTooltip).mouseenter(function () {
        $(controlTooltip).fadeIn(100)
      })
      $(controlTooltip).mouseleave(function () {
        $(controlTooltip).fadeOut(0)
      })
    })
    $(controlIcon).mouseleave(function () {
      $(controlTooltip).fadeOut(0)
    })

    $(control).append(controlIcon)
  }

  return control
}

function sort(sortId) {
  switch (parseInt(sortId)) {
    case FILTERS.FILTER_SORT.INCREASING_CREATED_DATE:
      postsList = postsList.sort((postOne, postTwo) => (new Date(postOne.created_date)) - (new Date(postTwo.created_date)))
      break;
    case FILTERS.FILTER_SORT.DECREASING_CREATED_DATE:
      postsList = postsList.sort((postOne, postTwo) => (new Date(postTwo.created_date)) - (new Date(postOne.created_date)))
      break;
    case FILTERS.FILTER_SORT.INCREASING_PUBLISHED_DATE:
      console.log('bo')
      postsList = postsList.sort((postOne, postTwo) => (new Date(postOne.published_date)) - (new Date(postTwo.published_date)))
      break;
    case FILTERS.FILTER_SORT.DECREASING_PUBLISHED_DATE:
      postsList = postsList.sort((postOne, postTwo) => (new Date(postTwo.published_date)) - (new Date(postOne.published_date)))
      break;
  }
}

function filterFollowCategory(categoryId) {
  if (categoryId === 'ALL') {
    postsList = originPostsList
  }
  else {
    postsList = originPostsList.filter(post => post.category.category_id === categoryId)
  }
}

function setEventsForFilterCategory() {
  $('#filterCategory').change(function () {
    let categoryId = $(this).val()

    filterFollowCategory(categoryId)
    sort($('#filterSort').val())
    // generatePagination()
    // choosePage(1)
    showDataListWithPagination(postCountPerPage, $('.pagination'), postsList, $('.post-list__content'), generatePostList)
  })
}

function setEventsForFilterSort() {
  $('#filterSort').change(function () {
    let sortId = $(this).val()

    sort(sortId)
    // generatePagination()
    paginationObj.pagination('go', paginationObj.pagination('getSelectedPageNum'))
    // choosePage(currentPage)
  })
}

function setEventsForFilters() {
  setEventsForFilterCategory()
  setEventsForFilterSort()
}

function setEventForDeleteRowsButton() {
  if (userRule === USERS.ADMIN || userRule === USERS.WRITER) {
    $('button.delete-rows').click(() => {
      let selectedPostObjs = $('.bao-dien-tu-checkbox:checked')

      showBaoDienTuDialog(
        $('body'),
        'small',
        'Deleting post list confirmation',
        'Do you want to delete these posts?',
        [
          {
            title: 'Yes, I want',
            callback: () => {
              selectedPostObjs.each(function () {
                postsList = postsList.filter(post => post.id !== $(this).attr('post-id'))
              })

              let selectedPage = paginationObj.pagination('getSelectedPageNum')
              showDataListWithPagination(postCountPerPage, $('.pagination'), postsList, $('.post-list__content'), generatePostList)
              selectedPage = selectedPage > Math.ceil(postsList.length / postCountPerPage) ? Math.ceil(postsList.length / postCountPerPage) : selectedPage
              paginationObj.pagination('go', selectedPage)
            }
          }
        ],
      )
    })
  }
}

function showPostDetail(post) {
  currentPost = post

  $('#postDetailLabel').text(post.title)
  $('.postDetailModal-dialog-content-body').html(post.content)

  $('.postDetailModal-dialog-content-body').append('<div class="post-info"></div>')
  $('.post-info').append(`<div><b>Category:</b> <span class="badge badge-danger">${post.category.category_name}</span></div>`)
  $('.post-info').append(`<div><b>Tags:</b> ${post.tags.map(tag => `<span class="badge badge-secondary">${tag}</span>`).join(' ')}</div>`)

  if (currentDashboardPage !== PAGES.DRAFT.id || (userRule !== USERS.ADMIN && userRule !== USERS.EDITOR)) {
    $('.save-btn').hide()
  }
  else {
    $('.save-btn').show()
    // Set event for save button
    $('.save-btn').click(function () {
      // do something

    })
  }
}

function showCheckingFunction() {
  if (currentDashboardPage === PAGES.DRAFT.id && userRule === USERS.ADMIN || userRule === USERS.EDITOR) {
    $('.postDetailModal-dialog-content-body').append(`<div class="post-checking"></div>`)

    $('.post-checking').append(
      `<div class="custom-control custom-radio">
        <input type="radio" id="isPublished" value="1" name="checking" class="custom-control-input">
        <label class="custom-control-label" for="isPublished">Allow to publish</label>
      </div>`
    )
    $('.post-checking').append('<input class="form-control" id="publishedDateInput" placeholder="Enter date to publish post">')
    $('#publishedDateInput').datepicker({
      defaultDate: new Date(),
      minDate: new Date(),
    });

    $('.post-checking').append(
      `<div class="custom-control custom-radio">
        <input type="radio" id="reject" value="0" name="checking" class="custom-control-input">
        <label class="custom-control-label" for="reject">Reject</label>
      </div>`
    )
    $('.post-checking').append(
      `<div class="form-group" id="whyRejectForm">
        <label for="whyReject">Why do you reject this post?</label>
        <textarea class="form-control bao-dien-tu-scrollbar" id="whyReject" rows="3"></textarea>
      </div>`
    )

    $('input[name="checking"]').change(function () {
      if ($(this).val() == 1) {
        $('#whyRejectForm').css('display', 'none')
        $('#publishedDateInput').css('display', 'block')
        $('#publishedDateInput').scroll()
      }
      else {
        $('#whyRejectForm').css('display', 'block')
        $('#whyRejectForm').scroll()
        $('#publishedDateInput').css('display', 'none')
      }
    })
  }


  //     <div class="custom-control custom-radio">
  //       <input type="radio" id="reject" name="customRadio" class="custom-control-input">
  //         <label class="custom-control-label" for="reject">Reject</label>
  // </div>
}

function showPostList(pageNum) {
  var postsListObj = $('.post-list__content')

  postsListObj.html('')

  let startPos = postCountPerPage * (pageNum - 1)
  let endPos = postCountPerPage * pageNum
  endPos = endPos > postsList.length ? postsList.length : endPos

  if (PAGES[currentDashboardPage].status) {
    for (let index = startPos; index < endPos; index++) {
      let postItem = $(
        `<tr class="post-list__row" data-toggle="modal" data-target="#postDetail">
          <td class="post-list__cell">${postsList[index].title}</td>
          <td class="post-list__cell">${postsList[index].category.category_name}</td>
          <td class="post-list__cell">
            ${
        (postsList[index].author.pseudonym === undefined || postsList[index].author.pseudonym === '')
          ? postsList[index].author.name
          : postsList[index].author.pseudonym
        }
          </td>
          <td class="post-list__cell">${formatVietnameseDate(postsList[index].created_date)}</td>
          <td class="post-list__cell">${formatVietnameseDate(postsList[index].published_date)}</td>
        </tr>`
      )

      postItem.append(renderControlTooltip(postsList[index].id, index, postItem))
      postItem.click(() => {
        showPostDetail(postsList[index])
        showCheckingFunction()
      })
      postsListObj.append(postItem)
    }
  }
  else {
    for (let index = startPos; index < endPos; index++) {
      let postItem = $(
        `<tr class="post-list__row" data-toggle="modal" data-target="#postDetail">
          <td class="post-list__cell">${postsList[index].title}</td>
          <td class="post-list__cell">${postsList[index].category.category_name}</td>
          <td class="post-list__cell">
            ${
        (postsList[index].author.pseudonym === undefined || postsList[index].author.pseudonym === '')
          ? postsList[index].author.name
          : postsList[index].author.pseudonym
        }
          </td>
          <td class="post-list__cell">${formatVietnameseDate(postsList[index].created_date)}</td>
        </tr>`
      )

      postItem.append(renderControlTooltip(postsList[index].id, index, postItem))
      postItem.click(function () {
        showPostDetail(postsList[index])
        showCheckingFunction()
      })
      postsListObj.append(postItem)
    }
  }
}

function initPageCountFromPostList() {
  pageCount = Math.ceil(postsList.length / postCountPerPage)
}


function generatePagination(initPageCountFunc, choosePageAction, initForPageCountZero) {
  let pagination = $('.pagination ul')

  initPageCountFunc()

  // init
  pagination.html('')
  let previousBtn = $(
    `<li class="pagination__item pagination__item-control pagination__item-previous-button">
      <i class="fas fa-chevron-left"></i>
    </li>`
  )
  previousBtn.click(() => { showPreviousPage(choosePageAction, initForPageCountZero) })
  pagination.append(previousBtn)

  for (let index = 1; index <= pageCount; index++) {
    let page = $(`<li page="${index}" class="pagination__item">${index}</li>`)

    page.click(() => { choosePage(index, choosePageAction, initForPageCountZero) })
    pagination.append(page)
  }

  let nextBtn = $(
    `<li class="pagination__item pagination__item-control pagination__item-next-button">
      <i class="fas fa-chevron-right"></i>
      </li>`
  )
  nextBtn.click(() => { showNextPage(choosePageAction, initForPageCountZero) })
  pagination.append(nextBtn)
}


// new functions

function generatePostList(dataList) {
  var postsListObj = $('<div></div>')

  postsListObj.html('')

  // let startPos = postCountPerPage * (pageNum - 1)
  // let endPos = postCountPerPage * pageNum
  // endPos = endPos > postsList.length ? postsList.length : endPos

  if (PAGES[currentDashboardPage].status) {
    dataList.forEach(data => {
      let postItem = $(
        `<tr class="post-list__row" data-toggle="modal" data-target="#postDetail">
          <td class="post-list__cell post-list__cell-choose">
            <div class="custom-control custom-checkbox d-flex align-content-center">
              <input type="checkbox" class="custom-control-input bao-dien-tu-checkbox" post-id="${data.id}" id="checkbox-post-${data.id}">
              <label class="custom-control-label bao-dien-tu-checkbox-mark" for="checkbox-post-${data.id}"></label>
            </div>
          </td>
          <td class="post-list__cell">${data.title}</td>
          <td class="post-list__cell">${data.category.category_name}</td>
          <td class="post-list__cell">
            ${
        (data.author.pseudonym === undefined || data.author.pseudonym === '')
          ? data.author.name
          : data.author.pseudonym
        }
          </td>
          <td class="post-list__cell">${formatVietnameseDate(data.created_date)}</td>
          <td class="post-list__cell">${formatVietnameseDate(data.published_date)}</td>
        </tr>`
      )

      postItem.append(renderControlTooltip(data.id, data, postItem))
      postItem.click(() => {
        showPostDetail(data)
        showCheckingFunction()
      })
      if (userRule === USERS.ADMIN || userRule === USERS.WRITER) {
        postItem.children(`.post-list__cell-choose`).click((e) => {
          e.stopPropagation()
  
          if ($('.post-list__cell-choose input:checked').length > 0) {
            $('button.delete-rows').removeAttr('disabled')
          }
          else {
            $('button.delete-rows').attr('disabled', true)
          }
        })
      }
      postsListObj.append(postItem)
    })
  }
  else {
    dataList.forEach(data => {
      let postItem = $(
        `<tr class="post-list__row" data-toggle="modal" data-target="#postDetail">
          <td class="post-list__cell post-list__cell-choose">
            <div class="custom-control custom-checkbox d-flex align-content-center">
              <input type="checkbox" class="custom-control-input bao-dien-tu-checkbox" post-id="${data.id}" id="checkbox-post-${data.id}">
              <label class="custom-control-label bao-dien-tu-checkbox-mark" for="checkbox-post-${data.id}"></label>
            </div>
          </td>
          <td class="post-list__cell">${data.title}</td>
          <td class="post-list__cell">${data.category.category_name}</td>
          <td class="post-list__cell">
            ${
        (data.author.pseudonym === undefined || data.author.pseudonym === '')
          ? data.author.name
          : data.author.pseudonym
        }
          </td>
          <td class="post-list__cell">${formatVietnameseDate(data.created_date)}</td>
        </tr>`
      )

      postItem.append(renderControlTooltip(data.id, data, postItem))
      postItem.click(function () {
        showPostDetail(data)
        showCheckingFunction()
      })
      if (userRule === USERS.ADMIN || userRule === USERS.WRITER) {
        postItem.children(`.post-list__cell-choose`).click((e) => {
          e.stopPropagation()
  
          if ($('.post-list__cell-choose input:checked').length > 0) {
            $('button.delete-rows').removeAttr('disabled')
          }
          else {
            $('button.delete-rows').attr('disabled', true)
          }
        })
      }
      postsListObj.append(postItem)
    })
  }

  return postsListObj.children()
}

function showDataListWithPagination(countPerPage, paginationContainer, dataSource, dataContainer, generateDataListFunc) {
  paginationObj = paginationContainer
  paginationObj.pagination({
    dataSource: dataSource,
    pageSize: countPerPage,
    showGoInput: true,
    showGoButton: true,
    className: 'paginationjs-theme-bao-dien-tu paginationjs-big',
    callback: function (data, pagination) {
      var dataList = generateDataListFunc(data);
      $(dataContainer).html('')
      $(dataContainer).append(dataList)
    }
  });
}


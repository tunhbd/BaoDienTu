/**
 * GLOBAL VARIABLES
 */
var postList = []
var currentPage = 1
var pageCount = 5
var postCountPerPage = 10

/**
 * FUNCTIONS
 */
function setEventForPagination(showStatus = false) {
  $('.pagination__item:not(.pagination__item-control)').click(function () {
    let chosenPage = parseInt($(this).attr('page'))
    if (chosenPage != currentPage) {
      choosePage(chosenPage, showStatus)
    }
  })
  $('.pagination__item-previous-button').click(function () {
    showPreviousPage(showStatus)
  })
  $('.pagination__item-next-button').click(function () {
    showNextPage(showStatus)
  })
}

function choosePage(pageNum, showStatus = false) {
  currentPage = pageNum
  $('.pagination__item-active').removeClass('pagination__item-active');
  $(`.pagination__item[page="${pageNum}"]`).addClass('pagination__item-active')
  showPostList(pageNum, showStatus)
}

function showPreviousPage(showStatus = false) {
  if (currentPage > 1) {
    choosePage(currentPage - 1, showStatus)
  }
}

function showNextPage(showStatus = false) {
  if (currentPage < pageCount) {
    choosePage(currentPage + 1, showStatus)
  }
}

function renderControlTooltip(postId, postIndex, container) {
  let control = document.createElement('td')
  $(control).addClass('post-list__cell')

  // edit button and delete button
  if (
    (currentDashboardPage === PAGES.DRAFT.id || currentDashboardPage === PAGES.REJECT.id)
    &&
    (userRule === USERS.WRITER || userRule === USERS.ADMIN)
  ) {
    // buttons container
    let controlButtons = document.createElement('div')
    $(controlButtons).addClass('control-buttons')

    // edit button
    let editControl = document.createElement('button')
    $(editControl).addClass('btn btn-light')
    $(editControl).text('Edit')
    $(editControl).click(function () {

    })
    $(controlButtons).append(editControl)

    // delete button
    let deleteControl = document.createElement('button')
    $(deleteControl).addClass('btn btn-light')
    $(deleteControl).text('Delete')
    $(deleteControl).click(function () {

    })
    $(controlButtons).append(deleteControl)

    // trigger icon for tooltip
    let controlIcon = document.createElement('img')
    $(controlIcon).addClass('control-icon')
    controlIcon.src = '../../media/statics/images/ic_more.png'
    $(controlIcon).tooltip({
      html: true,
      animation: true,
      // delay: {
      //   show: 100,
      //   hide: 100
      // },
      container,
      trigger: 'click',
      title: controlButtons,
      placement: 'bottom',
      template:
        `<div class="tooltip control-tooltip" role="tooltip">
            
            <div class="tooltip-inner control-tooltip-inner">
            </div>
          </div>`
    })
    $(control).append(controlIcon)
  }

  return control
}

function showPostList(pageNum, showStatus = false) {
  var postListObj = $('.post-list__content')

  postListObj.html('')
  console.log('pageNum', postListObj)

  let startPos = postCountPerPage * (pageNum - 1)
  let endPos = postCountPerPage * pageNum
  endPos = endPos > postList.length ? postList.length : endPos
  console.log('pageCount', endPos)
  if (showStatus) {
    for (let index = startPos; index < endPos; index++) {
      let postItem = $(
        `<tr class="post-list__row">
                    <td class="post-list__cell">${postList[index].title}</td>
                    <td class="post-list__cell">${postList[index].category.category_name}</td>
                    <td class="post-list__cell">
                        ${
                          (postList[index].author.pseudonym === undefined
                            || postList[index].author.pseudonym === '')
                            ? postList[index].author.name
                            : postList[index].author.pseudonym
                        }
                    </td>
                    <td class="post-list__cell">${postList[index].created_date}</td>
                    <td class="post-list__cell">${postList[index].published_date}</td>
                </tr>`
      )

      postItem.append(renderControlTooltip(postList[index].id, index, postItem))
      postListObj.append(postItem)
    }
  }
  else {
    for (let index = startPos; index < endPos; index++) {
      let postItem = $(
        `<tr class="post-list__row">
                    <td class="post-list__cell">${postList[index].title}</td>
                    <td class="post-list__cell">${postList[index].category.category_name}</td>
                    <td class="post-list__cell">
                        ${
                          (postList[index].author.pseudonym === undefined
                            || postList[index].author.pseudonym === '')
                            ? postList[index].author.name
                            : postList[index].author.pseudonym
                        }
                    </td>
                    <td class="post-list__cell">${postList[index].created_date}</td>
                    
                </tr>`
      )

      postItem.append(renderControlTooltip(postList[index].id, index, postItem))
      postListObj.append(postItem)
    }
  }

}

function generatePagination() {
  let pagination = $('.pagination ul')
  pageCount = Math.ceil(postList.length / postCountPerPage)

  // init
  pagination.html('')
  pagination.append(`
        <li class="pagination__item pagination__item-control pagination__item-previous-button">
            <i class="pagination-icon pagination-icon-arrow-left"></i>
        </li>
    `)
  for (let index = 1; index <= pageCount; index++) {
    pagination.append(`
            <li page="${index}" class="pagination__item">${index}</li>
        `)
  }
  pagination.append(`
        <li class="pagination__item pagination__item-control pagination__item-next-button">
            <i class="pagination-icon pagination-icon-arrow-right"></i>
        </li>
    `)
}

function loadPostList(showStatus = false) {
  postList = [
    {
      id: '0',
      title: 'Post 01 post 01 post 01 post 01 post 01 post 01 post 01 post 01 post 01 post 01 post 01',
      author: {
        name: 'Nguyen Huu Tu',
        pseudonym: '',
      },
      category: {
        category_id: 'categ01',
        category_name: 'Kinh Tế',
      },
      created_date: '2019/05/12',
      published_date: '2019/05/12'
    },
    {
      id: '1',
      title: 'Post 02',
      author: {
        name: 'Nguyen Huu Tu',
        pseudonym: '',
      },
      category: {
        category_id: 'categ01.1',
        category_name: 'Nông nghiệp',
      },
      created_date: '2019/05/12',
      published_date: '2019/05/12'
    },
    {
      id: '2',
      title: 'Post 03',
      author: {
        name: 'Nguyen Huu Tu',
        pseudonym: '',
      },
      category: {
        category_id: 'categ01.2',
        category_name: 'Công nghiệp',
      },
      created_date: '2019/05/12',
      published_date: '2019/05/12'
    },
    {
      id: '3',
      title: 'Post 04',
      author: {
        name: 'Nguyen Huu Tu',
        pseudonym: '',
      },
      category: {
        category_id: 'categ02',
        category_name: 'Xe',
      },
      created_date: '2019/05/12',
      published_date: '2019/05/12'
    },
    {
      id: '4',
      title: 'Post 05',
      author: {
        name: 'Nguyen Huu Tu',
        pseudonym: '',
      },
      category: {
        category_id: 'categ03',
        category_name: 'Xã hội',
      },
      created_date: '2019/05/12',
      published_date: '2019/05/12'
    },
    {
      id: '5',
      title: 'Post 06',
      author: {
        name: 'Nguyen Huu Tu',
        pseudonym: '',
      },
      category: {
        category_id: 'categ04',
        category_name: 'Pháp luật',
      },
      created_date: '2019/05/12',
      published_date: '2019/05/12'
    },
    {
      id: '6',
      title: 'Post 07',
      author: {
        name: 'Nguyen Huu Tu',
        pseudonym: '',
      },
      category: {
        category_id: 'categ05',
        category_name: 'Kinh Tế',
      },
      created_date: '2019/05/12',
      published_date: '2019/05/12'
    },
    {
      id: '7',
      title: 'Post 08',
      author: {
        name: 'Nguyen Huu Tu',
        pseudonym: '',
      },
      category: {
        category_id: 'categ01',
        category_name: 'Kinh Tế',
      },
      created_date: '2019/05/12',
      published_date: '2019/05/12'
    },
    {
      id: '8',
      title: 'Post 09',
      author: {
        name: 'Nguyen Huu Tu',
        pseudonym: '',
      },
      category: {
        category_id: 'categ01',
        category_name: 'Kinh Tế',
      },
      created_date: '2019/05/12',
      published_date: '2019/05/12'
    },
    {
      id: '9',
      title: 'Post 10',
      author: {
        name: 'Nguyen Huu Tu',
        pseudonym: '',
      },
      category: {
        category_id: 'categ01',
        category_name: 'Kinh Tế',
      },
      created_date: '2019/05/12',
      published_date: '2019/05/12'
    },
    {
      id: '10',
      title: 'Post 11',
      author: {
        name: 'Nguyen Huu Tu',
        pseudonym: '',
      },
      category: {
        category_id: 'categ01',
        category_name: 'Kinh Tế',
      },
      created_date: '2019/05/12',
      published_date: '2019/05/12'
    },
    {
      id: '11',
      title: 'Post 12',
      author: {
        name: 'Nguyen Huu Tu',
        pseudonym: '',
      },
      category: {
        category_id: 'categ01',
        category_name: 'Kinh Tế',
      },
      created_date: '2019/05/12',
      published_date: '2019/05/12'
    },
    {
      id: '12',
      title: 'Post 13',
      author: {
        name: 'Nguyen Huu Tu',
        pseudonym: '',
      },
      category: {
        category_id: 'categ01',
        category_name: 'Kinh Tế',
      },
      created_date: '2019/05/12',
      published_date: '2019/05/12'
    },
    {
      id: '13',
      title: 'Post 14',
      author: {
        name: 'Nguyen Huu Tu',
        pseudonym: '',
      },
      category: {
        category_id: 'categ01',
        category_name: 'Kinh Tế',
      },
      created_date: '2019/05/12',
      published_date: '2019/05/12'
    },
    {
      id: '14',
      title: 'Post 15',
      author: {
        name: 'Nguyen Huu Tu',
        pseudonym: '',
      },
      category: {
        category_id: 'categ01',
        category_name: 'Kinh Tế',
      },
      created_date: '2019/05/12',
      published_date: '2019/05/12'
    },
  ]
  generatePagination()
  choosePage(1, showStatus)
}

/**
 * MAIN SCRIPT
 */



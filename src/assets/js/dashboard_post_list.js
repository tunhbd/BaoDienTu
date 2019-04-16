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
    if ($(this).attr('page') != currentPage) {
      choosePage($(this).attr('page'), showStatus)
    }
  })
  $('.pagination__item-previous-button').click(function() {
    showPreviousPage(showStatus)
  })
  $('.pagination__item-next-button').click(function() {
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
      let postItem =
        `<tr class="post-list__row">
                    <td class="post-list__cell">${postList[index].title}</td>
                    <td class="post-list__cell">${postList[index].category.category_name}</td>
                    <td class="post-list__cell">
                        ${
                          (postList[index].author.pseudonym === undefined
                          || postList[index].author.pseudonym === '')
                          ? postList[index].author.name
                          : postList[index].author.pseudonym}
                    </td>
                    <td class="post-list__cell">${postList[index].created_date}</td>
                    <td class="post-list__cell">${postList[index].published_date}</td>
                </tr>`
      postListObj.append(postItem)
    }
  }
  else {
    for (let index = startPos; index < endPos; index++) {
      let postItem =
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
      title: 'Post 01',
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

  

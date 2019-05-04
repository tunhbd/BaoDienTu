/**
 * GLOBAL VARIABLES
 */
const PAGES = {
  GENERAL: {
    id: 'GENERAL',
    url: ''
  },
  CREATE_POST: {
    id: 'CREATE_POST',
    urlUI: '/dashboard-ui/CREATE_POST',
    url: '',
  },
  DRAFT: {
    id: 'DRAFT',
    urlUI: '/dashboard-ui/DRAFT',
    url: '/posts-list/DRAFT',
    status: false,
  },
  WAITING: {
    id: 'WAITING',
    urlUI: '/dashboard-ui/WAITING',
    url: '/posts-list/WAITING',
    status: true,
  },
  REJECT: {
    id: 'REJECT',
    urlUI: '/dashboard-ui/REJECT',
    url: '/posts-list/REJECT',
    status: false,
  },
  PUBLISHED: {
    id: 'PUBLISHED',
    urlUI: '/dashboard-ui/PUBLISHED',
    url: '/posts-list/PUBLISHED',
    status: true,
  },
  USER: {
    id: 'USER',
    urlUI: '/dashboard-ui/USER',
    url: '/users-list',
  },
  CATEGORY: {
    id: 'CATEGORY',
    urlUI: '/dashboard-ui/CATEGORY',
    url: '/categories-list',
  },
  TAG: {
    id: 'TAG',
    urlUI: '/dashboard-ui/TAG',
    url: '/tags-list',
  },
}
const USERS = {
  ADMIN: 'ADMIN',
  SUBSCRIBER: 'SUBSCRIBER',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR'
}
const postCountPerPage = 10
const userCountPerPage = 10

var currentDashboardPage = null
var userRule = USERS.ADMIN
var currentPost = null
var postsList = []
var usersList = []
var tagsList = []
var categoriesList = []
var originPostsList = []
var pageCount = 0
var currentPage = 1
var mainContent = $('#dashboard-main__right-sidebar')
var paginationObj = null

/**
 * FUNCTIONS
 */
// function setEventsForMenu() {
//   $('#dashboard-main__left-sidebar__menu .menu-item-group__item').click(function () {
//     $('#dashboard-main__left-sidebar__menu .menu-item-group__item__activing').removeClass('menu-item-group__item__activing')
//     $(this).addClass('menu-item-group__item__activing')
//   })
// }

// function setEventsForMobileMenu() {
//   $('#mobile-menu .menu-item-group__item').click(function () {
//     $('#mobile-menu .menu-item-group__item__activing').removeClass('menu-item-group__item__activing')
//     $(this).addClass('menu-item-group__item__activing')
//   })
// }

function changePage(pageId) {
  history.pushState('', pageId, `${window.location.href.split('?')[0]}?page_id=${pageId}`)
}

// Load posts list from server
function loadPostsList(pageId, callback) {

  postsList = POSTS_LIST
  originPostsList = POSTS_LIST
}

function loadUsersList() {
  usersList = USERS_LIST
}

function loadTagsList() {
  tagsList = TAGS_LIST
}

function loadCategoriesList() {
  categoriesList = CATEGORIES
}

function showAndSetupPostList() {
  showDataListWithPagination(postCountPerPage, $('.pagination'), postsList, $('.post-list__content'), generatePostList)
  setEventForDeleteRowsButton()
  setEventsForFilters()
}

function loadPageContent(pageId) {
  currentDashboardPage = pageId

  switch (pageId) {
    case PAGES.GENERAL.id:
      mainContent.html('')
      break;
    case PAGES.CREATE_POST.id:
      $.get({
        url: PAGES.CREATE_POST.urlUI,
        data: {},
        success: function (data) {
          mainContent.html(data)
          showEditingSpace($, 'create-post-editor')
        },
        dateType: 'html'
      })
      break;
    case PAGES.DRAFT.id:
      $.get({
        url: PAGES.DRAFT.urlUI,
        data: {},
        success: function (data) {
          mainContent.html(data)

          $.get({
            url: PAGES.DRAFT.url,
            data: {},
            success: function (data) {
              originPostsList = Array.from(data)
              postsList = Array.from(data)
              showAndSetupPostList()
            }
          })
        },
        dataType: 'html'
      })
      break;
    case PAGES.REJECT.id:
      $.get({
        url: PAGES.REJECT.urlUI,
        data: {},
        success: function (data) {
          mainContent.html(data)

          $.get({
            url: PAGES.REJECT.url,
            data: {},
            success: function (data) {
              originPostsList = Array.from(data)
              postsList = Array.from(data)
              showAndSetupPostList()
            }
          })
        },
        dataType: 'html'
      })
      break;
    case PAGES.WAITING.id:
      $.get({
        url: PAGES.WAITING.urlUI,
        data: {},
        success: function (data) {
          mainContent.html(data)

          $.get({
            url: PAGES.WAITING.url,
            data: {},
            success: function (data) {
              originPostsList = Array.from(data)
              postsList = Array.from(data)
              showAndSetupPostList()
            }
          })
        },
        dataType: 'html'
      })
      break;
    case PAGES.PUBLISHED.id:
      $.get({
        url: PAGES.PUBLISHED.urlUI,
        data: {},
        success: function (data) {
          mainContent.html(data)

          $.get({
            url: PAGES.PUBLISHED.url,
            data: {},
            success: function (data) {
              originPostsList = Array.from(data)
              postsList = Array.from(data)
              showAndSetupPostList()
            }
          })
        },
        dataType: 'html'
      })
      break;
    case PAGES.CATEGORY.id:
      $.get({
        url: PAGES.CATEGORY.urlUI,
        data: {},
        success: function (data) {
          mainContent.html(data)

          $.get({
            url: PAGES.CATEGORY.url,
            data: {},
            success: function (data) {
              categoriesList = data
              showDataListWithPagination(CATEGORY_COUNT_PER_PAGE, $("#pagination-container"), categoriesList, $("#data-container"), listCategories, setUpForCategorieslist)
            }
          })
        },
        dataType: 'html'
      })
      // loadCategoriesList()
      // mainContent.html(CATEGORIES_LIST_UI)
      // showCategoriesList($, categoriesList)
      break;
    case PAGES.TAG.id:
      $.get({
        url: PAGES.TAG.urlUI,
        data: {},
        success: function (data) {
          mainContent.html(data)

          $.get({
            url: PAGES.TAG.url,
            data: {},
            success: function (data) {
              tagsList = data
              // showTagsList($, tagsList)
              showDataListWithPagination(TAG_COUNT_PER_PAGE, $("#pagination-container"), tagsList, $("#data-container"), listTags, setUpForTagsList)
            },
          })
        },
        dataType: 'html'
      })
      // loadTagsList()
      // mainContent.html(TAGS_LIST_UI)
      // showTagsList($, tagsList)
      break
    case PAGES.USER.id:
      $.get({
        url: PAGES.USER.urlUI,
        data: {},
        success: function (data) {
          mainContent.html(data)

          $.get({
            url: PAGES.USER.url,
            data: {},
            success: function (data) {
              usersList = data
              showDataListWithPagination(userCountPerPage, $('.pagination'), usersList, $('.user-list__content'), generateUserList)
            }
          })
        },
        dataType: 'html'
      })
      // loadUsersList()
      // mainContent.html(USER_LIST_UI)
      // generatePagination(initPageCountFromUserList, showUserList, initUserListUI)
      // choosePage(1, showUserList, initUserListUI)
      break;
  }
}

function setEventsForCommonMenu() {
  $('.menu-item-group__item').click(function () {
    console.log(this)
    $('#dashboard-main__left-sidebar__menu .menu-item-group__item__activing').removeClass('menu-item-group__item__activing')
    $('#mobile-menu .menu-item-group__item__activing').removeClass('menu-item-group__item__activing')

    $(`#dashboard-main__left-sidebar__menu .menu-item-group__item[menu-id="${$(this).attr('menu-id')}"]`)
      .addClass('menu-item-group__item__activing')
    $(`#mobile-menu .menu-item-group__item[menu-id="${$(this).attr('menu-id')}"]`)
      .addClass('menu-item-group__item__activing')

    if ($(this).attr('menu-id') !== currentDashboardPage) {
      let pageId = $(this).attr('menu-id')
      changePage(pageId)
      loadPageContent(pageId)
      console.log(currentDashboardPage)
    }
  })
}

function setEventForAvatarUser() {
  $('#avatar-user').click(function () {
    if ($(this).hasClass('user-menu-is-collapse')) {
      $('.user-menu').slideDown(300)
      $(this).removeClass('user-menu-is-collapse')
    }
    else {
      $('.user-menu').slideUp(300)
      $(this).addClass('user-menu-is-collapse')
    }
  })
}

function setEventForToggleMenuIcon() {
  var toggleMenuIcon = $('.dashboard-header__toggle-menu')
  var leftSideBar = $('#dashboard-main__left-sidebar')
  var mobileMenu = $('#mobile-menu')
  var dashboardMainContent = $('.dashboard-main__content')

  toggleMenuIcon.click(function () {
    // $(':root').css('--db-header-height', '100px')
    if ($(this).hasClass('dashboard-header__toggle-menu-mobile')) {
      if (mobileMenu.hasClass('show-menu')) {
        mobileMenu.removeClass('show-menu')
        mobileMenu.addClass('hide-menu')
        console.log('hide menu')
      }
      else {
        mobileMenu.removeClass('hide-menu')
        mobileMenu.addClass('show-menu')
        console.log('show menu')
      }
    }
    else {
      if (leftSideBar.hasClass('collapse-menu')) {

        leftSideBar.removeClass('collapse-menu')
        leftSideBar.addClass('expand-menu')

        // setTimeout(function () {
        //   $('#dashboard-main__left-sidebar__menu .menu-item-group__item__title').removeClass('is-collapse-menu')
        // }, 200)
        setTimeout(function () {
          $('#dashboard-main__left-sidebar__menu .menu-item-group__item__title').fadeIn(200)
          $(':root').css('--dashboard-main-content-left-sidebar-width', '200px')
        }, 200)
      }
      else {
        leftSideBar.addClass('collapse-menu')
        leftSideBar.removeClass('expand-menu')
        $('#dashboard-main__left-sidebar__menu .menu-item-group__item__title').fadeOut(200)
        // $('#dashboard-main__left-sidebar__menu .menu-item-group__item__title').addClass('is-collapse-menu')
        setTimeout(function () {
          $(':root').css('--dashboard-main-content-left-sidebar-width', '75px')
        }, 200)
      }
    }
  })
}

/**
 * MAIN SCRIPT
 */

// setEventsForMenu()
// setEventsForMobileMenu()
setEventsForCommonMenu()
setEventForAvatarUser()
setEventForToggleMenuIcon()

$(document).ready(() => {
  let params = new URLSearchParams(window.location.search)
  let pageId = params.get('page_id')

  if (pageId === null) {
    pageId = PAGES.GENERAL.id
  }
  // currentDashboardPage = params.get('page_id')
  document.querySelector(`#dashboard-main__left-sidebar__menu .menu-item-group__item[menu-id="${pageId}"]`).click()
})

// }
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
    url: '',
  },
  DRAFT: {
    id: 'DRAFT',
    url: '',
    status: false,
  },
  WAITING: {
    id: 'WAITING',
    url: '',
    status: true,
  },
  REJECT: {
    id: 'REJECT',
    url: '',
    status: false,
  },
  PUBLISHED: {
    id: 'PUBLISHED',
    url: '',
    status: true,
  },
  USER: {
    id: 'USER',
    url: '',
  },
  CATEGORY: {
    id: 'CATEGORY',
    url: '',
  },
  TAG: {
    id: 'TAG',
    url: '',
  },
}
const USERS = {
  ADMIN: 'ADMIN',
  SUBSCRIBER: 'SUBSCRIBER',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR'
}
const postCountPerPage = 10

var currentDashboardPage = null
var userRule = USERS.ADMIN
var currentPost = null
var postsList = []
var originPostsList = []
var pageCount = 0
var currentPage = 1
var mainContent = $('#dashboard-main__right-sidebar')

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
function loadPostsList(pageId) {
  postsList = POSTS_LIST
  originPostsList = POSTS_LIST
}

function loadPageContent(pageId) {
  currentDashboardPage = pageId

  switch (pageId) {
    case PAGES.GENERAL.id:
      mainContent.html('')
      break;
    case PAGES.CREATE_POST.id:
      mainContent.html(CREATE_POST_UI)
      !showEditingSpace($)
      break;
    case PAGES.DRAFT.id:
      loadPostsList(pageId)
      mainContent.html(POSTS_LIST_NONE_STATUS_UI)
      generatePagination()
      choosePage(1)
      setEventsForFilters()
      break;
    case PAGES.REJECT.id:
      loadPostsList(pageId)
      mainContent.html(POSTS_LIST_NONE_STATUS_UI)
      generatePagination()
      choosePage(1)
      setEventsForFilters()
      break;
    case PAGES.WAITING.id:
      loadPostsList(pageId)
      mainContent.html(POSTS_LIST_STATUS_UI)
      generatePagination()
      choosePage(1)
      setEventsForFilters()
      break;
    case PAGES.PUBLISHED.id:
      loadPostsList(pageId)
      mainContent.html(POSTS_LIST_STATUS_UI)
      generatePagination()
      choosePage(1)
      setEventsForFilters()
      break;
    case PAGES.CATEGORY.id:
      break;
    case PAGES.TAG.id:
      break;
    case PAGES.USER.id:
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

  // currentDashboardPage = params.get('page_id')
  document.querySelector(`#dashboard-main__left-sidebar__menu .menu-item-group__item[menu-id="${params.get('page_id')}"]`).click()
})

// }
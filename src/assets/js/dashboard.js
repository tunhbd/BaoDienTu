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
    url: './dashboard_draft.html',
  },
  WAITING: {
    id: 'WAITING',
    url: './dashboard_waiting.html',
  },
  REJECT: {
    id: 'REJECT',
    url: '',
  },
  PUBLISHED: {
    id: 'PUBLISHED',
    url: '',
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

var currentPage = null
var userRule = USERS.ADMIN
var currentPost = null

/**
 * FUNCTIONS
 */
function setEventsForMenu() {
  $('#dashboard-main__left-sidebar__menu .menu-item-group__item').click(function () {
    $('#dashboard-main__left-sidebar__menu .menu-item-group__item__activing').removeClass('menu-item-group__item__activing')
    $(this).addClass('menu-item-group__item__activing')
  })
}

function setEventsForMobileMenu() {
  $('#mobile-menu .menu-item-group__item').click(function () {
    $('#mobile-menu .menu-item-group__item__activing').removeClass('menu-item-group__item__activing')
    $(this).addClass('menu-item-group__item__activing')
  })
}

function setEventsForCommonMenu() {
  $('.menu-item-group__item').click(function () {
    $('#dashboard-main__left-sidebar__menu .menu-item-group__item__activing').removeClass('menu-item-group__item__activing')
    $('#mobile-menu .menu-item-group__item__activing').removeClass('menu-item-group__item__activing')

    $(`#dashboard-main__left-sidebar__menu .menu-item-group__item[menu-id="${$(this).attr('menu-id')}"]`)
      .addClass('menu-item-group__item__activing')
    $(`#mobile-menu .menu-item-group__item[menu-id="${$(this).attr('menu-id')}"]`)
      .addClass('menu-item-group__item__activing')

    if ($(this).attr('menu-id') !== currentDashboardPage) {
      window.location = PAGES[$(this).attr('menu-id')].url
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

  toggleMenuIcon.click(function () {
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
        setTimeout(function () {
          $('#dashboard-main__left-sidebar__menu .menu-item-group__item__title').removeClass('is-collapse-menu')
        }, 250)
      }
      else {
        leftSideBar.addClass('collapse-menu')
        leftSideBar.removeClass('expand-menu')
        $('#dashboard-main__left-sidebar__menu .menu-item-group__item__title').addClass('is-collapse-menu')
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

// }
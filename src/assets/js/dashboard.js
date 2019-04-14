function setEventsForMenu() {
  $('#dashboard-main__left-sidebar__menu .menu-item-group__item').click(function() {
    console.log('ko')
    $('#dashboard-main__left-sidebar__menu .menu-item-group__item__activing').removeClass('menu-item-group__item__activing')
    $(this).addClass('menu-item-group__item__activing')
  })
}

function setEventsForMobileMenu() {
  $('#mobile-menu .menu-item-group__item').click(function() {
    $('#mobile-menu .menu-item-group__item__activing').removeClass('menu-item-group__item__activing')
    $(this).addClass('menu-item-group__item__activing')
  })
}

function setEventForAvatarUser() {
  $('#avatar-user').click(function() {
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

window.onload = function () {
  var toggleMenuIcon = $('.dashboard-header__toggle-menu')
  var leftSideBar = $('#dashboard-main__left-sidebar')
  var mobileMenu = $('#mobile-menu')

  setEventsForMenu()
  setEventsForMobileMenu()
  setEventForAvatarUser()

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
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

// function changePage(pageId) {
//   history.pushState('', pageId, `${window.location.href.split('?')[0]}?page_id=${pageId}`)
// }

// Load posts list from server
// function loadPostsList(pageId, callback) {

//   postsList = POSTS_LIST
//   originPostsList = POSTS_LIST
// }

// function loadUsersList() {
//   usersList = USERS_LIST
// }

// function loadTagsList() {
//   tagsList = TAGS_LIST
// }

// function loadCategoriesList() {
//   categoriesList = CATEGORIES
// }

// function showAndSetupPostList() {
//   showDataListWithPagination(postCountPerPage, $('.pagination'), postsList, $('.post-list__content'), generatePostList)
//   setEventForDeleteRowsButton()
//   setEventsForFilters()
// }
var dashboardContentLoading = null
// function loadPageContent(pageId) {
//   mainContent.html('')

//   if (dashboardContentLoading === null) {
//     dashboardContentLoading = showLoading(document.getElementById('dashboard-main__right-sidebar'))
//   }
//   currentDashboardPage = pageId

//   switch (pageId) {
//     case PAGES.GENERAL.id:

//       break;
//     case PAGES.CREATE_POST.id:
//       $.get({
//         url: PAGES.CREATE_POST.urlUI,
//         data: {},
//         success: function (data) {
//           if (currentDashboardPage === pageId) {
//             hideLoading(dashboardContentLoading)
//             dashboardContentLoading = null

//             oldHtmlCode = data
//             mainContent.html(data)
//             showEditingSpace($, 'create-post-editor')
//             setEventFotTags()
//           }
//         },
//         dateType: 'html'
//       })
//       break;
//     case PAGES.DRAFT.id:
//       $.get({
//         url: PAGES.DRAFT.urlUI,
//         data: {},
//         success: function (data) {
//           if (currentDashboardPage === pageId) {
//             hideLoading(dashboardContentLoading)
//             mainContent.html(data)

//             $.get({
//               url: PAGES.DRAFT.url,
//               data: {},
//               success: function (data) {
//                 originPostsList = Array.from(data)
//                 postsList = Array.from(data)
//                 showAndSetupPostList()
//               }
//             })
//           }
//         },
//         dataType: 'html'
//       })
//       break;
//     case PAGES.REJECT.id:
//       $.get({
//         url: PAGES.REJECT.urlUI,
//         data: {},
//         success: function (data) {
//           if (currentDashboardPage === pageId) {
//             mainContent.html(data)

//             $.get({
//               url: PAGES.REJECT.url,
//               data: {},
//               success: function (data) {
//                 originPostsList = Array.from(data)
//                 postsList = Array.from(data)
//                 showAndSetupPostList()
//               }
//             })
//           }
//         },
//         dataType: 'html'
//       })
//       break;
//     case PAGES.WAITING.id:
//       $.get({
//         url: PAGES.WAITING.urlUI,
//         data: {},
//         success: function (data) {
//           if (currentDashboardPage === pageId) {
//             mainContent.html(data)

//             $.get({
//               url: PAGES.WAITING.url,
//               data: {},
//               success: function (data) {
//                 originPostsList = Array.from(data)
//                 postsList = Array.from(data)
//                 showAndSetupPostList()
//               }
//             })
//           }
//         },
//         dataType: 'html'
//       })
//       break;
//     case PAGES.PUBLISHED.id:
//       $.get({
//         url: PAGES.PUBLISHED.urlUI,
//         data: {},
//         success: function (data) {
//           if (currentDashboardPage === pageId) {
//             mainContent.html(data)

//             $.get({
//               url: PAGES.PUBLISHED.url,
//               data: {},
//               success: function (data) {
//                 originPostsList = Array.from(data)
//                 postsList = Array.from(data)
//                 showAndSetupPostList()
//               }
//             })
//           }
//         },
//         dataType: 'html'
//       })
//       break;
//     case PAGES.CATEGORY.id:
//       $.get({
//         url: PAGES.CATEGORY.urlUI,
//         data: {},
//         success: function (data) {
//           if (currentDashboardPage === pageId) {
//             mainContent.html(data)

//             $.get({
//               url: PAGES.CATEGORY.url,
//               data: {},
//               success: function (data) {
//                 categoriesList = data
//                 showDataListWithPagination(CATEGORY_COUNT_PER_PAGE, $("#pagination-container"), categoriesList, $("#data-container"), listCategories, setUpForCategorieslist)
//               }
//             })
//           }
//         },
//         dataType: 'html'
//       })
//       // loadCategoriesList()
//       // mainContent.html(CATEGORIES_LIST_UI)
//       // showCategoriesList($, categoriesList)
//       break;
//     case PAGES.TAG.id:
//       $.get({
//         url: PAGES.TAG.urlUI,
//         data: {},
//         success: function (data) {
//           if (currentDashboardPage === pageId) {
//             mainContent.html(data)

//             $.get({
//               url: PAGES.TAG.url,
//               data: {},
//               success: function (data) {
//                 hideLoading(loading)
//                 tagsList = data
//                 // showTagsList($, tagsList)
//                 showDataListWithPagination(TAG_COUNT_PER_PAGE, $("#pagination-container"), tagsList, $("#data-container"), listTags, setUpForTagsList)
//               },
//             })
//           }
//         },
//         dataType: 'html'
//       })
//       // loadTagsList()
//       // mainContent.html(TAGS_LIST_UI)
//       // showTagsList($, tagsList)
//       break
//     case PAGES.USER.id:
//       $.get({
//         url: PAGES.USER.urlUI,
//         data: {},
//         success: function (data) {
//           if (currentDashboardPage === pageId) {
//             mainContent.html(data)

//             $.get({
//               url: PAGES.USER.url,
//               data: {},
//               success: function (data) {
//                 usersList = data
//                 showDataListWithPagination(userCountPerPage, $('.pagination'), usersList, $('.user-list__content'), generateUserList)
//               }
//             })
//           }
//         },
//         dataType: 'html'
//       })
//       // loadUsersList()
//       // mainContent.html(USER_LIST_UI)
//       // generatePagination(initPageCountFromUserList, showUserList, initUserListUI)
//       // choosePage(1, showUserList, initUserListUI)
//       break;
//   }
// }

// function setEventsForCommonMenu() {
//   $('.menu-item-group__item').click(function () {
//     if ($(this).hasClass('item-of-mobile-menu')) {
//       toggleMobileMenu()
//     }

//     $('#dashboard-main__left-sidebar__menu .menu-item-group__item__activing').removeClass('menu-item-group__item__activing')
//     $('#mobile-menu .menu-item-group__item__activing').removeClass('menu-item-group__item__activing')

//     $(`#dashboard-main__left-sidebar__menu .menu-item-group__item[menu-id="${$(this).attr('menu-id')}"]`)
//       .addClass('menu-item-group__item__activing')
//     $(`#mobile-menu .menu-item-group__item[menu-id="${$(this).attr('menu-id')}"]`)
//       .addClass('menu-item-group__item__activing')

//     if ($(this).attr('menu-id') !== currentDashboardPage) {
//       let pageId = $(this).attr('menu-id')
//       changePage(pageId)
//       loadPageContent(pageId)
//       console.log(currentDashboardPage)
//     }
//   })
// }

function toggleMobileMenu() {
  var mobileMenu = $('#mobile-menu')
  if (mobileMenu.hasClass('show-menu')) {
    mobileMenu.removeClass('show-menu')
    mobileMenu.addClass('hide-menu')
    console.log('hide menu')
  } else {
    mobileMenu.removeClass('hide-menu')
    mobileMenu.addClass('show-menu')
    console.log('show menu')
  }
}

function setEventForToggleMenuIcon() {
  var toggleMenuIcon = $('.dashboard-header__toggle-menu')
  var leftSideBar = $('#dashboard-main__left-sidebar')

  var dashboardMainContent = $('.dashboard-main__content')

  toggleMenuIcon.click(function () {
    if ($(this).hasClass('dashboard-header__toggle-menu-mobile')) {
      toggleMobileMenu()
    } else {
      if (leftSideBar.hasClass('collapse-menu')) {

        leftSideBar.removeClass('collapse-menu')
        leftSideBar.addClass('expand-menu')

        setTimeout(function () {
          $('#dashboard-main__left-sidebar__menu .menu-item-group__item__title').fadeIn(200)
          $(':root').css('--dashboard-main-content-left-sidebar-width', '200px')
        }, 200)
      } else {
        leftSideBar.addClass('collapse-menu')
        leftSideBar.removeClass('expand-menu')
        $('#dashboard-main__left-sidebar__menu .menu-item-group__item__title').fadeOut(200)
        setTimeout(function () {
          $(':root').css('--dashboard-main-content-left-sidebar-width', '75px')
        }, 200)
      }
    }
  })
}

setEventForAvatarUser()
setEventForToggleMenuIcon()

const dashboardHandlers = require('../../handlers/dashboard')

module.exports = {
  'get': {
    '/dashboard': [dashboardHandlers.dashboardGetRequest],
    '/dashboard/dashboard-ui/edit-post': [dashboardHandlers.getEditPostUIGetRequest],
    '/dashboard/dashboard-ui/edit-user/:userRule': [dashboardHandlers.getEditUserUIByRoleGetRequest],
    '/dashboard/dashboard-ui/:pageId': [dashboardHandlers.getPageContentUIByPageIdGetRequest],
    '/dashboard/posts-list/:pageId': [dashboardHandlers.getPostsListByPageIdGetRequest],
    '/dashboard/categories-list': [dashboardHandlers.getFullCategoriesListGetRequest],
    '/dashboard/tags-list': [dashboardHandlers.getFullTagsListGetRequest],
    '/dashboard/users-list': [dashboardHandlers.getFullUsersListGetRequest],
  },
  'post': {
    '/dashboard/create-post': [dashboardHandlers.createPostPostRequest],
    '/dashboard/create-tag': [dashboardHandlers.createTag],
  }
}
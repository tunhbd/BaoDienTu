const dashboardHandlers = require('../../handlers/dashboard')

module.exports = {
    'get': {
        '/dashboard': dashboardHandlers.getDashboardGetRequest,
        '/dashboard-ui/edit-post': dashboardHandlers.getEditPostUIGetRequest,
        '/dashboard-ui/edit-user/:userRule': dashboardHandlers.getEditUserUIByRoleGetRequest,
        '/dashboard-ui/:pageId': dashboardHandlers.getPageContentUIByPageIdGetRequest,
        '/posts-list/:pageId': dashboardHandlers.getPostsListByPageIdGetRequest,
        '/categories-list': dashboardHandlers.getFullCategoriesListGetRequest,
        '/tags-list': dashboardHandlers.getFullTagsListGetRequest,
        '/users-list': dashboardHandlers.getFullUsersListGetRequest,
    },
    'post': {

    }
}
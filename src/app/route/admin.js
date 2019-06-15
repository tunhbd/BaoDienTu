const { adminHandlers } = require('../handlers')
const { multerMiddlewares, gereratePostIdMiddleware } = require('../middlewares')

module.exports = {
  'get': {
    '/admin/dashboard': [adminHandlers.renderDashboardPage],
    '/admin/dashboard/create-post': [adminHandlers.renderCreatePostPage],
    '/admin/dashboard/edit-post/:postAlias': [adminHandlers.renderEditPostPage],
    '/admin/dashboard/draft-posts': [adminHandlers.renderDraftPostsPage],
    '/admin/dashboard/reject-posts': [adminHandlers.renderRejectPostsPage],
    '/admin/dashboard/published-posts': [adminHandlers.renderPublishedPostsPage],
    '/admin/dashboard/waiting-posts': [adminHandlers.renderWaitingPostsPage],
    '/admin/dashboard/users': [adminHandlers.renderUsersPage],
    '/admin/dashboard/tags': [adminHandlers.renderTagsPage],
    '/admin/dashboard/categories': [adminHandlers.renderCategoriesPage],
    '/admin/dashboard/preview-post/:postAlias': [adminHandlers.renderPreviewPostAndCheckPage],
    // '/admin/dashboard/user/:account': [adminHandlers.getUserInfo],
    // '/dashboard/dashboard-ui/edit-post': adminHandlers.getEditPostUIGetRequest,
    // '/dashboard/dashboard-ui/edit-user/:userRule': adminHandlers.getEditUserUIByRoleGetRequest,
    // '/dashboard/dashboard-ui/:pageId': adminHandlers.getPageContentUIByPageIdGetRequest,
    // '/dashboard/posts-list/:pageId': adminHandlers.getPostsListByPageIdGetRequest,
    // '/dashboard/categories-list': adminHandlers.getFullCategoriesListGetRequest,
    // '/dashboard/tags-list': adminHandlers.getFullTagsListGetRequest,
    // '/dashboard/users-list': adminHandlers.getFullUsersListGetRequest,
  },
  'post': {
    '/admin/dashboard/create-post': [gereratePostIdMiddleware, multerMiddlewares.postImageMulterMiddleware, adminHandlers.createPost],
    '/admin/dashboard/edit-post/:postId': [gereratePostIdMiddleware, multerMiddlewares.postImageMulterMiddleware, adminHandlers.editPost],
    '/admin/dashboard/create-category': [adminHandlers.createCategory],
    '/admin/dashboard/update-category': [adminHandlers.updateCategory],
    '/admin/dashboard/delete-category': [adminHandlers.deleteCategory],
    '/admin/dashboard/create-tag': [adminHandlers.createTag],
    '/admin/dashboard/preview-post/:postAlias/browse': [adminHandlers.browsePost],
    '/admin/dashboard/delete-posts': [adminHandlers.deletePosts],
  },
  'put': {
    '/admin/dashboard/update-tag': [adminHandlers.updateTag],
    '/admin/dashboard/update-category': [adminHandlers.updateCategory],
    '/admin/dashboard/update-user': [adminHandlers.updateUser],
  },
  'delete': {

    '/admin/dashboard/delete-tag/:tagId': [adminHandlers.deleteTag],
    '/admin/dashboard/delete-user/:account': [adminHandlers.deleteUser],
    '/admin/dashboard/delete-category/:categoryId': [adminHandlers.deleteCategory],
  }
}
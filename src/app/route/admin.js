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
    '/admin/dashboard/data/categories': [adminHandlers.getCategories]
  },
  'post': {
    '/admin/dashboard/create-post': [gereratePostIdMiddleware, multerMiddlewares.postImageMulterMiddleware, adminHandlers.createPost],
    '/admin/dashboard/edit-post/:postId': [gereratePostIdMiddleware, multerMiddlewares.postImageMulterMiddleware, adminHandlers.editPost],
    '/admin/dashboard/create-category': [adminHandlers.createCategory],
    '/admin/dashboard/update-category': [adminHandlers.updateCategory],
    '/admin/dashboard/delete-category': [adminHandlers.deleteCategory],
    '/admin/dashboard/create-tag': [adminHandlers.createTag],
    '/admin/dashboard/update-tag': [adminHandlers.updateTag],
    '/admin/dashboard/delete-tags': [adminHandlers.deleteTags],
    '/admin/dashboard/preview-post/:postAlias/browse': [adminHandlers.browsePost],
    '/admin/dashboard/delete-posts': [adminHandlers.deletePosts],
    '/admin/dashboard/editor/update-assigned-categories': [adminHandlers.updateAssignedCategories],
    '/admin/dashboard/subscriber/extend-expiration-date': [adminHandlers.extendExpirationDate],
  },
  // 'put': {
  //   '/admin/dashboard/update-tag': [adminHandlers.updateTag],
  //   '/admin/dashboard/update-category': [adminHandlers.updateCategory],
  //   '/admin/dashboard/update-user': [adminHandlers.updateUser],
  // },
  // 'delete': {

  //   '/admin/dashboard/delete-tag/:tagId': [adminHandlers.deleteTag],
  //   '/admin/dashboard/delete-user/:account': [adminHandlers.deleteUser],
  //   '/admin/dashboard/delete-category/:categoryId': [adminHandlers.deleteCategory],
  // }
}
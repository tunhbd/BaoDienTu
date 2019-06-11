const { userHandlers } = require('../handlers')

module.exports = {
  'get': {
    '/': [userHandlers.renderHomePage],
    '/category/category_sample': [userHandlers.showPostsListByCategoryGetRequest],
    '/tag/tag_sample': [userHandlers.showPostsListByTagGetRequest],
    '/post/:postId': [userHandlers.showPostDetailGetRequest],
    '/search/result': [userHandlers.getSearchResultsGetRequest],
  },
  'post': {

  }
}
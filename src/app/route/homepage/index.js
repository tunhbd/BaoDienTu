const homepageHandlers = require('../../handlers/homepage')

module.exports = {
  'get': {
    '/': [homepageHandlers.homepageGetRequest],
    '/category/category_sample': [homepageHandlers.showPostsListByCategoryGetRequest],
    '/tag/tag_sample': [homepageHandlers.showPostsListByTagGetRequest],
    '/post/:postId': [homepageHandlers.showPostDetailGetRequest],
    '/search/result': [homepageHandlers.getSearchResultsGetRequest],
  },
  'post': {

  }
}
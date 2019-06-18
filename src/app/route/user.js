const { userHandlers } = require("../handlers");

module.exports = {
  get: {
    '/': [userHandlers.renderHomePage],
    '/category/:catAlias': [userHandlers.showPostsListByCategoryGetRequest],
    '/tag/:tagAlias': [userHandlers.showPostsListByTagGetRequest],
    '/post/:postAlias': [userHandlers.showPostDetailGetRequest],

    '/search/result': [userHandlers.getSearchResultsGetRequest]
  },
  post: { '/comment/insert': [userHandlers.insertCommentPostRequest] }
};

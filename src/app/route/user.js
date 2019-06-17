const { userHandlers } = require("../handlers");

module.exports = {
  get: {
    "/": [userHandlers.renderHomePage],
    "/category/:catId": [userHandlers.showPostsListByCategoryGetRequest],
    "/tag/:tagId": [userHandlers.showPostsListByTagGetRequest],
    "/post/:postId": [userHandlers.showPostDetailGetRequest],
    "/search/result": [userHandlers.getSearchResultsGetRequest]
  },
  post: {}
};

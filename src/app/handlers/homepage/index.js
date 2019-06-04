const business = require("../../business");

const getSearchResultsGetRequest = (req, res) => {
  res.render("searchPageContent", {
    results: [],
    searchInput: req.query.searchInput,
    layout: "indexLayout"
  });
};

const homepageGetRequest = (req, res) => {
  // let signinedUser = business.authBus.getSigninedUser(
  //   req.cookies.signined_user
  // );
  console.log(Boolean(req.user));
  res.render("indexContent", {
    user: !req.user,
    layout: "indexLayout"
  });
};

const showPostsListByCategoryGetRequest = (req, res) => {
  res.render("listPostContent", { layout: "indexLayout" });
};

const showPostsListByTagGetRequest = (req, res) => {
  res.render("listPostContent", { layout: "indexLayout" });
};

const showPostDetailGetRequest = (req, res) => {
  let postId = req.params.postId;
  res.render("postDetailContent", { layout: "indexLayout" });
};

module.exports = {
  getSearchResultsGetRequest,
  homepageGetRequest,
  showPostsListByCategoryGetRequest,
  showPostsListByTagGetRequest,
  showPostDetailGetRequest
};

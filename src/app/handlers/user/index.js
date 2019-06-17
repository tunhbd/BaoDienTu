const business = require("../../business");

const getSearchResultsGetRequest = (req, res) => {
  res.render("searchPageContent", {
    results: [],
    searchInput: req.query.searchInput,
    layout: "indexLayout"
  });
};

const renderHomePage = (req, res) => {
  res.render("indexContent", {
    user: req.user,
    layout: "indexLayout",
    // message: {
    //   error: req.flash("mes"),
    //   success: req.flash("suc")
    // }
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
  renderHomePage,
  showPostsListByCategoryGetRequest,
  showPostsListByTagGetRequest,
  showPostDetailGetRequest
};

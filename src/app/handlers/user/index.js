const { getAllWithLevel } = require("../../business/categoryBus");
const { getTenLatestPosts } = require("../../business/postBus");
const moment = require("moment");

let postList, tagList;
Promise.all([getAllWithLevel(), getTenLatestPosts()])
  .then(function([tags, posts]) {
    postList = posts.map(
      ({ post_title, post_avatar_image, published_date, category }) => ({
        post_title: unescape(post_title),
        post_avatar_image,
        published_date: moment(published_date)
          .startOf("hour")
          .fromNow(),
        category
      })
    );

    tags.unshift({ categoryName: "Home", categoryId: "home" });
    tags.push({ categoryName: "More", categoryId: "more" });
    tagList = tags;
  })
  .catch(err => {
    throw err;
  });

const getSearchResultsGetRequest = (req, res) => {
  res.render("searchPageContent", {
    results: [],
    searchInput: req.query.searchInput,
    layout: "indexLayout"
  });
};

const renderHomePage = function(req, res) {
  res.render("indexContent", {
    user: req.user,
    layout: "indexLayout",
    message: {
      error: req.flash("mes"),
      success: req.flash("suc")
    },
    listParent: tagList,
    posts: postList
  });
};

const showPostsListByCategoryGetRequest = (req, res) => {
  res.render("listPostContent", {
    layout: "indexLayout",
    listParent: tagList,
    posts: postList
  });
};

const showPostsListByTagGetRequest = (req, res) => {
  res.render("listPostContent", {
    listParent: tagList,
    posts: postList,
    layout: "indexLayout"
  });
};

const showPostDetailGetRequest = (req, res) => {
  let postId = req.params.postId;
  res.render("postDetailContent", {
    listParent: tagList,
    posts: postList,
    layout: "indexLayout"
  });
};

module.exports = {
  getSearchResultsGetRequest,
  renderHomePage,
  showPostsListByCategoryGetRequest,
  showPostsListByTagGetRequest,
  showPostDetailGetRequest
};

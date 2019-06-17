const { getAllWithLevel } = require("../../business/categoryBus");
const {
  getTenLatestPosts,
  getPostsFromCategoryId,
  getNameCatById,
  getPostsFromId
} = require("../../business/postBus");
const moment = require("moment");

let postList, tagList;
Promise.all([getAllWithLevel(), getTenLatestPosts()])
  .then(function([tags, posts]) {
    postList = posts.map(
      ({
        post_id,
        post_title,
        post_avatar_image,
        published_date,
        category_name
      }) => ({
        post_title: unescape(post_title),
        post_avatar_image,
        published_date: moment(published_date)
          .startOf("hour")
          .fromNow(),
        category_name,
        post_id
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
  let searchStr = req.body.search;

  console.log(searchStr);
  res.render("searchPageContent", {
    layout: "indexLayout",
    listParent: tagList
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
  Promise.all([
    getPostsFromCategoryId(req.params.catId, 0, 10),
    getNameCatById(req.params.catId)
  ])
    .then(([postsFromCatId, catName]) => {
      postsFromCatId = postsFromCatId.map(
        ({
          post_id,
          post_title,
          post_avatar_image,
          published_date,
          post_summary
        }) => {
          return {
            post_title: unescape(post_title),
            published_date: moment(published_date)
              .startOf("hour")
              .fromNow(),
            post_avatar_image,
            post_summary: unescape(post_summary),
            post_id
          };
        }
      );
      res.render("listPostContent", {
        layout: "indexLayout",
        listParent: tagList,
        posts: postsFromCatId,
        catName: catName.category_name
      });
    })

    .catch(err => {
      throw err;
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

  Promise.all([getPostsFromId(postId)])
    .then(([post]) => {
      post = post.map(
        ({
          category_name,
          post_title,
          post_avatar_image,
          published_date,
          post_content
        }) => {
          return {
            post_title: unescape(post_title),
            published_date: moment(published_date)
              .startOf("hour")
              .fromNow(),
            post_avatar_image,
            post_content: unescape(post_content),
            category_name
          };
        }
      );
      res.render("postDetailContent", {
        listParent: tagList,
        layout: "indexLayout",
        post: post[0]
      });
    })

    .catch(err => {
      throw err;
    });
};

module.exports = {
  getSearchResultsGetRequest,
  renderHomePage,
  showPostsListByCategoryGetRequest,
  showPostsListByTagGetRequest,
  showPostDetailGetRequest
};

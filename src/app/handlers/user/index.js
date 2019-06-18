const { categoryBus, postBus } = require("../../business");
const {
  getTenLatestPosts,
  getPostsFromCategoryId,
  getNameCatById,
  getPostsFromId,
  getTagsFromPostId,
  getPostsFromTagId,
  getNameTagById,
  getPostFromFTSearch
} = require("../../business/postBus");
const { addComment, loadComment } = require("../../business/commentBus");
const moment = require("moment");

let categories = []
Promise.all([categoryBus.getAllWithLevel()])
  .then(function ([categs]) {
    // categs.unshift({ categoryName: "Home", categoryId: "home" });
    categs.push({ categoryName: "More", categoryId: "more" });
    categories = categs;
  })
  .catch(err => {
    console.log(err)
  });

let parseData = posts => {
  return (posts = posts.map(
    ({
      post_id,
      post_title,
      post_avatar_image,
      published_date,
      post_summary,
      post_content,
      category_name,
      category_id
    }) => {
      return {
        post_title: post_title,
        published_date: moment(published_date)
          .startOf("hour")
          .fromNow(),
        post_avatar_image,
        post_summary: post_summary,
        post_content: post_content,
        post_id,
        category_name,
        category_id
      };
    }
  ));
};

const getSearchResultsGetRequest = (req, res) => {
  let searchStr = req.query.search;
  let sub = false;
  if (req.user) if (req.user.role === "SUBSCRIBER") sub = true;

  Promise.all([getPostFromFTSearch(sub, searchStr, 0, 10)])
    .then(([posts]) => {
      posts = parseData(posts);
      res.render("searchPageContent", {
        data: {
          user: req.user,
          posts,
          categories,
          search: searchStr
        },
        layout: "indexLayout",
        //TODO: tenPostsMostView

      });
    })

    .catch(err => {
      throw err;
    });
};

const renderHomePage = function (req, res) {
  let sub = false;
  if (req.user) if (req.user.role === "SUBSCRIBER") sub = true;

  Promise.all([
    getTenLatestPosts(sub),
    postBus.getMuchViewPosts(sub),
  ])
    .then(([latestPosts, muchViewPosts]) => {
      let highlightPosts = postBus.filterHighlightPostsFrom(muchViewPosts)
      latestPosts = parseData(latestPosts);
      res.render("user/indexContent", {
        data: {
          user: req.user,
          message: {
            error: req.flash("mes"),
            success: req.flash("suc")
          },
          categories,
          latestPosts,
          muchViewPosts,
          highlightPosts
        },

        layout: "indexLayout",

      });
    })

    .catch(err => {
      throw err;
    });
};

const showPostsListByCategoryGetRequest = (req, res) => {
  let sub = false;
  if (req.user) if (req.user.role === "SUBSCRIBER") sub = true;
  Promise.all([
    getPostsFromCategoryId(sub, req.params.catId, 0, 10),
    getNameCatById(req.params.catId)
  ])
    .then(([postsFromCatId, catName]) => {
      postsFromCatId = parseData(postsFromCatId);

      res.render("listPostContent", {
        data: {
          user: req.user,
          categories,
          posts: postsFromCatId,
          catName: catName.category_name
        },
        layout: "indexLayout",
        //TODO: tenPostsMostView
      });
    })

    .catch(err => {
      throw err;
    });
};

const showPostsListByTagGetRequest = (req, res) => {
  let sub = false;
  if (req.user) if (req.user.role === "SUBSCRIBER") sub = true;
  Promise.all([
    getPostsFromTagId(sub, req.params.tagId, 0, 10),
    getNameTagById(req.params.tagId)
  ])
    .then(([postsFromTagId, tagName]) => {
      postsFromTagId = parseData(postsFromTagId);
      res.render("listTagPostContent", {
        data: {
          user: req.user,
          categories,
          posts: postsFromTagId,
          tagName: tagName.tag_name
        },
        layout: "indexLayout",
        //TODO: tenPostsMostView
      });
    })

    .catch(err => {
      throw err;
    });
};

const showPostDetailGetRequest = (req, res) => {
  let postId = req.params.postId;
  let sub = false;
  if (req.user) if (req.user.role === "SUBSCRIBER") sub = true;
  Promise.all([
    getTagsFromPostId(postId),
    getPostsFromId(sub, postId),
    getTenLatestPosts(sub, req.params.caId),
    loadComment(postId)
  ])

    .then(([tags, post, tenPostsFromCatId, comments]) => {
      post = parseData(post);
      tenPostsFromCatId = parseData(tenPostsFromCatId);
      res.render("postDetailContent", {
        data: {
          categories,
          tenPostsFromCatId,
          user: req.user,
          post: post[0],
          tags,
          comments: comments.map(cmt => {
            cmt.comment_date = moment(cmt.comment_date).format("DD-MM-YYYY");
            return cmt;
          })
        },
        layout: "indexLayout",
      });
    })

    .catch(err => {
      throw err;
    });
};
const insertCommentPostRequest = (req, res, next) => {
  if (req.user) {
    addComment({
      user: req.user.account,
      post_id: req.body.post_id,
      content: req.body.content
    })
      .then(result => {
        res.end(JSON.stringify({ user: req.user.fullname }));
      })
      .catch(err => next(err));
  } else {
    res.status(500).send(JSON.stringify({ error: "Đăng nhập để bình luận" }));
  }
};
module.exports = {
  getSearchResultsGetRequest,
  renderHomePage,
  showPostsListByCategoryGetRequest,
  showPostsListByTagGetRequest,
  showPostDetailGetRequest,
  insertCommentPostRequest
};

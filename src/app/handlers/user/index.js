const { categoryBus, postBus, tagBus, authBus } = require("../../business");
const {
  getTenLatestPosts,
  getPostsFromCategoryId,
  getNameCatById,
  getPostFromId,
  getTagsFromPostId,
  getPostsFromTagId,
  getNameTagById,
  getPostFromFTSearch,
  getCountPostFromFTSearch,
  getCountPostsFromCategoryId,
  getCountPostsFromTagId
} = require("../../business/postBus");
const { addComment, loadComment } = require("../../business/commentBus");
const { LIMIT_SEARCH_POSTS, LIMIT_LIST_POSTS } = require('../../config')
const moment = require("moment");

let categories = [];
Promise.all([categoryBus.getAllWithLevel()])
  .then(function ([categs]) {
    // categs.unshift({ categoryName: "Home", categoryId: "home" });
    categs.push({ categoryName: "More", categoryId: "more" });
    categories = categs;
  })
  .catch(err => {
    console.log(err);
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
      category_id,
      category_alias,
      post_alias,
      premium
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
        category_id,
        category_alias,
        post_alias,
        premium
      };
    }
  ));
};

const getSearchResultsGetRequest = (req, res) => {
  let { search, page } = req.query;
  page = Number(page) || 1;

  let sub = false;
  if (req.user) if (req.user.role === "SUBSCRIBER") sub = true;

  Promise.all([
    getCountPostFromFTSearch(sub, search),
    getPostFromFTSearch(sub, search, (page - 1) * LIMIT_SEARCH_POSTS, LIMIT_SEARCH_POSTS)
  ])
    .then(([count, posts]) => {
      posts = parseData(posts);

      count = count[0]["count(*)"];
      let numpage = Math.floor(count / LIMIT_SEARCH_POSTS);
      if (count % LIMIT_SEARCH_POSTS != 0) numpage++;

      let countObj = [];
      countObj.push;
      for (i = 0; i < numpage; i++) {
        countObj.push({ data: i + 1 });
      }

      res.render("user/searchPageContent", {
        data: {
          user: req.user,
          posts,
          categories,
          search: search,
          count: countObj,
          thisPage: page
        },
        layout: "indexLayout"
      });
    })

    .catch(err => {
      throw err;
    });
};

const renderHomePage = function (req, res) {
  let sub = false;
  if (req.user) if (req.user.role === "SUBSCRIBER") sub = true;

  Promise
    .all([
      getTenLatestPosts(sub),
      postBus.getMuchViewPosts(sub),
      postBus.getTopCategoryWithLatestPost(sub)
    ])
    .then(([latestPosts, muchViewPosts, topCategoryWithPosts]) => {
      let highlightPosts = postBus.filterHighlightPostsFrom(muchViewPosts);
      latestPosts = parseData(latestPosts);
      console.log(req.user);
      res.render("user/indexContent", {
        data: {
          user: req.user,
          message: {
            error: req.flash("mes"),
            success: req.flash("suc")
          },
          categories,
          latestPosts,
          topCategoryWithPosts,
          muchViewPosts,
          highlightPosts
        },

        layout: "indexLayout"
      });
    })

    .catch(err => {
      throw err;
    });
};

const showPostsListByCategoryGetRequest = (req, res, next) => {
  let { page } = req.query;
  page = Number(page) || 1;
  let alias = req.params.catAlias

  let sub = false;
  if (req.user) if (req.user.role === "SUBSCRIBER") sub = true;

  categoryBus
    .getCommonOneByAlias(alias)
    .then(category => {
      Promise
        .all([
          getCountPostsFromCategoryId(sub, category.categoryId),
          getPostsFromCategoryId(sub, category.categoryId, (page - 1) * LIMIT_LIST_POSTS, LIMIT_LIST_POSTS)
        ])
        .then(([count, posts]) => {
          count = count[0]["count(*)"];
          let numpage = Math.floor(count / LIMIT_LIST_POSTS);
          if (count % LIMIT_LIST_POSTS != 0) numpage++;

          let countObj = [];
          countObj.push;
          for (i = 0; i < numpage; i++) {
            countObj.push({ data: i + 1 });
          }

          res.render("user/listPostContent", {
            data: {
              category: category,
              user: req.user,
              categories,
              posts,
              thisPage: page,
              // catName: catName.category_name,
              count: countObj
            },
            layout: "indexLayout"
          });
        })

        .catch(err => {
          console.log(err)
          req.error = true
          next()
        });
    })
    .catch(err => {
      req.error = true
      next()
    })
};

const showPostsListByTagGetRequest = (req, res, next) => {
  let { page } = req.query;
  let alias = req.params.tagAlias
  page = Number(page) || 1;

  let sub = false;
  if (req.user) if (req.user.role === "SUBSCRIBER") sub = true;

  tagBus
    .getOneByAlias(alias)
    .then(tag => {
      Promise.all([
        getCountPostsFromTagId(sub, tag.tagId),
        getPostsFromTagId(sub, tag.tagId, (page - 1) * LIMIT_LIST_POSTS, LIMIT_LIST_POSTS)
      ])
        .then(([count, posts]) => {
          console.log('posts', posts.length)
          count = count[0]["count(*)"];
          let numpage = Math.floor(count / LIMIT_LIST_POSTS);
          if (count % LIMIT_LIST_POSTS != 0) numpage++;

          let countObj = [];
          countObj.push;
          for (i = 0; i < numpage; i++) {
            countObj.push({ data: i + 1 });
          }

          res.render("user/listTagPostContent", {
            data: {
              tag,
              user: req.user,
              categories,
              posts,
              count: countObj,
              thisPage: page,
            },
            layout: "indexLayout"
          });
        })

        .catch(err => {
          console.log(err)
          req.error = true
          next()
        });
    })
    .catch(err => {
      console.log(err)
      req.error = true
      next()
    })

};

const showPostDetailGetRequest = (req, res, next) => {
  let alias = req.params.postAlias;
  let sub = false;
  if (req.user) if (req.user.role === "SUBSCRIBER") sub = true;

  postBus
    .getOneByAlias(alias)
    .then(async post => {
      let checked = true
      if (post.premium) {
        if (!sub) {
          checked = false
          req.flash('err', 'Bạn hãy đăng ký làm độc giả để có thể xem được bài viết này')
          res.redirect('/sign-up')
        }
        else {
          await authBus
            .checkExpirationOfSubscriber(req.user.account)
            .then(ret => {
              if (!ret) {
                checked = false
                req.flash('err', 'Bạn hãy gia hạn tài khoản của bạn để có thể xem bài viết này')
                res.redirect(req.headers.referer)
              }
            })
            .catch(err => {
              console.log(err)
              req.error = true
              next()
            })
        }
      }

      if (checked) {
        Promise
          .all([
            postBus.getRelativePostsViaCategoryId(sub, post.category.categoryId, post.postId),
            loadComment(post.postId)
          ])
          .then(([relativePosts, comments]) => {
            res.render("user/postDetailContent", {
              data: {
                categories,
                relativePosts,
                user: req.user,
                post,
                comments,
              },
              layout: "indexLayout"
            });
          })
          .catch(err => {
            console.log(err)
            req.error = true
            next()
          });
      }
    })
    .catch(err => {
      console.log(err)
      req.error = true
      next()
    })
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

const { tagBus, postTagBus, postBus, categoryBus } = require('../../business')
const mockData = require('../../mockData')
const config = require('../../config')
const moment = require('moment')
const { Post, Tag, PostTag, User, Category } = require('../../models')
const { multerMiddlewares } = require('../../middlewares')
const { convertToAlias } = require('../../utils')
const { trim } = require('lodash')

const renderDashboardPage = (req, res) => {
  res.render('admin/dashboard', {
    data: {
      user: req.user,
      pageId: config.PAGES.DASHBOARD,
    },
    layout: 'dashboardLayout'
  })
}

const renderCreatePostPage = (req, res) => {
  Promise
    .all([
      categoryBus.getLessInfoCategories(),
      tagBus.getLessInfoTags()
    ])
    .then(([categories, tags]) => {
      console.log('DONE')
      res.render('admin/createPost', {
        data: {
          title: 'Create new post',
          user: req.user,
          pageId: 'CREATE_POST',
          categories,
          tags,
        },
        layout: 'dashboardLayout'
      })
    })
    .catch(err => {
      console.log('GET LESS INFO CATEGORIES ERROR: ', err)
      res.send('error')
    })
}

const renderPreviewPostAndCheckPage = (req, res) => {
  let alias = req.params.postAlias
  let backLink = req.headers.referer ? req.headers.referer : '/admin/dashboard'
  backLink = backLink ? backLink : '/admin/dashboard'
  postBus
    .getOneByAlias(alias)
    .then(post => {
      console.log('post', post)
      res.render('admin/previewAndCheckPost', {
        data: {
          title: post.postTitle + ' - Preview',
          user: req.user,
          post,
          backLink,
        },
        layout: 'dashboardLayout'
      })
    })
    .catch(err => {
      console.log('error', err)
      res.send('error')
    })
}

const renderEditPostPage = (req, res) => {
  let alias = req.params.postAlias
  let backLink = req.headers.referer ? req.headers.referer : '/admin/dashboard'

  Promise
    .all([
      categoryBus.getLessInfoCategories(),
      tagBus.getLessInfoTags(),
      postBus.getOneByAlias(alias)
    ])
    .then(([categories, tags, post]) => {
      console.log('post', post)
      res.render('admin/createPost', {
        data: {
          title: 'Edit post',
          user: req.user,
          backLink,
          pageId: 'EDIT_POST',
          categories,
          tags,
          post,
          tagIds: post.tags.map(t => t.tagId),
          tagsOfPost: JSON.stringify(post.tags)
        },
        layout: 'dashboardLayout'
      })
    })
    .catch(err => {
      console.log('Render Edit Post Error: ', err)
      res.send('error')
    })
}

const renderDraftPostsPage = (req, res) => {
  let pageNum = !req.query.page ? 1 : parseInt(req.query.page)
  let categoryAlias = !req.query.category ? 'ALL' : req.query.category
  let filterId = !req.query.filterBy ? config.FILTER.DECREASE_CREATED_DATE : req.query.filterBy

  Promise
    .all([
      categoryBus.getLessInfoCategories(),
      postBus.getDraftPostsFilterBy(pageNum, categoryAlias, filterId, config.LIMIT_POSTS),
      postBus.getCountDraftPostsFilterBy(pageNum, categoryAlias, filterId),
    ])
    .then(([categories, posts, countPosts]) => {
      let pages = []
      let pageCount = Math.ceil(countPosts / config.LIMIT_POSTS)
      for (let index = 1; index <= pageCount; index++) {
        pages.push({ pageNum: index })
      }

      res.render('admin/postList', {
        data: {
          title: 'Draft posts',
          user: req.user,
          selectedCategory: categoryAlias,
          selectedFilter: filterId,
          pages,
          pageCount,
          pageId: 'DRAFT',
          thisPage: pageNum,
          categories,
          posts,
          status: false,
          postType: 'DRAFT',
        },
        layout: 'dashboardLayout'
      })
    })
    .catch(err => {

    })
}

const renderRejectPostsPage = (req, res) => {
  let pageNum = !req.query.page ? 1 : parseInt(req.query.page)
  let categoryAlias = !req.query.category ? 'ALL' : req.query.category
  let filterId = !req.query.filterBy ? config.FILTER.DECREASE_CREATED_DATE : req.query.filterBy

  Promise
    .all([
      categoryBus.getLessInfoCategories(),
      postBus.getRejectPostsFilterBy(pageNum, categoryAlias, filterId, config.LIMIT_POSTS),
      postBus.getCountRejectPostsFilterBy(pageNum, categoryAlias, filterId),
    ])
    .then(([categories, posts, countPosts]) => {
      let pages = []
      let pageCount = Math.ceil(countPosts / config.LIMIT_POSTS)
      for (let index = 1; index <= pageCount; index++) {
        pages.push({ pageNum: index })
      }

      res.render('admin/postList', {
        data: {
          title: 'Reject posts',
          user: req.user,
          selectedCategory: categoryAlias,
          selectedFilter: filterId,
          pages,
          pageCount,
          pageId: 'REJECT',
          thisPage: pageNum,
          categories,
          posts,
          status: false,
          postType: 'REJECT',
        },
        layout: 'dashboardLayout'
      })
    })
    .catch(err => {

    })
}

const renderPublishedPostsPage = (req, res) => {
  let pageNum = !req.query.page ? 1 : parseInt(req.query.page)
  let categoryAlias = !req.query.category ? 'ALL' : req.query.category
  let filterId = !req.query.filterBy ? config.FILTER.DECREASE_CREATED_DATE : req.query.filterBy

  Promise
    .all([
      categoryBus.getLessInfoCategories(),
      postBus.getPublishedPostsFilterBy(pageNum, categoryAlias, filterId, config.LIMIT_POSTS),
      postBus.getCountPublishedPostsFilterBy(pageNum, categoryAlias, filterId),
    ])
    .then(([categories, posts, countPosts]) => {
      let pages = []
      let pageCount = Math.ceil(countPosts / config.LIMIT_POSTS)
      for (let index = 1; index <= pageCount; index++) {
        pages.push({ pageNum: index })
      }

      res.render('admin/postList', {
        data: {
          title: 'Published posts',
          user: req.user,
          selectedCategory: categoryAlias,
          selectedFilter: filterId,
          pages,
          pageCount,
          pageId: 'PUBLISHED',
          thisPage: pageNum,
          categories,
          posts,
          status: true,
          postType: 'PUBLISHED',
        },
        layout: 'dashboardLayout'
      })
    })
    .catch(err => {

    })
}

const renderWaitingPostsPage = (req, res) => {
  let pageNum = !req.query.page ? 1 : parseInt(req.query.page)
  let categoryAlias = !req.query.category ? 'ALL' : req.query.category
  let filterId = !req.query.filterBy ? config.FILTER.DECREASE_CREATED_DATE : req.query.filterBy

  Promise
    .all([
      categoryBus.getLessInfoCategories(),
      postBus.getWaitingPostsFilterBy(pageNum, categoryAlias, filterId, config.LIMIT_POSTS),
      postBus.getCountWaitingPostsFilterBy(pageNum, categoryAlias, filterId),
    ])
    .then(([categories, posts, countPosts]) => {
      console.log('count', countPosts)
      let pages = []
      let pageCount = Math.ceil(countPosts / config.LIMIT_POSTS)
      for (let index = 1; index <= pageCount; index++) {
        pages.push({ pageNum: index })
      }

      res.render('admin/postList', {
        data: {
          title: 'Waiting posts',
          user: req.user,
          selectedCategory: categoryAlias,
          selectedFilter: filterId,
          pages,
          pageCount,
          pageId: 'WAITING',
          thisPage: pageNum,
          categories,
          posts,
          status: true,
          postType: 'WAITING',
        },
        layout: 'dashboardLayout'
      })
    })
    .catch(err => {

    })
}

const renderUsersPage = (req, res) => {

}

const renderTagsPage = (req, res) => {

}

const renderCategoriesPage = (req, res) => {

}

const createCategory = (req, res) => {

}

const editPost = (req, res) => {
  let post = new Post()
  post.postId = req.generation.postId
  post.postTitle = trim(req.body.title)
  post.alias = convertToAlias(post.postTitle)
  // post.author = req.user.account
  let author = new User()
  author.account = 'admin'
  post.author = author

  let category = new Category()
  category.categoryId = req.body.category
  post.category = category
  console.log('tags', req.body.tags)
  post.tags = JSON.parse(req.body.tags).map(t => {
    let tag = new Tag()
    tag.tagId = t.tagId
    tag.tagName = trim(t.tagName)

    return tag
  })
  post.postSummary = trim(req.body.summary)
  post.postContent = req.body['content']
  post.postAvatarImage = req.generation.postAvatarImage
  post.youtubeUrl = trim(req.body.youtubeUrl)

  console.log('post', post)

  postBus
    .updatePost(post)
    .then(async Post => {
      if (Post) {
        await post.tags.forEach(async tag => {
          await tagBus
            .hasTag(tag.tagId)
            .then(async ret => {
              if (!ret) {
                tag.alias = convertToAlias(tag.tagName)
                tag.generateId()
                await tagBus.createTag(tag)
              }

              let postTag = new PostTag()
              postTag.postId = post.postId
              postTag.tagId = tag.tagId
              postTagBus.createPostTag(postTag)
            })
            .catch(err => {

            })

          await postTagBus.deleteOldPostTagsOfPost(post.postId, post.tags.map(t => t.tagId))
        })

        res.redirect('/admin/dashboard')
      }
      else {
        res.send('error')
      }
    })
    .catch(err => {
      console.log('UPDATE POST ERROR: ', err)
      res.send('error')
    })
}

const updateTag = (req, res) => {

}

const updateCategory = (req, res) => {

}

const updateUser = (req, res) => {

}

const deletePosts = (req, res) => {
  console.log('body', req.body)
  let postIds = req.body.postIds

  postBus
    .deletePosts(postIds)
    .then(deletedPostCount => {
      res.json({
        error: undefined,
        data: {
          deletedPostCount,
        }
      })
    })
    .catch(err => {
      res.json({
        error: true,
        data: {}
      })
    })
}

const deleteTag = (req, res) => {

}

const deleteUser = (req, res) => {

}

const deleteCategory = (req, res) => {

}

// const getPageContentUIByPageIdGetRequest = (req, res) => {
//   if (req.error) {
//     res.send('error')
//   } else {
//     if (!req.isSignIn) {
//       res.send('error')
//     } else {
//       console.log('LOADING')
//       switch (req.params.pageId) {
//         case config.PAGES.CREATE_POST:
//           Promise
//             .all([
//               categoryBus.getLessInfoCategories(),
//               tagBus.getLessInfoTags()
//             ])
//             .then(([categories, tags]) => {
//               console.log('DONE')
//               res.render('templates/dashboard-uis/createPostUI', { categories, tags, layout: false })
//             })
//             .catch(err => {
//               console.log('GET LESS INFO CATEGORIES ERROR: ', err)
//               res.send(false)
//             })
//           break;
//         case config.PAGES.DRAFT:
//           res.render('templates/dashboard-uis/postsListUI', { categories: mockData.CATEGORIES_LIST, status: false, layout: false })
//           break;
//         case config.PAGES.REJECT:
//           res.render('templates/dashboard-uis/postsListUI', { categories: mockData.CATEGORIES_LIST, status: false, layout: false })
//           break;
//         case config.PAGES.WAITING:
//           res.render('templates/dashboard-uis/postsListUI', { categories: mockData.CATEGORIES_LIST, status: true, layout: false })
//           break;
//         case config.PAGES.PUBLISHED:
//           res.render('templates/dashboard-uis/postsListUI', { categories: mockData.CATEGORIES_LIST, status: true, layout: false })
//           break;
//         case config.PAGES.USER:
//           res.render('templates/dashboard-uis/usersListUI', { layout: false })
//           break;
//         case config.PAGES.CATEGORY:
//           res.render('templates/dashboard-uis/categoriesListUI', { layout: false })
//           break;
//         case config.PAGES.TAG:
//           res.render('templates/dashboard-uis/tagsListUI', { layout: false })
//           break;
//         default:
//           res.send('not found page')
//       }
//     }
//   }

// }

// const uploadPostImageFile = multerMiddlewares.getPostImageMulterMiddleware()

const createPost = (req, res) => {
  let post = new Post()
  post.postId = req.generation.postId
  post.postTitle = trim(req.body.title)
  post.alias = convertToAlias(post.postTitle)
  // post.author = req.user.account
  let author = new User()
  author.account = 'admin'
  post.author = author

  let category = new Category()
  category.categoryId = req.body.category
  post.category = category
  post.tags = JSON.parse(req.body.tags).map(t => {
    let tag = new Tag()
    tag.tagId = t.tagId
    tag.tagName = trim(t.tagName)

    return tag
  })
  post.postSummary = trim(req.body.summary)
  post.postContent = req.body['content']
  post.postAvatarImage = req.generation.postAvatarImage
  post.youtubeUrl = trim(req.body.youtubeUrl)

  postBus
    .createPost(post)
    .then(async newPost => {
      if (newPost) {
        await post.tags.forEach(async tag => {
          await tagBus
            .hasTag(tag.tagId)
            .then(async ret => {
              if (!ret) {
                tag.alias = convertToAlias(tag.tagName)
                tag.generateId()
                await tagBus.createTag(tag)
              }

              let postTag = new PostTag()
              postTag.postId = post.postId
              postTag.tagId = tag.tagId
              postTagBus.createPostTag(postTag)
            })
            .catch(err => {

            })
        })

        res.redirect('/admin/dashboard/create-post')
      }
      else {
        res.send('error')
      }
    })
    .catch(err => {
      console.log('CREATE POST ERROR: ', err)
      res.send('error')
    })
}

const createTag = (req, res) => {
  let tag = new Tag()

  tag.TagName = req.body.tagName
  tag.TagActive = req.body.tagActive ? 1 : 0

  tagBus
    .createTag(tag)
    .then(ret => {
      if (!ret.error) {
        res.send({
          error: false,
          tag: ret.tag,
        })
      }
      else {
        res.send({
          error: true,
          tag: null,
        })
      }
    })
    .catch(err => {
      console.log('HANDLER CREATE TAG ERROR: ', err)
      res.send({
        error: true,
        tag: null,
      })
    })
}

const browsePost = (req, res) => {
  let alias = req.params.postAlias
  let checking = parseInt(req.body.checking) === 1 ? true : false
  let publishedDate = req.body.publishedDate
  let reasonReject = req.body.reasonReject

  if (checking) {
    publishedDate = moment(publishedDate, 'DD/MM/YYYY').format('YYYY/MM/DD')
  }

  postBus
    .browse(alias, checking, publishedDate, reasonReject)
    .then(ret => {
      res.redirect('/admin/dashboard/draft-posts')
    })
    .catch(err => {
      res.send('error')
    })
}

module.exports = {
  renderDashboardPage,
  renderCreatePostPage,
  renderPreviewPostAndCheckPage,
  renderDraftPostsPage,
  renderRejectPostsPage,
  renderWaitingPostsPage,
  renderPublishedPostsPage,
  renderCategoriesPage,
  renderTagsPage,
  renderUsersPage,
  renderEditPostPage,
  createPost,
  editPost,
  createCategory,
  createTag,
  createCategory,
  updateCategory,
  updateTag,
  updateUser,
  deletePosts,
  deleteCategory,
  deleteTag,
  deleteUser,
  browsePost,
}
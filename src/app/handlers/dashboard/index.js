const { tagBus, postBus, categoryBus } = require('../../business')
const mockData = require('../../mockData')
const config = require('../../config')
const moment = require('moment')
const { Post } = require('../../models')
const { multerMiddlewares } = require('../../middlewares')

const dashboardGetRequest = (req, res) => {
  if (req.error === undefined) {
    if (req.isSignIn) {
      if (req.user.user_role === config.USER_ROLES.SUBSCRIBER) {
        res.redirect('/')
      } else {
        res.render('dashboard', { user: req.user, layout: false })
      }
    } else {
      res.render('dashboard', { user: req.user, layout: false })
      // res.redirect('/sign-in')
    }
  } else {
    console.log('error in middleware: ', req.error)
    res.render('errorNotify', { layout: false })
  }
}

const getEditPostUIGetRequest = (req, res) => {
  res.render('templates/dashboard-uis/editPostUI', { categories: mockData.CATEGORIES_LIST, layout: false })
}

const getEditUserUIByRoleGetRequest = (req, res) => {
  res.render('templates/dashboard-uis/editUserUI', { userRole: req.params.userRole, categories: mockData.CATEGORIES_LIST, layout: false })
}

const getPageContentUIByPageIdGetRequest = (req, res) => {
  if (req.error) {
    res.send('error')
  } else {
    if (!req.isSignIn) {
      res.send('error')
    } else {
      switch (req.params.pageId) {
        case config.PAGES.CREATE_POST:
          categoryBus
            .getLessInfoCategories()
            .then(categories => {
              res.render('templates/dashboard-uis/createPostUI', { categories, layout: false })
            })
            .catch(err => {
              console.log('GET LESS INFO CATEGORIES ERROR: ', err)
              res.send(false)
            })
          break;
        case config.PAGES.DRAFT:
          res.render('templates/dashboard-uis/postsListUI', { categories: mockData.CATEGORIES_LIST, status: false, layout: false })
          break;
        case config.PAGES.REJECT:
          res.render('templates/dashboard-uis/postsListUI', { categories: mockData.CATEGORIES_LIST, status: false, layout: false })
          break;
        case config.PAGES.WAITING:
          res.render('templates/dashboard-uis/postsListUI', { categories: mockData.CATEGORIES_LIST, status: true, layout: false })
          break;
        case config.PAGES.PUBLISHED:
          res.render('templates/dashboard-uis/postsListUI', { categories: mockData.CATEGORIES_LIST, status: true, layout: false })
          break;
        case config.PAGES.USER:
          res.render('templates/dashboard-uis/usersListUI', { layout: false })
          break;
        case config.PAGES.CATEGORY:
          res.render('templates/dashboard-uis/categoriesListUI', { layout: false })
          break;
        case config.PAGES.TAG:
          res.render('templates/dashboard-uis/tagsListUI', { layout: false })
          break;
        default:
          res.send('not found page')
      }
    }
  }

}

const getPostsListByPageIdGetRequest = (req, res) => {
  res.send(mockData.POSTS_LIST)
}

const getFullCategoriesListGetRequest = (req, res) => {
  res.send(mockData.CATEGORIES_LIST)
}

const getFullTagsListGetRequest = (req, res) => {
  tagBus
    .loadAllTags()
    .then(tags => {
      console.log(tags)
      res.send(tags)
    })
    .catch(err => {
      console.log('error', err)
      res.send('Sorry, have some error on server')
    })
}

const getFullUsersListGetRequest = (req, res) => {
  res.send(mockData.USERS_LIST)
}

const uploadPostImageFile = multerMiddlewares.getPostImageMulterMiddleware()

const createPostPostRequest = (req, res) => {
  console.log('postId', req.generation.postId)
  let post = new Post()
  post.setPostId(req.generation.postId)
  post.setPostTitle(req.body.title)
  post.setPostSummary(req.body.summary)
  post.setPostContent(req.body['create-post-editor'])
  post.setYoutubeUrl(req.body.youtubeUrl)
  post.setPostAvatarImage(req.generation.postAvatarImage ? req.generation.postAvatarImage : null)
  post.setCategory(req.body.category)
  // post.setAuthor(getAuthor)
  // console.log('post', post)
  postBus
    .createPost(post)
    .then(status => {
      status && res.send({
        error: false,
        response: true,
      })
    })
    .catch(err => {
      console.log('CREATE POST ERROR: ', err)
      res.send({
        error: true,
        response: false,
      })
    })
}

module.exports = {
  dashboardGetRequest,
  getEditPostUIGetRequest,
  getEditUserUIByRoleGetRequest,
  getPageContentUIByPageIdGetRequest,
  getPostsListByPageIdGetRequest,
  getFullCategoriesListGetRequest,
  getFullTagsListGetRequest,
  getFullUsersListGetRequest,
  uploadPostImageFile,
  createPostPostRequest,
}
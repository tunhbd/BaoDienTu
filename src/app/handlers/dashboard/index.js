const { tagBus, postTagBus, postBus, categoryBus } = require('../../business')
const mockData = require('../../mockData')
const config = require('../../config')
const moment = require('moment')
const { Post, Tag, PostTag } = require('../../models')
const { multerMiddlewares } = require('../../middlewares')

const dashboardGetRequest = (req, res) => {
  if (req.error === undefined) {
    if (req.isSignIn) {
      if (req.user.user_role === config.USER_ROLES.SUBSCRIBER) {
        res.redirect('/')
      } else {
        res.render('dashboard', { user: { ...req.user, user_avatar: 'avatar_sample.png' }, layout: false })
      }
    } else {
      res.render('dashboard', { user: { user_avatar: 'avatar_sample.png' }, layout: false })
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
      console.log('LOADING')
      switch (req.params.pageId) {
        case config.PAGES.CREATE_POST:
          Promise
            .all([
              categoryBus.getLessInfoCategories(),
              tagBus.getLessInfoTags()
            ])
            .then(([categories, tags]) => {
              console.log('DONE')
              res.render('templates/dashboard-uis/createPostUI', { categories, tags, layout: false })
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
    .getFullInfoTags()
    .then(tags => {
      console.log(tags)
      res.send(tags)
    })
    .catch(err => {
      console.log('error', err)
      res.send(null)
    })
}

const getFullUsersListGetRequest = (req, res) => {
  res.send(mockData.USERS_LIST)
}

const uploadPostImageFile = multerMiddlewares.getPostImageMulterMiddleware()

const createPostPostRequest = (req, res) => {
  let post = new Post(
    req.generation.postId,
    req.body.title,
    {
      account: '',
      fullname: '',
      pseudonym: '',
    },
    {
      categoryId: req.body.category,
      categoryName: '',
    },
    [],
    req.body.youtubeUrl,
    req.generation.postAvatarImage || null,
    req.body.summary,
    req.body.content
  )

  console.log('CREATE POST')
  postBus
    .createPost(post)
    .then(async newPost => {
      if (newPost) {
        tags = req.body.tags.split(',').map(tag => tag.trim())
        await Promise
          .all(
            tags.map(
              async tag => new Promise(async (resolve, reject) => {
                let tagId = tag
                if (! await tagBus.hasTag(tagId)) {
                  let tagName = tagId
                  let newTag = new Tag('', tagName)
                  await tagBus
                    .createTag(newTag)
                    .then(target => {
                      tagId = target.TagId
                      console.log('create new tag: ', target)
                      newPost.Tags.push({ tagId: target.TagId, tagName: target.TagName })
                    })
                    .catch(err => {
                      console.log('CREATE TAG ERROR: ', err)
                    })
                }
                else {
                  newPost.Tags.push({ tagId: tagId, tagName: '' })
                }
                console.log('Tag Id: ', tagId)
                let postTag = new PostTag(newPost.postId, tagId)
                await postTagBus
                  .createPostTag(postTag)
                  .then(newPostTag => {
                    console.log('create new post tag: ', newPostTag)
                    resolve(newPostTag)
                  })
                  .catch(err => {
                    console.log('CREATE POST TAG ERROR: ', err)
                    reject(err)
                  })
              })
            )
          )
          .then(postTags => {
            res.send({
              error: false,
              post: newPost,
            })
          })
          .catch(err => {
            console.log('ERROR: ', err)
            res.send({
              error: true,
              post: {},
            })
          })
      }
      else {
        res.send({
          error: false,
          post: {},
        })
      }
    })
    .catch(err => {
      console.log('CREATE POST ERROR: ', err)
      res.send({
        error: true,
        post: {},
      })
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
  createTag,
}
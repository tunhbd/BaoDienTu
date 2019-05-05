const hdb = require('express-handlebars').create({
  // layoutsDir: '/src/views'
  partialsDir: '../..//views'
})
const mockData = require('../mockData')
const config = require('../config')

var Router = require('express').Router()

const getSigninedUser = (json) => {
  return json === undefined ? undefined : JSON.parse(json)
}

const routesObj = {
  'get': {
    '/': (req, res) => {
      let signinedUser = getSigninedUser(req.cookies.signined_user)

      res.render('indexContent', { user: signinedUser, layout: 'indexLayout' })
    },
    '/category/category_sample': (req, res) => {
      res.render('listPostContent', { layout: 'indexLayout' })
    },
    '/tag/tag_sample': (req, res) => {
      res.render('listPostContent', { layout: 'indexLayout' })
    },
    '/post/:postId': (req, res) => {
      let postId = req.params.postId
      res.render('postDetailContent', { layout: 'indexLayout' })
    },

    '/sign-in': (req, res) => {
      let signinedUser = getSigninedUser(req.cookies.signined_user)
      if (signinedUser !== undefined) {
        if (signinedUser.rule === 'SUBSCRIBER') {
          res.redirect('/')
        }
        else {
          res.redirect('/dashboard?page_id=GENERAL')
        }
      }
      else {
        res.render('signIn', { oldInfo: { username: '', password: '' }, layout: false })
      }
    },
    '/sign-out': (req, res) => {
      res.clearCookie('signined_user')
      res.redirect('/')
    },
    '/sign-up': (req, res) => {
      res.render('signUp', { layout: false })
    },
    '/change-password': (req, res) => {
      let signinedUser = getSigninedUser(req.cookies.signined_user)

      if (signinedUser === undefined) {
        res.redirect('/sign-in')
      }
      else {
        res.render('changePassword', { user: signinedUser, layout: false })
      }
    },
    '/forgot-password': (req, res) => {
      res.render('forgotPassword', { layout: false })
    },
    '/profile': (req, res) => {
      let signinedUser = getSigninedUser(req.cookies.signined_user)

      if (signinedUser === undefined) {
        res.redirect('/sign-in')
      }
      else {
        res.render('profile', { user: signinedUser, layout: false })
      }
    },

    '/dashboard': (req, res) => {
      // res.cookie('initCookie', 'initCookie', {expire: 400000 + Date.now()});
      // res.send(JSON.stringify(req.cookies))
      // console.log(req.cookies)
      let signinedUser = getSigninedUser(req.cookies.signined_user)

      if (signinedUser === undefined) {
        res.redirect('/sign-in')
      }
      else {
        if (signinedUser.rule === 'SUBSCRIBER') {
          res.redirect('/')
        }
        else {
          res.render('dashboard', { user: signinedUser, layout: false })
        }
      }
    },
    '/dashboard-ui/edit-post': (req, res) => {
      res.render('templates/dashboard-uis/editPostUI', { categories: mockData.CATEGORIES_LIST, layout: false })
    },
    '/dashboard-ui/edit-user/:userRule': (req, res) => {
      res.render('templates/dashboard-uis/editUserUI', { userRule: req.params.userRule, categories: mockData.CATEGORIES_LIST, layout: false })
    },
    '/dashboard-ui/:pageId': (req, res) => {
      switch (req.params.pageId) {
        case config.PAGES.CREATE_POST:
          res.render('templates/dashboard-uis/createPostUI', { categories: mockData.CATEGORIES_LIST, layout: false })
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
    },
    '/posts-list/:pageId': (req, res) => {
      res.send(mockData.POSTS_LIST)
    },
    '/categories-list': (req, res) => {
      res.send(mockData.CATEGORIES_LIST)
    },
    '/tags-list': (req, res) => {
      res.send(mockData.TAGS_LIST)
    },
    '/users-list': (req, res) => {
      res.send(mockData.USERS_LIST)
    },
    '/search/result': (req, res) => {
      res.render('searchPageContent', { results: [], searchInput: req.query.searchInput, layout: 'indexLayout' })
    }
  },
  'post': {
    '/sign-in': (req, res) => {
      let info = req.body
      let exists = false
      let infoForSave = null

      switch (info.username) {
        case mockData.USERS_FOR_TEST.ADMIN.account:
          infoForSave = { ...mockData.USERS_FOR_TEST.ADMIN }
          exists = true
          break
        case mockData.USERS_FOR_TEST.SUBSCRIBER.account:
          infoForSave = { ...mockData.USERS_FOR_TEST.SUBSCRIBER }
          exists = true
          break
        case mockData.USERS_FOR_TEST.WRITER.account:
          infoForSave = { ...mockData.USERS_FOR_TEST.WRITER }
          exists = true
          break
        case mockData.USERS_FOR_TEST.EDITOR.account:
          infoForSave = { ...mockData.USERS_FOR_TEST.EDITOR }
          exists = true
          break
      }

      if (exists && info.password === infoForSave.password) {
        delete infoForSave.password
        console.log('delete')
        res.cookie('signined_user', JSON.stringify(infoForSave), { httpOnly: true, expire: Date.now() + 360000 })

        if (infoForSave.rule === 'SUBSCRIBER') {
          res.redirect('/')
        }
        else {
          res.redirect('/dashboard?pageId=GENERAL')
        }
      }
      else {
        console.log(info)
        console.log(infoForSave)
        res.render('signIn', { oldInfo: info, layout: false })
      }
    },
    '/sign-up': (req, res) => {
      res.render('signUp', { layout: false })
    },
    '/change-password': (req, res) => {
      res.render('changePassword', { layout: false })
    },
    '/profile': (req, res) => {
      res.render('profile', { layout: false })
    },
    '/forgot-password': (req, res) => {
      res.render('forgotPassword', { layout: false })
    },
  },
  'put': {},
  'delete': {}
}

const renderRoutes = (routesObj, method = null) => {
  for (let key in routesObj) {
    if (typeof routesObj[key] === 'object' && routesObj[key] !== null && !(routesObj[key] instanceof Array)) {
      renderRoutes(routesObj[key], key)
    }
    else {
      switch (method) {
        case 'get':
          Router.get(key, routesObj[key])
          break;
        case 'post':
          Router.post(key, routesObj[key])
          break;
        case 'put':
          Router.put(key, routesObj[key])
          break;
        case 'delete':
          Router.delete(key, routesObj[key])
          break;
      }
    }
  }
}

const route = () => {
  renderRoutes(routesObj)

  return Router
}


module.exports = route
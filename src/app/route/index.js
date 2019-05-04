const hdb = require('express-handlebars').create({
  // layoutsDir: '/src/views'
  partialsDir: '../..//views'
})
const mockData = require('../mockData')
const config = require('../config')

var Router = require('express').Router()

const routesObj = {
  'get': {
    '/': (req, res) => {
      res.render('indexContent', { layout: 'indexLayout' })
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
      res.render('signIn', { layout: false })
    },
    '/sign-up': (req, res) => {
      res.render('signUp', { layout: false })
    },
    '/change-password': (req, res) => {
      res.render('changePassword', { layout: false })
    },
    '/forgot-password': (req, res) => {
      res.render('forgotPassword', { layout: false })
    },

    '/dashboard': (req, res) => {
      // res.cookie('initCookie', 'initCookie', {expire: 400000 + Date.now()});
      // res.send(JSON.stringify(req.cookies))
      // console.log(req.cookies)
      res.render('dashboard', { userRule: 'ADMIN', layout: false })
    },
    '/dashboard-ui/:pageId': (req, res) => {
      switch (req.params.pageId) {
        case config.PAGES.CREATE_POST:
          res.render('templates/dashboard-uis/createPostUI', { layout: false })
          break;
        case config.PAGES.DRAFT:
          res.render('templates/dashboard-uis/postsListUI', { status: false, layout: false })
          break;
        case config.PAGES.REJECT:
          res.render('templates/dashboard-uis/postsListUI', { status: false, layout: false })
          break;
        case config.PAGES.WAITING:
          res.render('templates/dashboard-uis/postsListUI', { status: true, layout: false })
          break;
        case config.PAGES.PUBLISHED:
          res.render('templates/dashboard-uis/postsListUI', { status: true, layout: false })
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
    }
  },
  'post': {},
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
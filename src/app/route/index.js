const business = require('../business')
const mockData = require('../mockData')
const config = require('../config')

var Router = require('express').Router()
const routeMiddlewares = require('./routeMiddlewares')

const renderRoutes = (routesObj, method = null) => {
  for (let key in routesObj) {
    if (typeof routesObj[key] === 'object' && routesObj[key] !== null && !(routesObj[key] instanceof Array)) {
      renderRoutes(routesObj[key], key)
    } else {
      switch (method) {
        case 'get':
          // routeMiddlewares[key] !== undefined &&
          //   routeMiddlewares[key].forEach(middleware => {
          //     Router.use(key, middleware)
          //   });
          if (routeMiddlewares[key] !== undefined && routeMiddlewares[key].length > 0) {
            Router.get(key, ...routeMiddlewares[key], routesObj[key])
          }
          else {
            Router.get(key, routesObj[key])
          }
          break
        case 'post':
          // routeMiddlewares[key] !== undefined &&
          //   routeMiddlewares[key].forEach(middleware => {
          //     Router.use(key, middleware)
          //   });
          if (routeMiddlewares[key] !== undefined && routeMiddlewares[key].length > 0) {
            Router.post(key, ...routeMiddlewares[key], routesObj[key])
          }
          else {
            Router.post(key, routesObj[key])
          }
          break
        // case 'put':
        //   routeMiddlewares[key] ? Router.put(key, routeMiddlewares[key], routesObj[key]) : Router.put(key, routesObj[key])
        //   break;
        // case 'delete':
        //   routeMiddlewares[key] ? Router.delete(key, routeMiddlewares[key], routesObj[key]) : Router.delete(key, routesObj[key])
        //   break;
      }
    }
  }
}

const route = () => {
  renderRoutes(require('./auth'))
  renderRoutes(require('./homepage'))
  renderRoutes(require('./dashboard'))

  return Router
}


module.exports = route
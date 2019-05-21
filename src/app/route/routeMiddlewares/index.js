const { multerMiddlewares, gereratePostIdMiddleware } = require('../../middlewares')
const routeMiddlewares = {
  '/dashboard/create-post': [
    gereratePostIdMiddleware,
    multerMiddlewares.getPostImageMulterMiddleware(),
  ]
}

module.exports = routeMiddlewares
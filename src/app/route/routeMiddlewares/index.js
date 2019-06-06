
const routeMiddlewares = {
  '/admin/dashboard/create-post': [
    gereratePostIdMiddleware,
    multerMiddlewares.getPostImageMulterMiddleware(),
  ]
}

module.exports = routeMiddlewares
const { authBus } = require('../business')

const registerMiddleware = server => {
  server.use('/admin', (req, res, next) => {
    if (!req.user) {
      res.redirect('/sign-in')
    }
    else {
      if (req.user.role === 'SUBSCRIBER') {
        res.redirect('/')
      }
      else {
        next()
      }
    }
  })
}

module.exports = {
  registerMiddleware,
}
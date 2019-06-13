const { authBus } = require('../business')

const registerMiddleware = server => {
  server.use('/', async (req, res, next) => {
    if (req.user) {
      await authBus
        .getUserInfoWithNoPassword(req.user.account)
        .then(user => {
          req.user = user
          next()
        })
        .catch(err => {
          console.log(err)
          console.log(req.user)
          res.send('error')
        })
    }
    else {
      next()
    }
  })
}

module.exports = {
  registerMiddleware,
}
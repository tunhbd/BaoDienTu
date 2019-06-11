const { authBus } = require('../business')

const registerMiddleware = server => {
  server.use('/', async (req, res, next) => {
    if (req.user) {
      await authBus
        .getUserInfoWithNoPassword(req.user.account)
        .then(user => {
          req.user = user
        })
        .catch(err => {

        })
    }
  })
}

module.exports = {
  registerMiddleware,
}
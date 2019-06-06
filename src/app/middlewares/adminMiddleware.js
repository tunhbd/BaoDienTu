const { authBus } = require('../business')

const registerMiddleware = server => {
  server.use('/admin', (req, res, next) => {
    let signinedUser = authBus.getSigninedUser(req.cookies.signined_user)

    req.error = undefined
    if (signinedUser === undefined) {
      // res.redirect('/sign-in')
      req.user = {
        userRole: 'ADMIN',
      }
      next()
    } else {
      authBus
        .checkSignInedUser(signinedUser.user_token)
        .then(results => {
          if (results.length > 0) {
            req.isSignIn = true
            req.user = signinedUser
          } else {
            req.isSignIn = false
          }
          // mock
          req.isSignIn = true
          next()
        })
        .catch(err => {
          req.error = err
          next()
        })
    }
  })
}

module.exports = {
  registerMiddleware,
}
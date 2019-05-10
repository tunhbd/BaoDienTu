const authHandlers = require('../../handlers/auth')

module.exports = {
    'get': {
        '/sign-in': authHandlers.signInGetRequest,
        '/sign-out': authHandlers.signOutGetRequest,
        '/sign-up': authHandlers.signUpGetRequest,
        '/change-password': authHandlers.changePasswordGetRequest,
        '/forgot-password': authHandlers.forgotPasswordGetRequest,
        '/profile': authHandlers.profileGetRequest,
    },
    'post': {
        '/sign-in': authHandlers.signInPostRequest,
        '/sign-up': authHandlers.signUpPostRequest,
        '/change-password': authHandlers.changePasswordPostRequest,
        '/profile': authHandlers.profilePostRequest,
        '/forgot-password': authHandlers.forgotPasswordPostRequest,
    }
}
const authHandlers = require("../../handlers/auth");
const { multerMiddlewares } = require('../../middlewares')

module.exports = {
  'get': {
    '/sign-in': [authHandlers.renderSignInPage],
    '/sign-out': [authHandlers.signOutGetRequest],
    '/sign-up': [authHandlers.renderSignUpPage],
    '/change-password': [authHandlers.renderChangePasswordPage],
    '/forgot-password': [authHandlers.renderForgotPasswordPage],
    '/profile': [authHandlers.renderProfilePage],
    '/auth/facebook': [authHandlers.signInByFacebook],
    '/auth/facebook/callback': [authHandlers.signInByFacebookAgain],
    '/reset-password/:token': [authHandlers.renderResetPasswordPage],
    '/check-not-exists-user-account': [authHandlers.checkNotExistsUserAccount],
    '/check-old-password': [authHandlers.checkOldPassword],
    '/check-not-exists-email': [authHandlers.checkNotExistsEmail],
    '/check-not-exists-email-expect/:originEmail': [authHandlers.checkNotExistsEmail],
  },
  'post': {
    '/sign-in': [authHandlers.signIn],
    '/sign-up': [authHandlers.signUp],
    '/change-password': [authHandlers.changePassword],
    '/profile': [authHandlers.updateProfile],
    '/forgot-password': [authHandlers.forgotPassword],
    '/reset-password/:token': [authHandlers.resetPassword],
    '/update-avatar': [multerMiddlewares.userAvatarMulterMiddleware, authHandlers.updateUserAvatar],
  }
}
// get: {
//   "/sign-in": authHandlers.signInGetRequest,
//     "/sign-out": authHandlers.signOutGetRequest,
//       "/sign-up": authHandlers.signUpGetRequest,
//         "/change-password": authHandlers.changePasswordGetRequest,
//           "/forgot-password": authHandlers.forgotPasswordGetRequest,
//             "/profile": authHandlers.profileGetRequest,
//               "/auth/facebook": authHandlers.authFacebookGetRequest,
//                 "/auth/facebook/callback": authHandlers.authFacebookCallbackGetRequest,
//                   
// },
// post: {
//   "/sign-in": authHandlers.signInPostRequest,
//     "/sign-up": authHandlers.signUpPostRequest,
//       "/change-password": authHandlers.changePasswordPostRequest,
//         "/profile": authHandlers.profilePostRequest,
//           "/forgot-password": authHandlers.forgotPasswordPostRequest,
//             
// }
// }

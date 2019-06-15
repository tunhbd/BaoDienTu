const authHandlers = require("../../handlers/auth");

module.exports = {
  'get': {
    '/sign-in': [authHandlers.renderSignInPage],
    '/sign-out': [authHandlers.signOutGetRequest],
    '/sign-up': [authHandlers.renderSignUpPage],
    '/change-password': [authHandlers.changePasswordGetRequest],
    '/forgot-password': [authHandlers.forgotPasswordGetRequest],
    '/profile': [authHandlers.profileGetRequest],
    '/auth/facebook': [authHandlers.signInByFacebook],
    '/auth/facebook/callback': [authHandlers.signInByFacebookAgain],
    '/reset-password/:token': [authHandlers.resetPasswordGetRequest],
  },
  'post': {
    '/sign-in': [authHandlers.signIn],
    '/sign-up': [authHandlers.signUp],
    '/change-password': [authHandlers.changePasswordPostRequest],
    '/profile': [authHandlers.profilePostRequest],
    '/forgot-password': [authHandlers.forgotPasswordPostRequest],
    '/reset-password/:token': [authHandlers.resetPasswordPostRequest],
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

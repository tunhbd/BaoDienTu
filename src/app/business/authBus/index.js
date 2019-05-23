const db = require('../../db')

const getSigninedUser = (json) => {
  return json === undefined ? undefined : JSON.parse(json)
}

const checkSignInedUser = (userToken) => {
  let nowDate = Date()
  let checkQuery = `SELECT * FROM sign_in_history WHERE user_token='${userToken}' AND user_token_expiration <= ${nowDate.toString()}`
  return (new db.DBConnection()).loadRequest(checkQuery)
}

module.exports = {
  getSigninedUser,
  checkSignInedUser,
}
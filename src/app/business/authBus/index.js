const db = require("../../db");
const bcrypt = require("bcrypt");

const getSigninedUser = json => {
  return json === undefined ? undefined : JSON.parse(json);
};

const checkSignInedUser = userToken => {
  let nowDate = Date();
  let checkQuery = `SELECT * FROM sign_in_history WHERE user_token='${userToken}' AND user_token_expiration <= ${nowDate.toString()}`;
  return new db.DBConnection().loadRequest(checkQuery);
};

const registryUser = userInfo => {
  const rounds = 10;
  const plain = userInfo.password;

  var salt = bcrypt.genSaltSync(rounds);
  var hash = bcrypt.hashSync(plain, salt);

  let q = `INSERT INTO users VALUES ( 
    '${userInfo.username}', \
    '${hash}', \
    '${userInfo.username}', \
    '${userInfo.email}', \ 
    null, \
    'https://image.flaticon.com/icons/svg/1781/1781013.svg', \
    1, \
    '${userInfo.role}');`;
  return new db.DBConnection().loadRequest(q);
};

module.exports = {
  getSigninedUser,
  checkSignInedUser,
  registryUser
};

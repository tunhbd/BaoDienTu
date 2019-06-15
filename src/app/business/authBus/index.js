const { DBConnection } = require("../../db");
const bcrypt = require("bcrypt");
const moment = require('moment')
const { User } = require('../../models')
const { USER_ROLES } = require('../../config')

const getSigninedUser = json => {
  return json === undefined ? undefined : JSON.parse(json);
};

const checkSignInedUser = userToken => {
  let nowDate = Date();
  let checkQuery = `SELECT * FROM sign_in_history WHERE user_token='${userToken}' AND user_token_expiration <= ${nowDate.toString()}`;
  return new DBConnection().loadRequest(checkQuery);
};

const registryUser = userInfo => new Promise((resolve, reject) => {
  const rounds = 10;
  const plain = userInfo.password;

  var salt = bcrypt.genSaltSync(rounds);
  var hash = bcrypt.hashSync(plain, salt);

  let q =
    `INSERT INTO users(user_account, user_password, user_fullname, user_email, user_birthday, user_avatar, user_role) VALUES ( 
      '${userInfo.username}',
      '${hash}',
      '${userInfo.fullname}',
      '${userInfo.email}',
      '${moment(userInfo.birthday, 'DD/MM/YYYY').format('YYYY/MM/DD')}', \
      null, \
      '${userInfo.role}');`;

  let dbConn = new DBConnection()
  dbConn
    .insertRequest(q)
    .then(ret => {
      if (ret) {
        let query = ''
        let dbConn = null
        switch (userInfo.role) {

          case USER_ROLES.SUBSCRIBER:
            query = `INSERT INTO subscribers(user_account, expiration_date) VALUES('${userInfo.username}','${moment().add(7, 'days').format('YYYY/MM/DD')}')`
            dbConn = new DBConnection()
            dbConn
              .insertRequest(query)
              .then(ret => {
                ret && resolve(true)
              })
              .catch(err => {
                reject(err)
              })
            break;
          case USER_ROLES.WRITER:
            query = `INSERT INTO writers(user_account, pseudonym) VALUES('${userInfo.username}',null)`
            dbConn = new DBConnection()
            dbConn
              .insertRequest(query)
              .then(ret => {
                ret && resolve(true)
              })
              .catch(err => {
                reject(err)
              })
            break;
        }
      }
    })
    .catch(err => {
      reject(err)
    })
});

const getUserInfoWithNoPassword = account => new Promise((resolve, reject) => {
  let query = `SELECT user_account, user_role, user_email, user_birthday, user_fullname, user_avatar FROM users WHERE user_account='${account}'`
  let dbConn = new DBConnection()

  dbConn
    .loadRequest(query)
    .then(rets => {
      let user = new User()
      user.account = rets[0].user_account
      user.avatar = rets[0].user_avatar
      user.birthday = rets[0].user_birthday
      user.role = rets[0].user_role
      user.email = rets[0].user_email
      user.fullname = rets[0].user_fullname

      resolve(user)
    })
    .catch(err => {
      reject(err)
    })
})

const checkExistsUserAccount = account => new Promise((resolve, reject) => {
  let query = `SELECT user_fullname FROM users WHERE user_account='${account}'`
  let dbConn = new DBConnection()

  dbConn
    .loadRequest(query)
    .then(rets => {
      resolve(rets.length > 0 ? true : false)
    })
    .catch(err => {
      reject(err)
    })
})

module.exports = {
  getSigninedUser,
  checkSignInedUser,
  registryUser,
  getUserInfoWithNoPassword,
  checkExistsUserAccount,
};

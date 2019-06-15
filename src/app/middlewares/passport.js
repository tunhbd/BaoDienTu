const passport = require("passport")
const bcrypt = require("bcrypt")
const LocalStrategy = require("passport-local").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
const { DBConnection } = require("../db")
const { User } = require('../models')
const crypto = require("crypto")

module.exports = function (server) {
  server.use(passport.initialize());
  server.use(passport.session());

  passport.use(
    new LocalStrategy(function (username, password, done) {
      let q = `SELECT * FROM users WHERE user_account='${username}'`;
      let dbConn = new DBConnection()

      dbConn
        .loadRequest(q)
        .then(rows => {
          if (rows.length === 0) {
            return done(null, false, {
              username,
              password,
              message: "Username không tồn tại"
            });
          }
          else {
            let isMatch = bcrypt.compareSync(password, rows[0].user_password);
            if (isMatch) {
              let user = {
                account: rows[0].user_account,
                role: rows[0].user_role
              }
              return done(null, user);
            }
            return done(null, false, {
              username,
              password,
              message: "Mật khẩu chưa đúng"
            });
          }
        })
        .catch(err => {
          return done(err, false);
        });
    })
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: "290455038369877",
        clientSecret: "a9e962efcae7c82c6265516cd0ecee23",
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: [
          "id",
          "displayName",
          "email",
          "birthday",
          "first_name",
          "last_name",
          "middle_name",
          "gender",
          "link"
        ]
      },
      function (accessToken, refreshToken, userInfo, done) {
        crypto.randomBytes(256, (err, buf) => {
          if (err) throw err;
          const rounds = 10;
          var salt = bcrypt.genSaltSync(rounds);
          var hash = bcrypt.hashSync(buf.toString(), salt);

          // let q = `INSERT INTO users VALUES (
          // '${userInfo.email}', \
          // '${hash}', \
          // 'fwfewfew', \
          // '${userInfo.email}', \
          // null, \
          // 'https://image.flaticon.com/icons/svg/1781/1781013.svg', \
          // 1, \
          // 'reader');`;
          // new db.DBConnection().loadRequest(q).then(() => done(null, userInfo));
          done(null, userInfo);
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};

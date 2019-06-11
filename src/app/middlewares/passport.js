var passport = require("passport"),
  bcrypt = require("bcrypt"),
  LocalStrategy = require("passport-local").Strategy,
  FacebookStrategy = require("passport-facebook").Strategy,
  db = require("../db"),
  crypto = require("crypto");

module.exports = function(server) {
  server.use(passport.initialize());
  server.use(passport.session());

  passport.use(
    new LocalStrategy(function(username, password, done) {
      let q = `SELECT * FROM users WHERE user_account='${username}'`;
      new db.DBConnection()
        .loadRequest(q)
        .then(rows => {
          if (rows.length === 0) {
            return done(null, false, {
              username,
              password,
              message: "Username không tồn tại"
            });
          }

          var user = rows[0];
          var isMatch = bcrypt.compareSync(password, rows[0].user_password);
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { message: "Mật khẩu chưa đúng" });
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
      function(accessToken, refreshToken, userInfo, done) {
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

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};

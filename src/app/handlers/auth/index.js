const authBus = require("../../business/authBus");
const config = require("../../config");
const crypto = require("crypto");
const passport = require("passport");
const db = require("../../db");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
const { checkPermis, testPwd, hashPwd } = require("../../utils");
const moment = require("moment");

const renderSignInPage = (req, res) => {
  if (req.user) {
    // switch (req.user.userRole) {
    //   case "SUBSCRIBER":
    //     res.redirect("/");
    //     break;
    //   case "WRITER":
    //   case "EDITOR":
    //   case "ADMIN":
    //     res.redirect("/admin/dashboard");
    //     break;
    // }
    res.redirect("/");
  } else {
    res.render("user/signIn", {
      layout: false,
      message: { success: req.flash("suc") }
    });
  }
};

const signIn = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      req.flash("mes", info.message);

      return res.render("user/signIn", {
        layout: false,
        ov: info,
        message: { error: req.flash("mes") }
      });
    } else {
      req.logIn(user, err => {
        if (err) return next(err);
        req.flash("suc", "Đăng nhập thành công");
        if (user.role === "SUBSCRIBER") {
          res.redirect("/");
        } else {
          res.redirect("/admin/dashboard");
        }
      });
    }
  })(req, res, next);
};

const signOutGetRequest = (req, res) => {
  req.logout();
  res.redirect("/sign-in");
};

const renderSignUpPage = (req, res) => {
  res.render("user/signUp", { layout: false });
};

const signUp = (req, res, next) => {
  authBus
    .registryUser(req.body)
    .then(() => {
      req.flash("suc", "Đăng ký thành công");
      res.redirect("/sign-in");
    })
    .catch(err => next(err));
};

const changePasswordGetRequest = (req, res) => {
  // let signinedUser = authBus.getSigninedUser(req.cookies.signined_user);

  if (req.user) {
    res.render("changePassword", { layout: false });
  } else {
    res.redirect("/sign-in");
  }
};

const changePasswordPostRequest = (req, res, next) => {
  checkPermis(req, res);
  if (!testPwd(req.body.newPwd) || req.body.newPwd !== req.body.confirmNewPwd)
    throw "Password Error";

  let q = `SELECT * FROM users WHERE user_account='${req.user.account}'`;
  new db.DBConnection()
    .loadRequest(q)
    .then(rows => {
      if (rows.length === 0) {
        throw "Invalid username.";
      }

      var isMatch = bcrypt.compareSync(req.body.oldPwd, rows[0].user_password);

      if (isMatch) {
        let newHash = hashPwd(req.body.newPwd);

        //update password
        let updatePwdQuery = `UPDATE users
            SET user_password = '${newHash}'
            WHERE user_account = '${req.user.user_account}';`;
        new db.DBConnection().loadRequest(updatePwdQuery).catch(err => {
          throw err;
        });

        req.flash("suc", "Đổi mật khẩu thành công");
        res.redirect("/");
      } else {
        throw "Invalid password.";
      }
    })
    .catch(err => {
      next(err);
    });
};

const forgotPasswordGetRequest = (req, res) => {
  res.render("forgotPassword", { layout: false });
};
const profileGetRequest = (req, res) => {
  checkPermis(req, res);
  res.render("profile", {
    user: req.user,
    birthday: moment(req.user.birthday).format("YYYY-MM-DD"),
    layout: false
  });
};
const profilePostRequest = (req, res, next) => {
  if (req.body.email == "") throw "Email is empty";
  else {
    let updateQuery = `UPDATE users
            SET user_fullname = '${req.body.fullname}',
            user_email = '${req.body.email}'
            , user_birthday = '${moment(req.body.birthday, "YYYY-MM-DD").format(
              "YYYY/MM/DD"
            )}'
            WHERE user_account = '${req.user.account}';`;
    new db.DBConnection()
      .loadRequest(updateQuery)
      .then(() => {
        req.flash("suc", "Cập nhật thành công");
        res.redirect("/");
      })
      .catch(err => {
        next(err);
      });
  }
};
const authFacebookGetRequest = function() {
  passport.authenticate("facebook", { scope: "email" });
};
const authFacebookCallbackGetRequest = function() {
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/sign-in"
  });
};
const forgotPasswordPostRequest = (req, res) => {
  let q = `SELECT * FROM users WHERE user_email='${req.body.emailReset}';`;

  new db.DBConnection()
    .loadRequest(q)
    .then(rows => {
      if (rows.length === 0) {
        req.flash("mes", "Không tồn tại email.");
        res.redirect("/");
      }
      let user = rows[0];
      token = crypto.randomBytes(32).toString("hex");
      let saveTokQuery = `INSERT INTO user_reset(ur_email, ur_token) VALUES ('${
        user.user_email
      }', '${token}')`;
      new db.DBConnection().loadRequest(saveTokQuery).then(() => {
        const msg = {
          to: "letuthptnguyendueduvn@gmail.com",
          from: "baodientu@example.com",
          subject: "Lấy lại tài khoản",
          html: `<a href='http://localhost:3000/reset-password/${token}><b>Click here to reset password</b></a>`
        };
        sgMail.send(msg);

        req.flash("suc", "Email đã được gửi cho bạn.");
        res.redirect("/");
      });
    })
    .catch(err => {
      throw err;
    });
};
const resetPasswordGetRequest = (req, res) => {
  res.render("resetPassword", { token: req.params.token, layout: false });
};
const resetPasswordPostRequest = (req, res, next) => {
  let tok = req.params.token;

  let getUserQuery = `SELECT * FROM users join user_reset on users.user_email = user_reset.ur_email WHERE user_reset.ur_token='${tok}';`;
  new db.DBConnection()
    .loadRequest(getUserQuery)
    .then(rows => {
      if (rows.length === 0) throw "Token is not valid";

      if (
        !testPwd(req.body.newPwd) ||
        req.body.newPwd !== req.body.confirmNewPwd
      )
        throw "Password Error";

      let newHash = bcrypt.hashSync(req.body.newPwd, 10);
      let changeQ = `UPDATE users
          SET user_password = '${newHash}'
          WHERE user_email = '${rows[0].user_email}';`;
      new db.DBConnection()
        .loadRequest(changeQ)
        .then(() => {
          req.flash("suc", "Bạn đã đổi lại mật khẩu thành công");
          res.redirect("/");
        })
        .catch(err => {
          throw err;
        });
      return true;
    })
    .catch(err => {
      next(err);
    });
};

const signInByFacebook = (req, res) => {
  passport.authenticate("facebook");
};

const signInByFacebookAgain = (req, res) => {
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/sign-in"
  });
};

module.exports = {
  renderSignInPage,
  signIn,
  signOutGetRequest,
  renderSignUpPage,
  signUp,
  changePasswordGetRequest,
  changePasswordPostRequest,
  forgotPasswordGetRequest,
  forgotPasswordPostRequest,
  profileGetRequest,
  profilePostRequest,
  authFacebookGetRequest,
  authFacebookCallbackGetRequest,
  resetPasswordGetRequest,
  resetPasswordPostRequest,
  signInByFacebook,
  signInByFacebookAgain
};

const authBus = require("../../business/authBus")
const config = require("../../config")
const crypto = require("crypto")
const passport = require("passport")
const db = require("../../db")
const bcrypt = require("bcrypt")
const sgMail = require("@sendgrid/mail")

const renderSignInPage = (req, res) => {
  if (req.user) {
    switch (req.user.userRole) {
      case 'SUBSCRIBER':
        res.redirect('/')
        break;
      case 'WRITER':
      case 'EDITOR':
      case 'ADMIN':
        res.redirect('/admin/dashboard')
        break
    }
  }
  else {
    res.render('user/signIn', {
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
    }
    else {
      req.logIn(user, err => {
        if (err) return next(err)

        if (user.role === 'SUBSCRIBER') {
          res.redirect("/")
        }
        else {
          res.redirect("/admin/dashboard")
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

const signUp = (req, res) => {
  authBus
    .registryUser(req.body)
    .then(result => {
      req.flash("suc", "Đăng ký thành công");
      res.redirect("/sign-in");
    })
    .catch(err => console.log(err));
};

const changePasswordGetRequest = (req, res) => {
  // let signinedUser = authBus.getSigninedUser(req.cookies.signined_user);

  if (req.user) {
    res.render("changePassword", { layout: false });
  } else {
    res.redirect("/sign-in");
  }
};
const changePasswordPostRequest = (req, res) => {
  let q = `SELECT * FROM users WHERE user_account='${req.user.user_account}'`;
  new db.DBConnection()
    .loadRequest(q)
    .then(rows => {
      if (rows.length === 0) {
        throw "Invalid username.";
      }

      if (req.body.newPassword !== req.body.confirmPassword)
        throw "Password Error";

      var isMatch = bcrypt.compareSync(
        req.body.password,
        rows[0].user_password
      );
      if (isMatch) {
        let newHash = bcrypt.hashSync(req.body.newPassword, 10);
        let changeQ = `UPDATE users
            SET user_password = '${newHash}'
            WHERE user_account = '${req.user.user_account}';`;
        new db.DBConnection().loadRequest(changeQ).catch(err => {
          throw err;
        });
        return true;
      }
      throw "Invalid password.";
    })
    .catch(err => {
      throw err;
    });
  res.redirect("/");
};
const forgotPasswordGetRequest = (req, res) => {
  res.render("forgotPassword", { layout: false });
};
const profileGetRequest = (req, res) => {
  let signinedUser = authBus.getSigninedUser(req.cookies.signined_user);

  if (signinedUser === undefined) {
    res.redirect("/sign-in");
  } else {
    res.render("profile", { user: signinedUser, layout: false });
  }
};
const profilePostRequest = (req, res) => {
  res.render("profile", { layout: false });
};
const authFacebookGetRequest = function () {
  passport.authenticate("facebook", { scope: "email" });
};
const authFacebookCallbackGetRequest = function () {
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/sign-in"
  });
};
const forgotPasswordPostRequest = (req, res) => {
  console.log(req);
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
const resetPasswordPostRequest = (req, res) => {
  let tok = req.params.token;

  let q = `SELECT * FROM user_reset;`;
  new db.DBConnection().loadRequest(q).then(rows => {
    if (rows.length === 0) {
      throw "No user needs reset.";
    } else {
      let emailMatch = "";
      rows.map(row => {
        if (row.ur_token === tok) {
          emailMatch = row.ur_email;
          console.log("match", emailMatch);

          let q = `SELECT * FROM users WHERE user_account='${emailMatch}';`;
          new db.DBConnection()
            .loadRequest(q)
            .then(rows => {
              if (rows.length === 0) {
                throw "Invalid email.";
              }

              if (req.body.password !== req.body.confirmPassword)
                throw "Password Error";

              let newHash = bcrypt.hashSync(req.body.password, 10);
              let changeQ = `UPDATE users
          SET user_password = '${newHash}'
          WHERE user_account = '${emailMatch}';`;

              new db.DBConnection().loadRequest(changeQ).catch(err => {
                throw err;
              });
              return true;
            })
            .catch(err => {
              throw err;
            });
          res.redirect("/");
        }
      });
    }
  });
};

const signInByFacebook = (req, res) => {
  passport.authenticate("facebook")
}

const signInByFacebookAgain = (req, res) => {
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/sign-in"
  })
}

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
  signInByFacebookAgain,
};

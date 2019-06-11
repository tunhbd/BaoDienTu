const authBus = require("../../business/authBus"),
  config = require("../../config"),
  crypto = require("crypto"),
  passport = require("passport"),
  db = require("../../db"),
  bcrypt = require("bcrypt"),
  sgMail = require("@sendgrid/mail");

const signInGetRequest = (req, res) => {
  // let signinedUser = authBus.getSigninedUser(req.cookies.signined_user);

  // if (signinedUser !== undefined) {
  //   if (signinedUser.user_role === config.USER_ROLES.SUBSCRIBER) {
  //     res.redirect("/");
  //   } else {
  //     res.redirect("/dashboard?page_id=GENERAL");
  //   }
  // } else {
  //   console.log(req.flash("suc"));
  //   res.render("signIn", {
  //     oldInfo: { username: "", password: "" },
  //     layout: false,
  //     message: req.flash("suc")
  //   });
  // }
  res.render("signIn", {
    layout: false,
    message: { success: req.flash("suc") }
  });
};
const signInPostRequest = (req, res, next) => {
  // let info = req.body;
  // let exists = false;suc
  // let infoForSave = null;
  // switch (info.username) {
  //   case mockData.USERS_FOR_TEST.ADMIN.account:
  //     infoForSave = { ...mockData.USERS_FOR_TEST.ADMIN };
  //     exists = true;
  //     break;
  //   case mockData.USERS_FOR_TEST.SUBSCRIBER.account:
  //     infoForSave = { ...mockData.USERS_FOR_TEST.SUBSCRIBER };
  //     exists = true;
  //     break;
  //   case mockData.USERS_FOR_TEST.WRITER.account:
  //     infoForSave = { ...mockData.USERS_FOR_TEST.WRITER };
  //     exists = true;
  //     break;
  //   case mockData.USERS_FOR_TEST.EDITOR.account:
  //     infoForSave = { ...mockData.USERS_FOR_TEST.EDITOR };
  //     exists = true;
  //     break;
  // }
  // if (exists && info.password === infoForSave.password) {
  //   delete infoForSave.password;
  //   console.log("delete");
  //   res.cookie("signined_user", JSON.stringify(infoForSave), {
  //     httpOnly: true,
  //     expire: Date.now() + 360000
  //   });
  //   if (infoForSave.rule === "SUBSCRIBER") {
  //     res.redirect("/");
  //   } else {
  //     res.redirect("/dashboard?pageId=GENERAL");
  //   }
  // } else {
  //   console.log(info);
  //   console.log(infoForSave);
  //   res.render("signIn", { oldInfo: info, layout: false });
  // }

  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      req.flash("mes", info.message);
      return res.render("signIn", {
        layout: false,
        ov: info,
        message: { error: req.flash("mes") }
      });
    }

    req.logIn(user, err => {
      if (err) return next(err);
      res.redirect("/");
    });
  })(req, res, next);
};
const signOutGetRequest = (req, res) => {
  // res.clearCookie("signined_user");
  req.logout();
  res.redirect("/sign-in");
};
const signUpGetRequest = (req, res) => {
  res.render("signUp", { layout: false });
};
const signUpPostRequest = (req, res) => {
  authBus
    .registryUser(req.body)
    .then(result => {
      req.flash("suc", "Đăng ký thành công");
      res.redirect("/sign-in");
    })
    .catch(err => console.log(err.errno));
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
module.exports = {
  signInGetRequest,
  signInPostRequest,
  signOutGetRequest,
  signUpGetRequest,
  signUpPostRequest,
  changePasswordGetRequest,
  changePasswordPostRequest,
  forgotPasswordGetRequest,
  forgotPasswordPostRequest,
  profileGetRequest,
  profilePostRequest,
  authFacebookGetRequest,
  authFacebookCallbackGetRequest,
  resetPasswordGetRequest,
  resetPasswordPostRequest
};

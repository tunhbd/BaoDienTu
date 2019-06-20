const authBus = require("../../business/authBus");
const config = require("../../config");
const md5 = require("md5");
const passport = require("passport");
const db = require("../../db");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
const { checkPermis, testPwd, hashPwd } = require("../../utils");
const moment = require("moment");

sgMail.setApiKey(config.SENDGRID_API_KEY);

const renderSignInPage = (req, res) => {
  if (req.user) {
    switch (req.user.userRole) {
      case "SUBSCRIBER":
        res.redirect("/");
        break;
      case "WRITER":
      case "EDITOR":
      case "ADMIN":
        res.redirect("/admin/dashboard");
        break;
    }
  } else {
    res.render("user/signIn", {
      layout: false,
      data: {
        message: { success: req.flash("suc") }
      }
    });
  }
};

const signIn = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      req.flash("mes", info.message);

      res.render("user/signIn", {
        data: {
          ov: info,
          message: { error: req.flash("mes") }
        },
        layout: false
      });
    } else {
      req.logIn(user, err => {
        if (err) return next(err);
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
  req.flash("suc", null);
  res.redirect("/sign-in");
};

const renderSignUpPage = (req, res) => {
  if (req.user) {
    req.logout();
    res.redirect("/sign-up");
  } else {
    res.render("user/signUp", {
      data: {
        message: {
          error: req.flash("err") ? req.flash("err") : undefined
        }
      },
      layout: false
    });
  }
};

const signUp = (req, res, next) => {
  if (req.user) {
    req.logout();
    res.redirect("/sign-up");
  } else {
    authBus
      .registerUser(req.body)
      .then(ret => {
        req.flash("suc", "Đăng ký thành công");
        res.redirect("/sign-in");
      })
      .catch(err => {
        console.log(err);
        req.flash(
          "mes",
          "Hiện đang có mốt số lỗi xảy ra trên server. bạn chưa thể thực hiện đăng ký bây giờ. Bạn có thể thửu đăng ký vào thời gian khác."
        );
        res.render("user/signUp", {
          data: {
            message: { error: req.flash("mes") },
            info: req.body
          },
          layout: false
        });
        // req.error = err
        // next()
      });
  }
};

const checkNotExistsUserAccount = (req, res) => {
  let account = req.query.username;
  authBus
    .checkExistsUserAccount(account)
    .then(ret => {
      console.log(ret ? false : true);
      res.json(ret ? false : true);
    })
    .catch(err => {
      console.log(err);
      res.json(false);
    });
};

const renderChangePasswordPage = (req, res) => {
  if (req.user) {
    res.render("user/changePassword", {
      data: {
        user: req.user
      },
      layout: false
    });
  } else {
    res.redirect("/sign-in");
  }
};

const changePassword = (req, res, next) => {
  if (!req.user) {
    res.redirect("/sign-in");
  } else {
    let account = req.user.account;
    let password = req.body.newPwd;
    let confirmPassword = req.body.confirmNewPwd;
    let oldPassword = req.body.oldPwd;

    authBus
      .checkOldPassword(account, oldPassword)
      .then(ret => {
        if (confirmPassword !== password) {
          req.flash("mes", "Mật khẩu mới không khớp");
          res.render("user/changePassword", {
            data: {
              user: req.user,
              ov: req.body,
              message: { error: req.flash("mes") }
            },
            layout: false
          });
        } else {
          authBus
            .changePassword(account, password)
            .then(ret => {
              if (ret) {
                req.flash("mes", "Đổi mật khẩu thành công");
                res.render("user/changePassword", {
                  data: {
                    user: req.user,
                    message: { success: req.flash("mes") }
                  },
                  layout: false
                });
              } else {
                req.flash("mes", "Đổi mật khẩu không thành công");
                res.render("user/changePassword", {
                  data: {
                    user: req.user,
                    ov: info,
                    message: { error: req.flash("mes") }
                  },
                  layout: false
                });
              }
            })
            .catch(err => {
              req.flash(
                "mes",
                "Xảy ra lỗi trên server. Bạn có thể thử lại vào lần sau"
              );
              res.render("user/changePassword", {
                data: {
                  user: req.user,
                  ov: info,
                  message: { error: req.flash("mes") }
                },
                layout: false
              });
            });
        }
      })
      .catch(err => {
        req.flash("mes", "Mật khẩu cũ chưa đúng");
        res.render("user/changePassword", {
          data: {
            user: req.user,
            ov: info,
            message: { error: req.flash("mes") }
          },
          layout: false
        });
      });
  }
};

const renderForgotPasswordPage = (req, res) => {
  res.render("user/forgotPassword", {
    layout: false
  });
};
const renderProfilePage = async (req, res) => {
  if (!req.user) {
    res.redirect("/sign-in");
  } else {
    if (req.user.role === config.USER_ROLES.WRITER) {
      await authBus
        .getPseudonymOfWriter(req.user.account)
        .then(pseudonym => {
          req.user.pseudonym = pseudonym;
        })
        .catch(err => {});
    }
    res.render("user/profile", {
      data: {
        user: req.user
      },
      layout: false
    });
  }
};

const updateProfile = (req, res, next) => {
  if (!req.user) {
    res.redirect("/sign-in");
  } else {
    let user = req.user;
    user.fullname = req.body.fullname;
    user.email = req.body.email;
    user.birthday = moment(req.body.birthday, "DD/MM/YYYY").format(
      "YYYY/MM/DD"
    );
    user.role === config.USER_ROLES.WRITER
      ? (user.pseudonym = req.body.pseudonym)
      : null;
    console.log(moment(req.body.birthday, "DD/MM/YYYY").format("YYYY/MM/DD"));

    authBus
      .updateProfile(user)
      .then(ret => {
        req.flash("mes", "Cập nhật thông tin thành công");
        res.render("user/profile", {
          data: {
            user: user,
            message: { success: req.flash("mes") }
          },
          layout: false
        });
      })
      .catch(err => {
        req.flash("mes", "Hệ thống có sự cố. Bạn hãy thử lại lần sau");
        res.render("user/profile", {
          data: {
            user: user,
            message: { error: req.flash("mes") }
          },
          layout: false
        });
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
const forgotPassword = (req, res) => {
  let email = req.body.emailReset;
  authBus
    .checkExistsEmailInSystem(email)
    .then(ret => {
      if (!ret) {
        req.flash("mes", "Email này không tồn tại trong hệ thống");
        res.render("user/forgotPassword", {
          data: {
            info: req.body,
            message: { error: req.flash("mes") }
          },
          layout: false
        });
      } else {
        token = md5(email);
        authBus
          .saveUserToken(email, token)
          .then(ret => {
            if (ret) {
              const msg = {
                to: email,
                from: "baodientu@example.com",
                subject: "[Báo điện tử] Lấy lại tài khoản",
                text: `<a href="http://localhost:3000/reset-password/${token}"><b>Click here to reset password</b></a>`,
                html: `<a href="http://localhost:3000/reset-password/${token}"><b>Click here to reset password</b></a>`
              };
              sgMail
                .send(msg)
                .then(ret => {
                  req.flash(
                    "mes",
                    "một email khôi phục mật khẩu đã được gửi đến hộp thoại mail của bạn. Hãy kiểm tra hộp thư để tiến hành khôi phục mật khẩu"
                  );
                  res.render("user/forgotPassword", {
                    data: {
                      message: { success: req.flash("mes") }
                    },
                    layout: false
                  });
                })
                .catch(err => {
                  console.log(err);
                  req.flash(
                    "mes",
                    "Hiện tại hệ thống không thể hỗ trợ bạn khôi phục mật khẩu. Bạn có thể thử lại lần sau."
                  );
                  res.render("user/forgotPassword", {
                    data: {
                      info: req.body,
                      message: { error: req.flash("mes") }
                    },
                    layout: false
                  });
                });
            }
          })
          .catch(err => {
            console.log(err);
            req.flash(
              "mes",
              "Hiện tại hệ thống không thể hỗ trợ bạn khôi phục mật khẩu. Bạn có thể thử lại lần sau."
            );
            res.render("user/forgotPassword", {
              data: {
                info: req.body,
                message: { error: req.flash("mes") }
              },
              layout: false
            });
          });
      }
    })
    .catch(err => {
      console.log(err);
      req.flash("mes", "Hệ thống đang gặp sự cố . Bạn có thể thử lại lần sau");
      res.render("user/forgotPassword", {
        data: {
          info: req.body,
          message: { error: req.flash("mes") }
        },
        layout: false
      });
    });
};

const renderResetPasswordPage = (req, res) => {
  authBus
    .checkUserToken(req.params.token)
    .then(ret => {
      if (!ret) {
        req.flash("mes", "Token không tồn tại");
        res.render("user/resetPassword", {
          data: {
            info: req.body,
            message: { error: req.flash("mes") }
          },
          layout: false
        });
      } else {
        res.render("user/resetPassword", {
          data: {
            token: req.params.token
          },
          layout: false
        });
      }
    })
    .catch(err => {
      req.flash("mes", "Hệ thống đang gặp sự cố . Bạn có thể thử lại lần sau");
      res.render("user/resetPassword", {
        data: {
          info: req.body,
          message: { error: req.flash("mes") }
        },
        layout: false
      });
    });
};
const resetPassword = (req, res, next) => {
  let token = req.params.token;
  let password = req.body.newPwd;
  let confirmPassword = req.body.confirmNewPwd;

  authBus
    .checkUserToken(token)
    .then(ret => {
      if (ret) {
        if (password !== confirmPassword) {
          req.flash("mes", "Mật khẩu không khớp");
          res.render("user/resetPassword", {
            data: {
              token: req.params.token,
              info: req.body,
              message: { error: req.flash("mes") }
            },
            layout: false
          });
        } else {
          authBus
            .resetPassword(token, password)
            .then(ret => {
              req.flash("suc", "Khôi phục mật khẩu thành công");
              res.redirect("/sign-in");
            })
            .catch(err => {
              req.flash(
                "mes",
                "Hệ thống đang có sự cố. Bạn có thể  thử lại lần sau"
              );
              res.render("user/resetPassword", {
                data: {
                  token: req.params.token,
                  info: req.body,
                  message: { error: req.flash("mes") }
                },
                layout: false
              });
            });
        }
      } else {
        req.flash("mes", "Token không tồn tại");
        res.render("user/resetPassword", {
          data: {
            token: req.params.token,
            info: req.body,
            message: { error: req.flash("mes") }
          },
          layout: false
        });
      }
    })
    .catch(err => {
      req.flash("mes", "Hệ thống đang có sự cố. Bạn có thể  thử lại lần sau");
      res.render("user/resetPassword", {
        data: {
          token: req.params.token,
          info: req.body,
          message: { error: req.flash("mes") }
        },
        layout: false
      });
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

const checkOldPassword = (req, res) => {
  if (!req.user) {
    res.json(false);
  } else {
    authBus
      .checkOldPassword(req.user.account, req.query.oldPwd)
      .then(ret => {
        res.json(ret);
      })
      .catch(err => {
        res.json(false);
      });
  }
};

const checkNotExistsEmail = (req, res) => {
  let email = req.query.email;
  let originEmail = !req.params.originEmail ? null : req.params.originEmail;

  authBus
    .checkExistsEmailInSystem(email, originEmail)
    .then(ret => {
      res.json(ret ? false : true);
    })
    .catch(err => {
      res.json(false);
    });
};

const updateUserAvatar = (req, res) => {
  authBus
    .updateUserAvatar(req.user)
    .then(ret => {
      res.json({
        error: undefined,
        data: {
          avatar: req.user.avatar
        }
      });
    })
    .catch(err => {
      res.json({
        error: true,
        data: {}
      });
    });
};

module.exports = {
  renderSignInPage,
  signIn,
  signOutGetRequest,
  renderSignUpPage,
  signUp,
  renderChangePasswordPage,
  changePassword,
  renderForgotPasswordPage,
  forgotPassword,
  renderProfilePage,
  updateProfile,
  authFacebookGetRequest,
  authFacebookCallbackGetRequest,
  renderResetPasswordPage,
  resetPassword,
  signInByFacebook,
  signInByFacebookAgain,
  checkNotExistsUserAccount,
  checkOldPassword,
  checkNotExistsEmail,
  updateUserAvatar
};

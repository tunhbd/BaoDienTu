const authBus = require("../../business/authBus");
const config = require("../../config");
const mockData = require("../../mockData");
var passport = require("passport");

const signInGetRequest = (req, res) => {
  let signinedUser = authBus.getSigninedUser(req.cookies.signined_user);

  if (signinedUser !== undefined) {
    if (signinedUser.user_role === config.USER_ROLES.SUBSCRIBER) {
      res.redirect("/");
    } else {
      res.redirect("/dashboard?page_id=GENERAL");
    }
  } else {
    res.render("signIn", {
      oldInfo: { username: "", password: "" },
      layout: false
    });
  }
};

const signInPostRequest = (req, res, next) => {
  // let info = req.body;
  // let exists = false;
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
      return res.render("signIn", { layout: false, message: info.message });
    }

    req.logIn(user, err => {
      if (err) return next(err);

      return res.redirect("/");
    });
  })(req, res, next);
};

const signOutGetRequest = (req, res) => {
  res.clearCookie("signined_user");
  res.redirect("/");
};

const signUpGetRequest = (req, res) => {
  res.render("signUp", { layout: false });
};

const signUpPostRequest = (req, res) => {
  authBus
    .registryUser(req.body)
    .then(result => console.log(result))
    .catch(err => console.log(err.errno));
  res.redirect("/sign-in");
};

const changePasswordGetRequest = (req, res) => {
  let signinedUser = authBus.getSigninedUser(req.cookies.signined_user);

  if (signinedUser === undefined) {
    res.redirect("/sign-in");
  } else {
    res.render("changePassword", { user: signinedUser, layout: false });
  }
};

const changePasswordPostRequest = (req, res) => {
  res.render("changePassword", { layout: false });
};

const forgotPasswordGetRequest = (req, res) => {
  res.render("forgotPassword", { layout: false });
};

const forgotPasswordPostRequest = (req, res) => {
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
  profilePostRequest
};

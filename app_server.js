// const configPaths = require('./configPaths')
// configPaths(__dirname + '/src')
const db = require("./src/app/db");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { engines, middlewares, route, config } = require("./src/app");
const cookieParser = require("cookie-parser");
const path = require("path");
var session = require("express-session");
var passport = require("passport");
var bcrypt = require("bcrypt");
var LocalStrategy = require("passport-local").Strategy;
FacebookStrategy = require("passport-facebook").Strategy;
// Server
const server = express();

// set up
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
// server.use(
//   morgan(function(tokens, req, res) {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, "content-length"),
//       "-",
//       tokens["response-time"](req, res),
//       "ms"
//     ].join(" ");
//   })
// );
server.use(express.static("./src/statics"));
server.use(
  session({
    secret: "session-secret-baodientu"
    // saveUninitialized: true,
    // resave: true
    // cookie: { secure: true }
  })
);
server.use(passport.initialize());
server.use(passport.session());
passport.use(
  new LocalStrategy(function(username, password, done) {
    let q = `SELECT * FROM users WHERE user_account='${username}'`;
    new db.DBConnection()
      .loadRequest(q)
      .then(rows => {
        if (rows.length === 0) {
          return done(null, false, { message: "Invalid username." });
        }

        var user = rows[0];
        var ret = bcrypt.compareSync(password, rows[0].user_password);
        if (ret) {
          return done(null, user);
        }
        return done(null, false, { message: "Invalid password." });
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
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // TODO... SAVE THE INFOMATION OF USER
      done(null, profile);
    }
  )
);

passport.serializeUser(function(user, done) {
  //luu vao session
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  //dem tu session ra
  done(null, user);
});
server.get("/sign-out", function(req, res) {
  req.logout();
  res.redirect("/");
});

server.get("/auth/facebook", passport.authenticate("facebook"));
server.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/sign-in"
  })
);

let viewEngine = engines.getViewEngine();
server.engine(viewEngine.engineName, viewEngine.engine);
server.set("views", path.join(__dirname, "/src/views"));
server.set("view engine", viewEngine.engineName);

middlewares.dashboardMiddleware.registerMiddleware(server);
server.use("/", route);
middlewares.notFoundMiddleware.registerMiddleware(server);
// server.post('/dashboard/create-post', multer(multerConfig).single('avatarImage'), function (req, res) {
//   console.log('body', req.body)
//   res.send('Complete!');
// })

server.listen(process.env.PORT || config.SERVER.PORT, () => {
  console.log("server is running on port ", config.SERVER.PORT);
});

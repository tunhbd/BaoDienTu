const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { engines, middlewares, route, config } = require("./src/app");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
var flash = require("connect-flash");
const passport = require("passport");

// Server
const server = express();

// set up
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(
  session({
    secret: "BAODIENTU2019",
    saveUninitialized: false,
    resave: true,
    cookie: {}
  })
);
server.use(flash());
// server.use(
//   morgan(function (tokens, req, res) {
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
middlewares.passport(server);
require("./src/app/middlewares/sendgrid");

let viewEngine = engines.getViewEngine();
server.engine(viewEngine.engineName, viewEngine.engine);
server.set("views", path.join(__dirname, "/src/views"));
server.set("view engine", viewEngine.engineName);

middlewares.rootMiddleware.registerMiddleware(server);
middlewares.adminMiddleware.registerMiddleware(server);
server.use("/", route);
middlewares.notFoundMiddleware.registerMiddleware(server);

//handle error
server.use(function(err, req, res, next) {
  console.error(err);
  res.status(500).send(err);
});
server.listen(process.env.PORT || config.SERVER.PORT, () => {
  console.log("server is running on port ", config.SERVER.PORT);
});

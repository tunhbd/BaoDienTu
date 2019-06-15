module.exports = {
  config: require('./config'),
  middlewares: require('./middlewares'),
  route: require('./route')(),
  db: require('./db'),
  engines: require('./engines'),
}
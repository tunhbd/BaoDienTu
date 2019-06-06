// const configPaths = require('./configPaths')
// configPaths(__dirname + '/src')

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { engines, middlewares, route, config } = require('./src/app')
const cookieParser = require('cookie-parser');
const path = require('path')



// Server
const server = express()

// set up
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cookieParser())
server.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))
server.use(express.static('./src/statics'))

let viewEngine = engines.getViewEngine()
server.engine(viewEngine.engineName, viewEngine.engine)
server.set('views', path.join(__dirname, '/src/views'));
server.set('view engine', viewEngine.engineName)

middlewares.adminMiddleware.registerMiddleware(server)
server.use('/', route)
middlewares.notFoundMiddleware.registerMiddleware(server)
// server.post('/dashboard/create-post', multer(multerConfig).single('avatarImage'), function (req, res) {
//   console.log('body', req.body)
//   res.send('Complete!');
// })

server.listen(process.env.PORT || config.SERVER.PORT, () => {
  console.log('server is running on port ', config.SERVER.PORT)
})
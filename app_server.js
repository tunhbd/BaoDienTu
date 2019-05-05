const express = require('express')
const bodyParser = require('body-parser')
const app = require('./src/app')
const expressHandlebars = require('express-handlebars')
const cookieParser = require('cookie-parser');
const path = require('path')

// Server
const server = express()

// Express Handlebar Instance
const handlebars = expressHandlebars.create({
  defaultLayout: 'main',
  helpers: {
    opt: function (valA, opt, valB, options) {
      switch (opt) {
        case '==':
          return (valA == valB)
          break;
        case '===':
          return (valA === valB)
          break;
        case '!=':
          return (valA != valB)
          break;
        case '!==':
          return (valA !== valB)
          break;
        case '>':
          return (valA > valB)
          break;
        case '<':
          return (valA < valB)
          break;
        case '>=':
          return (valA >= valB)
          break;
        case '<=':
          return (valA <= valB)
          break;
        case '||':
          return (valA || valB)
          break;
        case '&&':
          return (valA && valB)
          break;
      }
    },
  }
})

// set up

server.use(express.static('./src/statics'))
// server.use(express.static('/assets'))
server.set('views', path.join(__dirname, '/src/views'));
server.engine('handlebars', handlebars.engine)
server.set('view engine', 'handlebars')


// parse serverlication/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))

// parse serverlication/json
server.use(bodyParser.json())
// Cookie Parser
server.use(cookieParser())

server.use('/', app.route)

server.listen(process.env.PORT || app.config.SERVER.PORT, () => {
  console.log('server is running on port ', app.config.SERVER.PORT)
})
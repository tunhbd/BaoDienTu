const expressHandlebars = require('express-handlebars')
const exprHbsSections = require('express-handlebars-sections')
const moment = require('moment')

const getViewEngine = () => {
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
      viDate: function (date) {
        return moment(date).format('DD/MM/YYYY')
      },
      section: exprHbsSections(),
    }
  })

  return {
    engineName: 'handlebars',
    engine: handlebars.engine,
  }
}

module.exports = {
  getViewEngine,
}
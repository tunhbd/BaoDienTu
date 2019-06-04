const expressHandlebars = require('express-handlebars')

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
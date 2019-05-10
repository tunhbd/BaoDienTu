const business = require('../business')

const mockData = require('../mockData')
const config = require('../config')

var Router = require('express').Router()

const renderRoutes = (routesObj, method = null) => {
    for (let key in routesObj) {
        if (typeof routesObj[key] === 'object' && routesObj[key] !== null && !(routesObj[key] instanceof Array)) {
            renderRoutes(routesObj[key], key)
        } else {
            switch (method) {
                case 'get':
                    Router.get(key, routesObj[key])
                    break;
                case 'post':
                    Router.post(key, routesObj[key])
                    break;
                case 'put':
                    Router.put(key, routesObj[key])
                    break;
                case 'delete':
                    Router.delete(key, routesObj[key])
                    break;
            }
        }
    }
}

const route = () => {
    renderRoutes(require('./auth'))
    renderRoutes(require('./homepage'))
    renderRoutes(require('./dashboard'))

    return Router
}


module.exports = route
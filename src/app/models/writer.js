const User = require('./user')

module.exports = class Writer extends User {
  constructor() {
    super()
    this.pseudonym = null
  }
}
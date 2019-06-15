const User = require('./user')

module.exports = class Subscriber extends User {
  constructor() {
    super()
    this.expirationDate = null
  }
}
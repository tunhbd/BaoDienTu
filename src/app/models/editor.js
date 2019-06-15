const User = require('./user')

module.exports = class Editor extends User {
  constructor() {
    super()

    this.assignedCategories = []
  }
}
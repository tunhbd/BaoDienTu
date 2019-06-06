const moment = require('moment')

module.exports = class Category {
  constructor() {
    this.categoryId = ''
    this.categoryName = ''
    this.alias = null
    this.parent = null
    this.createdDate = ''
    this.active = true
  }

  generateId() {
    this.categoryId = `CATEGORY${moment().format('DDMMYYYYhhmmss')}`
  }
}
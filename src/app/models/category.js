const moment = require('moment')
const { convertToAlias } = require('../utils')

module.exports = class Category {
  constructor() {
    this.categoryId = ''
    this.categoryName = ''
    this.alias = null
    this.parent = null
    this.createdDate = ''
    this.active = true
    this.subCategories = []
  }

  generateId() {
    this.categoryId = `CATEGORY${moment().format('DDMMYYYYhhmmss')}`
  }

  generateAlias() {
    this.alias = convertToAlias(this.categoryName)
  }
}
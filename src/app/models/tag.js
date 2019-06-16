const md5 = require('md5')
const { convertToAlias } = require('../utils')

class Tag {
  constructor() {
    this.tagId = ''
    this.tagName = ''
    this.alias = ''
    this.tagActive = true
    this.createdDate = null
  }

  generateId() {
    this.tagId = md5(`@TAG${Date.now()}@`)
  }

  generateAlias() {
    this.alias = convertToAlias(this.tagName)
  }
}

module.exports = Tag
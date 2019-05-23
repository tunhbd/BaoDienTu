class Tag {
  constructor(tagId = '', tagName = '', tagActive = true, createdDate = '') {
    this.tagId = tagId
    this.tagName = tagName
    this.tagActive = tagActive ? 1 : 0
    this.createdDate = createdDate
  }

  get TagId() { return this.tagId }
  set TagId(val) { this.tagId = val }

  get TagName() { return this.tagName }
  set TagName(val) { this.tagName = val }

  get TagActive() { return this.tagActive }
  set TagActive(val) { this.tagActive = val ? 1 : 0 }

  get CreatedDate() { return this.createdDate }
  set CreatedDate(val) { this.createdDate = val }

  toObject() {
    return {
      tagId: this.tagId,
      tagName: this.tagName,
      tagActive: this.tagActive >= 1 ? true : false,
      createdDate: this.createdDate,
    }
  }
}

module.exports = Tag
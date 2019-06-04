class PostTag {
  constructor(postId = '', tagId = '') {
    this.postId = postId
    this.tagId = tagId
  }

  get PostId() { return this.postId }
  set PostId(val) { this.postId = val }

  get TagId() { return this.tagId }
  set TagId(val) { this.tagId = val }
}

module.exports = PostTag
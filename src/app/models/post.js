class PostModel {
  constructor() {
    this.postId = ''
    this.postTitle = ''
    this.author = ''
    this.category = ''
    this.youtubeUrl = ''
    this.postAvatarImage = ''
    this.createdDate = ''
    this.publishedDate = ''
    this.postSummary = ''
    this.postContent = ''
  }

  getPostId() { return this.postId }
  setPostId(value) { this.postId = value }

  getPostTitle() { return this.postTitle }
  setPostTitle(value) { this.postTitle = value }

  getPostSummary() { return this.postSummary }
  setPostSummary(value) { this.postSummary = value }

  getPostContent() { return this.postContent }
  setPostContent(value) { this.postContent = value }

  getPostAvatarImage() { return this.postAvatarImage }
  setPostAvatarImage(value) { this.postAvatarImage = value }

  getAuthor() { return this.author }
  setAuthor(value) { this.author = value }

  getCategory() { return this.category }
  setCategory(value) { this.category = value }

  getYoutubeUrl() { return this.youtubeUrl }
  setYoutubeUrl(value) { this.youtubeUrl = value }

  getCreatedDate() { return this.createdDate }
  setCreatedDate(value) { this.createdDate = value }

  getPublishedDate() { return this.publishedDate }
  setPublishedDate(value) { this.publishedDate = value }
}

module.exports = PostModel
class Post {
  constructor() {
    this.postId = ''
    this.postTitle = ''
    this.alias = ''
    this.author = null
    this.category = null
    this.tags = null
    this.youtubeUrl = null
    this.postAvatarImage = ''
    this.postSummary = ''
    this.postContent = ''
    this.createdDate = ''
    this.publishedDate = null
    this.checked = false
    this.reasonReject = null
    this.premium = false
    this.browseUser = null
  }

  get PostId() { return this.postId }
  set PostId(value) { this.postId = value }

  get PostTitle() { return this.postTitle }
  set PostTitle(value) { this.postTitle = value }

  get PostSummary() { return this.postSummary }
  set PostSummary(value) { this.postSummary = value }

  get PostContent() { return this.postContent }
  set PostContent(value) { this.postContent = value }

  get PostAvatarImage() { return this.postAvatarImage }
  set PostAvatarImage(value) { this.postAvatarImage = value }

  get Author() { return this.author }
  set Author(value) { this.author = value }

  get Category() { return this.category }
  set Category(value) { this.category = value }

  get Tags() { return this.tags }
  set Tags(value) { this.tags = value }

  get YoutubeUrl() { return this.youtubeUrl }
  set YoutubeUrl(value) { this.youtubeUrl = value }

  get CreatedDate() { return this.createdDate }
  set CreatedDate(value) { this.createdDate = value }

  get PublishedDate() { return this.publishedDate }
  set PublishedDate(value) { this.publishedDate = value }
}

module.exports = Post
class Post {
  constructor(
    postId = '',
    postTitle = '',
    author = {
      account: '',
      fullname: '',
      pseudonym: ''
    },
    category = {
      categoryId: '',
      categoryName: ''
    },
    tags = [],
    youtubeUrl = '',
    postAvatarImage = '',
    postSummary = '',
    postContent = '',
    createdDate = '',
    publishedDate = ''
  ) {
    this.postId = postId
    this.postTitle = postTitle
    this.author = author
    this.category = category
    this.tags = tags
    this.youtubeUrl = youtubeUrl
    this.postAvatarImage = postAvatarImage
    this.postSummary = postSummary
    this.postContent = postContent
    this.createdDate = createdDate
    this.publishedDate = publishedDate
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
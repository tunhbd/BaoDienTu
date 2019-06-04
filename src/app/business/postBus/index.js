const { Post } = require('../../models')
const { DBConnection } = require('../../db')

const createPost = post => new Promise(async (resolve, reject) => {
  let query =
    `INSERT INTO 
    posts(post_id, post_title, post_avatar_image, category, youtube_url, author, post_summary, post_content)
    VALUES('${post.postId}','${post.postTitle}','${post.postAvatarImage}','${post.category.categoryId}','${post.youtubeUrl}','${post.author.account}','${post.postSummary}','${post.postContent}')`
  let dbConnect = new DBConnection()
  let ret = await dbConnect.insertRequest(query)

  if (ret) {
    resolve(post)
  }
  else {
    reject(err)
  }
})

module.exports = {
  createPost,
}
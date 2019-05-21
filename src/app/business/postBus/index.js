const { Post } = require('../../models')
const { DBConnection } = require('../../db')

const createPost = post => {
  let query =
    `INSERT INTO 
    posts(post_id, post_title, post_avatar_image, category, youtube_url, author, post_summary, post_content)
    VALUES('${post.postId}','${post.postTitle}','${post.postAvatarImage}','${post.category}','${post.youtubeUrl}','${post.author}','${post.postSummary}','${post.postContent}')`

  return (new DBConnection()).insertRequest(query)
}
module.exports = {
  createPost,
}
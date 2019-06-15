const { DBConnection } = require('../../db')

const deleteCommentByPostId = postId => new Promise(async (resolve, reject) => {
  let query = `DELETE FROM comments WHERE post_id='${postId}'`
  let dbConn = new DBConnection()

  await dbConn
    .deleteRequest(query)
    .then(ret => {
      resolve(ret)
    })
    .catch(err => {
      reject(err)
    })
})

module.exports = {
  deleteCommentByPostId,
}
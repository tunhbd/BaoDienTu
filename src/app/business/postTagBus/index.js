const tagBus = require('../tagBus')
const { Tag } = require('../../models')
const { DBConnection } = require('../../db')

const createPostTag = (postTag) => new Promise(async (resolve, reject) => {
  let query = `INSERT INTO post_tags(post_id, tag_id) VALUES('${postTag.PostId}','${postTag.TagId}')`
  let dbConnect = new DBConnection()
  await dbConnect
    .insertRequest(query)
    .then(status => {
      resolve(postTag)
    })
    .catch(err => {
      reject(err)
    })
})

const deleteOldPostTagsOfPost = (postId, tagIds) => new Promise(async (resolve, reject) => {
  let query = `DELETE FROM post_tags WHERE post_id='${postId}' AND tag_id NOT IN (${tagIds.map(tId => `'${tId}'`).join(',')})`
  console.log('query', query)
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
  createPostTag,
  deleteOldPostTagsOfPost,
}
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

module.exports = {
  createPostTag,
}
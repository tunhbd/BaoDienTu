const { DBConnection } = require('../../db')
const { Tag } = require('../../models')
const md5 = require('md5')
const moment = require('moment')

const generateNewTagId = () => {
  return md5(`TAG${Date.now()}@BDT`)
}

const getFullInfoTags = () => new Promise((resolve, reject) => {
  let queryString = `SELECT * FROM tags`
  let DBConnect = new DBConnection()

  DBConnect
    .loadRequest(queryString)
    .then(ret => {
      let tags = []

      ret.forEach(tag => {
        tags.push((new Tag(tag.tag_id, tag.tag_name, tag.tag_active, tag.created_date)).toObject())
      });

      resolve(tags)
    })
    .catch(err => {
      reject(err)
    })
})

const getLessInfoTags = () => new Promise(async (resolve, reject) => {
  let query = 'SELECT tag_id, tag_name FROM tags'
  let dbConn = new DBConnection()

  dbConn
    .loadRequest(query)
    .then(rets => {
      let tags = []

      rets.forEach(ret => {
        let tag = new Tag()
        tag.tagId = ret.tag_id
        tag.tagName = ret.tag_name
        tags.push(tag)
      })

      resolve(tags)
    })
    .catch(err => {
      reject(err)
    })
})

const hasTag = async tagId => {
  let query = `SELECT tag_id FROM tags WHERE tag_id='${tagId}'`
  let dbConnect = new DBConnection()

  let result = 0
  await dbConnect.loadRequest(query).then(ret => result = ret)

  return result.length > 0
}

const createTag = (tag) => new Promise(async (resolve, reject) => {
  // let createdDate = moment().format('YYYY/MM/DD')
  // tag.CreatedDate = createdDate
  tag.TagId = generateNewTagId()

  let queryString = `INSERT INTO tags(tag_id, tag_name, tag_alias) VALUES('${tag.TagId}', N'${tag.TagName}', '${tag.alias}')`

  let DBConnect = new DBConnection()

  DBConnect
    .insertRequest(queryString)
    .then(ret => {
      resolve(ret ? tag : {})
    })
    .catch(err => {
      reject(err)
    })
})

module.exports = {
  getFullInfoTags,
  createTag,
  getLessInfoTags,
  hasTag,
}
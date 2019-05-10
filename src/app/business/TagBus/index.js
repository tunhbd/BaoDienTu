const db = require('../../db')
const md5 = require('md5')

const generateNewTagId = (date) => {
    return md5(`TAG${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getTime()}`)
}

const loadAllTags = () => {
    let queryString = `SELECT * FROM tags`
    let DBConnect = new db.DBConnection()

    return DBConnect.loadRequest(queryString)
}

const addNewtag = (tagInfo) => {
        let currentDate = new Date()
        let createdDate = `${currentDate.getFullYear()}/${currentDate.getMonth() < 9 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1}/${currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate()}`

    let queryString = `INSERT INTO(tag_id, tag_name, tag_active, created_date) tags VALUES('${generateNewTagId(currentDate)}', '${tagInfo.tag_name}', ${tagInfo.tag_active}, '${createdDate}')`
  
    let DBConnect = new db.DBConnection()

    return DBConnect.insertRequest(queryString)
}

module.exports = {
  loadAllTags,
  addNewtag,
}
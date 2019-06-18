const { DBConnection } = require("../../db");
const { Tag } = require("../../models");
const postTagBus = require("../postTagBus");
const md5 = require("md5");
const moment = require("moment");
const { LIMIT_TAGS } = require("../../config");

const getFullInfoTags = () =>
  new Promise((resolve, reject) => {
    let queryString = `SELECT * FROM tags`;
    let DBConnect = new DBConnection();

    DBConnect.loadRequest(queryString)
      .then(ret => {
        let tags = [];

        ret.forEach(tag => {
          tags.push(
            new Tag(tag.tag_id, tag.tag_name, tag.tag_active, tag.created_date)
          );
        });

        resolve(tags);
      })
      .catch(err => {
        reject(err);
      });
  });

const getFullInfoTagsFilterBy = pageNum =>
  new Promise((resolve, reject) => {
    let queryString = `SELECT * FROM tags LIMIT ${(pageNum - 1) *
      LIMIT_TAGS}, ${LIMIT_TAGS}`;
    let DBConnect = new DBConnection();

    DBConnect.loadRequest(queryString)
      .then(rets => {
        let tags = rets.map(ret => {
          let t = new Tag();

          t.tagId = ret.tag_id;
          t.tagName = ret.tag_name;
          t.tagActive = ret.tag_active === 1 ? true : false;
          t.createdDate = ret.created_date;

          return t;
        });

        resolve(tags);
      })
      .catch(err => {
        reject(err);
      });
  });

const getLessInfoTags = () =>
  new Promise(async (resolve, reject) => {
    let query = "SELECT tag_id, tag_name FROM tags";
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(rets => {
        let tags = [];

        rets.forEach(ret => {
          let tag = new Tag();
          tag.tagId = ret.tag_id;
          tag.tagName = ret.tag_name;
          tags.push(tag);
        });

        resolve(tags);
      })
      .catch(err => {
        reject(err);
      });
  });

const hasTag = async tagId => {
  let query = `SELECT tag_id FROM tags WHERE tag_id='${tagId}'`;
  let dbConnect = new DBConnection();

  let result = 0;
  await dbConnect.loadRequest(query).then(ret => (result = ret));

  return result.length > 0;
};

const createTag = tag =>
  new Promise(async (resolve, reject) => {
    tag.generateId();
    tag.generateAlias();

    let queryString = `INSERT INTO tags(tag_id, tag_name, tag_alias) VALUES('${
      tag.tagId
    }', N'${tag.tagName}', '${tag.alias}')`;

    let DBConnect = new DBConnection();

    DBConnect.insertRequest(queryString)
      .then(ret => {
        resolve(ret ? tag : {});
      })
      .catch(err => {
        reject(err);
      });
  });

const updateTag = tag =>
  new Promise(async (resolve, reject) => {
    tag.generateAlias();

    let queryString = `UPDATE tags SET tag_name='${tag.tagName}', tag_alias='${
      tag.alias
    }' WHERE tag_id='${tag.tagId}'`;

    let DBConnect = new DBConnection();

    DBConnect.updateRequest(queryString)
      .then(ret => {
        resolve(ret ? tag : {});
      })
      .catch(err => {
        reject(err);
      });
  });

const deleteTags = tagIds =>
  new Promise((resolve, reject) => {
    postTagBus
      .deletePostTagsByTagIds(tagIds)
      .then(ret => {
        let query = `DELETE FROM tags WHERE tag_id IN (${tagIds
          .map(id => `'${id}'`)
          .join(",")})`;
        let dbConn = new DBConnection();
        dbConn.deleteRequest(query).then(ret => {
          if (ret) {
            resolve(tagIds);
          } else {
            resolve([]);
          }
        });
      })
      .catch(err => {
        reject(err);
      });
  });

const getCountTags = () =>
  new Promise((resolve, reject) => {
    let query = `SELECT COUNT(*) count FROM tags`;
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(rets => {
        resolve(rets[0].count);
      })
      .catch(err => {
        reject(err);
      });
  });

module.exports = {
  getFullInfoTags,
  getFullInfoTagsFilterBy,
  createTag,
  updateTag,
  deleteTags,
  getLessInfoTags,
  hasTag,
  getCountTags
};

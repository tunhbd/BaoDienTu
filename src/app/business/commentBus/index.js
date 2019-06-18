const { DBConnection } = require("../../db");
const ur = require("unique-random");
const moment = require("moment");

const deleteCommentByPostId = postId =>
  new Promise(async (resolve, reject) => {
    let query = `DELETE FROM comments WHERE post_id='${postId}'`;
    let dbConn = new DBConnection();

    await dbConn
      .deleteRequest(query)
      .then(ret => {
        resolve(ret);
      })
      .catch(err => {
        reject(err);
      });
  });

const addComment = data =>
  new Promise(async (resolve, reject) => {
    let query = `insert into comments values (${ur(0, 999)()}, ${
      data.post_id
    }, '${data.user}', '${moment(new Date()).format("YYYY/MM/DD")}' ,'${
      data.content
    }')`;
    let dbConn = new DBConnection();
    console.log(query);
    await dbConn
      .loadRequest(query)
      .then(ret => {
        resolve(ret);
      })
      .catch(err => {
        reject(err);
      });
  });

const loadComment = post_id =>
  new Promise(async (resolve, reject) => {
    let query = `select * from comments join users on users.user_account = comments.user_account join posts on comments.post_id = posts.post_id where posts.post_alias = '${post_id}' limit 10;`;
    let dbConn = new DBConnection();
    console.log(query);
    await dbConn
      .loadRequest(query)
      .then(ret => {
        resolve(ret);
      })
      .catch(err => {
        reject(err);
      });
  });

module.exports = {
  deleteCommentByPostId,
  addComment,
  loadComment
};

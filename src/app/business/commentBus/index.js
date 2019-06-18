const { DBConnection } = require("../../db");
const { Comment, User } = require('../../models')
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
    let query =
      `SELECT cm.comment_id, cm.comment_date, cm.comment_content, u.user_account, u.user_fullname 
      FROM
        comments cm JOIN users u ON u.user_account = cm.user_account
      WHERE cm.post_id = '${post_id}' limit 0, 20;`
    let dbConn = new DBConnection();

    await dbConn
      .loadRequest(query)
      .then(rets => {
        let comments = rets.map(ret => {
          let cm = new Comment()

          cm.commentId = ret.comment_id
          cm.commentContent = ret.comment_content
          cm.commentDate = ret.comment_date
          cm.postId = ret.post_id

          let user = new User()
          user.account = ret.user_account
          user.fullname = ret.user_fullname
          cm.user = user

          return cm
        })

        resolve(comments)
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

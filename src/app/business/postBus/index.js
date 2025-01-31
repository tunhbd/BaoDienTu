const { Post, Category, User, Writer, Tag } = require("../../models");
const { DBConnection } = require("../../db");
const { convertToAlias, formatValidSqlStringSyntax } = require("../../utils");
const {
  FILTER,
  USER_ROLES,
  LIMIT_HIGHLIGHT_POSTS,
  LIMIT_MUCH_VIEW_POSTS
} = require("../../config");
const commentBus = require("../commentBus");
const postTagBus = require("../postTagBus");
const categoryBus = require('../categoryBus')
const tagBus = require('../tagBus')
const postBus = require('../postBus')
const fs = require("fs");
const path = require("path");
const moment = require('moment')

const createPost = post =>
  new Promise(async (resolve, reject) => {
    let query = `INSERT INTO 
    posts(post_id, post_title, post_alias, post_avatar_image, category, youtube_url, author, post_summary, post_content, premium)
    VALUES(
      '${post.postId}',
      '${formatValidSqlStringSyntax(post.postTitle)}',
      '${post.alias}',
      '${post.postAvatarImage}',
      '${post.category.categoryId}',
      ${post.youtubeUrl === null ? null : `'${post.youtubeUrl}'`},
      '${post.author.account}',
      '${formatValidSqlStringSyntax(post.postSummary)}',
      '${formatValidSqlStringSyntax(post.postContent)}',
      ${post.premium ? 1 : 0})`;

    let dbConnect = new DBConnection();
    let ret = await dbConnect.insertRequest(query);

    if (ret) {
      resolve(post);
    } else {
      reject(err);
    }
  });

const getDraftPostsFilterBy = (pageNum, categoryAlias, filterId, limit, user) =>
  new Promise(async (resolve, reject) => {
    let query = `SELECT p.post_id, p.post_title, p.post_alias, p.created_date, p.published_date, p.premium,
      c.category_id, c.category_name, c.category_alias,
      u.user_account, u.user_fullname, w.pseudonym
    FROM
      posts p JOIN categories c ON p.category = c.category_id
      JOIN users u ON p.author = u.user_account
      JOIN writers w ON w.user_account = u.user_account
      LEFT JOIN categories cp ON cp.category_id = c.parent_category
      ${
      user.role === USER_ROLES.EDITOR
        ? `JOIN assigned_categories ac ON ac.category_id = c.category_id OR ac.category_id=c.parent_category`
        : ""
      }
    WHERE
      p.checked = 0
      ${
      user.role === USER_ROLES.EDITOR
        ? ` AND ac.user_account='${user.account}' `
        : ""
      }
      ${
      user.role === USER_ROLES.WRITER ? `AND p.author='${user.account}' ` : ""
      }
      ${
      categoryAlias != "ALL"
        ? ` AND (c.category_alias = '${categoryAlias}' OR cp.category_alias='${categoryAlias}')`
        : ""
      }
      ${
      filterId === FILTER.INCREASE_CREATED_DATE
        ? "ORDER BY p.created_date ASC"
        : filterId === FILTER.DECREASE_CREATED_DATE
          ? "ORDER BY p.created_date DESC"
          : filterId === FILTER.INCREASE_PUBLISHED_DATE
            ? "ORDER BY p.published_date ASC"
            : "ORDER BY p.published_date DESC"
      }
      LIMIT ${(pageNum - 1) * limit}, ${limit} `;

    let dbConn = new DBConnection();
    await dbConn
      .loadRequest(query)
      .then(rets => {
        console.log("rets", rets.length);
        let posts = rets.map(ret => {
          let post = new Post();
          post.postId = ret.post_id;
          post.postTitle = ret.post_title;
          post.alias = ret.post_alias;
          post.createdDate = ret.created_date;
          post.publishedDate = ret.published_date;
          post.premium = ret.premium === 1 ? true : false;

          let category = new Category();
          category.categoryId = ret.category_id;
          category.alias = ret.category_alias;
          category.categoryName = ret.category_name;
          post.category = category;

          let author = new Writer();
          author.account = ret.user_account;
          author.fullname = ret.user_fullname;
          author.pseudonym = ret.pseudonym;
          post.author = author;

          return post;
        });

        resolve(posts);
      })
      .catch(err => {
        reject(err);
      });
  });

const getCountDraftPostsFilterBy = (pageNum, categoryAlias, filterId, user) =>
  new Promise(async (resolve, reject) => {
    let query = `SELECT COUNT(*) count
    FROM
      posts p JOIN categories c ON p.category = c.category_id
      JOIN users u ON p.author = u.user_account
      JOIN writers w ON w.user_account = u.user_account
      LEFT JOIN categories cp ON cp.category_id = c.parent_category
    ${
      user.role === USER_ROLES.EDITOR
        ? `JOIN assigned_categories ac ON ac.category_id = c.category_id OR ac.category_id=c.parent_category`
        : ""
      }
    WHERE
      p.checked=0
      ${
      user.role === USER_ROLES.EDITOR
        ? ` AND ac.user_account='${user.account}' `
        : ""
      }
      ${
      user.role === USER_ROLES.WRITER ? `AND p.author='${user.account}' ` : ""
      }
      ${
      categoryAlias != "ALL"
        ? `AND (c.category_alias = '${categoryAlias}' OR cp.category_alias='${categoryAlias}')`
        : ""
      }
    ${
      filterId === FILTER.INCREASE_CREATED_DATE
        ? "ORDER BY p.created_date ASC"
        : filterId === FILTER.DECREASE_CREATED_DATE
          ? "ORDER BY p.created_date DESC"
          : filterId === FILTER.INCREASE_PUBLISHED_DATE
            ? "ORDER BY p.published_date ASC"
            : "ORDER BY p.published_date DESC"
      } `;

    let dbConn = new DBConnection();
    await dbConn
      .loadRequest(query)
      .then(rets => {
        resolve(rets[0].count);
      })
      .catch(err => {
        reject(err);
      });
  });

const getRejectPostsFilterBy = (
  pageNum,
  categoryAlias,
  filterId,
  limit,
  user
) =>
  new Promise(async (resolve, reject) => {
    let query = `SELECT p.post_id, p.post_title, p.post_alias, p.created_date, p.published_date, p.premium,
        c.category_id, c.category_name, c.category_alias,
        u.user_account, u.user_fullname, w.pseudonym
      FROM
        posts p JOIN categories c ON p.category = c.category_id
        JOIN users u ON p.author = u.user_account
        JOIN writers w ON w.user_account = u.user_account
        LEFT JOIN categories cp ON cp.category_id = c.parent_category
        ${
      user.role === USER_ROLES.EDITOR
        ? `JOIN assigned_categories ac ON ac.category_id = c.category_id OR ac.category_id=c.parent_category`
        : ""
      }
      WHERE
      p.checked=1
      AND p.published_date IS NULL
      ${
      user.role === USER_ROLES.EDITOR
        ? ` AND ac.user_account='${user.account}' AND p.browse_user='${
        user.account
        }' `
        : ""
      }
      ${
      user.role === USER_ROLES.WRITER
        ? ` AND p.author='${user.account}' `
        : ""
      }
      ${
      categoryAlias != "ALL"
        ? `AND (c.category_alias = '${categoryAlias}' OR cp.category_alias='${categoryAlias}')`
        : ""
      }
      ${
      filterId === FILTER.INCREASE_CREATED_DATE
        ? "ORDER BY p.created_date ASC"
        : filterId === FILTER.DECREASE_CREATED_DATE
          ? "ORDER BY p.created_date DESC"
          : filterId === FILTER.INCREASE_PUBLISHED_DATE
            ? "ORDER BY p.published_date ASC"
            : "ORDER BY p.published_date DESC"
      }
      LIMIT ${(pageNum - 1) * limit}, ${limit} `;

    let dbConn = new DBConnection();
    await dbConn
      .loadRequest(query)
      .then(rets => {
        let posts = rets.map(ret => {
          let post = new Post();
          post.postId = ret.post_id;
          post.postTitle = ret.post_title;
          post.alias = ret.post_alias;
          post.createdDate = ret.created_date;
          post.publishedDate = ret.published_date;
          post.premium = ret.premium === 1 ? true : false;

          let category = new Category();
          category.categoryId = ret.category_id;
          category.alias = ret.category_alias;
          category.categoryName = ret.category_name;
          post.category = category;

          let author = new Writer();
          author.account = ret.user_account;
          author.fullname = ret.user_fullname;
          author.pseudonym = ret.pseudonym;
          post.author = author;

          return post;
        });

        resolve(posts);
      })
      .catch(err => {
        reject(err);
      });
  });

const getCountRejectPostsFilterBy = (pageNum, categoryAlias, filterId, user) =>
  new Promise(async (resolve, reject) => {
    let query = `SELECT COUNT(*) count
    FROM
      posts p JOIN categories c ON p.category = c.category_id
      JOIN users u ON p.author = u.user_account
      JOIN writers w ON w.user_account = u.user_account
      LEFT JOIN categories cp ON cp.category_id = c.parent_category
    ${
      user.role === USER_ROLES.EDITOR
        ? `JOIN assigned_categories ac ON ac.category_id = c.category_id OR ac.category_id=c.parent_category`
        : ""
      }
    WHERE
      p.checked=1
      AND p.published_date IS NULL
      ${
      user.role === USER_ROLES.EDITOR
        ? ` AND ac.user_account='${user.account}' AND p.browse_user='${
        user.account
        }' `
        : ""
      }
      ${
      user.role === USER_ROLES.WRITER
        ? ` AND p.author='${user.account}' `
        : ""
      }
      ${
      categoryAlias != "ALL"
        ? `AND (c.category_alias = '${categoryAlias}' OR cp.category_alias='${categoryAlias}')`
        : ""
      }
    ${
      filterId === FILTER.INCREASE_CREATED_DATE
        ? "ORDER BY p.created_date ASC"
        : filterId === FILTER.DECREASE_CREATED_DATE
          ? "ORDER BY p.created_date DESC"
          : filterId === FILTER.INCREASE_PUBLISHED_DATE
            ? "ORDER BY p.published_date ASC"
            : "ORDER BY p.published_date DESC"
      } `;

    let dbConn = new DBConnection();
    await dbConn
      .loadRequest(query)
      .then(rets => {
        resolve(rets[0].count);
      })
      .catch(err => {
        reject(err);
      });
  });

const getPublishedPostsFilterBy = (
  pageNum,
  categoryAlias,
  filterId,
  limit,
  user
) =>
  new Promise(async (resolve, reject) => {
    let query = `SELECT p.post_id, p.post_title, p.post_alias, p.created_date, p.published_date, p.premium,
      c.category_id, c.category_name, c.category_alias,
      u.user_account, u.user_fullname, w.pseudonym
    FROM
      posts p JOIN categories c ON p.category = c.category_id
      JOIN users u ON p.author = u.user_account
      JOIN writers w ON w.user_account = u.user_account
      LEFT JOIN categories cp ON cp.category_id = c.parent_category
    ${
      user.role === USER_ROLES.EDITOR
        ? `JOIN assigned_categories ac ON ac.category_id = c.category_id OR ac.category_id=c.parent_category`
        : ""
      }
    WHERE
      p.checked=1
      AND p.published_date IS NOT NULL
      AND DATEDIFF(NOW(), p.published_date) >= 0
      ${
      user.role === USER_ROLES.EDITOR
        ? ` AND ac.user_account='${user.account}' AND p.browse_user='${
        user.account
        }' `
        : ""
      }
      ${
      user.role === USER_ROLES.WRITER
        ? ` AND p.author='${user.account}' `
        : ""
      }
      ${
      categoryAlias != "ALL"
        ? `AND (c.category_alias = '${categoryAlias}' OR cp.category_alias='${categoryAlias}')`
        : ""
      }
    ${
      filterId === FILTER.INCREASE_CREATED_DATE
        ? "ORDER BY p.created_date ASC"
        : filterId === FILTER.DECREASE_CREATED_DATE
          ? "ORDER BY p.created_date DESC"
          : filterId === FILTER.INCREASE_PUBLISHED_DATE
            ? "ORDER BY p.published_date ASC"
            : "ORDER BY p.published_date DESC"
      }
    LIMIT ${(pageNum - 1) * limit}, ${limit} `;

    let dbConn = new DBConnection();
    await dbConn
      .loadRequest(query)
      .then(rets => {
        let posts = rets.map(ret => {
          let post = new Post();
          post.postId = ret.post_id;
          post.postTitle = ret.post_title;
          post.alias = ret.post_alias;
          post.createdDate = ret.created_date;
          post.publishedDate = ret.published_date;
          post.premium = ret.premium === 1 ? true : false;

          let category = new Category();
          category.categoryId = ret.category_id;
          category.alias = ret.category_alias;
          category.categoryName = ret.category_name;
          post.category = category;

          let author = new Writer();
          author.account = ret.user_account;
          author.fullname = ret.user_fullname;
          author.pseudonym = ret.pseudonym;
          post.author = author;

          return post;
        });

        resolve(posts);
      })
      .catch(err => {
        reject(err);
      });
  });

const getCountPublishedPostsFilterBy = (
  pageNum,
  categoryAlias,
  filterId,
  user
) =>
  new Promise(async (resolve, reject) => {
    let query = `SELECT COUNT(*) count
    FROM
      posts p JOIN categories c ON p.category = c.category_id
      JOIN users u ON p.author = u.user_account
      JOIN writers w ON w.user_account = u.user_account
      LEFT JOIN categories cp ON cp.category_id = c.parent_category
    ${
      user.role === USER_ROLES.EDITOR
        ? `JOIN assigned_categories ac ON ac.category_id = c.category_id OR ac.category_id=c.parent_category`
        : ""
      }
    WHERE
      p.checked=1
      AND p.published_date IS NOT NULL
      AND DATEDIFF(NOW(), p.published_date) >= 0
      ${
      user.role === USER_ROLES.EDITOR
        ? ` AND ac.user_account='${user.account}' AND p.browse_user='${
        user.account
        }' `
        : ""
      }
      ${
      user.role === USER_ROLES.WRITER
        ? ` AND p.author='${user.account}' `
        : ""
      }
      ${
      categoryAlias != "ALL"
        ? `AND (c.category_alias = '${categoryAlias}' OR cp.category_alias='${categoryAlias}')`
        : ""
      }
    ${
      filterId === FILTER.INCREASE_CREATED_DATE
        ? "ORDER BY p.created_date ASC"
        : filterId === FILTER.DECREASE_CREATED_DATE
          ? "ORDER BY p.created_date DESC"
          : filterId === FILTER.INCREASE_PUBLISHED_DATE
            ? "ORDER BY p.published_date ASC"
            : "ORDER BY p.published_date DESC"
      } `;

    let dbConn = new DBConnection();
    await dbConn
      .loadRequest(query)
      .then(rets => {
        resolve(rets[0].count);
      })
      .catch(err => {
        reject(err);
      });
  });

const getWaitingPostsFilterBy = (
  pageNum,
  categoryAlias,
  filterId,
  limit,
  user
) =>
  new Promise(async (resolve, reject) => {
    let query = `SELECT p.post_id, p.post_title, p.post_alias, p.created_date, p.published_date, p.premium,
      c.category_id, c.category_name, c.category_alias,
      u.user_account, u.user_fullname, w.pseudonym
    FROM
      posts p JOIN categories c ON p.category = c.category_id
      JOIN users u ON p.author = u.user_account
      JOIN writers w ON w.user_account = u.user_account
      LEFT JOIN categories cp ON cp.category_id = c.parent_category
    ${
      user.role === USER_ROLES.EDITOR
        ? `JOIN assigned_categories ac ON ac.category_id = c.category_id OR ac.category_id=c.parent_category`
        : ""
      }
    WHERE
      p.checked=1
      AND p.published_date IS NOT NULL
      AND DATEDIFF(NOW(), p.published_date) < 0
      ${
      user.role === USER_ROLES.EDITOR
        ? ` AND ac.user_account='${user.account}' AND p.browse_user='${
        user.account
        }' `
        : ""
      }
      ${
      user.role === USER_ROLES.WRITER
        ? ` AND p.author='${user.account}' `
        : ""
      }
      ${
      categoryAlias != "ALL"
        ? `AND (c.category_alias = '${categoryAlias}' OR cp.category_alias='${categoryAlias}')`
        : ""
      }
    ${
      filterId === FILTER.INCREASE_CREATED_DATE
        ? "ORDER BY p.created_date ASC"
        : filterId === FILTER.DECREASE_CREATED_DATE
          ? "ORDER BY p.created_date DESC"
          : filterId === FILTER.INCREASE_PUBLISHED_DATE
            ? "ORDER BY p.published_date ASC"
            : "ORDER BY p.published_date DESC"
      }
    LIMIT ${(pageNum - 1) * limit}, ${limit} `;

    let dbConn = new DBConnection();
    await dbConn
      .loadRequest(query)
      .then(rets => {
        let posts = rets.map(ret => {
          let post = new Post();
          post.postId = ret.post_id;
          post.postTitle = ret.post_title;
          post.alias = ret.post_alias;
          post.createdDate = ret.created_date;
          post.publishedDate = ret.published_date;
          post.premium = ret.premium === 1 ? true : false;

          let category = new Category();
          category.categoryId = ret.category_id;
          category.alias = ret.category_alias;
          category.categoryName = ret.category_name;
          post.category = category;

          let author = new Writer();
          author.account = ret.user_account;
          author.fullname = ret.user_fullname;
          author.pseudonym = ret.pseudonym;
          post.author = author;

          return post;
        });

        resolve(posts);
      })
      .catch(err => {
        reject(err);
      });
  });

const getCountWaitingPostsFilterBy = (pageNum, categoryAlias, filterId, user) =>
  new Promise(async (resolve, reject) => {
    let query = `SELECT COUNT(*) count
    FROM
      posts p JOIN categories c ON p.category = c.category_id
      JOIN users u ON p.author = u.user_account
      JOIN writers w ON w.user_account = u.user_account
      LEFT JOIN categories cp ON cp.category_id = c.parent_category
    ${
      user.role === USER_ROLES.EDITOR
        ? `JOIN assigned_categories ac ON ac.category_id = c.category_id OR ac.category_id=c.parent_category`
        : ""
      }
    WHERE
      p.checked=1
      AND DATEDIFF(NOW(), p.published_date) < 0
      AND p.published_date IS NOT NULL
      ${
      user.role === USER_ROLES.EDITOR
        ? ` AND ac.user_account='${user.account}' AND p.browse_user='${
        user.account
        }' `
        : ""
      }
      ${
      user.role === USER_ROLES.WRITER
        ? ` AND p.author='${user.account}' `
        : ""
      }
      ${
      categoryAlias != "ALL"
        ? `AND (c.category_alias = '${categoryAlias}' OR cp.category_alias='${categoryAlias}')`
        : ""
      }
    ${
      filterId === FILTER.INCREASE_CREATED_DATE
        ? "ORDER BY p.created_date ASC"
        : filterId === FILTER.DECREASE_CREATED_DATE
          ? "ORDER BY p.created_date DESC"
          : filterId === FILTER.INCREASE_PUBLISHED_DATE
            ? "ORDER BY p.published_date ASC"
            : "ORDER BY p.published_date DESC"
      } `;

    let dbConn = new DBConnection();
    await dbConn
      .loadRequest(query)
      .then(rets => {
        resolve(rets[0].count);
      })
      .catch(err => {
        reject(err);
      });
  });

const getOneByAlias = alias =>
  new Promise(async (resolve, reject) => {
    let query = `SELECT
      p.post_id, p.post_title, p.post_summary, p.post_avatar_image, p.youtube_url, p.post_content, p.created_date, p.published_date, p.checked, p.reason_reject, p.premium, p.browse_user,
      c.category_id, c.category_name, c.category_alias,
      u.user_account, u.user_fullname, u.user_avatar,
      w.pseudonym,
      bu.user_account bu_account, bu.user_fullname bu_fullname
    FROM
      posts p JOIN categories c ON p.category = c.category_id
      JOIN users u ON p.author = u.user_account
      JOIN writers w ON u.user_account = w.user_account
      LEFT JOIN users bu ON bu.user_account = p.browse_user
    WHERE p.post_alias = '${alias}'`;

    let dbConn = new DBConnection();

    await dbConn
      .loadRequest(query)
      .then(async rets => {
        let post = new Post();

        if (rets.length > 0) {
          post.postId = rets[0].post_id;
          post.postTitle = rets[0].post_title;
          post.postAvatarImage = rets[0].post_avatar_image;
          post.postSummary = rets[0].post_summary;
          post.postContent = rets[0].post_content;
          post.alias = alias;
          post.youtubeUrl = rets[0].youtube_url;
          post.createdDate = rets[0].created_date;
          post.publishedDate = rets[0].published_date;
          post.checked = rets[0].checked > 0 ? true : false;
          post.reasonReject = rets[0].reason_reject;
          post.premium = rets[0].premium === 1 ? true : false;

          let category = new Category();
          category.categoryId = rets[0].category_id;
          category.categoryName = rets[0].category_name;
          category.alias = rets[0].category_alias;
          post.category = category;

          let author = new Writer();
          author.account = rets[0].user_account;
          author.fullname = rets[0].user_fullname;
          author.pseudonym = rets[0].pseudonym;
          author.avatar = rets[0].user_avatar;
          post.author = author;

          let browseUser = new User();
          browseUser.account = rets[0].bu_account;
          browseUser.fullname = rets[0].bu_fullname;
          post.browseUser = browseUser;
        }

        let query = `SELECT t.tag_id, t.tag_name, t.tag_alias
        FROM tags t JOIN post_tags pt ON t.tag_id = pt.tag_id
        WHERE pt.post_id = '${post.postId}'`;

        let dbConn = new DBConnection();
        await dbConn
          .loadRequest(query)
          .then(rets => {
            post.tags = rets.map(ret => {
              let t = new Tag();
              t.tagId = ret.tag_id;
              t.tagName = ret.tag_name;
              t.alias = ret.tag_alias;

              return t;
            });
            resolve(post);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
const browse = (alias, checking, publishedDate, reasonReject, account) =>
  new Promise(async (resolve, reject) => {
    let query = "";

    checking
      ? (query = `UPDATE posts SET checked = 1, published_date = '${publishedDate}', browse_user = '${account}' WHERE post_alias = '${alias}'`)
      : (query = `UPDATE posts SET checked = 1, reason_reject = '${escape(
        reasonReject
      )}', browse_user = '${account}' WHERE post_alias = '${alias}'`);

    let dbConn = new DBConnection();

    await dbConn
      .updateRequest(query)
      .then(status => {
        resolve(status);
      })
      .catch(err => {
        reject(err);
      });
  });

const updatePost = post =>
  new Promise(async (resolve, reject) => {
    let query = `UPDATE posts SET post_title = '${formatValidSqlStringSyntax(
      post.postTitle
    )}',
  post_alias = '${post.alias}',
  category = '${post.category.categoryId}',
  post_summary = '${formatValidSqlStringSyntax(post.postSummary)}',
  post_content = '${formatValidSqlStringSyntax(post.postContent)}',
  youtube_url = ${post.youtubeUrl === null ? null : `'${post.youtubeUrl}'`},
author = '${post.author.account}',
  premium = ${post.premium ? 1 : 0},
checked = 0,
  published_date = null,
  reason_reject = null,
  browse_user = null
${post.postAvatarImage ? `, post_avatar_image='${post.postAvatarImage}'` : ""}
WHERE post_id = '${post.postId}'`;

    let dbConn = new DBConnection();

    await dbConn
      .updateRequest(query)
      .then(rets => {
        resolve(post);
      })
      .catch(err => {
        reject(err);
      });
  });

const deletePosts = postIds =>
  new Promise(async (resolve, reject) => {
    await postIds.forEach(async postId => {
      // Delete comment and post tags of post
      await Promise.all([
        commentBus.deleteCommentByPostId(postId),
        postTagBus.deletePostTagsByPostId(postId)
      ]);

      // Delete post image
      let filename = fs
        .readdirSync(
          path.join(__dirname, "/../../../statics/media/images/posts/")
        )
        .filter(fn => fn.split(".")[0] === postId)[0];
      filename &&
        fs.unlinkSync(
          path.join(
            __dirname,
            "/../../../statics/media/images/posts/",
            filename
          )
        );

      // Delete post
      let query = `DELETE FROM posts WHERE post_id = '${postId}'`;
      let dbConn = new DBConnection();
      await dbConn
        .deleteRequest(query)
        .then(ret => {
          resolve(postIds.length);
        })
        .catch(err => {
          reject(err);
        });
    });
  });

const checkIsRejectedOrDraftByAlias = alias =>
  new Promise((resolve, reject) => {
    let query = `SELECT post_id FROM posts WHERE post_alias = '${alias}' AND(checked = 0 OR(checked = 1 AND published_date IS NULL))`;
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(rets => {
        resolve(rets.length > 0);
      })
      .catch(err => {
        reject(err);
      });
  });

const checkIsRejectedOrDraftById = id =>
  new Promise((resolve, reject) => {
    let query = `SELECT post_id FROM posts WHERE post_id = '${id}' AND(checked = 0 OR(checked = 1 AND published_date IS NULL))`;
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(rets => {
        resolve(rets.length > 0);
      })
      .catch(err => {
        reject(err);
      });
  });

// có thể có categoryId để trả ra 10 bài mới nhất của cat đó
const getTenLatestPosts = (premium, categoryId) =>
  new Promise((resolve, reject) => {
    let query = `SELECT * FROM posts join categories on posts.category = categories.category_id WHERE ${
      premium ? "(posts.premium = 1 or posts.premium = 0)" : "posts.premium = 0"
      } and posts.published_date ORDER BY  posts.premium DESC, posts.published_date DESC  LIMIT 10`;
    if (categoryId)
      query = `SELECT * FROM posts join categories on posts.category = categories.category_id WHERE ${
        premium
          ? "(posts.premium = 1 or posts.premium = 0)"
          : "posts.premium = 0"
        } and posts.category = '${categoryId}' AND posts.published_date  ORDER BY posts.premium DESC, posts.published_date DESC  LIMIT 10`;

    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(rows => {
        resolve(rows);
      })
      .catch(err => {
        reject(err);
      });
  });

const getNameCatById = id =>
  new Promise((resolve, reject) => {
    let query = `SELECT category_name FROM categories WHERE categories.category_alias = '${id}'`;
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(rows => {
        resolve(rows[0]);
      })
      .catch(err => {
        reject(err);
      });
  });

const getCountPostsFromCategoryId = (premium, id) =>
  new Promise((resolve, reject) => {
    let query =
      `SELECT count(*) 
      FROM 
        posts p JOIN categories c ON c.category_id = p.category 
      WHERE
        p.checked=1
        AND p.published_date IS NOT NULL
        AND DATEDIFF(now(), p.published_date) >= 0
        AND (c.category_id = '${id}' OR c.parent_category='${id}')
      ORDER BY p.premium DESC, p.published_date DESC`;
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(rets => {
        resolve(rets);
      })
      .catch(err => {
        reject(err);
      });
  });

const getTagsOfPostByPostId = postId => new Promise((resolve, reject) => {
  let query = `SELECT t.tag_id, t.tag_name, t.tag_alias FROM tags t JOIN post_tags pt ON t.tag_id=pt.tag_id WHERE pt.post_id='${postId}'`
  let dbConn = new DBConnection()

  dbConn
    .loadRequest(query)
    .then(rets => {
      let tags = rets.map(ret => {
        let tag = new Tag()
        tag.tagId = ret.tag_id
        tag.tagName = ret.tag_name
        tag.alias = ret.tag_alias

        return tag
      })

      resolve(tags)
    })
    .catch(err => {
      reject(err)
    })
})

const getPostsFromCategoryId = (premium, id, from, limit) =>
  new Promise((resolve, reject) => {
    let query =
      `SELECT 
        p.post_id, p.post_alias, p.post_summary, p.premium, p.published_date, p.post_avatar_image,
        c.category_id, c.category_name, c.category_alias
      FROM 
        posts p JOIN categories c ON c.category_id = p.category 
      WHERE
        p.checked=1
        AND p.published_date IS NOT NULL
        AND DATEDIFF(now(), p.published_date) >= 0
        AND (c.category_id = '${id}' OR c.parent_category='${id}')
      ORDER BY p.premium DESC, p.published_date DESC  LIMIT ${limit} OFFSET ${from}`;
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(async rets => {
        let posts = []
        Promise
          .all(rets.map(async ret => {
            let post = new Post()

            post.postId = ret.post_id;
            post.postTitle = ret.post_title;
            post.postAvatarImage = ret.post_avatar_image;
            post.postSummary = ret.post_summary;
            post.alias = ret.post_alias;
            post.publishedDate = ret.published_date;
            post.premium = ret.premium === 1 ? true : false;

            let categ = new Category()
            categ.categoryId = ret.category_id
            categ.categoryName = ret.category_name
            categ.alias = ret.category_alias
            post.category = categ

            await getTagsOfPostByPostId(post.postId)
              .then(tags => {
                post.tags = tags
              })
              .catch(err => {
                reject(err)
              })

            console.log('postId', post.postId)
            return post
          }))
          .then(newPosts => {
            resolve(newPosts)
          })
          .catch(err => {
            reject(err)
          })

        // for (let index = 0; index < rets.length; index++) {

        // }
        // resolve(posts);
      })
      .catch(err => {
        reject(err);
      });
  });
const getPostFromId = (premium, id) =>
  new Promise((resolve, reject) => {
    let query = `SELECT * FROM posts join categories on posts.category = categories.category_id
    WHERE ${
      premium ? "(posts.premium = 1 or posts.premium = 0)" : "posts.premium = 0"
      } and posts.post_alias = '${id}' and posts.published_date order by posts.premium DESC, posts.published_date DESC`;
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(rets => {
        resolve(rets);
      })
      .catch(err => {
        reject(err);
      });
  });
const getTagsFromPostId = id =>
  new Promise((resolve, reject) => {
    let query = `SELECT * FROM post_tags join tags on post_tags.tag_id = tags.tag_id join posts on posts.post_id = post_tags.post_id where posts.post_alias = '${id}'`;
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(rets => {
        resolve(rets);
      })
      .catch(err => {
        reject(err);
      });
  });

const getNameTagById = id =>
  new Promise((resolve, reject) => {
    let query = `SELECT * FROM tags WHERE tag_alias = '${id}'`;
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(rows => {
        resolve(rows[0]);
      })
      .catch(err => {
        reject(err);
      });
  });

const getCountPostsFromTagId = (premium, id) =>
  new Promise((resolve, reject) => {
    let query =
      `SELECT count(*) 
      FROM 
        post_tags pt JOIN posts p on pt.post_id = p.post_id
        JOIN tags t on t.tag_id = pt.tag_id 
      WHERE
        p.checked=1
        AND p.published_date IS NOT NULL
        AND DATEDIFF(now(), p.published_date) >= 0
        AND t.tag_id = '${id}' 
        ORDER BY ${premium ? `p.premium DESC,` : ''} p.published_date DESC`;
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(rets => {
        resolve(rets);
      })
      .catch(err => {
        reject(err);
      });
  });

const getPostsFromTagId = (premium, id, from, limit) =>
  new Promise((resolve, reject) => {
    let query =
      `SELECT 
        p.post_id, p.post_title, p.post_summary, p.post_alias, p.published_date, p.premium, p.post_avatar_image,
        c.category_id, c.category_name, c.category_alias
      FROM 
        post_tags pt JOIN posts p ON pt.post_id = p.post_id 
        JOIN categories c ON p.category=c.category_id
      WHERE
        p.checked=1
        AND p.published_date IS NOT NULL
        AND DATEDIFF(now(), p.published_date) >=0
        AND pt.tag_id = '${id}'
      ORDER BY ${premium ? `p.premium DESC,` : ''} p.published_date DESC
      LIMIT ${limit} OFFSET ${from}`;
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(rets => {
        Promise
          .all(rets.map(async ret => {
            let post = new Post()

            post.postId = ret.post_id;
            post.postTitle = ret.post_title;
            post.postAvatarImage = ret.post_avatar_image;
            post.postSummary = ret.post_summary;
            post.alias = ret.post_alias;
            post.publishedDate = ret.published_date;
            post.premium = ret.premium === 1 ? true : false;

            let categ = new Category()
            categ.categoryId = ret.category_id
            categ.categoryName = ret.category_name
            categ.alias = ret.category_alias
            post.category = categ

            await getTagsOfPostByPostId(post.postId)
              .then(tags => {
                post.tags = tags
              })
              .catch(err => {
                reject(err)
              })

            console.log('postId', post.postId)
            return post
          }))
          .then(posts => {
            resolve(posts)
          })
          .catch(err => {
            reject(err)
          })
      })
      .catch(err => {
        reject(err);
      });
  });

const getPostFromFTSearch = (premium, searchStr, from, limit) =>
  new Promise((resolve, reject) => {
    let query =
      `SELECT * 
      FROM  posts p join categories c on p.category = c.category_id
      WHERE
        p.checked=1
        AND p.published_date IS NOT NULL
        AND DATEDIFF(now(), p.published_date) >= 0
        AND MATCH(p.post_title) AGAINST('${searchStr}' IN NATURAL LANGUAGE MODE) 
      ORDER BY ${premium ? `p.premium DESC,` : ''} p.published_date DESC
      LIMIT ${limit} OFFSET ${from}`;
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(rets => {
        resolve(rets);
      })
      .catch(err => {
        reject(err);
      });
  });

const getCountPostFromFTSearch = (premium, searchStr) =>
  new Promise((resolve, reject) => {
    let query =
      `SELECT count(*) 
      FROM  posts p join categories c on p.category = c.category_id
      WHERE
        p.checked=1
        AND p.published_date IS NOT NULL
        AND DATEDIFF(now(), p.published_date) >= 0
        AND MATCH(p.post_title) AGAINST('${searchStr}' IN NATURAL LANGUAGE MODE) 
      ORDER BY ${premium ? `p.premium DESC,` : ''} p.published_date DESC`;
    let dbConn = new DBConnection();
    dbConn
      .loadRequest(query)
      .then(rets => {
        resolve(rets);
      })
      .catch(err => {
        reject(err);
      });
  });

const getMuchViewPosts = sub =>
  new Promise((resolve, reject) => {
    let query = `SELECT 
      p.post_id, p.post_alias, p.post_title, p.post_summary, p.created_date, p.published_date, p.premium, p.views, p.post_avatar_image, 
      c.category_id, c.category_name, c.category_alias,
      u.user_account, u.user_fullname,
      w.pseudonym
    FROM 
      posts p JOIN categories c ON p.category=c.category_id
      JOIN users u ON p.author=u.user_account
      JOIN writers w ON u.user_account=w.user_account
    WHERE p.checked=1 AND p.published_date IS NOT NULL AND DATEDIFF(now(), p.published_date) >= 0
    ORDER BY p.views, p.published_date ${sub ? `, p.premium` : ""} DESC
    LIMIT 0, ${LIMIT_MUCH_VIEW_POSTS}`;
    let dbConn = new DBConnection();
    dbConn
      .loadRequest(query)
      .then(rets => {
        let posts = rets.map(ret => {
          let post = new Post();
          post.postId = ret.post_id;
          post.postTitle = ret.post_title;
          post.postSummary = ret.post_summary;
          // post.postContent = ret.post_content
          post.premium = ret.premium;
          post.alias = ret.post_alias;
          post.createdDate = ret.created_date;
          post.publishedDate = ret.published_date;
          post.postAvatarImage = ret.post_avatar_image;
          post.views = ret.views;

          let category = new Category();
          category.categoryId = ret.category_id;
          category.categoryName = ret.category_name;
          category.alias = ret.category_alias;
          post.category = category;

          let author = new Writer();
          author.account = ret.user_account;
          author.pseudonym = ret.pseudonym;
          author.fullname = ret.user_fullname;
          post.author = author;

          return post;
        });

        resolve(posts);
      })
      .catch(err => {
        reject(err);
      });
  });

const filterHighlightPostsFrom = posts => {
  console.log("posts", posts);
  let highlightPosts = [];
  for (let index = 0; index < LIMIT_HIGHLIGHT_POSTS; index++) {
    highlightPosts.push(posts.shift());
  }

  console.log("highlight", highlightPosts);
  return highlightPosts;
};

const getHighlightPosts = sub => new Promise((resolve, reject) => {
  let startDate = moment().startOf('week').format('YYYY/MM/DD')
  let endDate = moment().endOf('week').format('YYYY/MM/DD')
  console.log(startDate, endDate)

  let query = `SELECT 
      p.post_id, p.post_alias, p.post_title, p.post_summary, p.created_date, p.published_date, p.premium, p.views, p.post_avatar_image, 
      c.category_id, c.category_name, c.category_alias,
      u.user_account, u.user_fullname,
      w.pseudonym
    FROM 
      posts p JOIN categories c ON p.category=c.category_id
      JOIN users u ON p.author=u.user_account
      JOIN writers w ON u.user_account=w.user_account
    WHERE 
      p.checked=1 
      AND p.published_date IS NOT NULL 
      AND DATEDIFF(now(), p.published_date) >= 0
      AND DATEDIFF('${startDate}', p.published_date) <= 0
      AND DATEDIFF('${endDate}', p.published_date) >= 0
    ORDER BY p.views,  p.published_date ${sub ? `, p.premium` : ""} DESC
    LIMIT 0, ${LIMIT_HIGHLIGHT_POSTS}`;
  let dbConn = new DBConnection();
  dbConn
    .loadRequest(query)
    .then(rets => {
      let posts = rets.map(ret => {
        let post = new Post();
        post.postId = ret.post_id;
        post.postTitle = ret.post_title;
        post.postSummary = ret.post_summary;
        // post.postContent = ret.post_content
        post.premium = ret.premium;
        post.alias = ret.post_alias;
        post.createdDate = ret.created_date;
        post.publishedDate = ret.published_date;
        post.postAvatarImage = ret.post_avatar_image;
        post.views = ret.views;

        let category = new Category();
        category.categoryId = ret.category_id;
        category.categoryName = ret.category_name;
        category.alias = ret.category_alias;
        post.category = category;

        let author = new Writer();
        author.account = ret.user_account;
        author.pseudonym = ret.pseudonym;
        author.fullname = ret.user_fullname;
        post.author = author;

        return post;
      });

      resolve(posts);
    })
    .catch(err => {
      reject(err);
    });
})

const getRelativePostsViaCategoryId = (sub, categoryId, postId) => new Promise((resolve, reject) => {
  let query =
    `SELECT 
        p.post_id, p.post_title, p.post_summary, p.post_alias, p.published_date, p.premium, p.post_avatar_image,
        c.category_id, c.category_name, c.category_alias
      FROM 
        posts p JOIN categories c ON p.category=c.category_id
      WHERE
        p.checked=1
        AND p.published_date IS NOT NULL
        AND DATEDIFF(now(), p.published_date) >=0
        AND p.post_id <> '${postId}'
        AND (c.category_id='${categoryId}' OR c.parent_category='${categoryId}')
      ORDER BY ${sub ? `p.premium DESC,` : ''} p.published_date DESC
      LIMIT 0, 5`
  let dbConn = new DBConnection()

  dbConn
    .loadRequest(query)
    .then(rets => {
      Promise
        .all(rets.map(async ret => {
          let post = new Post()

          post.postId = ret.post_id;
          post.postTitle = ret.post_title;
          post.postAvatarImage = ret.post_avatar_image;
          post.postSummary = ret.post_summary;
          post.alias = ret.post_alias;
          post.publishedDate = ret.published_date;
          post.premium = ret.premium === 1 ? true : false;

          let categ = new Category()
          categ.categoryId = ret.category_id
          categ.categoryName = ret.category_name
          categ.alias = ret.category_alias
          post.category = categ

          await getTagsOfPostByPostId(post.postId)
            .then(tags => {
              post.tags = tags
            })
            .catch(err => {
              reject(err)
            })

          return post
        }))
        .then(posts => {
          resolve(posts)
        })
        .catch(err => {
          reject(err)
        })
    })
    .catch(err => {
      reject(err)
    })
})

const getLatestPostViaCategoryId = (sub, categoryId) => new Promise((resolve, reject) => {
  let query =
    `SELECT 
        p.post_id, p.post_title, p.post_summary, p.post_alias, p.published_date, p.premium, p.post_avatar_image,
        c.category_id, c.category_name, c.category_alias
      FROM 
        posts p JOIN categories c ON p.category=c.category_id
      WHERE
        p.checked=1
        AND p.published_date IS NOT NULL
        AND DATEDIFF(now(), p.published_date) >=0
        AND c.category_id='${categoryId}'
      ORDER BY ${sub ? `p.premium DESC,` : ''} p.published_date DESC
      LIMIT 0, 1`
  let dbConn = new DBConnection()

  dbConn
    .loadRequest(query)
    .then(async rets => {
      let ret = rets[0]

      if (!ret) {
        resolve(null)
      }
      else {
        let post = new Post()

        post.postId = ret.post_id;
        post.postTitle = ret.post_title;
        post.postAvatarImage = ret.post_avatar_image;
        post.postSummary = ret.post_summary;
        post.alias = ret.post_alias;
        post.publishedDate = ret.published_date;
        post.premium = ret.premium === 1 ? true : false;

        let categ = new Category()
        categ.categoryId = ret.category_id
        categ.categoryName = ret.category_name
        categ.alias = ret.category_alias
        post.category = categ

        await getTagsOfPostByPostId(post.postId)
          .then(tags => {
            post.tags = tags
          })
          .catch(err => {
            reject(err)
          })

        resolve(post)
      }
    })
    .catch(err => {
      reject(err)
    })
})

const getTopCategoryWithLatestPost = sub => new Promise((resolve, reject) => {
  categoryBus
    .getLessInfoCategories()
    .then(categories => {
      Promise
        .all(categories.map(async c => {
          let p = {}
          await getLatestPostViaCategoryId(sub, c.categoryId)
            .then(post => {
              p = post
            })
            .catch(err => {
              reject(err)
            })

          return p
        }))
        .then(posts => {
          posts = posts.filter(p => p !== null).slice(0, 11)
          resolve(posts)
        })
        .catch(err => {
          reject(err)
        })
    })
})

module.exports = {
  createPost,
  updatePost,
  getDraftPostsFilterBy,
  getCountDraftPostsFilterBy,
  getRejectPostsFilterBy,
  getCountRejectPostsFilterBy,
  getPublishedPostsFilterBy,
  getCountPublishedPostsFilterBy,
  getWaitingPostsFilterBy,
  getCountWaitingPostsFilterBy,
  getOneByAlias,
  browse,
  deletePosts,
  checkIsRejectedOrDraftByAlias,
  checkIsRejectedOrDraftById,
  getTenLatestPosts,
  getPostsFromCategoryId,
  getNameCatById,
  getPostFromId,
  getTagsFromPostId,
  getPostsFromTagId,
  getNameTagById,
  getPostFromFTSearch,
  getMuchViewPosts,
  filterHighlightPostsFrom,
  getCountPostFromFTSearch,
  getCountPostsFromTagId,
  getCountPostsFromCategoryId,
  getRelativePostsViaCategoryId,
  getTopCategoryWithLatestPost,
  getHighlightPosts,
};

const { Post, Category, User, Writer, Tag } = require('../../models')
const { DBConnection } = require('../../db')
const { convertToAlias } = require('../../utils')
const { FILTER } = require('../../config')

const createPost = post => new Promise(async (resolve, reject) => {
  let query =
    `INSERT INTO 
    posts(post_id, post_title, post_alias, post_avatar_image, category, youtube_url, author, post_summary, post_content)
    VALUES(
      '${post.postId}',
      '${escape(post.postTitle)}',
      '${post.alias}',
      '${post.postAvatarImage}',
      '${post.category.categoryId}',
      '${post.youtubeUrl}',
      '${post.author.account}',
      '${escape(post.postSummary)}',
      '${escape(post.postContent)}')`
  let dbConnect = new DBConnection()
  let ret = await dbConnect.insertRequest(query)

  if (ret) {
    resolve(post)
  }
  else {
    reject(err)
  }
})

const getDraftPostsFilterBy = (pageNum, categoryAlias, filterId, limit) => new Promise(async (resolve, reject) => {
  let query =
    `SELECT p.post_id, p.post_title, p.post_alias, p.created_date, p.published_date,
    c.category_id, c.category_name, c.category_alias,
    u.user_account, u.user_fullname, w.pseudonym
    FROM (
      (
        (
          (
            posts p 
            JOIN 
            categories c 
            ON p.category=c.category_id
          ) 
          JOIN 
          users u 
          ON p.author=u.user_account
        )
        JOIN
        writers w
        ON w.user_account=u.user_account
      ) LEFT JOIN categories cp ON cp.category_id=c.parent_category
    )
    WHERE p.published_date IS NULL AND p.checked=0 ${categoryAlias != 'ALL' ? `AND c.category_alias = '${categoryAlias}' OR cp.category_alias='${categoryAlias}'` : ''}
    ${
    filterId === FILTER.INCREASE_CREATED_DATE
      ? 'ORDER BY created_date ASC'
      : filterId === FILTER.DECREASE_CREATED_DATE
        ? 'ORDER BY created_date DESC'
        : filterId === FILTER.INCREASE_PUBLISHED_DATE
          ? 'ORDER BY published_date ASC'
          : 'ORDER BY published_date DESC'
    }
    LIMIT ${(pageNum - 1) * limit}, ${limit}`

  let dbConn = new DBConnection()
  await dbConn
    .loadRequest(query)
    .then(rets => {
      let posts = rets.map(ret => {
        let post = new Post()
        post.postId = ret.post_id
        post.postTitle = unescape(ret.post_title)
        post.alias = ret.post_alias
        post.createdDate = ret.created_date
        post.publishedDate = ret.published_date

        let category = new Category()
        category.categoryId = ret.category_id
        category.alias = ret.category_alias
        category.categoryName = ret.category_name
        post.category = category

        let author = new Writer()
        author.account = ret.user_account
        author.fullname = ret.user_fullname
        author.pseudonym = ret.pseudonym
        post.author = author

        return post
      })

      resolve(posts)
    })
    .catch(err => {
      reject(err)
    })
})

const getCountDraftPostsFilterBy = (pageNum, categoryAlias, filterId) => new Promise(async (resolve, reject) => {
  let query =
    `SELECT p.post_id, p.post_title, p.post_alias, p.created_date, p.published_date,
    c.category_id, c.category_name, c.category_alias,
    u.user_account, u.user_fullname, w.pseudonym
    FROM (
      (
        (
          (
            posts p 
            JOIN 
            categories c 
            ON p.category=c.category_id
          ) 
          JOIN 
          users u 
          ON p.author=u.user_account
        )
        JOIN
        writers w
        ON w.user_account=u.user_account
      ) LEFT JOIN categories cp ON cp.category_id=c.parent_category
    )
    WHERE p.published_date IS NULL AND p.checked=0 ${categoryAlias != 'ALL' ? `AND c.category_alias = '${categoryAlias}' OR cp.category_alias='${categoryAlias}'` : ''}
    ${
    filterId === FILTER.INCREASE_CREATED_DATE
      ? 'ORDER BY created_date ASC'
      : filterId === FILTER.DECREASE_CREATED_DATE
        ? 'ORDER BY created_date DESC'
        : filterId === FILTER.INCREASE_PUBLISHED_DATE
          ? 'ORDER BY published_date ASC'
          : 'ORDER BY published_date DESC'
    }`

  let dbConn = new DBConnection()
  await dbConn
    .loadRequest(query)
    .then(rets => {
      resolve(rets.length)
    })
    .catch(err => {
      reject(err)
    })
})

const getOneByAlias = alias => new Promise(async (resolve, reject) => {
  let query =
    `SELECT 
      p.post_id, p.post_title, p.post_summary, p.post_avatar_image, p.youtube_url, p.post_content, p.created_date, p.published_date, p.checked, p.reason_reject,
      c.category_id, c.category_name, c.category_alias,
      u.user_account, u.user_fullname, u.user_avatar,
      w.pseudonym
   FROM posts p JOIN categories c ON p.category=c.category_id JOIN users u ON p.author=u.user_account JOIN writers w ON u.user_account=w.user_account
   WHERE p.post_alias='${alias}'`
  let dbConn = new DBConnection()

  await dbConn
    .loadRequest(query)
    .then(async rets => {
      let post = new Post()

      if (rets.length > 0) {
        post.postId = rets[0].post_id
        post.postTitle = unescape(rets[0].post_title)
        post.postAvatarImage = rets[0].post_avatar_image
        post.postSummary = unescape(rets[0].post_summary)
        post.postContent = unescape(rets[0].post_content)
        post.alias = alias
        post.youtubeUrl = rets[0].youtube_url
        post.createdDate = rets[0].created_date
        post.publishedDate = rets[0].published_date
        post.checked = rets[0].checked > 0 ? true : false
        post.reasonReject = unescape(rets[0].reason_reject)

        let category = new Category()
        category.categoryId = rets[0].category_id
        category.categoryName = rets[0].category_name
        category.alias = rets[0].category_alias
        post.category = category

        let author = new Writer()
        author.account = rets[0].user_account
        author.fullname = rets[0].user_fullname
        author.pseudonym = rets[0].pseudonym
        author.avatar = rets[0].user_avatar
        post.author = author
      }

      let query =
        `SELECT t.tag_id, t.tag_name, t.tag_alias
        FROM tags t JOIN post_tags pt ON t.tag_id=pt.tag_id
        WHERE pt.post_id='${post.postId}'`
      let dbConn = new DBConnection()
      await dbConn
        .loadRequest(query)
        .then(rets => {
          console.log('rets', rets.length)
          post.tags = rets.map(ret => {
            let t = new Tag()
            t.tagId = ret.tag_id
            t.tagName = ret.tag_name
            t.alias = ret.tag_alias

            return t
          })
          resolve(post)
        })
        .catch(err => {
          reject(err)
        })

    })
    .catch(err => {
      reject(err)
    })
})

const browse = (alias, checking, publishedDate, reasonReject) => new Promise(async (resolve, reject) => {
  let query = ''

  checking
    ? query = `UPDATE posts SET checked=1, published_date='${publishedDate}' WHERE post_alias='${alias}'`
    : query = `UPDATE posts SET checked=1, reason_reject='${escape(reasonReject)}' WHERE post_alias='${alias}'`

  let dbConn = new DBConnection()

  await dbConn
    .updateRequest(query)
    .then(status => {
      resolve(status)
    })
    .catch(err => {
      reject(err)
    })
})

const updatePost = post => new Promise(async (resolve, reject) => {
  let query =
    `UPDATE posts SET post_title='${post.postTitle}',
      post_alias='${post.alias}',
      category='${post.category.categoryId}',
      post_summary='${escape(post.postSummary)}',
      post_content='${escape(post.postContent)}',
      youtube_url='${post.youtubeUrl}',
      author='${post.author.account}'
      ${post.postAvatarImage ? `, post_avatar_image='${post.postAvatarImage}'` : ''}
    WHERE post_id='${post.postId}'`

  let dbConn = new DBConnection()

  await dbConn
    .updateRequest(query)
    .then(rets => {
      resolve(post)
    })
    .catch(err => {
      reject(err)
    })
})

module.exports = {
  createPost,
  updatePost,
  getDraftPostsFilterBy,
  getCountDraftPostsFilterBy,
  getOneByAlias,
  browse
}
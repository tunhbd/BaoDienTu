const { DBConnection } = require('../../db')
const { Category } = require('../../models')
const { convertToAlias } = require('../../utils')

const getLessInfoCategories = (account = null) => new Promise(async (resolve, reject) => {
  let query =
    `SELECT c.category_id, c.category_name, c.category_alias 
    FROM categories c ${account !== null ? ` JOIN assigned_categories ac ON ac.category_id=c.category_id` : ''} 
    WHERE c.category_active=1 ${account !== null ? ` AND ac.user_account='${account}' AND ac.disabled_category=0` : ''}`
  let dbConn = new DBConnection()

  await dbConn
    .loadRequest(query)
    .then(rets => {
      let categories = []
      rets.forEach(ret => {
        let category = new Category()
        category.categoryId = ret.category_id
        category.categoryName = ret.category_name
        category.alias = ret.category_alias

        categories.push(category)
      })

      resolve(categories)
    })
    .catch(err => {
      reject(err)
    })
})

const getAllWithLevel = () => new Promise((resolve, reject) => {
  let query = `SELECT * FROM categories`
  let dbConn = new DBConnection()

  dbConn
    .loadRequest(query)
    .then(rets => {
      let categories = rets.map(ret => {
        let category = new Category()
        category.categoryId = ret.category_id
        category.categoryName = ret.category_name
        category.parent = ret.parent_category
        category.alias = ret.category_alias
        category.createdDate = ret.created_date

        return category
      })

      let rootCategories = categories.filter(categ => categ.parent === null)

      categories.filter(categ => categ.parent !== null).forEach(categ => {
        rootCategories.filter(rootCateg => rootCateg.categoryId === categ.parent)[0].subCategories.push(categ)
      })

      resolve(rootCategories)
    })
    .catch(err => {
      reject(err)
    })
})

const addCategory = category => new Promise((resolve, reject) => {
  category.generateId()
  category.generateAlias()
  let query = `INSERT INTO categories(category_id, category_name, category_alias, parent_category) VALUES('${category.categoryId}','${category.categoryName}','${category.alias}',${category.parent === null ? null : `'${category.parent}'`})`
  let dbConn = new DBConnection()

  dbConn
    .insertRequest(query)
    .then(ret => {
      resolve(category)
    })
    .catch(err => {
      reject(err)
    })
})

const updateCategory = category => new Promise((resolve, reject) => {
  let query = `UPDATE categories SET category_name='${category.categoryName}' WHERE category_id='${category.categoryId}'`
  let dbConn = new DBConnection()

  dbConn
    .updateRequest(query)
    .then(ret => {
      resolve(category)
    })
    .catch(err => {
      reject(err)
    })
})

const deleteCategory = (categoryId, isParent) => new Promise(async (resolve, reject) => {
  let query = `DELETE FROM categories WHERE category_id='${categoryId}'`
  let dbConn = new DBConnection()

  if (isParent) {
    let query = `DELETE FROM categories WHERE parent_category='${categoryId}'`
    let dbConn = new DBConnection()

    await dbConn.deleteRequest(query)
  }

  dbConn
    .deleteRequest(query)
    .then(ret => {
      resolve(categoryId)
    })
    .catch(err => {
      reject(err)
    })
})

module.exports = {
  getLessInfoCategories,
  getAllWithLevel,
  addCategory,
  updateCategory,
  deleteCategory,
}
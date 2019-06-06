const { DBConnection } = require('../../db')
const { Category } = require('../../models')

const getLessInfoCategories = () => new Promise(async (resolve, reject) => {
  let query = 'SELECT category_id, category_name, category_alias FROM categories WHERE category_active=1'
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

module.exports = {
  getLessInfoCategories,
}
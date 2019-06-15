const { DBConnection } = require('../../db')
const {Category} = require('../../models')

const getLessInfoCategories = () => {
  let query = 'SELECT category_id, category_name FROM categories'

  return (new DBConnection()).loadRequest(query)
}
const getCategories = () => new Promise(async (resolve, reject) => {
  let query = 'SELECT * from categories'
  let categories = []
  await (new DBConnection()).loadRequest(query)
  .then(rows => {
    rows.forEach(row => {
      categories.push(new Category(row.category_id, row.category_name, row.parent_category))
    })
    resolve(categories)
  })
  .catch(err => {
    reject(err)
  }
  );
})

module.exports = {
  getLessInfoCategories,
  getCategories
}

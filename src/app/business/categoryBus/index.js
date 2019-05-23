const { DBConnection } = require('../../db')

const getLessInfoCategories = () => {
  let query = 'SELECT category_id, category_name FROM categories WHERE category_active=1'

  return (new DBConnection()).loadRequest(query)
}

module.exports = {
  getLessInfoCategories,
}
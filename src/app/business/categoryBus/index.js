const { DBConnection } = require('../../db')

const getLessInfoCategories = () => {
  let query = 'SELECT category_id, category_name FROM categories'

  return (new DBConnection()).loadRequest(query)
}

module.exports = {
  getLessInfoCategories,
}
const mysql = require('mysql')
const config = require('../../config')

class DBConnection {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    });
  }

  loadRequest(query) {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          reject(err)
        } else {
          let conn = this.connection
          this.connection.query(query, function (error, results, fields) {
            conn.end()
            if (error) {
              reject(error)
            } else {
              resolve(results)
            }
          });
        }
      })
    })
  }

  insertRequest(query) {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          reject(err)
        } else {
          let conn = this.connection

          this.connection.query(query, function (error, results, fields) {
            conn.end()
            if (error) {
              reject(error)
            } else {
              resolve(true)
            }
          });
        }
      })
    })
  }

  updateRequest(query) {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          reject(err)
        } else {
          let conn = this.connection

          this.connection.query(query, function (error, results, fields) {
            conn.end()
            if (error) {
              reject(error)
            } else {
              resolve(true)
            }
          });
        }
      })
    })
  }

  deleteRequest(query) {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          reject(err)
        } else {
          let conn = this.connection

          this.connection.query(query, function (error, results, fields) {
            conn.end()
            if (error) {
              reject(error)
            } else {
              resolve(true)
            }
          });
        }
      })
    })
  }
}

module.exports = DBConnection
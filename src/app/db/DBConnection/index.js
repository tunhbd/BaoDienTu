const mysql = require('mysql')
const config = require('../../config')

class DBConnection {
  constructor() {
    this.connection = mysql.createConnection({
      host: config.DATABASE.MAIN.HOST,
      port: config.DATABASE.MAIN.PORT,
      user: config.DATABASE.MAIN.USER,
      password: config.DATABASE.MAIN.PASSWORD,
      database: config.DATABASE.MAIN.DATABASE_NAME
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
            if (error) {
              reject(error)
            } else {
              resolve(results)
            }

            conn.end()
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
            if (error) {
              reject(error)
            } else {
              resolve(true)
            }
            conn.end()
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
            if (error) {
              reject(error)
            } else {
              resolve(true)
            }
            conn.end()
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
            if (error) {
              reject(error)
            } else {
              resolve(true)
            }
            conn.end()
          });
        }
      })
    })
  }
}

module.exports = DBConnection
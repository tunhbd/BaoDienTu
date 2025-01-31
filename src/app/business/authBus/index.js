const { DBConnection } = require('../../db');
const bcrypt = require('bcrypt');
const moment = require('moment')
const { User, Subscriber, Category, Editor, Writer } = require('../../models')
const { USER_ROLES, LIMIT_USERS } = require('../../config')
const { testPwd, testUsn, hashPwd } = require('../../utils')

const getSigninedUser = json => {
  return json === undefined ? undefined : JSON.parse(json);
};

const checkSignInedUser = userToken => {
  let nowDate = Date();
  let checkQuery = `SELECT * FROM sign_in_history WHERE user_token='${userToken}' AND user_token_expiration <= ${nowDate.toString()}`;
  return new DBConnection().loadRequest(checkQuery);
};

const checkOldPassword = (account, oldPassword) => new Promise((resolve, reject) => {
  let query = `SELECT user_password FROM users WHERE user_account='${account}'`
  let dbConn = new DBConnection()

  dbConn
    .loadRequest(query)
    .then(rets => {
      let isMatched = bcrypt.compareSync(oldPassword, rets[0].user_password);

      resolve(isMatched)
    })
    .catch(err => {
      reject(err)
    })
})

const changePassword = (account, password) => new Promise((resolve, reject) => {
  let hash = hashPwd(password)
  let query = `UPDATE users SET user_password='${hash}' WHERE user_account='${account}'`
  let dbConn = new DBConnection()

  dbConn
    .updateRequest(query)
    .then(ret => {
      resolve(ret)
    })
    .catch(err => {
      reject(err)
    })
})

const registerUser = userInfo => new Promise((resolve, reject) => {
  let hash = hashPwd(userInfo.password)

  let query = `INSERT INTO users(user_account, user_password, user_fullname, user_email, user_birthday, user_avatar, user_role) VALUES ( 
      '${userInfo.username}',
      '${hash}',
      '${userInfo.fullname}',
      '${userInfo.email}',
      '${moment(userInfo.birthday, "DD/MM/YYYY").format("YYYY/MM/DD")}', \
      null, \
      '${userInfo.role}');`;
  let dbConn = new DBConnection()

  dbConn
    .insertRequest(query)
    .then(ret => {
      if (ret) {
        let query = ''
        let dbConn = null

        switch (userInfo.role) {
          case USER_ROLES.SUBSCRIBER:
            query = `INSERT INTO subscribers(user_account, expiration_date) VALUES('${userInfo.username}','${moment().add(7, 'days').format('YYYY/MM/DD')}')`
            dbConn = new DBConnection()
            dbConn
              .insertRequest(query)
              .then(ret => {
                ret && resolve(true)
              })
              .catch(err => {
                reject(err)
              })
            break;
          case USER_ROLES.WRITER:
            query = `INSERT INTO writers(user_account, pseudonym) VALUES('${userInfo.username}',null)`
            dbConn = new DBConnection()
            dbConn
              .insertRequest(query)
              .then(ret => {
                ret && resolve(true)
              })
              .catch(err => {
                reject(err)
              })
            break;
          default:
            resolve(true)
        }
      }
    })
    .catch(err => {
      reject(err)
    })
});

const getUserInfoWithNoPassword = account =>
  new Promise((resolve, reject) => {
    let query = `SELECT user_account, user_role, user_email, user_birthday, user_fullname, user_avatar FROM users WHERE user_account='${account}'`;
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(rets => {
        let user = new User();
        user.account = rets[0].user_account;
        user.avatar = rets[0].user_avatar;
        user.birthday = rets[0].user_birthday;
        user.role = rets[0].user_role;
        user.email = rets[0].user_email;
        user.fullname = rets[0].user_fullname;

        resolve(user);
      })
      .catch(err => {
        reject(err);
      });
  });

const checkExistsUserAccount = account =>
  new Promise((resolve, reject) => {
    let query = `SELECT user_fullname FROM users WHERE user_account='${account}'`;
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(rets => {
        resolve(rets.length > 0 ? true : false);
      })
      .catch(err => {
        reject(err);
      });
  });

const getAllDetailUserFilterBy = (role, pageNum) =>
  new Promise((resolve, reject) => {
    let query = `SELECT user_account, user_fullname, user_email, user_birthday, user_avatar, user_status, user_role 
    FROM users
    ${role !== "ALL" ? `WHERE user_role='${role}'` : ""}
    LIMIT ${(pageNum - 1) * LIMIT_USERS}, ${LIMIT_USERS}`;
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(async rets => {
        let users = rets.map(ret => {
          let user =
            ret.user_role === USER_ROLES.SUBSCRIBER
              ? new Subscriber()
              : ret.user_role === USER_ROLES.WRITER
                ? new Writer()
                : ret.user_role === USER_ROLES.EDITOR
                  ? new Editor()
                  : new User();

          user.account = ret.user_account;
          user.fullname = ret.user_fullname;
          user.email = ret.user_email;
          user.birthday = ret.user_birthday;
          user.status = ret.user_status === 1 ? true : false;
          user.avatar = ret.user_avatar;
          user.role = ret.user_role;

          return user;
        });

        for (let index = 0; index < users.length; index++) {
          switch (users[index].role) {
            case USER_ROLES.WRITER:
              await getPseudonymOfWriter(users[index].account)
                .then(pseudonym => {
                  users[index].pseudonym = pseudonym;
                })
                .catch(err => {
                  reject(err);
                });
              break;
            case USER_ROLES.EDITOR:
              await getAssignedCategoriesOfEditor(users[index].account)
                .then(categories => {
                  users[index].assignedCategories = categories;
                })
                .catch(err => {
                  reject(err);
                });
              break;
            case USER_ROLES.SUBSCRIBER:
              await getExpirationDateOfSubscriber(users[index].account)
                .then(expDate => {
                  users[index].expirationDate = expDate;
                })
                .catch(err => {
                  reject(err);
                });
              break;
          }
        }

        resolve(users);
      })
      .catch(err => {
        reject(err);
      });
  });

const getCountAllUserFilterBy = role =>
  new Promise((resolve, reject) => {
    let query = `SELECT COUNT(*) count FROM users ${
      role !== "ALL" ? `WHERE user_role='${role}'` : ""
      }`;
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(rets => {
        resolve(rets[0].count);
      })
      .catch(err => {
        reject(err);
      });
  });

const getPseudonymOfWriter = account =>
  new Promise((resolve, reject) => {
    let query = `SELECT pseudonym FROM writers WHERE user_account='${account}'`;
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(rets => {
        resolve(rets.length > 0 ? rets[0].pseudonym : null);
      })
      .catch(err => {
        reject(err);
      });
  });

const getExpirationDateOfSubscriber = account =>
  new Promise((resolve, reject) => {
    let query = `SELECT expiration_date FROM subscribers WHERE user_account='${account}'`;
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(rets => {
        resolve(rets.length > 0 ? rets[0].expiration_date : null);
      })
      .catch(err => {
        reject(err);
      });
  });

const getAssignedCategoriesOfEditor = account =>
  new Promise((resolve, reject) => {
    let query = `SELECT c.category_id, c.category_name 
    FROM assigned_categories ac JOIN categories c ON ac.category_id=c.category_id
    WHERE ac.user_account='${account}'`;
    let dbConn = new DBConnection();

    dbConn
      .loadRequest(query)
      .then(rets => {
        let categories = rets.map(ret => {
          let category = new Category();

          category.categoryId = ret.category_id;
          category.categoryName = ret.category_name;

          return category;
        });
        resolve(categories);
      })
      .catch(err => {
        reject(err);
      });
  });

const deleteAllAssignedCategories = account =>
  new Promise((resolve, reject) => {
    let query = `DELETE FROM assigned_categories WHERE user_account='${account}'`;
    let dbConn = new DBConnection();

    dbConn
      .deleteRequest(query)
      .then(ret => {
        resolve(true);
      })
      .catch(err => {
        reject(err);
      });
  });

const updateAssignedCategories = (account, categoryIds) =>
  new Promise((resolve, reject) => {
    deleteAllAssignedCategories(account)
      .then(ret => {
        let query = `INSERT INTO assigned_categories(user_account, category_id) VALUES
        ${categoryIds.map(id => `('${account}','${id}')`).join(",")}`;
        let dbConn = new DBConnection();

        dbConn
          .insertRequest(query)
          .then(ret => {
            if (ret) {
              getAssignedCategoriesOfEditor(account)
                .then(categories => {
                  resolve(categories);
                })
                .catch(err => {
                  resolve([]);
                });
            }
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });

const extendExpirationDate = (account, date) =>
  new Promise((resolve, reject) => {
    let query = `UPDATE subscribers SET expiration_date='${date}' WHERE user_account='${account}'`;
    let dbConn = new DBConnection();

    dbConn
      .updateRequest(query)
      .then(ret => {
        resolve(date);
      })
      .catch(err => {
        reject(err);
      });
  });

const checkExistsEmailInSystem = (email, originEmail = null) => new Promise((resolve, reject) => {
  let query = `SELECT user_email FROM users WHERE user_email='${email}' ${originEmail !== null ? `AND user_email<>'${originEmail}'` : ''}`
  let dbConn = new DBConnection()

  dbConn
    .loadRequest(query)
    .then(rets => {
      resolve(rets.length > 0)
    })
    .catch(err => {
      reject(err)
    })
})

const checkUserToken = token => new Promise((resolve, reject) => {
  let query = `SELECT user_token FROM users WHERE user_token='${token}'`
  let dbConn = new DBConnection()

  dbConn
    .loadRequest(query)
    .then(rets => {
      resolve(rets.length > 0)
    })
    .catch(err => {
      reject(err)
    })
})

const resetPassword = (token, password) => new Promise((resolve, reject) => {
  let query = `UPDATE users SET user_password='${hashPwd(password)}', user_token=null WHERE user_token='${token}'`
  let dbConn = new DBConnection()

  dbConn
    .updateRequest(query)
    .then(ret => {
      resolve(ret)
    })
    .catch(err => {
      reject(err)
    })
})

const saveUserToken = (email, token) => new Promise((resolve, reject) => {
  let query = `UPDATE users SET user_token='${token}' WHERE user_email='${email}'`
  let dbConn = new DBConnection()

  dbConn
    .updateRequest(query)
    .then(ret => {
      resolve(ret)
    })
    .catch(err => {
      reject(err)
    })
})

const updatePseudonymOfWriter = (account, pseudonym) => new Promise((resolve, reject) => {
  let query = `UPDATE writers SET pseudonym='${pseudonym}' WHERE user_account='${account}'`
  let dbConn = new DBConnection()

  dbConn
    .updateRequest(query)
    .then(ret => {
      resolve(ret)
    })
    .catch(err => {
      reject(err)
    })
})

const updateProfile = user => new Promise((resolve, reject) => {
  let query = `UPDATE users SET user_fullname='${user.fullname}', user_birthday='${user.birthday}', user_email='${user.email}' WHERE user_account='${user.account}'`
  let dbConn = new DBConnection()

  dbConn
    .updateRequest(query)
    .then(ret => {
      if (ret) {
        user.role === USER_ROLES.WRITER
          ? updatePseudonymOfWriter(user.account, user.pseudonym)
            .then(ret => {
              resolve(ret)
            })
            .catch(err => {
              reject(err)
            })
          : null
      }
      else {
        resolve(false)
      }
    })
    .catch(err => {
      reject(err)
    })
})

const updateUserAvatar = user => new Promise((resolve, reject) => {
  let query = `UPDATE users SET user_avatar='${user.avatar}' WHERE user_account='${user.account}'`
  let dbConn = new DBConnection()

  dbConn
    .updateRequest(query)
    .then(ret => {
      resolve(ret)
    })
    .catch(err => {
      reject(err)
    })
})

const checkExpirationOfSubscriber = account => new Promise((resolve, reject) => {
  let query =
    `SELECT u.user_account 
    FROM users u JOIN subscribers sb ON u.user_account=sb.user_account
    WHERE u.user_account='${account}' AND DATEDIFF(now(), sb.expiration_date) < 0`
  let dbConn = new DBConnection()

  dbConn
    .loadRequest(query)
    .then(rets => {
      resolve(rets.length > 0)
    })
    .catch(err => {
      reject(err)
    })
})

module.exports = {
  getSigninedUser,
  checkSignInedUser,
  registerUser,
  getUserInfoWithNoPassword,
  checkExistsUserAccount,
  getAllDetailUserFilterBy,
  getCountAllUserFilterBy,
  updateAssignedCategories,
  changePassword,
  extendExpirationDate,
  checkOldPassword,
  checkExistsEmailInSystem,
  checkUserToken,
  checkExpirationOfSubscriber,
  resetPassword,
  saveUserToken,
  getPseudonymOfWriter,
  updateProfile,
  updateUserAvatar,
};

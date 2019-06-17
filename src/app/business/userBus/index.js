const { DBConnection } = require("../../db");

// const checkSubUser = req =>
//   new Promise(async (resolve, reject) => {
//     console.log(req.user);
//     if (req.user)
//       if (req.user.role === "SUBSCRIBER") {
//         let query = `select * from subscribers where user_account = '${
//           req.user.account
//         }';`;
//         let dbConn = new DBConnection();
//         await dbConn
//           .loadRequest(query)
//           .then(ret => {
//             let now = new Date();
//             let exp = new Date(ret[0].expiration_date);

//             resolve(now < exp);
//           })
//           .catch(err => {
//             reject(err);
//           });
//       } else resolve(false);
//     else resolve(false);
//   });

module.exports = {
  // checkSubUser
};

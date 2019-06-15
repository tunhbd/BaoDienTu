module.export = {
  validateToken: token => {
    let getEmailQ = `SELECT * FROM user_reset WHERE user_token='${token}'`;
    new db.DBConnection().loadRequest(getEmailQ).then(rows => {
      if (rows.length === 0) return false;
      return true;
    });
  },
  expireToken: () => {}
};

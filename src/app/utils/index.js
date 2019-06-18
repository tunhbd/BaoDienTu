const bcrypt = require("bcrypt");

const convertToAlias = text => {
  console.log('text', text)
  var alias = text.trim()
  alias = alias.toLowerCase();
  alias = alias.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  alias = alias.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  alias = alias.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  alias = alias.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  alias = alias.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  alias = alias.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  alias = alias.replace(/đ/g, "d");
  alias = alias.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    "-"
  );
  alias = alias.replace(/ +/g, "-");
  alias = alias.trim();
  return alias;
};

let testPwd = pwd => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
    pwd
  );
};
let testUsn = usn => {
  return usn.length > 0;
};
let hashPwd = pwd => {
  const rounds = 10;
  var salt = bcrypt.genSaltSync(rounds);
  return bcrypt.hashSync(pwd, salt);
};
let checkPermis = (req, res, permis = null) => {
  // if (!permis) {
  //   if (!req.user) {
  //     req.flash("mes", "No user is logining");
  //     res.redirect("/sign-in");
  //   } else {
  //     res.redirect("/");
  //   }
  // }
  return true;
};

const formatValidSqlStringSyntax = text => {
  return text.replace(/\'/img, `\\\'`)
}

module.exports = {
  convertToAlias,
  testPwd,
  testUsn,
  hashPwd,
  checkPermis,
  formatValidSqlStringSyntax,
};

const convertToAlias = text => {
  var alias = text;
  alias = alias.toLowerCase();
  alias = alias.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  alias = alias.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  alias = alias.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  alias = alias.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  alias = alias.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  alias = alias.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  alias = alias.replace(/đ/g, 'd');
  alias = alias.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '-');
  alias = alias.replace(/ +/g, '-');
  alias = alias.trim();
  return alias;
}

module.exports = {
  convertToAlias,
}
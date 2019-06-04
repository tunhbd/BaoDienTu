const md5 = require('md5')

const generatePostId = (req, res, next) => {
  req.generation = {
    postId: md5('POST' + Date.now() + '@BDT'),
  }
  console.log('generate post id: ', req.generation.postId)
  next()
}

module.exports = generatePostId
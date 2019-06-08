const md5 = require('md5')

const generatePostId = (req, res, next) => {
  req.generation = {
    postId: req.params.postId ? req.params.postId : md5(`@POST${Date.now()}@`),
  }
  // console.log('generate post id: ', req.generation.postId)
  next()
}

module.exports = generatePostId
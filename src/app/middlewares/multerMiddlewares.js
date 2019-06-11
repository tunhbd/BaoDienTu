const multer = require('multer')
const md5 = require('md5')

const getPostImageMulterMiddleware = () => {
  const multerConfig = {
    storage: multer.diskStorage({
      //Setup where the user's file will go
      destination: function (req, file, next) {
        next(null, __dirname + '/../../statics/media/images/posts');
      },

      //Then give the file a unique name
      filename: function (req, file, next) {
        const ext = file.mimetype.split('/')[1];
        const filename = `${req.generation && req.generation.postId ? req.generation.postId : md5(`@POST${Date.now()}@`)}.${ext}`
        // let filename = `${file.fieldname}-${Date.now()}.${ext}`
        req.generation.postAvatarImage = filename
        next(null, filename)
      }
    }),

    //A means of ensuring only images are uploaded. 
    fileFilter: function (req, file, next) {
      if (!file) {
        next();
      }
      const image = file.mimetype.startsWith('image/');
      if (image) {
        console.log('photo uploaded');
        next(null, true);
      } else {
        console.log("file not supported");

        //TODO:  A better message response to user on failure.
        return next();
      }
    }
  }

  return multer(multerConfig).single('avatarImage')
}

module.exports = {
  postImageMulterMiddleware: getPostImageMulterMiddleware(),
}
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/selfies')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        req.diskFileName = file.fieldname + '-' + uniqueSuffix;
        cb(null, file.fieldname + '-' + uniqueSuffix+'.jpg')
      }
})
module.exports = multer({ storage: storage });
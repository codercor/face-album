const {S3} = require("aws-sdk")
const multer = require('multer');
require("dotenv").config()
let multerS3 = require('multer-s3')
const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    },
});

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'face-album-bucket',
      metadata: function (req, file, cb) {
      
          if(file.mimetype == 'image/jpeg') cb(null, {fieldName: file.fieldname});
          else cb(new Error('Only JPEG images are allowed'));
      },
      key: function (req, file, cb) {
          
        cb(null, req.body.folder+'/'+Date.now().toString()+'.jpg')
      }
    })
  })


module.exports = upload;
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const config = require('../config/credentials.js');

const s3 = new aws.S3({
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  region: 'ap-northeast-2'
});

const uploadReceiptImages = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'wondanggui-images',
    key: function (req, file, cb) {
      let fileNameWithDirectory = `user_receipt_images/${req.query.uid}`;

      cb(null, fileNameWithDirectory);
    }
  })
});

const uploadAcademyImages = (req, res, next) => {
  return multer({
    storage: multerS3({
      s3: s3,
      bucket: 'wondanggui-images',
      acl: 'public-read',
      key: function (req, file, cb) {
        let fileNameWithDirectory = `${res.locals.fileDirectory}/${res.locals.fileId}`;

        cb(null, fileNameWithDirectory);
      }
    })
  }).single(res.locals.fileCategory)(req, res, next);
};

module.exports = { uploadReceiptImages, uploadAcademyImages };

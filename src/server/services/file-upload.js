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
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'RECEIPT_PHOTO'});
    },
    key: function (req, file, cb) {
      let fileNameWithDirectory = `user_receipt_images/${req.query.uid}`;

      cb(null, fileNameWithDirectory);
    }
  })
});

const uploadAcademyImages = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'wondanggui-images',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'ACADEMY_PROFILE_IMAGE'});
    },
    key: function (req, file, cb) {
      let fileNameWithDirectory = `academy_profile_images/${req.query.academyId}`;

      cb(null, fileNameWithDirectory);
    }
  })
});

module.exports = { uploadReceiptImages, uploadAcademyImages };

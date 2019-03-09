const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const config = require('../config/credentials.js');

console.log('config', config);
console.log('config.AWS_SECRET_ACCESS', config.AWS_SECRET_ACCESS);
console.log('config.AWS_ACCESS_KEY', config.AWS_ACCESS_KEY);

const s3 = new aws.S3({
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  region: 'ap-northeast-2'
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'wondanggui-images',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'RECEIPT_PHOTO'});
    },
    key: function (req, file, cb) {
      cb(null, req.query.uid)
    }
  })
});

module.exports = upload;

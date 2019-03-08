const AWS = require('aws-sdk');
const Image = require('../models/images.js');
const formidable = require('formidable');
const fs = require('fs');

var albumBucketName = 'www.wondanggui.com';
var bucketRegion = 'ap-northeast-2';
var IdentityPoolId = 'us-east-1_AqtdWxfSl';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

const s3 = new AWS.S3();
const bucketName = 'www.wondanggui.com';

const uploadFile = function (req, res) {
  console.log('****************************file is uploading****************');

  console.log('============photo file============', req.body);

  const form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {

    console.log('fields: ', fields);
    console.log('files: ', files);

    const keyName = files.userfile.name;
    const params = {
      Bucket: bucketName,
      Key: keyName,
      ACL: 'public-read',
      Body: fs.createReadStream(files.userfile.path)
    };

    function createAlbum(albumName) {
      albumName = albumName.trim();
      if (!albumName) {
        return alert('Album names must contain at least one non-space character.');
      }
      if (albumName.indexOf('/') !== -1) {
        return alert('Album names cannot contain slashes.');
      }
      var albumKey = encodeURIComponent(albumName) + '/';
      s3.headObject({Key: albumKey}, function(err, data) {
        if (!err) {
          return alert('Album already exists.');
        }
        if (err.code !== 'NotFound') {
          return alert('There was an error creating your album: ' + err.message);
        }
        s3.putObject({Key: albumKey}, function(err, data) {
          if (err) {
            return alert('There was an error creating your album: ' + err.message);
          }
          alert('Successfully created album.');
          viewAlbum(albumName);
        });
      });
    }

    // res.send('run  parser');

    s3.upload(params, function (err, data) {
      if (err) {
        return res.sendStatus(500);
      }
      // Successfully uploaded data to " + bucketName + "/" + keyName);
      var message = new Image({
        file: data.file,
        image_preview_url: fields.imagePreviewUrl,
      });

      message.save(function (err, imageMessage) {
        if (err) {
          return res.sendStatus(500);
        }
        Chat.findOneAndUpdate({ uphere_id: req.params.chat_id }, { $push: { messages: imageMessage.uphere_id } }, { new: true })
        .then((result) => {
          res.status(201).send(imageMessage);
        }).catch((err) => {
          res.status(500).send(err);
        })
      })
    });

    if(err) {
      return res.sendStatus(500);
    }
  });
}

module.exports = {
  uploadFile
};

const Academy = require('../models/academies.js');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const credentials = require('../config/credentials.js');
const httpHeaders = require('http-headers');
const fileUploader = require('../services/file-upload.js');
var mongoose = require('mongoose');

const listUpAcademies  = async function (req, res, next) {
  let findWithQuery = {};
  try {
    if (req.query.q) {
      findWithQuery = { name: req.query.q };
    }

    const docs = await Academy.find(findWithQuery);
    res.json(docs);
  } catch(err) {
    next(err);
  }
};

const registerAcademy = function (req, res, next) {
  const ObjectId = mongoose.Types.ObjectId;
  const _id = new ObjectId();

  res.locals.fileId = _id;
  res.locals.fileCategory = 'academy_image';
  res.locals.fileDirectory = 'academy_profile_images'

  fileUploader.uploadAcademyImages(req, res, async function (err) {
    if (err) {
      next(err);
    }
    const { name, category, description, homepage_adress, courses } = JSON.parse(req.body.academy_details);

    try {
      await Academy.create({
        _id,
        image: `https://s3.ap-northeast-2.amazonaws.com/wondanggui-images/academy_profile_images/${_id}`,
        name,
        category,
        description,
        homepage_adress,
        courses,
        rate: 0,
        best_comment: '등록된 후기가 없습니다.'
      });

      res.sendStatus(200);
    } catch(err) {
      next(err);
    }
  });
};

const checkAuth = async function (req, res, next) {
  if (req.headers.authorization.slice(7)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
}

module.exports = {
  listUpAcademies,
  registerAcademy,
  checkAuth
};

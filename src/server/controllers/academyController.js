const Academy = require('../models/academies.js');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const credentials = require('../config/credentials.js');
const httpHeaders = require('http-headers');
const fileUploader = require('../services/file-upload.js');
var mongoose = require('mongoose');

const listUpAcademies  = async function (req, res, next) {
  const findWithQuery = {};
  try {
    if (req.query.q) {
      findWithQuery['name'] = req.query.q;
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
        reviews: [],
        best_comment: '등록된 후기가 없습니다.'
      });

      res.sendStatus(200);
    } catch(err) {
      next(err);
    }
  });
};

const sendAcademyDetails = async function (req, res, next) {
  const academy_id = req.params.academy_id;

  try {
    const requestedAcademy = await Academy.findOne({_id: academy_id});

    res.json(requestedAcademy);
  } catch (err) {
    res.sendStatus(404);
  }
};


const registerReview = async function (req, res, next) {
  const ObjectId = mongoose.Types.ObjectId;

  try {
    await Academy.findByIdAndUpdate(ObjectId(req.params.academy_id), {
      $push: {
       reviews: {
          $each: [
            req.body
          ],
       }
     }
    });

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(404);
  }
};

module.exports = {
  listUpAcademies,
  registerAcademy,
  sendAcademyDetails,
  registerReview
};

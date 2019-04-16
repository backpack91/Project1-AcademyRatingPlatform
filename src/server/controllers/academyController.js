const Academy = require('../models/academies.js');
const jwt = require('jsonwebtoken');
const credentials = require('../config/credentials.js');
const fileUploader = require('../services/file-upload.js');
const mongoose = require('mongoose');

const listUpAcademies  = async function (req, res, next) {
  try {
    const academies = await Academy.find({});

    res.json(academies);
  } catch(err) {
    next(err);
  }
};

const registerAcademy = function (req, res, next) {
  const ObjectId = mongoose.Types.ObjectId;
  const _id = new ObjectId();

  res.locals.fileId = _id;
  res.locals.fileCategory = 'academy_image';
  res.locals.fileDirectory = 'academy_profile_images';

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
  const ObjectId = mongoose.Types.ObjectId;
  const academy_id = req.params.academy_id;

  try {
    const requestedAcademy = await Academy.findById(ObjectId(academy_id));

    res.json(requestedAcademy);
  } catch (err) {
    res.sendStatus(404);
  }
};

const registerReview = async function (req, res, next) {
  const ObjectId = mongoose.Types.ObjectId;
  const { access_token, text, rate, nick_name } = req.body.newReviewData;
  const dateObj = new Date();
  const currentTime = `${dateObj.getYear() + 1900}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
  const decoded = jwt.verify(access_token, credentials.JWT_SECRET_KEY);

  const newReview = {
    user_id: decoded.uid,
    nick_name,
    user_name: decoded.name,
    text,
    date: currentTime,
    rate
  };
  try {
    await Academy.findByIdAndUpdate(ObjectId(req.params.academy_id), {
      $push: {
        reviews: {
          $each: [
            newReview
          ]
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

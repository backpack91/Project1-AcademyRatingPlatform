const Academy = require('../models/academies.js');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const credentials = require('../config/credentials.js');
const httpHeaders = require('http-headers');

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

const registerAcademy = async function (req, res, next) {
  const { image, name, category, description, homepage_adress, courses } = req.body;

  try {
    await Academy.create({
      image,
      name,
      category,
      description,
      homepage_adress,
      courses,
      rate: 0,
      best_comment: ''
    });

    res.sendStatus(200);
  } catch(err) {
    next(err);
  }
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

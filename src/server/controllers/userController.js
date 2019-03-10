const User = require('../models/users.js');
const bodyParser = require('body-parser');
const validator = require('email-validator');
const jwt = require('jsonwebtoken');
const credentials = require('../config/credentials.js');

const checkMemberOrNot  = function (req, res, next) {
  User.find( { facebook_id: req.body.facebook_id }, function(err, arr) {
    if (err) { return console.error(err); }
    if (arr.length) {
      res.sendStatus(204);
    } else {
      res.sendStatus(200);
    }
  });
}

const registerNewMember = function (req, res, next) {
  const { receipt_image_url, facebook_id, name, image_profile } = req.body;
  let email;

  if(validator.validate(req.body.email)) {
    email = req.body.email;
  } else {
    email = '';
  }

  User.create({
    receipt_image_url,
    facebook_id,
    email,
    name,
    image_profile
  }, function (err, small) {
    if (err) { return console.error(err); }
    res.sendStatus(200);
  });
}

const generateJWT = function(req, res, next) {
  User.findOne({facebook_id: req.body.facebook_id}, function(err, user) {
    if (err) { return console.log(err) }

    if(user) {
      function getToken() {
        const token = jwt.sign({
          uid: req.body.facebook_id,
          email: user.email,
          name: user.name,
          image_profile: user.image_profile
        }, credentials.JWT_SECRET_KEY);

        return token;
      }

      res.send({
        access_token: getToken()
      });
    } else {
      res.sendStatus(204);
    }
  });
}

module.exports = {
  checkMemberOrNot,
  registerNewMember,
  generateJWT
}

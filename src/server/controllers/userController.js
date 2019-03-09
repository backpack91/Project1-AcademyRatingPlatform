const User = require('../models/users.js');
const bodyParser = require('body-parser');
const validator = require("email-validator");

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

module.exports = {
  checkMemberOrNot,
  registerNewMember
}

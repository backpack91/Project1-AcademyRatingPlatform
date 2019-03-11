const User = require('../models/users.js');
const bodyParser = require('body-parser');
const validator = require('email-validator');
const jwt = require('jsonwebtoken');
const credentials = require('../config/credentials.js');

const checkMemberOrNot  = async function (req, res, next) {
  try {
    const users = await User.find({ facebook_id: req.body.facebook_id });

    if (users.length) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
};

const registerNewMember = async function (req, res, next) {
  const { receipt_image_url, facebook_id, name, image_profile } = req.body;
  let email;

  try {
    if(validator.validate(req.body.email)) {
      email = req.body.email;
    } else {
      res.status(400).json({error: 'email is not valid'});
    }

    await User.create({
      receipt_image_url,
      facebook_id,
      email,
      name,
      image_profile
    });

    res.sendStatus(200);
  } catch(err) {
    next(err);
  }
};

const generateJWT = async function(req, res, next) {
  function getToken(user) {
    const token = jwt.sign({
      uid: req.body.facebook_id,
      email: user.email,
      name: user.name,
      image_profile: user.image_profile
    }, credentials.JWT_SECRET_KEY);

    return token;
  }

  try {
    const user = await User.findOne({facebook_id: req.body.facebook_id});

    if(user) {
      res.json({
        access_token: getToken(user)
      });
    } else {
      res.sendStatus(400);
    }
  } catch(err) {
    next(err);
  }
};

module.exports = {
  checkMemberOrNot,
  registerNewMember,
  generateJWT
};

const controllers = require('../controllers/imageFileController.js');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dummyList = require('../dummyData/dummy.json');
const jsonParser = bodyParser.json();
const imageFileController = require('../controllers/imageFileController.js');
const userController = require('../controllers/userController.js');

router.get('/academies', (req, res, next) => {
  res.send(dummyList);
});

router.post('/users/new', jsonParser, userController.registerNewUser);

router.post('/users/new/receiptPhoto', jsonParser, imageFileController.uploadFile);

module.exports = router;

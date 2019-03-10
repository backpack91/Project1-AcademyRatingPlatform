const express = require('express');
const bodyParser = require('body-parser');
const dummyList = require('../dummyData/dummy.json');
const fileController = require('../controllers/fileController.js');
const userController = require('../controllers/userController.js');
const upload = require('../services/file-upload.js');

const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/academies', (req, res, next) => {
  res.send(dummyList);
});

router.post('/users/login',jsonParser, userController.generateJWT);
router.post('/users/new', jsonParser, userController.checkMemberOrNot);
router.post('/users/new/receipt-photo', upload.single('receipt_image'), fileController.uploadFile);
router.post('/users/new/registration', jsonParser, userController.registerNewMember );

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const fileController = require('../controllers/fileController.js');
const userController = require('../controllers/userController.js');
const academyController = require('../controllers/academyController.js');
const fileUploader = require('../services/file-upload.js');

const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/academies', academyController.listUpAcademies);

router.post('/academies/new/academy-image-profile', fileUploader.uploadAcademyImages.single('academy_image'), fileController.uploadFile);
router.post('/academies/new/registration', jsonParser, academyController.registerAcademy);
router.post('/academies/new/access_token', jsonParser, academyController.checkAuth);

router.post('/users/login',jsonParser, userController.generateJWT);
router.post('/users/new', jsonParser, userController.checkMemberOrNot);
router.post('/users/new/receipt-photo', fileUploader.uploadReceiptImages.single('receipt_image'), fileController.uploadFile);
router.post('/users/new/registration', jsonParser, userController.registerNewMember );

module.exports = router;

const Image = require('../models/images.js');
const upload = require('../services/file-upload.js');

const uploadFile = function (req, res) {
  try {
    if (req.file) {
      res.sendStatus(200);
    } else {
      res.sendStatus(406);
    }
  } catch(err) {
    next(err);
  }
}

module.exports = {
  uploadFile
};

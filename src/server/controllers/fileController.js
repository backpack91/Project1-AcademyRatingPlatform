const Image = require('../models/images.js');
const upload = require('../services/file-upload.js');

const uploadFile = function (req, res) {
  if (req.file) {
    res.sendStatus(200);
  } else {
    res.sendStatus(406);
  }
}

module.exports = {
  uploadFile
};

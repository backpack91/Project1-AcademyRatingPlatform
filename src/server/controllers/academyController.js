const Academy = require('../models/academies.js');

const listUpAcademies  = function (req, res, next) {
  let findWithQuery = {};
  if (req.query.q) {
    findWithQuery = { name: req.query.q };
  }

  Academy.find( findWithQuery, function(err, arr) {
    if (err) { return res.error(err); }
    if (arr.length) {
      res.send(arr);
    } else {
      res.send(arr);
    }
  });
}

module.exports = {
  listUpAcademies
}

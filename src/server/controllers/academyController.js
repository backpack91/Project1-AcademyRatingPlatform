const Academy = require('../models/academies.js');

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

module.exports = {
  listUpAcademies
};

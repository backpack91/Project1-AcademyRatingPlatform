const credential = require('./credentials.js');

module.exports = function (env) {
  switch(env){
    case "development":
      return {
        url: `mongodb://admin:${credential.ATLAS_USER_PASSWORD}@ds119258.mlab.com:19258/wondanggui`,
      };
      break;
    default:
      return {
        url: `mongodb://admin:${credential.ATLAS_USER_ID}@ds119258.mlab.com:19258/wondanggui`,
      };
  }
};

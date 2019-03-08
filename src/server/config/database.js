module.exports = function (env) {
  switch(env){
    case "development":
      return {
        url: 'mongodb://localhost:27017/wondanggui',
      };
      break;
    default:
      return {
        url: 'mongodb://master:djqgldj1234@ds137100.mlab.com:37100/upheredb/',
      };
  }
};

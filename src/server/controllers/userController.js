const User = require('../models/users.js');

let currentUserInfo;

const registerNewUser  = function (req, res, next) {

 const {displayName, email, photoURL, uid} = req.body.user;

 User.find( {uid: req.body.user.uid}, function(err, arr) {
   if (err) { console.log('error!!!!!!!') }
   if (arr.length) {
     console.log('this user is registered!', arr);
     res.send('already_registered');
   } else {
     currentUserInfo = {
       name: displayName,
       email,
       photo_url: photoURL,
       uid: req.body.user.uid
     };
     console.log('this user is new ;)', arr);
     res.send('this user is new');
   }
 });
}

module.exports = {
  registerNewUser
}

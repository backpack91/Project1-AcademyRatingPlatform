var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  name: String,
  email: String,
  photo_url: String,
  uid: String
});

module.exports = mongoose.model('Users', UsersSchema);

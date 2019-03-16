const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  name: String,
  email: String,
  receipt_image_url: String,
  facebook_id: String,
  image_profile: String
});

module.exports = mongoose.model('Users', UsersSchema);

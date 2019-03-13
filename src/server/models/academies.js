var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AcademiesSchema = new Schema({
  _id: Schema.Types.ObjectId,
  image: String,
  name: String,
  category: String,
  description: String,
  homepage_adress: String,
  courses: [
    {
      name: String,
      description: String
    }
  ],
  rate: Number,
  best_comment: String,
  reviews: [
    {
      user_id: String,
      text: String,
      date: String,
      rate: Number
    }
  ]
});

module.exports = mongoose.model('Academies', AcademiesSchema);

const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  requirements: [String]
});
module.exports = mongoose.model('Job', JobSchema);
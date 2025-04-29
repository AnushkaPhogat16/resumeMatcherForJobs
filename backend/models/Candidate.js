const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  years: Number
});

const candidateSchema = new mongoose.Schema({
  name: String,
  skills: [String],
  education: String,
  experience: [experienceSchema]
});

module.exports = mongoose.model('Candidate', candidateSchema);
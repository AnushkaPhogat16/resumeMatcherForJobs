const Candidate = require('../models/Candidate');
const pdfParse  = require('pdf-parse');

// List or filter candidates
exports.getAll = async (req, res) => {
  try {
    const { skill, name } = req.query;
    let filter = {};
    if (skill) filter.skills = { $in: [skill] };
    if (name)  filter.name   = name;
    const cands = await Candidate.find(filter);
    res.json(cands);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Upload resume + details
exports.uploadResume = async (req, res) => {
  try {
    if (!req.body.name) 
      return res.status(400).json({ error: 'Name required.' });

    let skillsArr = [];
    if (req.body.skills) {
      skillsArr = req.body.skills.split(',').map(s=>s.trim()).filter(Boolean);
    } else if (req.file) {
      const data = await pdfParse(req.file.buffer);
      skillsArr = (data.text.match(/JavaScript|Python|MongoDB|React|Node\\.js/g) || []).map(s=>s.trim());
    }

    const candidate = await Candidate.create({
      name: req.body.name,
      skills: skillsArr,
      education: req.body.education || '',
      experience: []
    });
    res.status(201).json(candidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Match jobs by skills ($in)
exports.matchJobs = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ error: 'Candidate not found.' });
    const jobs = await require('../models/Job').find({
      requirements: { $in: candidate.skills }
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add experience ($push)
exports.addExperience = async (req, res) => {
  try {
    const { title, company, years } = req.body;
    const updated = await Candidate.findByIdAndUpdate(
      req.params.id,
      { $push: { experience: { title, company, years: Number(years) } } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update one embedded experience by title ($set)
exports.updateExperience = async (req, res) => {
  try {
    const { title, years } = req.body;
    const result = await Candidate.updateOne(
      { _id: req.params.id, 'experience.title': title },
      { $set: { 'experience.$.years': Number(years) } }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete embedded experience by title ($pull)
exports.deleteExperience = async (req, res) => {
  try {
    const { title } = req.body;
    const updated = await Candidate.findByIdAndUpdate(
      req.params.id,
      { $pull: { experience: { title } } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Batch update all candidates with skill ($inc + updateMany)
exports.batchUpdateExperience = async (req, res) => {
  try {
    const { skill, inc } = req.body;
    const result = await Candidate.updateMany(
      { skills: skill },
      { $inc: { 'experience.$[].years': Number(inc) } }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

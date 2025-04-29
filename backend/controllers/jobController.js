const Job = require('../models/Job');

exports.getJobs = async (req, res) => {
  try {
    const filter = req.query.req
      ? { requirements: { $in: [req.query.req] } }
      : {};
    const jobs = await Job.find(filter);
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch jobs.' });
  }
};

exports.createJob = async (req, res) => {
  try {
    const { title, description, requirements } = req.body;
    if (!title || !Array.isArray(requirements) || requirements.length === 0) {
      return res.status(400).json({ error: 'title and non-empty requirements array required.' });
    }
    const job = await Job.create({ title, description, requirements });
    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create job.' });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { requirements } = req.body;
    if (!Array.isArray(requirements) || requirements.length === 0) {
      return res.status(400).json({ error: 'requirements must be a non-empty array.' });
    }
    const job = await Job.findByIdAndUpdate(
      id,
      { $addToSet: { requirements: { $each: requirements } } },
      { new: true }
    );
    if (!job) return res.status(404).json({ error: 'Job not found.' });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update job.' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found.' });
    res.json({ message: 'Job deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete job.' });
  }
};

exports.searchJobs = async (req, res) => {
  try {
    const { reqs = '', mode = 'in' } = req.query;
    const arr = reqs.split(',').map(r => r.trim()).filter(r => r);
    let filter;
    if (mode === 'all') filter = { requirements: { $all: arr } };
    else filter = { requirements: { $in: arr } };
    const jobs = await Job.find(filter);
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to search jobs.' });
  }
};

exports.bulkAddField = async (req, res) => {
  try {
    const { field, value, filter = {} } = req.body;
    const result = await Job.updateMany(filter, { $set: { [field]: value } });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed bulk update.' });
  }
};

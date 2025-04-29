const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const controller = require('../controllers/candidateController');

// List or filter candidates
router.get('/', controller.getAll);

// Create candidate (multipart/form-data)
router.post('/', upload.single('resume'), controller.uploadResume);

// Match jobs
router.get('/:id/match', controller.matchJobs);

// Add experience
router.post('/:id/experience', controller.addExperience);

// Update experience
router.put('/:id/experience', controller.updateExperience);

// Delete experience
router.delete('/:id/experience', controller.deleteExperience);

// Batch update experience
router.put('/experience/batch', controller.batchUpdateExperience);

module.exports = router;

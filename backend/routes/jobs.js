const express = require('express');
const router = express.Router();
const controller = require('../controllers/jobController');

router.get('/', controller.getJobs);
router.post('/', controller.createJob);
router.put('/:id', controller.updateJob);
router.delete('/:id', controller.deleteJob);

// new endpoints
router.get('/search', controller.searchJobs);
router.post('/bulk-update', controller.bulkAddField);

module.exports = router;

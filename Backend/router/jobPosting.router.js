const express = require('express');
const router = express.Router();
const jobController = require('../controller/jobPosting.controller');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

router.post('/', upload.single('image'), jobController.addJob);
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobID);
router.put('/:id', upload.single('image'), jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

module.exports = router;
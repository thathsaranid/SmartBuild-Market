const express = require('express');
const router = express.Router();
const workerController = require('../controller/addWorkers.contorller');
const multer = require('multer');

// Configure multer for memory storage
const storage = multer.memoryStorage();

// Add file filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

// Configure multer upload
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Worker routes
router.post('/addWorker', upload.single('image'), workerController.addWorker);
router.put('/update/:id', upload.single('image'), workerController.updateWorker);
router.delete('/delete/:id', workerController.deleteWork);
router.get('/', workerController.getAllWorkers);
router.get('/:id', workerController.getWorkerById);

// Error handling middleware for multer
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: 'File size too large. Maximum size is 5MB.'
            });
        }
        return res.status(400).json({
            message: error.message
        });
    }
    next(error);
});

module.exports = router; 
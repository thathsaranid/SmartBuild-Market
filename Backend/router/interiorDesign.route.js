const express = require('express');
const router = express.Router();
const designController = require('../controller/interiorDesign.controller');
const multer = require('multer');

// Setup multer storage to use memory storage
const storage = multer.memoryStorage();

// Configure multer with file size limits and file type validation
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 11 // 1 main image + up to 10 additional images
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Setup file upload fields
const uploadFields = upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]);

// Error handling middleware for multer errors
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 5MB'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum is 1 main image and 10 additional images'
      });
    }
    return res.status(400).json({
      success: false,
      message: 'File upload error',
      error: err.message
    });
  }
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  next();
};

// Routes with file upload handling
router.post('/adddesign', uploadFields, handleMulterError, designController.createItem);
router.put('/updatedesign/:id', uploadFields, handleMulterError, designController.updateItem);
router.delete('/delete/:id', designController.deleteItem);
router.get('/design', designController.getAllItems);
router.get('/design/:id', designController.getItemById);

module.exports = router;
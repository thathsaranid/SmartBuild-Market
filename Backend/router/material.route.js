const express = require('express');
const router = express.Router();
const materialController = require('../controller/material.controller');
const multer = require('multer');

const storage = multer.memoryStorage(); // image stored in memory
const upload = multer({ storage: storage });

// Add logging middleware
router.use((req, res, next) => {
    console.log('Material Route:', req.method, req.originalUrl);
    next();
});

// Material routes
router.post('/addMaterial', upload.single('image'), materialController.addMaterial);
router.get('/material', materialController.getAllMaterial);
router.get('/material/:id', materialController.getMaterialById);
router.get('/material/:id/image', materialController.getMaterialImage);
router.put('/updateMaterial/:id', upload.single('image'), materialController.updateMaterial);
router.delete('/deleteMaterial/:id', materialController.deleteMaterial);

module.exports = router;
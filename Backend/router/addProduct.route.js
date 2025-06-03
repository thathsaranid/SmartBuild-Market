const express = require('express');
const router = express.Router();
const productController = require('../controller/addproducts.controller');
const multer = require('multer');

const storage = multer.memoryStorage(); // image stored in memory
const upload = multer({ storage: storage });

// Match the frontend API paths
router.post('/addproduct', upload.single('image'), productController.addProduct);
router.put('/updateproduct/:id', upload.single('image'), productController.updateProduct);
router.delete('/deleteproduct/:id', productController.deleteProduct);
router.get('/addproduct', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);

module.exports = router;
const InteriorDesignModel = require('../model/interiorDesign.model');
const fs = require('fs').promises;
const path = require('path');

// Get all interior design items
exports.getAllItems = async (req, res) => {
  try {
    const category = req.query.category;
    const query = category ? { category } : {};
    
    const items = await InteriorDesignModel.find(query).sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      count: items.length,
      data: items
        });
    } catch (error) {
    console.error('Error in getAllItems:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get a single interior design item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await InteriorDesignModel.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: item
    });
    } catch (error) {
    console.error('Error in getItemById:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Create a new interior design item
exports.createItem = async (req, res) => {
  try {
    const { name, description, category, price, discountPrice } = req.body;
    
    // Validate required fields
    if (!name || !description || !category || !price) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, description, category, price'
      });
    }

    // Validate category
    const validCategories = ['historic-formal', 'casual', 'relaxed', 'traditional', 'farmhouse', 'sophisticated'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category. Must be one of: ' + validCategories.join(', ')
      });
    }

    // Validate price
    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a positive number'
      });
    }

    // Validate discount price if provided
    let numDiscountPrice;
    if (discountPrice) {
      numDiscountPrice = Number(discountPrice);
      if (isNaN(numDiscountPrice) || numDiscountPrice <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Discount price must be a positive number'
        });
      }
      if (numDiscountPrice >= numPrice) {
        return res.status(400).json({
          success: false,
          message: 'Discount price must be less than regular price'
        });
      }
    }

    // Check for main image
    if (!req.files?.mainImage?.[0]) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a main image'
      });
    }

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(__dirname, '../uploads/interiorDesign');
    await fs.mkdir(uploadDir, { recursive: true });

    // Process main image
    const mainImageFile = req.files.mainImage[0];
    const mainImageExt = path.extname(mainImageFile.originalname);
    const mainImageFilename = `${Date.now()}-main${mainImageExt}`;
    const mainImagePath = path.join(uploadDir, mainImageFilename);
    
    await fs.writeFile(mainImagePath, mainImageFile.buffer);
    const mainImageUrl = `/uploads/interiorDesign/${mainImageFilename}`;

    // Process additional images if any
    const additionalImageUrls = [];
    if (req.files.images?.length > 0) {
      for (const [index, file] of req.files.images.entries()) {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${index}${ext}`;
        const filepath = path.join(uploadDir, filename);
        
        await fs.writeFile(filepath, file.buffer);
        additionalImageUrls.push(`/uploads/interiorDesign/${filename}`);
      }
    }

    // Create new design item
    const newItem = new InteriorDesignModel({
      name,
      description,
      category,
      price: numPrice,
      discountPrice: numDiscountPrice || numPrice,
      mainImage: mainImageUrl,
      images: additionalImageUrls,
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await newItem.save();

    return res.status(201).json({
      success: true,
      message: 'Interior design item created successfully',
      data: newItem
    });

  } catch (error) {
    console.error('Error in createItem:', error);
    
    // Handle specific validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    // Handle file system errors
    if (error.code === 'ENOENT' || error.code === 'EACCES') {
      return res.status(500).json({
        success: false,
        message: 'File system error. Please try again later.',
        error: error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Update an interior design item
exports.updateItem = async (req, res) => {
  try {
    const { name, description, category, price, discountPrice, inStock } = req.body;
    const updates = { name, description, category, price, discountPrice, inStock };
    
    // Remove undefined fields
    Object.keys(updates).forEach(key => {
      if (updates[key] === undefined) {
        delete updates[key];
      }
    });
    
    // Handle file upload if a new main image is provided
    if (req.files && req.files.mainImage) {
      const file = req.files.mainImage;
      const fileName = `${Date.now()}-${file.name}`;
      const uploadPath = path.join(__dirname, '../uploads/interiorDesign', fileName);
      
      // Move the file
      await file.mv(uploadPath);
      updates.mainImage = `/uploads/interiorDesign/${fileName}`;
      
      // Delete old image if it exists
      const item = await InteriorDesignModel.findById(req.params.id);
      if (item && item.mainImage) {
        const oldImagePath = path.join(__dirname, '..', item.mainImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }
    
    // Handle additional images
    if (req.files && req.files.images) {
      const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      const newImages = [];
      
      for (const file of files) {
        const fileName = `${Date.now()}-${file.name}`;
        const uploadPath = path.join(__dirname, '../uploads/interiorDesign', fileName);
        
        // Move the file
        await file.mv(uploadPath);
        newImages.push(`/uploads/interiorDesign/${fileName}`);
      }
      
      // Append new images to existing ones
      updates.$push = { images: { $each: newImages } };
    }
    
    const item = await InteriorDesignModel.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Interior design item updated successfully',
      data: item
    });
  } catch (error) {
    console.error('Error in updateItem:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Delete an interior design item
exports.deleteItem = async (req, res) => {
  try {
    const item = await InteriorDesignModel.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    // Delete associated images
    if (item.mainImage) {
      const mainImagePath = path.join(__dirname, '..', item.mainImage);
      if (fs.existsSync(mainImagePath)) {
        fs.unlinkSync(mainImagePath);
      }
    }
    
    if (item.images && item.images.length > 0) {
      item.images.forEach(image => {
        const imagePath = path.join(__dirname, '..', image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }
    
    await InteriorDesignModel.findByIdAndDelete(req.params.id);
    
    return res.status(200).json({
      success: true,
      message: 'Interior design item deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteItem:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
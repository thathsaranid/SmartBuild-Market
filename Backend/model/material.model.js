const mongoose = require('mongoose');
const db = require('../config/db');

// Check if model exists before creating
const MaterialModel = db.models.material || db.model('material', new mongoose.Schema({
    material: {
        type: String,
        required: [true, 'Please add a material name']
    },
    materialType: {
        type: String,
        required: [true, 'Please add a material type']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    supplierName: {
        type: String,
        required: [true, 'Please add a supplier name']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    dateAdded: {
        type: Date,
        required: [true, 'Please add a date']
    },
    image: {
        data: Buffer,
        contentType: String
    },
    stock: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}));

module.exports = MaterialModel;
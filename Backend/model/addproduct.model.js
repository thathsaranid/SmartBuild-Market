const mongoose = require('mongoose');

const addProductSchema = new mongoose.Schema({
    material: {
        type: String,
        required: true
    },
    materialType: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    supplierName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('product', addProductSchema);

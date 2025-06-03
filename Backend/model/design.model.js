const mongoose = require('mongoose');
const db = require('../config/db');

// Check if model exists before creating
const DesignModel = db.models.design || db.model('design', new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    mainImage: {
        type: String,
        required: [true, 'Please add a main image']
    },
    additionalImages: [{
        type: String
    }],
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    designer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    status: {
        type: String,
        enum: ['available', 'sold', 'reserved'],
        default: 'available'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}));

module.exports = DesignModel; 
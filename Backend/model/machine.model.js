const mongoose = require('mongoose');
const db = require('../config/db');

// Check if model exists before creating
const MachineModel = db.models.machine || db.model('machine', new mongoose.Schema({
    brand: {
        type: String,
        required: [true, 'Please add a brand']
    },
    model: {
        type: String,
        required: [true, 'Please add a model']
    },
    modelNumber: {
        type: String,
        required: [true, 'Please add a model number']
    },
    country: {
        type: String,
        required: [true, 'Please add a country of origin']
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    type: {
        type: String,
        required: [true, 'Please add a type']
    },
    dailyRate: {
        type: Number,
        required: [true, 'Please add a daily rate']
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    licensePlate: {
        type: String,
        required: [true, 'Please add a license plate']
    },
    year: {
        type: Number
    },
    capacity: {
        type: String
    },
    fuelType: {
        type: String
    },
    availability: {
        type: String,
        enum: ['available', 'inUse', 'maintenance', 'notAvailable'],
        default: 'available'
    },
    image: {
        data: Buffer,
        contentType: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}));

module.exports = MachineModel;
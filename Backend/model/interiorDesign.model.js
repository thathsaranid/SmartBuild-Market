const mongoose = require('mongoose');
const db = require("../config/db");

const interiorDesignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['historic-formal', 'casual', 'relaxed', 'traditional', 'farmhouse', 'sophisticated']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discountPrice: {
    type: Number,
    min: 0
  },
  images: [{
    type: String
  }],
  mainImage: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
interiorDesignSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const InteriorDesignModel = db.model('InteriorDesign', interiorDesignSchema);

module.exports = InteriorDesignModel;
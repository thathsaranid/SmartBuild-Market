const mongoose = require('mongoose');

const addJobScheme = new mongoose.Schema({
    jobTitle: {
        type: String,
        lowercase: true,
        required: true
    },
    description: {
        type: String,
        lowercase: true,
        required: true
    },
    company: {
        type: String,
        lowercase: true
    },
    location: {
        type: String,
        lowercase: true
    },
    jobType: {
        type: String, // e.g., fulltime, parttime
        lowercase: true
    },
    salary: {
        type: String,
        lowercase: true
    },
    skills: {
        type: [String],
        default: []
    },
    image: {
        data: Buffer,
        contentType: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('JobPosting', addJobScheme);
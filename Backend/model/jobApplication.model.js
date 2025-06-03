const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPosting',
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    coverLetter: {
        type: String,
        required: true
    },
    resume: {
        data: Buffer,
        contentType: String
    },
    skills: {
        type: [String],
        default: []
    },
    experience: {
        type: String,
        default: '0'
    },
    status: {
        type: String,
        enum: ['pending', 'reviewing', 'interviewed', 'accepted', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema); 
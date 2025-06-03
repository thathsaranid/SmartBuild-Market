const JobApplication = require('../model/jobApplication.model');
const JobPosting = require('../model/jobPosting.model');
const fs = require('fs');
const path = require('path');

// Submit a job application
const submitApplication = async (applicationData, resumeFile) => {
    try {
        // Check if job exists
        const job = await JobPosting.findById(applicationData.jobId);
        if (!job) {
            throw new Error('Job not found');
        }

        const newApplication = new JobApplication({
            jobId: applicationData.jobId,
            fullName: applicationData.fullName,
            email: applicationData.email,
            phone: applicationData.phone,
            coverLetter: applicationData.coverLetter,
            skills: applicationData.skills ? applicationData.skills.split(',').map(skill => skill.trim()) : [],
            experience: applicationData.experience || '0'
        });

        // Add resume if provided
        if (resumeFile) {
            newApplication.resume = {
                data: fs.readFileSync(path.join(process.cwd(), resumeFile.path)),
                contentType: resumeFile.mimetype
            };
        }

        return await newApplication.save();
    } catch (error) {
        console.error('Error in submitApplication service:', error);
        throw error;
    }
};

// Get all applications with optional filters
const getAllApplications = async (filters = {}) => {
    try {
        let query = {};
        
        // Apply filters if provided
        if (filters.jobId) query.jobId = filters.jobId;
        if (filters.status) query.status = filters.status;
        if (filters.email) query.email = { $regex: filters.email, $options: 'i' };
        
        // Perform the query with population of job details
        return await JobApplication.find(query)
            .populate('jobId', 'jobTitle location jobType')
            .sort({ createdAt: -1 });
    } catch (error) {
        console.error('Error in getAllApplications service:', error);
        throw error;
    }
};

// Get application by ID
const getApplicationById = async (id) => {
    try {
        return await JobApplication.findById(id).populate('jobId');
    } catch (error) {
        console.error('Error in getApplicationById service:', error);
        throw error;
    }
};

// Update application status
const updateApplicationStatus = async (id, status) => {
    try {
        const validStatuses = ['pending', 'reviewing', 'interviewed', 'accepted', 'rejected'];
        
        if (!validStatuses.includes(status)) {
            throw new Error('Invalid status');
        }
        
        return await JobApplication.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true }
        );
    } catch (error) {
        console.error('Error in updateApplicationStatus service:', error);
        throw error;
    }
};

// Delete application
const deleteApplication = async (id) => {
    try {
        return await JobApplication.findByIdAndDelete(id);
    } catch (error) {
        console.error('Error in deleteApplication service:', error);
        throw error;
    }
};

module.exports = {
    submitApplication,
    getAllApplications,
    getApplicationById,
    updateApplicationStatus,
    deleteApplication
}; 
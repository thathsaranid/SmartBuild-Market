const jobApplicationService = require('../services/jobApplication.service');
const multer = require('multer');
const path = require('path');

// Configure multer for resume uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/resumes/');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function(req, file, cb) {
        const filetypes = /pdf|doc|docx/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
}).single('resume');

// Submit job application
const submitApplication = async (req, res) => {
    try {
        upload(req, res, async function(err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: `Multer error: ${err.message}` });
            } else if (err) {
                return res.status(400).json({ error: err.message });
            }
            
            const resumeFile = req.file;
            const application = await jobApplicationService.submitApplication(req.body, resumeFile);
            res.status(201).json({ success: true, data: application });
        });
    } catch (error) {
        console.error('Error in submitApplication controller:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get all applications with optional filters
const getAllApplications = async (req, res) => {
    try {
        const applications = await jobApplicationService.getAllApplications(req.query);
        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        console.error('Error in getAllApplications controller:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get application by ID
const getApplicationById = async (req, res) => {
    try {
        const application = await jobApplicationService.getApplicationById(req.params.id);
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(200).json({ success: true, data: application });
    } catch (error) {
        console.error('Error in getApplicationById controller:', error);
        res.status(500).json({ error: error.message });
    }
};

// Update application status
const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }
        
        const application = await jobApplicationService.updateApplicationStatus(req.params.id, status);
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }
        
        res.status(200).json({ success: true, data: application });
    } catch (error) {
        console.error('Error in updateApplicationStatus controller:', error);
        res.status(500).json({ error: error.message });
    }
};

// Delete application
const deleteApplication = async (req, res) => {
    try {
        const result = await jobApplicationService.deleteApplication(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'Application not found' });
        }
        
        res.status(200).json({ success: true, message: 'Application deleted successfully' });
    } catch (error) {
        console.error('Error in deleteApplication controller:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    submitApplication,
    getAllApplications,
    getApplicationById,
    updateApplicationStatus,
    deleteApplication
}; 
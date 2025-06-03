const jobService = require("../services/jobPositng.service");

const addJob = async (req, res) => {
    try {
        const savedJob = await jobService.addJob(req.body, req.file);
        res.status(200).json({
            success: true,
            message: 'Job added successfully',
            data: savedJob,
            product: savedJob  // Keep this for backward compatibility
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Error adding Job',
            error: error.message 
        });
    }
};

const getAllJobs = async (req, res) => {
    try {
        const filters = req.query;
        const jobs = await jobService.getAllJobs(filters);
        res.status(200).json({
            success: true,
            data: jobs,
            count: jobs.length
        });
    } catch (error){
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching Jobs',
            error: error.message
        });
    }
};

const getJobID = async (req, res) => {
    try {
        const job = await jobService.getJobID(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });

        }
        res.status(200).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching Jobs' });
    }
};

const updateJob = async (req, res) => {
    try{
        const updatedJob = await jobService.updateJob(req.params.id, req.body, req.file);
        if (!updatedJob) {
            return res.status(404).json({ 
                success: false,
                message: 'Job not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Job updated successfully',
            data: updatedJob,
            product: updatedJob  // Keep this for backward compatibility
        });
    } catch (error){
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Error updating job',
            error: error.message
        });
    }
};

const deleteJob = async (req, res) => {
    try {
        const deletedJob = await jobService.deleteJob(req.params.id);
        if (!deletedJob){
            return res.status(404).json({ message:'Job not found'})
        }
        return res.status(200).json({ message: 'Job deleted successfully' });
    } catch(error)
    {
        console.error(error);
        res.status(500).json({ message: 'Error deleting Job' });
    }
}

module.exports = {
    addJob,
    getAllJobs,
    getJobID,
    updateJob,
    deleteJob
};

const JobPosting = require('../model/jobPosting.model');

const addJob = async (jobData, file) => {
    // Process job data
    const processedData = {...jobData};
    
    // Parse skills if it's a string
    if (processedData.skills && typeof processedData.skills === 'string') {
        try {
            // Try to parse as JSON first (from formData handling in frontend)
            processedData.skills = JSON.parse(processedData.skills);
        } catch (e) {
            // If not valid JSON, split by comma
            processedData.skills = processedData.skills.split(',').map(skill => skill.trim());
        }
    }
    
    const job = new JobPosting ({
        ...processedData,
        image: file
        ? {
            data: file.buffer,
            contentType: file.mimetype
        }
        : undefined
    });

    await job.save();

    return job;
};

const getAllJobs = async (filters = {}) =>  {
    const query = {};
    if (filters.jobTitle){
        query.jobTitle = { $regex: filters.jobTitle, $options:'i'};
    }

    if (filters.location){
        query.location =  { $regex: filters.location, $options:'i'};
    }

    if (filters.jobType){
        query.jobType =  { $regex: filters.jobType, $options:'i'};
    }
    return await JobPosting.find(query);
}

const getJobID = async (id) =>{
    return await JobPosting.findById(id);
};

const updateJob = async (jobID, updateData, file) => {
    // Process update data
    const processedData = {...updateData};
    
    // Parse skills if it's a string
    if (processedData.skills && typeof processedData.skills === 'string') {
        try {
            // Try to parse as JSON first (from formData handling in frontend)
            processedData.skills = JSON.parse(processedData.skills);
        } catch (e) {
            // If not valid JSON, split by comma
            processedData.skills = processedData.skills.split(',').map(skill => skill.trim());
        }
    }
    
    const updatedFields = {
        ...processedData,
    };

    if(file) {
        updatedFields.image = {
            data: file.buffer,
            contentType: file.mimetype
        };
    }

    return await JobPosting.findByIdAndUpdate(jobID, updatedFields, {new: true});
};

const deleteJob = async (jobID) => {
    return await JobPosting.findByIdAndDelete(jobID);
};

module.exports ={
    addJob,
    getAllJobs,
    getJobID,
    updateJob,
    deleteJob
}

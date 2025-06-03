const workerService = require("../services/addWorkers.services");

const addWorker = async (req, res) => {
    try {
        // Validate required fields
        const requiredFields = ['name', 'email', 'phone', 'NICNumber', 'address', 'specialization', 'experience', 'grossSalary', 'hourlyRate'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({
                message: 'Invalid email format'
            });
        }

        // Validate numeric fields
        const numericFields = ['experience', 'grossSalary', 'hourlyRate'];
        for (const field of numericFields) {
            if (isNaN(Number(req.body[field]))) {
                return res.status(400).json({
                    message: `${field} must be a number`
                });
            }
        }

        const savedWorker = await workerService.addWorkers(req.body, req.file);
        res.status(201).json({
            message: 'Worker added successfully',
            worker: savedWorker
        });
    } catch (error) {
        console.error('Error in addWorker controller:', error);
        if (error.message === 'Email already exists') {
            return res.status(409).json({ message: error.message });
        }
        res.status(500).json({ 
            message: 'Error adding worker',
            error: error.message 
        });
    }
};

const updateWorker = async (req, res) => {
    try {
        // Validate required fields
        const requiredFields = ['name', 'email', 'phone', 'NICNumber', 'address', 'specialization', 'experience', 'grossSalary', 'hourlyRate'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({
                message: 'Invalid email format'
            });
        }

        // Validate numeric fields
        const numericFields = ['experience', 'grossSalary', 'hourlyRate'];
        for (const field of numericFields) {
            if (isNaN(Number(req.body[field]))) {
                return res.status(400).json({
                    message: `${field} must be a number`
                });
            }
        }

        const updatedWorker = await workerService.updatedWorker(req.params.id, req.body, req.file);
        res.status(200).json({
            message: 'Worker updated successfully',
            worker: updatedWorker
        });
    } catch (error) {
        console.error('Error in updateWorker controller:', error);
        if (error.message === 'Worker not found') {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === 'Email already exists') {
            return res.status(409).json({ message: error.message });
        }
        res.status(500).json({ 
            message: 'Error updating worker',
            error: error.message 
        });
    }
};

const deleteWork = async (req, res) => {
    try {
        await workerService.deleteWork(req.params.id);
        res.status(200).json({ message: 'Worker deleted successfully' });
    } catch (error) {
        console.error('Error in deleteWork controller:', error);
        if (error.message === 'Worker not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ 
            message: 'Error deleting worker',
            error: error.message 
        });
    }
};

const getAllWorkers = async (req, res) => {
    try {
        const workers = await workerService.getAllWorkers();
        res.status(200).json(workers);
    } catch (error) {
        console.error('Error in getAllWorkers controller:', error);
        res.status(500).json({ 
            message: 'Error fetching workers',
            error: error.message 
        });
    }
};

const getWorkerById = async (req, res) => {
    try {
        const worker = await workerService.getWorkerById(req.params.id);
        res.status(200).json(worker);
    } catch (error) {
        console.error('Error in getWorkerById controller:', error);
        if (error.message === 'Worker not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ 
            message: 'Error fetching worker',
            error: error.message 
        });
    }
};

module.exports = {
    addWorker,
    updateWorker,
    deleteWork,
    getAllWorkers,
    getWorkerById
};
const Worker = require('../model/worker.model');

const addWorkers = async (workData, file) => {
    try {
        // Convert string numbers to actual numbers
        const numericFields = ['experience', 'grossSalary', 'hourlyRate'];
        numericFields.forEach(field => {
            if (workData[field]) {
                workData[field] = Number(workData[field]);
            }
        });

        // Create worker object
        const workerData = {
            name: workData.name,
            email: workData.email,
            phone: workData.phone,
            NICNumber: workData.NICNumber,
            address: workData.address,
            specialization: workData.specialization,
            experience: workData.experience,
            grossSalary: workData.grossSalary,
            hourlyRate: workData.hourlyRate,
            status: workData.status || 'available'
        };

        // Add image if available
        if (file) {
            workerData.image = {
                data: file.buffer,
                contentType: file.mimetype
            };
        }

        const worker = new Worker(workerData);
        await worker.save();
        return worker;
    } catch (error) {
        console.error('Error in addWorkers service:', error);
        if (error.code === 11000) {
            throw new Error('Email already exists');
        }
        throw error;
    }
};

const updatedWorker = async (id, workData, file) => {
    try {
        // Convert string numbers to actual numbers
        const numericFields = ['experience', 'grossSalary', 'hourlyRate'];
        numericFields.forEach(field => {
            if (workData[field]) {
                workData[field] = Number(workData[field]);
            }
        });

        // Create update object
        const updateData = {
            name: workData.name,
            email: workData.email,
            phone: workData.phone,
            NICNumber: workData.NICNumber,
            address: workData.address,
            specialization: workData.specialization,
            experience: workData.experience,
            grossSalary: workData.grossSalary,
            hourlyRate: workData.hourlyRate,
            status: workData.status
        };

        // Add image if available
        if (file) {
            updateData.image = {
                data: file.buffer,
                contentType: file.mimetype
            };
        }

        const worker = await Worker.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!worker) {
            throw new Error('Worker not found');
        }

        return worker;
    } catch (error) {
        console.error('Error in updatedWorker service:', error);
        if (error.code === 11000) {
            throw new Error('Email already exists');
        }
        throw error;
    }
};

const deleteWork = async (id) => {
    try {
        const worker = await Worker.findByIdAndDelete(id);
        if (!worker) {
            throw new Error('Worker not found');
        }
        return worker;
    } catch (error) {
        console.error('Error in deleteWork service:', error);
        throw error;
    }
};

const getAllWorkers = async () => {
    try {
        return await Worker.find();
    } catch (error) {
        console.error('Error in getAllWorkers service:', error);
        throw error;
    }
};

const getWorkerById = async (id) => {
    try {
        const worker = await Worker.findById(id);
        if (!worker) {
            throw new Error('Worker not found');
        }
        return worker;
    } catch (error) {
        console.error('Error in getWorkerById service:', error);
        throw error;
    }
};

module.exports = {
    addWorkers,
    updatedWorker,
    deleteWork,
    getAllWorkers,
    getWorkerById
}; 
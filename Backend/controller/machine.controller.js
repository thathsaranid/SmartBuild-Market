const MachineModel = require('../model/machine.model');

// Get all machines
const getAllMachines = async (req, res) => {
    try {
        const machines = await MachineModel.find();
        res.status(200).json(machines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get machine by ID
const getMachineById = async (req, res) => {
    try {
        const machine = await MachineModel.findById(req.params.id);
        if (!machine) {
            return res.status(404).json({ message: 'Machine not found' });
        }
        res.status(200).json(machine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new machine
const addMachine = async (req, res) => {
    try {
        const machineData = {
            ...req.body,
            image: req.file ? {
                data: req.file.buffer,
                contentType: req.file.mimetype
            } : undefined
        };
        
        const machine = new MachineModel(machineData);
        const savedMachine = await machine.save();
        res.status(201).json(savedMachine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update machine
const updateMachine = async (req, res) => {
    try {
        const updateData = {
            ...req.body,
            image: req.file ? {
                data: req.file.buffer,
                contentType: req.file.mimetype
            } : undefined
        };
        
        const machine = await MachineModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!machine) {
            return res.status(404).json({ message: 'Machine not found' });
        }
        
        res.status(200).json(machine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete machine
const deleteMachine = async (req, res) => {
    try {
        const machine = await MachineModel.findByIdAndDelete(req.params.id);
        if (!machine) {
            return res.status(404).json({ message: 'Machine not found' });
        }
        res.status(200).json({ message: 'Machine deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllMachines,
    getMachineById,
    addMachine,
    updateMachine,
    deleteMachine
};
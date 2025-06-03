const express = require('express');
const router = express.Router();
const machineController = require('../controller/machine.controller');
const multer = require('multer');

const storage = multer.memoryStorage(); // image stored in memory
const upload = multer({ storage: storage });

// Get all machines
router.get('/machines', machineController.getAllMachines);

// Get machine by ID
router.get('/machine/:id', machineController.getMachineById);

// Add new machine
router.post('/addmachine', upload.single('image'), machineController.addMachine);

// Update machine
router.put('/updatemachine/:id', upload.single('image'), machineController.updateMachine);

// Delete machine
router.delete('/deletemachine/:id', machineController.deleteMachine);

module.exports = router;
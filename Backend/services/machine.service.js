const Machine = require('../model/machine.model')


const addMachine = async (machineData, file) => {
    // Ensure dailyRate is a number
    const data = {
        ...machineData,
        dailyRate: parseFloat(machineData.dailyRate)
    };

    const machine = new Machine({
        ...data,
        image: file ? {
            data: file.buffer,
            contentType: file.mimetype
        } : undefined
    });

    await machine.save();
    return machine;
};

const getAllMachine = async() => {
    return await Machine.find();
}

const getMachineId = async (id) => {
    return await Machine.findById(id);
}

const updateMachine = async (MachineId, updateData, file) => {
    // Ensure dailyRate is a number if it's being updated
    const data = {
        ...updateData,
        dailyRate: updateData.dailyRate ? parseFloat(updateData.dailyRate) : undefined
    };

    const updatedFields = {
        ...data,
    };

    if(file) {
        updatedFields.image ={
            data: file.buffer,
            contentType: file.mimetype
        };
    }

    return await Machine.findByIdAndUpdate(MachineId, updatedFields, {new: true});

};

const deleteMachine = async (MachineId) =>{
    return await Machine.findByIdAndDelete(MachineId);
}

module.exports ={
    addMachine,
    getAllMachine,
    getMachineId,
    deleteMachine,
    updateMachine
}
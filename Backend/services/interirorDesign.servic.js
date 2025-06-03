const Interior = require('../model/interiorDesign.model');

const addDesign = async (designData, file) => {
    const design = new Interior({
        ...designData,
        Image: file?{
            data: file.buffer,
            contentType: file.mimetype
        }
        : undefined
    })

    await design.save();

    return design;
}

const getAllDesign = async() => {
    return await Interior.find();
}

const getDesignById = async (id) => {
    return await Interior.find(id);
}

const updateDesign = async (designId, updateData, file) => {
    const updatedFields = {
        ...updateData,
    };

    if (file) {
        updatedFields.Image ={
            data: file.buffer,
            contentType: file.mimetype
        };
    }

    return await Interior.findByIdAndUpdate(designId, updatedFields, {new: true});
}

const deleteDesign = async (designId) => {
    return await Interior.findByIdAndDelete(designId);
}

module.exports ={
    addDesign,
    getAllDesign,
    getDesignById,
    updateDesign,
    deleteDesign
}
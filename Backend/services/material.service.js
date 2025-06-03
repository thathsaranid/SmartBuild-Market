const Material = require('../model/material.model');

const addMaterial = async (materialData, file) => {
    console.log('Service: Adding material:', materialData);
    const material = new Material({
        ...materialData,
        image: file ? {
            data: file.buffer,
            contentType: file.mimetype
        } : undefined
    });

    await material.save();
    console.log('Service: Material saved:', material);
    return material;
};

const getAllMaterial = async () => {
    console.log('Service: Getting all materials');
    const materials = await Material.find();
    console.log('Service: Found materials:', materials);
    return materials;
};

const getMaterialById = async (id) => {
    console.log('Service: Getting material by ID:', id);
    const material = await Material.findById(id);
    console.log('Service: Found material:', material);
    return material;
};

const getMaterialImage = async (id) => {
    console.log('Service: Getting material image:', id);
    const material = await Material.findById(id);
    console.log('Service: Found material image:', material);
    return material;
};

const updateMaterial = async (productID, updateData, file) => {
    console.log('Service: Updating material:', productID, updateData);
    const updatedFields = {
        ...updateData,
    };

    if (file) {
        updatedFields.image = {
            data: file.buffer,
            contentType: file.mimetype
        };
    }
    
    const updatedMaterial = await Material.findByIdAndUpdate(productID, updatedFields, { new: true });
    console.log('Service: Updated material:', updatedMaterial);
    return updatedMaterial;
};

const deleteMaterial = async (productID) => {
    console.log('Service: Deleting material:', productID);
    const deletedMaterial = await Material.findByIdAndDelete(productID);
    console.log('Service: Deleted material:', deletedMaterial);
    return deletedMaterial;
};

module.exports = {
    addMaterial,
    getAllMaterial,
    getMaterialById,
    getMaterialImage,
    updateMaterial,
    deleteMaterial
};
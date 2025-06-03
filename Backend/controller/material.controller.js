const { get } = require("mongoose");
const materialService = require("../services/material.service");

const addMaterial = async (req, res) => {
    console.log('Adding material:', req.body);
    try {
        const savedMaterial = await materialService.addMaterial(req.body, req.file);
        res.status(200).json({
            message: 'Material added successfully',
            product: savedMaterial
        });
    } catch (error) {
        console.error('Error adding material:', error);
        res.status(500).json({ message: 'Error adding Material' });
    }
};

const getAllMaterial = async (req, res) => {
    console.log('Getting all materials');
    try {
        const material = await materialService.getAllMaterial();
        console.log('Found materials:', material);
        res.status(200).json(material);
    } catch (error) {
        console.error('Error fetching materials:', error);
        res.status(500).json({ message: 'Error fetching Materials' });
    }
};

const getMaterialById = async (req, res) => {
    console.log('Getting material by ID:', req.params.id);
    try {
        const material = await materialService.getMaterialById(req.params.id);
        if(!material) {
            console.log('Material not found:', req.params.id);
            return res.status(404).json({ message: 'Material not found' });
        }
        console.log('Found material:', material);
        res.status(200).json(material);
    } catch (error) {
        console.error('Error fetching material:', error);
        res.status(500).json({ message: 'Error fetching product' });
    }
};

const getMaterialImage = async (req, res) => {
    console.log('Getting material image:', req.params.id);
    try {
        const material = await materialService.getMaterialImage(req.params.id);
        if (!material || !material.image || !material.image.data) {
            console.log('Material image not found:', req.params.id);
            return res.status(404).json({ message: 'Material image not found' });
        }
        res.set('Content-Type', material.image.contentType);
        res.send(material.image.data);
    } catch (error) {
        console.error('Error fetching material image:', error);
        res.status(500).json({ message: 'Error fetching material image' });
    }
};

const updateMaterial = async (req, res) => {
    console.log('Updating material:', req.params.id, req.body);
    try {
        const updatedMaterial = await materialService.updateMaterial(req.params.id, req.body, req.file);
        if (!updatedMaterial) {
            console.log('Material not found for update:', req.params.id);
            return res.status(404).json({ message: 'Product not found '});
        }
        console.log('Updated material:', updatedMaterial);
        res.status(200).json({
            message: 'Material updated successfully',
            product: updatedMaterial
        });
    } catch (error) {
        console.error('Error updating material:', error);
        res.status(500).json({ message: 'Error updating Material'});
    }
};

const deleteMaterial = async (req, res) => {
    console.log('Deleting material:', req.params.id);
    try {
        const deletedMaterial = await materialService.deleteMaterial(req.params.id);
        if (!deletedMaterial) {
            console.log('Material not found for deletion:', req.params.id);
            return res.status(404).json({ message:'Material not found'});
        }
        console.log('Deleted material:', deletedMaterial);
        return res.status(200).json({ message: 'Material deleted successfully' });
    } catch (error) {
        console.error('Error deleting material:', error);
        res.status(500).json({ message: 'Error deleting Material' });
    }
};

module.exports = {
    addMaterial,
    getAllMaterial,
    getMaterialById,
    getMaterialImage,
    updateMaterial,
    deleteMaterial
};
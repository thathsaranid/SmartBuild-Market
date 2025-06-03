const UserModel = require('../model/user.model');
const OrderModel = require('../model/order.model');
const ProductModel = require('../model/product.model');
const MaterialModel = require('../model/material.model');
const WorkerModel = require('../model/worker.model');
const DesignModel = require('../model/design.model');
const MachineModel = require('../model/machine.model');

exports.getDashboardStats = async (req, res) => {
    try {
        const [
            totalUsers,
            totalSellers,
            totalOrders,
            totalProducts,
            totalMaterials,
            totalWorkers,
            totalDesigns,
            totalMachines
        ] = await Promise.all([
            UserModel.countDocuments({ role: 'user' }),
            UserModel.countDocuments({ role: 'supplier' }),
            OrderModel.countDocuments(),
            ProductModel.countDocuments(),
            MaterialModel.countDocuments(),
            WorkerModel.countDocuments(),
            DesignModel.countDocuments(),
            MachineModel.countDocuments()
        ]);

        res.json({
            status: true,
            stats: {
                totalUsers,
                totalSellers,
                totalOrders,
                totalProducts,
                totalMaterials,
                totalWorkers,
                totalDesigns,
                totalMachines
            }
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await UserModel.find({ role: 'user' })
            .select('-password')
            .sort({ createdAt: -1 });
        res.json({ status: true, users });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

exports.getSellers = async (req, res) => {
    try {
        const sellers = await UserModel.find({ role: 'supplier' })
            .select('-password')
            .sort({ createdAt: -1 });
        res.json({ status: true, sellers });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

exports.approveSeller = async (req, res) => {
    try {
        const seller = await UserModel.findByIdAndUpdate(
            req.params.id,
            { isApproved: true },
            { new: true }
        ).select('-password');
        
        if (!seller) {
            return res.status(404).json({ status: false, message: 'Seller not found' });
        }
        
        res.json({ status: true, seller });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

exports.rejectSeller = async (req, res) => {
    try {
        const seller = await UserModel.findByIdAndUpdate(
            req.params.id,
            { isApproved: false },
            { new: true }
        ).select('-password');
        
        if (!seller) {
            return res.status(404).json({ status: false, message: 'Seller not found' });
        }
        
        res.json({ status: true, seller });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find()
            .sort({ createdAt: -1 });
        res.json({ status: true, orders });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find()
            .sort({ createdAt: -1 });
        res.json({ status: true, products });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

exports.getMaterials = async (req, res) => {
    try {
        const materials = await MaterialModel.find()
            .sort({ createdAt: -1 });
        res.json({ status: true, materials });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

exports.getWorkers = async (req, res) => {
    try {
        const workers = await WorkerModel.find()
            .sort({ createdAt: -1 });
        res.json({ status: true, workers });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

exports.getDesigns = async (req, res) => {
    try {
        const designs = await DesignModel.find()
            .sort({ createdAt: -1 });
        res.json({ status: true, designs });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

exports.getMachines = async (req, res) => {
    try {
        const machines = await MachineModel.find()
            .sort({ createdAt: -1 });
        res.json({ status: true, machines });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}; 
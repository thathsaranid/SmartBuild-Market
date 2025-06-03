const adminCredentials = require('../config/adminLogin');
const userService = require('../services/user.services');

exports.login = async (req, res) => {
    // Create admin user object with a simple token
    const adminUser = {
        _id: 'admin123',
        email: 'admin@smartbuild.com',
        role: 'admin',
        name: 'Admin User'
    };

    const token = 'admin-token-123'; // Simple static token for admin

    return res.status(200).json({ 
        status: true,
        message: "Admin logged in successfully", 
        token,
        user: adminUser
    });
};
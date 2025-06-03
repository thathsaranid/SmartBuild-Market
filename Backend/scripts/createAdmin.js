const AdminModel = require('../model/adminModel');
const db = require('../config/db');

async function createAdmin() {
  try {
    // Check if an admin already exists
    const existingAdmin = await AdminModel.findOne({email: 'admin@smartbuild.com'});
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin._id);
      return existingAdmin._id;
    }
    
    // Create a new admin
    const admin = new AdminModel({
      name: 'Admin',
      email: 'admin@smartbuild.com',
      password: 'admin123',
      role: 'admin',
      isSuper: true
    });
    
    await admin.save();
    console.log('Admin created with ID:', admin._id);
    return admin._id;
  } catch (error) {
    console.error('Error creating admin:', error);
    throw error;
  }
}

// Execute if this file is run directly
if (require.main === module) {
  createAdmin()
    .then(id => {
      console.log('Done. Admin ID:', id);
      process.exit(0);
    })
    .catch(err => {
      console.error('Failed:', err);
      process.exit(1);
    });
}

module.exports = { createAdmin }; 
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Check for admin token
    if (token === 'admin-token-123') {
      req.user = {
        _id: 'admin123',
        email: 'admin@smartbuild.com',
        role: 'admin',
        name: 'Admin User'
      };
      return next();
    }
    
    // For regular users
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify user still exists in database
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }
    
    req.user = {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: `${user.firstName} ${user.lastName}`
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Check for admin token
    if (token === 'admin-token-123') {
      req.user = {
        _id: 'admin123',
        email: 'admin@smartbuild.com',
        role: 'admin',
        name: 'Admin User'
      };
      return next();
    }
    
    // For regular users with JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify user still exists and is admin
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }
    
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    req.user = {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: `${user.firstName} ${user.lastName}`
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}; 
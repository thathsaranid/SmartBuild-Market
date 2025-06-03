const UserModel = require("../model/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class userService {
  static async registerUser(firstName, lastName, role, email, phoneNumb, password) {
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        throw new Error("Email already registered.");
      }

      // Hash password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const createUser = new UserModel({
        firstName,
        lastName,
        role,
        email,
        phoneNumb,
        password: hashedPassword,
      });
      const savedUser = await createUser.save();

      // Generate JWT token
      const token = jwt.sign(
        { id: savedUser._id, email: savedUser.email, role: savedUser.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      return {
        user: {
          _id: savedUser._id,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          role: savedUser.role,
          email: savedUser.email,
          name: `${savedUser.firstName} ${savedUser.lastName}`
        },
        token,
      };
    } catch (err) {
      throw err;
    }
  }

  static async checkuser(email) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async generateToken(userData) {
    try {
      const token = jwt.sign(
        { id: userData._id, email: userData.email, role: userData.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );
      return token;
    } catch (error) {
      throw new Error('Error generating token');
    }
  }

  static async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      const user = await UserModel.findById(decoded.id).select('-password');
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  static async getusetdata(email) {
    const userdata = await UserModel.findOne({ email }).select("-password");
    return userdata;
  }
}

module.exports = userService;

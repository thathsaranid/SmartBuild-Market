const userService = require("../services/user.services");
const UserModel = require("../model/user.model");

exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phoneNumb, password } = req.body;
        // Set a default role of "user" if not provided
        const role = req.body.role || "user";
        const userData = await userService.registerUser(firstName, lastName, role, email, phoneNumb, password);
        res.json({
            status: true,
            message: "User registration successful",
            token: userData.token,
            user: userData.user
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

exports.login = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: 'Please provide email and password'
            });
        }

        // Check if user exists and explicitly select password field
        const user = await UserModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                status: false,
                message: 'Invalid email or password'
            });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                status: false,
                message: 'Invalid email or password'
            });
        }

        // Generate token
        const token = await userService.generateToken(user);

        res.status(200).json({
            status: true,
            token: token,
            user: {
                _id: user._id,
                email: user.email,
                name: user.firstName + " " + user.lastName,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            status: false, 
            message: error.message || 'Internal server error' 
        });
    }
};

exports.getuser = async (req, res, next) => {
    try {
        if (!req.user || !req.user.email) {
            return res.status(401).json({ 
                status: false, 
                message: 'User not authenticated' 
            });
        }

        const email = req.user.email;
        const userdetail = await userService.checkuser(email);
        
        if (!userdetail) {
            return res.status(404).json({ 
                status: false, 
                message: 'User not found' 
            });
        }

        return res.json({
            status: true,
            success: {
                _id: userdetail._id,
                email: userdetail.email,
                name: userdetail.firstName + " " + userdetail.lastName,
                role: userdetail.role
            }
        });
    } catch (error) {
        console.error('Error in getuser:', error);
        return res.status(500).json({ 
            status: false, 
            message: error.message || 'Internal server error' 
        });
    }
};
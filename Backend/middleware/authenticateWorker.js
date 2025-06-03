const jwt = require('jsonwebtoken');

const authenticateWorker = (req, res, next) => {
    const token = req.session.token;

    if(!token) {
        return res.status(401).json({  message: 'Unauthorized: No token provided' })
    }
    try {
        const decoded = jwt.verify(token, 'superSecretKEy12345');
        req.worker = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

module.exports = authenticateWorker;
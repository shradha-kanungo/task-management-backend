const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Header se token nikalna
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Token verify karna
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id; // User ID ko request object mein dalna
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;
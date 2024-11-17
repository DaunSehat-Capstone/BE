const { verifyToken } = require('../middleware/jwt');

const authentication = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Token is required.' });
    }
    
    const user = verifyToken(token);
    if (user.error) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
    
    req.user = user;
    next();
};

module.exports = { authentication };
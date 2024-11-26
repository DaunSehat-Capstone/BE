const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

function generateToken(user) {
    return jwt.sign({ id: user.user_id, email: user.email, name: user.name, image_url: user.image_url }, secret, { expiresIn: process.env.JWT_EXPIRES_IN });
}

function verifyToken(token) {
    try {
        if (token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }

        const decoded = jwt.verify(token, secret);
        return decoded; 
    } catch (error) {
        return { error: true, message: error.message };
    }
}

function getTokenInfo(token) {
    if (token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    }
    return jwt.decode(token);
}

module.exports = { generateToken, verifyToken, getTokenInfo };
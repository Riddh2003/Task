const jwt = require("jsonwebtoken");
const SECRET = 'modi';

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, SECRET, { expiresIn: 60 * 60 });
}

module.exports = {
    generateToken
}
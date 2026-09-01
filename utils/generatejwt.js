const jwt = require("jsonwebtoken");



module.exports = async (bayload) => {
    const token = await jwt.sign(payload, process.env.jwt_secret, { expiresIn: '1h' });
    return token;

};
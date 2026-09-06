const jwt = require('jsonwebtoken');
const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // return res.status(401).json({ message: 'Authorization header missing or invalid' });
     const error = appError.create("Token not required.", 401, httpStatusText.ERROR);
            return next(error);
    AppError
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.jwt_secret);
        req.currentUser = decoded; 
        req.user = decoded; // Attach the decoded user information to the request object
        next();
    } catch (error) {
    // لو عاوز تبعت الخطأ الأصلي للـ Global Error Handler مباشرة:
    const customError = appError.create(
        error.message || "Invalid or expired token.", 
        401, 
        httpStatusText.ERROR
    );
    return next(customError);
}
};

module.exports = verifyToken;
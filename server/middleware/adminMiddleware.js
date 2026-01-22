/**
 * Sentinel Admin Middleware
 * Verifies if the authenticated user has administrative privileges.
 */
const admin = (req, res, next) => {
    // req.user is populated by your authMiddleware.js
    if (req.user && req.user.role === 'admin') {
        next(); // User is authorized, proceed to the route
    } else {
        res.status(403).json({ msg: "Access Denied: Administrative privileges required." });
    }
};

module.exports = admin;
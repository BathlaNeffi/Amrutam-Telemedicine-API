/**
 * Middleware to check if the user has one of the allowed roles
*/
const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    const user = req.user; // comes from Passport JWT

    if (!user) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ status: "error", message: "Forbidden: Access denied" });
    }

    next(); 
  };
};

module.exports = roleMiddleware;

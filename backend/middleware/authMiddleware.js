const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Check if user is logged in
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Get token from request header
    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // If no token found
    if (!token) {
      return res.status(401).json({ 
        message: 'Please login to access this!' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ 
        message: 'User no longer exists!' 
      });
    }

    // Attach user to request
    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({ 
      message: 'Invalid token! Please login again.' 
    });
  }
};

// Check user role
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'You do not have permission to do this!' 
      });
    }
    next();
  };
};
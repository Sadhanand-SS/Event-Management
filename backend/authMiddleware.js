// Updated authMiddleware.js with token-based or session-based user extraction
const User = require('./models/user');

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  const userId = req.body.createdBy;  // Get the createdBy userId from the body of the DELETE request
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID (createdBy) not provided' });
  }

  try {
    const user = await User.findById(userId);  // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can perform this action.' });
    }

    next();  // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = isAdmin;

const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const generateToken = (user) => {
  try {
    if (!user || !user.username || !user._id) {
      return new Error('Invalid user object');
    }

    if (!JWT_SECRET) {
      return new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign(
      { username: user.username, id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' },
    );

    return token;
  } catch (error) {
    console.error('Error generating JWT token:', error.message);
    throw error;
  }
};

module.exports = generateToken;
